/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from 'react';
import { TriShieldLogo } from './components/TriShieldLogo';
import { LoginScreen } from './components/LoginScreen';
import { RegisterScreen } from './components/RegisterScreen';
import { ForgotPasswordScreen } from './components/ForgotPasswordScreen';
import { PasswordResetSuccessScreen } from './components/PasswordResetSuccessScreen';
import { TermsModal } from './components/TermsModal';
import { NotificationToast, ToastMessage } from './components/NotificationToast';
import {
  Sidebar,
  DashboardTab,
} from './components/dashboard/Sidebar';
import { DashboardHeader } from './components/dashboard/DashboardHeader';
import { DashboardOverview } from './components/dashboard/DashboardOverview';
import { FaceRecognitionPage } from './components/dashboard/FaceRecognitionPage';
import { VoiceRecognitionPage } from './components/dashboard/VoiceRecognitionPage';
import { FingerprintPage } from './components/dashboard/FingerprintPage';
import { AccessLogsPage } from './components/dashboard/AccessLogsPage';
import { SecuritySettingsPage } from './components/dashboard/SecuritySettingsPage';
import { ProfileSettingsPage } from './components/dashboard/ProfileSettingsPage';
import { HelpSupportPage } from './components/dashboard/HelpSupportPage';
import { ViewDetailsModal } from './components/dashboard/ViewDetailsModal';
import { LayoutDashboard, ArrowRight, ShieldCheck } from 'lucide-react';

import {
  signInWithGoogle,
  signOutUser,
  subscribeToAuthChanges,
  UserProfile,
} from './services/auth';

export type ScreenType = 'login' | 'register' | 'forgot-password' | 'reset-success';
export type ViewMode = 'auth' | 'dashboard';

