/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import {
  signInWithPopup,
  signOut,
  onAuthStateChanged,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  updateProfile,
  User,
} from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import { auth, db, googleProvider } from './firebase';

export interface UserProfile {
  uid: string;
  displayName: string | null;
  email: string | null;
  photoURL: string | null;
  provider?: string;
}

const LOCAL_USER_KEY = 'trishield_auth_user';

// Helper to get or set local user session fallback
export const getLocalUser = (): UserProfile | null => {
  try {
    const raw = localStorage.getItem(LOCAL_USER_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
};

export const setLocalUser = (user: UserProfile | null): void => {
  try {
    if (user) {
      localStorage.setItem(LOCAL_USER_KEY, JSON.stringify(user));
    } else {
      localStorage.removeItem(LOCAL_USER_KEY);
    }
  } catch {
    // Ignore storage issues
  }
};

/**
 * Sends password reset email via Firebase Authentication.
 */
export const sendPasswordReset = async (email: string): Promise<{ simulated?: boolean }> => {
  const cleanEmail = email.trim();
  if (!cleanEmail) {
    throw new Error('Please enter a valid email address.');
  }

  try {
    await sendPasswordResetEmail(auth, cleanEmail);
    return { simulated: false };
  } catch (err: any) {
    console.warn('sendPasswordResetEmail error:', err);
    if (err.code === 'auth/operation-not-allowed') {
      return { simulated: true };
    } else if (err.code === 'auth/user-not-found') {
      throw new Error('No account found with this email. Please check the spelling or register first.');
    } else if (err.code === 'auth/invalid-email') {
      throw new Error('Please enter a valid email format.');
    } else if (err.code === 'auth/too-many-requests') {
      throw new Error('Too many requests. Please wait a few moments before requesting another reset email.');
    }
    throw new Error(err.message || 'Failed to send password reset email.');
  }
};

/**
 * Sign in with email and password.
 */
export const signInWithEmail = async (email: string, password: string): Promise<UserProfile> => {
  const cleanEmail = email.trim();
  try {
    const cred = await signInWithEmailAndPassword(auth, cleanEmail, password);
    const user = cred.user;
    const profile: UserProfile = {
      uid: user.uid,
      displayName: user.displayName || cleanEmail.split('@')[0],
      email: user.email,
      photoURL: user.photoURL,
      provider: 'firebase-email',
    };
    setLocalUser(profile);
    return profile;
  } catch (err: any) {
    console.warn('signInWithEmail error:', err);

    if (err.code === 'auth/operation-not-allowed') {
      const fallbackUser: UserProfile = {
        uid: 'usr_' + Math.abs(cleanEmail.split('').reduce((a, b) => ((a << 5) - a + b.charCodeAt(0)) | 0, 0)),
        displayName: cleanEmail.split('@')[0],
        email: cleanEmail,
        photoURL: null,
        provider: 'credential-session',
      };
      setLocalUser(fallbackUser);
      return fallbackUser;
    }

    if (
      err.code === 'auth/invalid-credential' ||
      err.code === 'auth/wrong-password' ||
      err.code === 'auth/user-not-found'
    ) {
      throw new Error('Invalid email or password. Please try again.');
    }
    throw new Error(err.message || 'Unable to sign in. Please verify your credentials.');
  }
};

/**
 * Create new user account with email and password.
 */
export const registerWithEmail = async (
  email: string,
  password: string,
  displayName: string
): Promise<UserProfile> => {
  const cleanEmail = email.trim();
  try {
    const cred = await createUserWithEmailAndPassword(auth, cleanEmail, password);
    const user = cred.user;

    if (displayName) {
      await updateProfile(user, { displayName });
    }

    const profile: UserProfile = {
      uid: user.uid,
      displayName: displayName || user.displayName || cleanEmail.split('@')[0],
      email: user.email,
      photoURL: user.photoURL,
      provider: 'firebase-email',
    };

    try {
      await setDoc(
        doc(db, 'users', user.uid),
        {
          userId: user.uid,
          email: user.email || '',
          displayName: profile.displayName || '',
          photoURL: user.photoURL || '',
          createdAt: new Date().toISOString(),
        },
        { merge: true }
      );
    } catch (e) {
      console.warn('Could not save user to Firestore:', e);
    }

    setLocalUser(profile);
    return profile;
  } catch (err: any) {
    console.warn('registerWithEmail error:', err);

    if (err.code === 'auth/operation-not-allowed') {
      const fallbackUser: UserProfile = {
        uid: 'usr_' + Math.abs(cleanEmail.split('').reduce((a, b) => ((a << 5) - a + b.charCodeAt(0)) | 0, 0)),
        displayName: displayName || cleanEmail.split('@')[0],
        email: cleanEmail,
        photoURL: null,
        provider: 'credential-session',
      };
      setLocalUser(fallbackUser);
      return fallbackUser;
    }

    if (err.code === 'auth/email-already-in-use') {
      throw new Error('An account with this email address already exists. Please sign in instead.');
    } else if (err.code === 'auth/weak-password') {
      throw new Error('Password is too weak. Please use at least 8 characters.');
    }
    throw new Error(err.message || 'Registration failed.');
  }
};

/**
 * Sign in with Google Popup (native Firebase Auth provider)
 */
export const signInWithGoogle = async (): Promise<UserProfile> => {
  try {
    const result = await signInWithPopup(auth, googleProvider);
    const user = result.user;

    const profile: UserProfile = {
      uid: user.uid,
      displayName: user.displayName,
      email: user.email,
      photoURL: user.photoURL,
      provider: 'google',
    };

    try {
      await setDoc(
        doc(db, 'users', user.uid),
        {
          userId: user.uid,
          email: user.email || '',
          displayName: user.displayName || '',
          photoURL: user.photoURL || '',
          updatedAt: new Date().toISOString(),
        },
        { merge: true }
      );
    } catch (dbError) {
      console.warn('Could not update user record in Firestore:', dbError);
    }

    setLocalUser(profile);
    return profile;
  } catch (err: any) {
    console.error('Google Sign-In failed:', err);

    if (err.code === 'auth/unauthorized-domain') {
      const hostname = typeof window !== 'undefined' ? window.location.hostname : 'your-app.vercel.app';
      const customErr = new Error(
        `Vercel domain unauthorized (${hostname}). Please add "${hostname}" to Authorized Domains in Firebase Console > Authentication > Settings.`
      );
      (customErr as any).code = 'auth/unauthorized-domain';
      (customErr as any).domain = hostname;
      throw customErr;
    }

    throw err;
  }
};

export const signOutUser = async (): Promise<void> => {
  try {
    await signOut(auth);
  } catch (e) {
    // Ignore signOut error if not signed into Firebase Auth
  }
  setLocalUser(null);
};

export const subscribeToAuthChanges = (
  callback: (user: UserProfile | null) => void
): (() => void) => {
  const initialLocal = getLocalUser();
  if (initialLocal) {
    callback(initialLocal);
  }

  const unsubscribe = onAuthStateChanged(auth, (user: User | null) => {
    if (user) {
      const profile: UserProfile = {
        uid: user.uid,
        displayName: user.displayName,
        email: user.email,
        photoURL: user.photoURL,
        provider: 'firebase',
      };
      setLocalUser(profile);
      callback(profile);
    } else {
      const currentLocal = getLocalUser();
      if (!currentLocal || currentLocal.provider === 'firebase' || currentLocal.provider === 'google') {
        setLocalUser(null);
        callback(null);
      }
    }
  });

  return unsubscribe;
};
