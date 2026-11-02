import React, { useState } from 'react';
import { Mail, Lock, Eye, EyeOff, AlertCircle, ArrowRight } from 'lucide-react';
import { TriShieldLogo } from './TriShieldLogo';
import { GoogleButton } from './GoogleButton';
import { signInWithEmail, UserProfile } from '../services/auth';

interface LoginScreenProps {
  onNavigate: (screen: 'login' | 'register' | 'forgot-password' | 'reset-success', emailParam?: string) => void;
  onGoogleSignIn: () => void;
  onLoginSuccess?: (user: UserProfile) => void;
  isGoogleLoading?: boolean;
}

export const LoginScreen: React.FC<LoginScreenProps> = ({
  onNavigate,
  onGoogleSignIn,
  onLoginSuccess,
  isGoogleLoading = false,
}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  
  // Validation and states
  const [errors, setErrors] = useState<{ email?: string; password?: string; general?: string }>({});
  const [isLoading, setIsLoading] = useState(false);

  // Validate fields
  const validateForm = () => {
    const newErrors: { email?: string; password?: string } = {};

    if (!email.trim()) {
      newErrors.email = 'Email address is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      newErrors.email = 'Please enter a valid email address';
    }

    if (!password) {
      newErrors.password = 'Password is required';
    } else if (password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
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
      const user = await signInWithEmail(email, password);
      setIsLoading(false);
      if (onLoginSuccess) {
        onLoginSuccess(user);
      }
    } catch (err: any) {
      setIsLoading(false);
      setErrors({ general: err?.message || 'Invalid email or password. Please try again.' });
    }
  };

  return (
    <div className="w-full">
      {/* Brand Header */}
      <div className="mb-7">
        <TriShieldLogo size="lg" className="mb-5" />
        <h1 className="text-2xl font-bold tracking-tight text-white">Welcome back</h1>
        <p className="text-sm text-slate-400 mt-1">
          Please enter your credentials to sign in.
        </p>
      </div>

      {/* General Error Banner */}
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

      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-4" noValidate>
        {/* Email Input */}
        <div>
          <label htmlFor="login-email" className="block text-xs font-medium text-slate-300 mb-1.5">
            Email address
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-500">
              <Mail className="w-4 h-4" />
            </div>
            <input
              id="login-email"
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
            <p className="mt-1.5 text-xs text-rose-400 flex items-center gap-1">
              <AlertCircle className="w-3.5 h-3.5" />
              <span>{errors.email}</span>
            </p>
          )}
        </div>

        {/* Password Input with show/hide toggle */}
        <div>
          <div className="flex items-center justify-between mb-1.5">
            <label htmlFor="login-password" className="block text-xs font-medium text-slate-300">
              Password
            </label>
            <button
              type="button"
              onClick={() => onNavigate('forgot-password', email)}
              className="text-xs text-cyan-400 hover:text-cyan-300 transition-colors focus:outline-none focus:underline cursor-pointer"
            >
              Forgot password?
            </button>
          </div>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-500">
              <Lock className="w-4 h-4" />
            </div>
            <input
              id="login-password"
              type={showPassword ? 'text' : 'password'}
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                if (errors.password) setErrors((prev) => ({ ...prev, password: undefined }));
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
            <p className="mt-1.5 text-xs text-rose-400 flex items-center gap-1">
              <AlertCircle className="w-3.5 h-3.5" />
              <span>{errors.password}</span>
            </p>
          )}
        </div>

        {/* Remember Me Checkbox */}
        <div className="flex items-center justify-between pt-1">
          <label className="flex items-center gap-2 cursor-pointer group">
            <input
              type="checkbox"
              checked={rememberMe}
              onChange={(e) => setRememberMe(e.target.checked)}
              className="w-4 h-4 rounded border-slate-700 bg-slate-900 text-cyan-500 focus:ring-cyan-500/40 focus:ring-offset-0 cursor-pointer accent-[#00D4FF]"
            />
            <span className="text-xs text-slate-400 group-hover:text-slate-300 transition-colors select-none">
              Remember me
            </span>
          </label>
        </div>

        {/* Primary Login Button */}
        <button
          type="submit"
          disabled={isLoading}
          className="w-full mt-2 py-2.5 px-4 rounded-xl font-semibold text-sm text-[#0B0F19] bg-gradient-to-r from-[#00D4FF] via-cyan-400 to-[#00D4FF] hover:opacity-95 focus:outline-none focus:ring-2 focus:ring-cyan-400/50 shadow-lg shadow-cyan-500/20 transition-all duration-200 flex items-center justify-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed cursor-pointer"
        >
          {isLoading ? (
            <>
              <div className="w-4 h-4 border-2 border-slate-900 border-t-transparent rounded-full animate-spin" />
              <span>Signing in...</span>
            </>
          ) : (
            <>
              <span>Login</span>
              <ArrowRight className="w-4 h-4" />
            </>
          )}
        </button>

        {/* Divider */}
        <div className="relative my-4">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-slate-800" />
          </div>
          <div className="relative flex justify-center text-xs">
            <span className="bg-[#111827] px-3 text-slate-500 font-medium">Or</span>
          </div>
        </div>

        {/* Google Authentication Button */}
        <GoogleButton
          onClick={onGoogleSignIn}
          isLoading={isGoogleLoading}
          text="Continue with Google"
        />
      </form>

      {/* Footer Navigation Link to Register */}
      <div className="mt-8 pt-5 border-t border-slate-800/80 text-center">
        <p className="text-xs text-slate-400">
          Don't have an account?{' '}
          <button
            type="button"
            onClick={() => onNavigate('register')}
            className="font-semibold text-cyan-400 hover:text-cyan-300 transition-colors focus:outline-none focus:underline cursor-pointer"
          >
            Register
          </button>
        </p>
      </div>
    </div>
  );
};
