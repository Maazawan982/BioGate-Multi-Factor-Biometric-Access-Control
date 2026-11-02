import React, { useState } from 'react';
import { User, Mail, Lock, Eye, EyeOff, AlertCircle, CheckCircle2, ArrowRight } from 'lucide-react';
import { TriShieldLogo } from './TriShieldLogo';
import { GoogleButton } from './GoogleButton';
import { PasswordStrengthMeter } from './PasswordStrengthMeter';
import { registerWithEmail } from '../services/auth';

interface RegisterScreenProps {
  onNavigate: (screen: 'login' | 'register' | 'forgot-password' | 'reset-success', emailParam?: string) => void;
  onGoogleSignIn: () => void;
  isGoogleLoading?: boolean;
  onOpenTermsModal: () => void;
  termsAccepted: boolean;
  setTermsAccepted: (val: boolean) => void;
}

export const RegisterScreen: React.FC<RegisterScreenProps> = ({
  onNavigate,
  onGoogleSignIn,
  isGoogleLoading = false,
  onOpenTermsModal,
  termsAccepted,
  setTermsAccepted,
}) => {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // States
  const [errors, setErrors] = useState<{
    fullName?: string;
    email?: string;
    password?: string;
    confirmPassword?: string;
    terms?: string;
    general?: string;
  }>({});
  const [isLoading, setIsLoading] = useState(false);
  const [registerSuccess, setRegisterSuccess] = useState(false);

  // Form validation
  const validateForm = () => {
    const newErrors: typeof errors = {};

    if (!fullName.trim()) {
      newErrors.fullName = 'Full Name is required';
    } else if (fullName.trim().length < 2) {
      newErrors.fullName = 'Name must be at least 2 characters';
    }

    if (!email.trim()) {
      newErrors.email = 'Email address is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      newErrors.email = 'Please enter a valid email address';
    }

    if (!password) {
      newErrors.password = 'Password is required';
    } else if (password.length < 8) {
      newErrors.password = 'Password must be at least 8 characters';
    }

    if (!confirmPassword) {
      newErrors.confirmPassword = 'Confirm your password';
    } else if (password !== confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }

    if (!termsAccepted) {
      newErrors.terms = 'Please accept the Terms and Conditions to proceed';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsLoading(true);
    setErrors({});

    try {
      await registerWithEmail(email, password, fullName);
      setIsLoading(false);
      setRegisterSuccess(true);
    } catch (err: any) {
      setIsLoading(false);
      setErrors({ general: err?.message || 'Registration failed. Please try again.' });
    }
  };

  return (
    <div className="w-full">
      {/* Brand Header */}
      <div className="mb-6">
        <TriShieldLogo size="lg" className="mb-5" />
        <h1 className="text-2xl font-bold tracking-tight text-white">Create Account</h1>
        <p className="text-sm text-slate-400 mt-1">
          Enter your details below to create your account.
        </p>
      </div>

      {errors.general && (
        <div className="mb-5 p-3.5 rounded-xl bg-rose-950/40 border border-rose-500/30 text-rose-300 text-xs flex items-start gap-2.5 animate-in fade-in">
          <AlertCircle className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
          <div className="flex-1 leading-relaxed">{errors.general}</div>
          <button
            type="button"
            onClick={() => setErrors((prev) => ({ ...prev, general: undefined }))}
            className="text-rose-400 hover:text-rose-200 text-sm font-semibold ml-1 cursor-pointer"
          >
            ×
          </button>
        </div>
      )}

      {registerSuccess ? (
        <div className="p-5 rounded-2xl bg-[#0F172A] border border-cyan-500/40 text-center space-y-4 animate-in fade-in">
          <div className="w-12 h-12 rounded-full bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center mx-auto text-cyan-400">
            <CheckCircle2 className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-base font-semibold text-white">Account Created Successfully</h3>
            <p className="text-xs text-slate-400 mt-1">
              Your account has been registered for <span className="text-cyan-400 font-mono">{email}</span>.
            </p>
          </div>
          <button
            type="button"
            onClick={() => onNavigate('login')}
            className="w-full py-2.5 px-4 rounded-xl text-xs font-semibold text-[#0B0F19] bg-[#00D4FF] hover:bg-cyan-300 transition-colors flex items-center justify-center gap-2 cursor-pointer"
          >
            <span>Proceed to Login</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-3.5" noValidate>
          {/* Full Name */}
          <div>
            <label htmlFor="reg-fullname" className="block text-xs font-medium text-slate-300 mb-1">
              Full Name
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-500">
                <User className="w-4 h-4" />
              </div>
              <input
                id="reg-fullname"
                type="text"
                value={fullName}
                onChange={(e) => {
                  setFullName(e.target.value);
                  if (errors.fullName) setErrors((prev) => ({ ...prev, fullName: undefined }));
                }}
                placeholder="Full name"
                disabled={isLoading}
                className={`w-full pl-10 pr-4 py-2.5 rounded-xl bg-[#111827] text-white placeholder-slate-500 text-sm border transition-all duration-200 focus:outline-none focus:ring-2 ${
                  errors.fullName
                    ? 'border-rose-500/80 focus:ring-rose-500/30'
                    : 'border-slate-700/80 hover:border-slate-600 focus:border-cyan-500 focus:ring-cyan-500/30'
                }`}
              />
            </div>
            {errors.fullName && (
              <p className="mt-1 text-xs text-rose-400 flex items-center gap-1">
                <AlertCircle className="w-3.5 h-3.5" />
                <span>{errors.fullName}</span>
              </p>
            )}
          </div>

          {/* Email Address */}
          <div>
            <label htmlFor="reg-email" className="block text-xs font-medium text-slate-300 mb-1">
              Email address
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-500">
                <Mail className="w-4 h-4" />
              </div>
              <input
                id="reg-email"
                type="email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  if (errors.email) setErrors((prev) => ({ ...prev, email: undefined }));
                }}
                placeholder="name@example.com"
                disabled={isLoading}
                className={`w-full pl-10 pr-4 py-2.5 rounded-xl bg-[#111827] text-white placeholder-slate-500 text-sm border transition-all duration-200 focus:outline-none focus:ring-2 ${
                  errors.email
                    ? 'border-rose-500/80 focus:ring-rose-500/30'
                    : 'border-slate-700/80 hover:border-slate-600 focus:border-cyan-500 focus:ring-cyan-500/30'
                }`}
              />
            </div>
            {errors.email && (
              <p className="mt-1 text-xs text-rose-400 flex items-center gap-1">
                <AlertCircle className="w-3.5 h-3.5" />
                <span>{errors.email}</span>
              </p>
            )}
          </div>

          {/* Password Input */}
          <div>
            <label htmlFor="reg-password" className="block text-xs font-medium text-slate-300 mb-1">
              Password
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-500">
                <Lock className="w-4 h-4" />
              </div>
              <input
                id="reg-password"
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  if (errors.password) setErrors((prev) => ({ ...prev, password: undefined }));
                  if (confirmPassword && e.target.value !== confirmPassword) {
                    setErrors((prev) => ({ ...prev, confirmPassword: 'Passwords do not match' }));
                  } else if (confirmPassword && e.target.value === confirmPassword) {
                    setErrors((prev) => ({ ...prev, confirmPassword: undefined }));
                  }
                }}
                placeholder="••••••••••••"
                disabled={isLoading}
                className={`w-full pl-10 pr-11 py-2.5 rounded-xl bg-[#111827] text-white placeholder-slate-500 text-sm border transition-all duration-200 focus:outline-none focus:ring-2 ${
                  errors.password
                    ? 'border-rose-500/80 focus:ring-rose-500/30'
                    : 'border-slate-700/80 hover:border-slate-600 focus:border-cyan-500 focus:ring-cyan-500/30'
                }`}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-slate-500 hover:text-slate-300 transition-colors cursor-pointer"
                aria-label={showPassword ? 'Hide password' : 'Show password'}
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
            {errors.password && (
              <p className="mt-1 text-xs text-rose-400 flex items-center gap-1">
                <AlertCircle className="w-3.5 h-3.5" />
                <span>{errors.password}</span>
              </p>
            )}

            {/* Password strength indicator */}
            <PasswordStrengthMeter password={password} />
          </div>

          {/* Confirm Password Input */}
          <div>
            <label htmlFor="reg-confirm-password" className="block text-xs font-medium text-slate-300 mb-1">
              Confirm Password
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-500">
                <Lock className="w-4 h-4" />
              </div>
              <input
                id="reg-confirm-password"
                type={showConfirmPassword ? 'text' : 'password'}
                value={confirmPassword}
                onChange={(e) => {
                  setConfirmPassword(e.target.value);
                  if (errors.confirmPassword) {
                    setErrors((prev) => ({
                      ...prev,
                      confirmPassword: e.target.value === password ? undefined : 'Passwords do not match',
                    }));
                  }
                }}
                placeholder="••••••••••••"
                disabled={isLoading}
                className={`w-full pl-10 pr-11 py-2.5 rounded-xl bg-[#111827] text-white placeholder-slate-500 text-sm border transition-all duration-200 focus:outline-none focus:ring-2 ${
                  errors.confirmPassword
                    ? 'border-rose-500/80 focus:ring-rose-500/30'
                    : 'border-slate-700/80 hover:border-slate-600 focus:border-cyan-500 focus:ring-cyan-500/30'
                }`}
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-slate-500 hover:text-slate-300 transition-colors cursor-pointer"
                aria-label={showConfirmPassword ? 'Hide password' : 'Show password'}
              >
                {showConfirmPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
            {errors.confirmPassword && (
              <p className="mt-1 text-xs text-rose-400 flex items-center gap-1">
                <AlertCircle className="w-3.5 h-3.5" />
                <span>{errors.confirmPassword}</span>
              </p>
            )}
            {confirmPassword && password === confirmPassword && (
              <p className="mt-1 text-xs text-emerald-400 flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>Passwords match</span>
              </p>
            )}
          </div>

          {/* Terms and Conditions Checkbox */}
          <div className="pt-1">
            <div className="flex items-start gap-2.5">
              <input
                id="reg-terms"
                type="checkbox"
                checked={termsAccepted}
                onChange={(e) => {
                  setTermsAccepted(e.target.checked);
                  if (errors.terms) setErrors((prev) => ({ ...prev, terms: undefined }));
                }}
                className="w-4 h-4 mt-0.5 rounded border-slate-700 bg-slate-900 text-cyan-500 focus:ring-cyan-500/40 focus:ring-offset-0 cursor-pointer accent-[#00D4FF]"
              />
              <label htmlFor="reg-terms" className="text-xs text-slate-400 leading-normal select-none cursor-pointer">
                I agree to the{' '}
                <button
                  type="button"
                  onClick={(e) => {
                    e.preventDefault();
                    onOpenTermsModal();
                  }}
                  className="text-cyan-400 hover:text-cyan-300 underline font-medium cursor-pointer"
                >
                  Terms and Conditions
                </button>
              </label>
            </div>
            {errors.terms && (
              <p className="mt-1 text-xs text-rose-400 flex items-center gap-1">
                <AlertCircle className="w-3.5 h-3.5" />
                <span>{errors.terms}</span>
              </p>
            )}
          </div>

          {/* Create Account Button */}
          <button
            type="submit"
            disabled={isLoading}
            className="w-full mt-2 py-2.5 px-4 rounded-xl font-semibold text-sm text-[#0B0F19] bg-gradient-to-r from-[#00D4FF] via-cyan-400 to-[#00D4FF] hover:opacity-95 focus:outline-none focus:ring-2 focus:ring-cyan-400/50 shadow-lg shadow-cyan-500/20 transition-all duration-200 flex items-center justify-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed cursor-pointer"
          >
            {isLoading ? (
              <>
                <div className="w-4 h-4 border-2 border-slate-900 border-t-transparent rounded-full animate-spin" />
                <span>Creating Account...</span>
              </>
            ) : (
              <>
                <span>Create Account</span>
                <ArrowRight className="w-4 h-4" />
              </>
            )}
          </button>

          {/* Divider */}
          <div className="relative my-3">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-slate-800" />
            </div>
            <div className="relative flex justify-center text-xs">
              <span className="bg-[#111827] px-3 text-slate-500 font-medium">Or</span>
            </div>
          </div>

          {/* Continue with Google */}
          <GoogleButton
            onClick={onGoogleSignIn}
            isLoading={isGoogleLoading}
            text="Continue with Google"
          />
        </form>
      )}

      {/* Link to Login */}
      <div className="mt-6 pt-4 border-t border-slate-800/80 text-center">
        <p className="text-xs text-slate-400">
          Already have an account?{' '}
          <button
            type="button"
            onClick={() => onNavigate('login')}
            className="font-semibold text-cyan-400 hover:text-cyan-300 transition-colors focus:outline-none focus:underline cursor-pointer"
          >
            Login
          </button>
        </p>
      </div>
    </div>
  );
};