export default function App() {
  // Navigation State
  const [viewMode, setViewMode] = useState<ViewMode>('dashboard');
  const [authScreen, setAuthScreen] = useState<ScreenType>('login');
  const [dashboardTab, setDashboardTab] = useState<DashboardTab>('overview');

  // UI States
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);
  const [selectedActivity, setSelectedActivity] = useState<any | null>(null);

  // Auth & Reset States
  const [resetEmail, setResetEmail] = useState<string>('name@example.com');
  const [isTermsModalOpen, setIsTermsModalOpen] = useState(false);
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [toast, setToast] = useState<ToastMessage | null>(null);
  const [isGoogleLoading, setIsGoogleLoading] = useState(false);

  // Authenticated user state
  const [currentUser, setCurrentUser] = useState<UserProfile | null>({
    uid: 'officer_default',
    displayName: 'Maaz Awan',
    email: 'maazawan2468@gmail.com',
    photoURL: null,
  });

  // Listen to live auth state
  useEffect(() => {
    const unsubscribe = subscribeToAuthChanges((user) => {
      if (user) {
        setCurrentUser(user);
      }
    });
    return () => unsubscribe();
  }, []);

  const showNotification = (message: string, title = 'TriShield Alert', type: 'success' | 'error' | 'info' = 'success') => {
    setToast({
      id: Date.now().toString(),
      type,
      title,
      message,
    });
  };

  const handleAuthNavigate = (screen: ScreenType, emailParam?: string) => {
    if (emailParam) {
      setResetEmail(emailParam);
    }
    setAuthScreen(screen);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleGoogleSignIn = async () => {
    setIsGoogleLoading(true);
    try {
      const user = await signInWithGoogle();
      setCurrentUser(user);
      setViewMode('dashboard');
      showNotification(`Signed in as ${user.displayName || user.email}! Welcome to TriShield.`);
    } catch (error: any) {
      if (error?.code !== 'auth/popup-closed-by-user') {
        showNotification(error?.message || 'Unable to authenticate with Google.', 'Sign In Failed', 'error');
      }
    } finally {
      setIsGoogleLoading(false);
    }
  };

  const handleLoginSuccess = (user: UserProfile) => {
    setCurrentUser(user);
    setViewMode('dashboard');
    showNotification(`Welcome back, ${user.displayName || user.email}!`);
  };

  const handleLogout = async () => {
    try {
      await signOutUser();
    } catch {
      // Ignore
    }
    setCurrentUser(null);
    setViewMode('auth');
    setAuthScreen('login');
    showNotification('You have logged out of the TriShield security gateway.', 'Session Ended', 'info');
  };

  const authTabs = [
    { id: 'login' as ScreenType, label: 'Login' },
    { id: 'register' as ScreenType, label: 'Register' },
    { id: 'forgot-password' as ScreenType, label: 'Forgot Password' },
    { id: 'reset-success' as ScreenType, label: 'Reset Sent' },
  ];

  return (
    <div className="min-h-screen bg-[#0B0F19] text-slate-100 flex flex-col relative selection:bg-cyan-500/30 selection:text-cyan-200">
      {/* Background Soft Lighting Gradients */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
        <div className="absolute -top-40 left-1/4 w-[600px] h-[600px] bg-cyan-500/[0.04] rounded-full blur-[140px]" />
        <div className="absolute top-1/2 -right-40 w-[600px] h-[600px] bg-indigo-500/[0.04] rounded-full blur-[140px]" />
      </div>

      {/* ============================================================== */}
      {/* VIEW 1: MAIN DASHBOARD & SIDEBAR NAVIGATION UI               */}
      {/* ============================================================== */}
      {viewMode === 'dashboard' ? (
        <div className="flex h-screen overflow-hidden z-10">
          {/* Collapsible Sidebar */}
          <Sidebar
            currentTab={dashboardTab}
            onSelectTab={(tab) => {
              setDashboardTab(tab);
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            isCollapsed={isSidebarCollapsed}
            onToggleCollapse={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
            isMobileOpen={isMobileSidebarOpen}
            onCloseMobile={() => setIsMobileSidebarOpen(false)}
            onLogout={handleLogout}
            onSwitchToAuth={() => setViewMode('auth')}
          />

          {/* Right Main Content Area */}
          <div className="flex-1 flex flex-col min-w-0 h-screen overflow-hidden">
            {/* Top Dashboard Header */}
            <DashboardHeader
              currentTab={dashboardTab}
              onOpenMobileSidebar={() => setIsMobileSidebarOpen(true)}
              currentUser={currentUser}
              onNavigateTab={(tab) => setDashboardTab(tab)}
              onSwitchToAuth={() => setViewMode('auth')}
            />

            {/* Scrollable Viewport */}
            <main className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8">
              {dashboardTab === 'overview' && (
                <DashboardOverview
                  currentUser={currentUser}
                  onNavigateTab={(tab) => setDashboardTab(tab)}
                  onViewActivityDetails={(act) => setSelectedActivity(act)}
                />
              )}

              {dashboardTab === 'activity' && (
                <AccessLogsPage onViewDetails={(act) => setSelectedActivity(act)} />
              )}

              {dashboardTab === 'face' && <FaceRecognitionPage />}

              {dashboardTab === 'voice' && <VoiceRecognitionPage />}

              {dashboardTab === 'fingerprint' && <FingerprintPage />}

              {dashboardTab === 'logs' && (
                <AccessLogsPage onViewDetails={(act) => setSelectedActivity(act)} />
              )}

              {dashboardTab === 'security' && (
                <SecuritySettingsPage onShowToast={(msg) => showNotification(msg)} />
              )}

              {dashboardTab === 'profile' && (
                <ProfileSettingsPage
                  currentUser={currentUser}
                  onNavigateTab={(tab) => setDashboardTab(tab)}
                  onShowToast={(msg) => showNotification(msg)}
                />
              )}

              {dashboardTab === 'help' && <HelpSupportPage />}
            </main>
          </div>
        </div>
      ) : (
        /* ============================================================== */
        /* VIEW 2: AUTHENTICATION PORTAL (PRESERVED)                      */
        /* ============================================================== */
        <div className="min-h-screen flex flex-col z-10">
          {/* Top Bar for Auth Portal with Return to Dashboard Link */}
          <header className="sticky top-0 z-30 w-full bg-[#0B0F19]/90 backdrop-blur-md border-b border-slate-800/80 px-4 sm:px-8 py-3.5 flex items-center justify-between gap-4">
            <div className="flex items-center gap-2 shrink-0">
              <TriShieldLogo size="sm" />
            </div>

            {/* Screen switcher */}
            <nav className="flex items-center gap-1 p-1 rounded-xl bg-slate-900/80 border border-slate-800/80 overflow-x-auto max-w-full">
              {authTabs.map((screen) => {
                const isActive = authScreen === screen.id;
                return (
                  <button
                    key={screen.id}
                    type="button"
                    onClick={() => handleAuthNavigate(screen.id)}
                    className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-all duration-200 whitespace-nowrap shrink-0 cursor-pointer ${
                      isActive
                        ? 'bg-[#111827] text-cyan-300 border border-cyan-500/40 shadow-sm'
                        : 'text-slate-400 hover:text-slate-200'
                    }`}
                  >
                    {screen.label}
                  </button>
                );
              })}
            </nav>

            {/* Button to jump directly to Dashboard */}
            <button
              type="button"
              onClick={() => setViewMode('dashboard')}
              className="flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-gradient-to-r from-cyan-500/20 to-indigo-500/20 text-cyan-300 border border-cyan-500/40 text-xs font-semibold hover:bg-cyan-500/30 transition-all cursor-pointer shrink-0"
            >
              <LayoutDashboard className="w-3.5 h-3.5 text-cyan-400" />
              <span>Open Dashboard</span>
            </button>
          </header>

          {/* Auth Card Viewport */}
          <main className="flex-1 flex items-center justify-center p-4 sm:p-6 lg:p-12">
            <div className="w-full max-w-md mx-auto">
              <div className="w-full bg-[#111827] border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-2xl relative overflow-hidden transition-all duration-300">
                <div className="absolute top-0 left-6 right-6 h-[1.5px] bg-gradient-to-r from-transparent via-[#00D4FF]/70 to-transparent" />

                {authScreen === 'login' && (
                  <LoginScreen
                    onNavigate={handleAuthNavigate}
                    onGoogleSignIn={handleGoogleSignIn}
                    onLoginSuccess={handleLoginSuccess}
                    isGoogleLoading={isGoogleLoading}
                  />
                )}

                {authScreen === 'register' && (
                  <RegisterScreen
                    onNavigate={handleAuthNavigate}
                    onGoogleSignIn={handleGoogleSignIn}
                    isGoogleLoading={isGoogleLoading}
                    onOpenTermsModal={() => setIsTermsModalOpen(true)}
                    termsAccepted={termsAccepted}
                    setTermsAccepted={setTermsAccepted}
                  />
                )}

                {authScreen === 'forgot-password' && (
                  <ForgotPasswordScreen
                    initialEmail={resetEmail}
                    onNavigate={handleAuthNavigate}
                  />
                )}

                {authScreen === 'reset-success' && (
                  <PasswordResetSuccessScreen
                    email={resetEmail}
                    onNavigate={handleAuthNavigate}
                  />
                )}
              </div>
            </div>
          </main>

          {/* Footer */}
          <footer className="w-full py-4 px-6 border-t border-slate-900 bg-[#0B0F19] text-center text-xs text-slate-500 flex flex-col sm:flex-row items-center justify-between gap-3 max-w-md mx-auto">
            <div className="flex items-center gap-2">
              <span className="font-semibold text-slate-400">TriShield</span>
              <span aria-hidden="true">·</span>
              <span>Authentication Portal</span>
            </div>
            <div className="text-[11px] text-slate-500">
              <span>&copy; {new Date().getFullYear()} All rights reserved</span>
            </div>
          </footer>
        </div>
      )}

      {/* Terms and Conditions Modal */}
      <TermsModal
        isOpen={isTermsModalOpen}
        onClose={() => setIsTermsModalOpen(false)}
        onAccept={() => {
          setTermsAccepted(true);
          showNotification('You have accepted the Terms and Conditions.');
        }}
      />

      {/* Forensic Log Entry Inspector Modal */}
      <ViewDetailsModal
        activity={selectedActivity}
        onClose={() => setSelectedActivity(null)}
      />

      {/* Event Notification Toast */}
      <NotificationToast
        toast={toast}
        onClose={() => setToast(null)}
      />
    </div>
  );
}
