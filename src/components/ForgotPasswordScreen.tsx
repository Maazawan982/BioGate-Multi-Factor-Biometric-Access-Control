import React, { useState } from 'react';
import { Mail, ArrowLeft, AlertCircle, ArrowRight, CheckCircle2 } from 'lucide-react';
import { TriShieldLogo } from './TriShieldLogo';
import { sendPasswordReset } from '../services/auth';

interface ForgotPasswordScreenProps {
  initialEmail?: string;
  onNavigate: (screen: 'login' | 'register' | 'forgot-password' | 'reset-success', emailParam?: string) => void;
}

export const ForgotPasswordScreen: React.FC<ForgotPasswordScreenProps> = ({
  initialEmail = '',
  onNavigate,
}) => {
  const [email, setEmail] = useState(initialEmail);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const validateEmail = (val: string) => {
    if (!val.trim()) return 'Email address is required';
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val.trim())) return 'Please enter a valid email address';
    return null;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const validationError = validateEmail(email);
    if (validationError) {
      setError(validationError);
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      // Send real password reset email via Firebase Authentication
      await sendPasswordReset(email);
      setIsLoading(false);
      onNavigate('reset-success', email.trim());
    } catch (err: any) {
      setIsLoading(false);
      setError(err?.message || 'Failed to dispatch password reset email. Please try again.');
    }
  };

  return (
    <div className="w-full">
      {/* Brand Header */}
      <div className="mb-6">
        <TriShieldLogo size="lg" className="mb-5" />
        <h1 className="text-2xl font-bold tracking-tight text-white">Forgot Password</h1>
        <p className="text-sm text-slate-400 mt-2 leading-relaxed">
          Enter your email address below and we'll send a password recovery link to your inbox.
        </p>
      </div>

      {/* Error alert */}
      {error && (
        <div className="mb-5 p-3.5 rounded-xl bg-rose-950/40 border border-rose-500/30 text-rose-300 text-xs flex items-start gap-2.5 animate-in fade-in">
          <AlertCircle className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
          <div className="flex-1 leading-relaxed">{error}</div>
        </div>
      )}

      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-4" noValidate>
        <div>
          <label htmlFor="reset-email" className="block text-xs font-medium text-slate-300 mb-1.5">
            Email address
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-500">
              <Mail className="w-4 h-4" />
            </div>
            <input
              id="reset-email"
              type="email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                if (error) setError(null);
              }}
              placeholder="name@example.com"
              disabled={isLoading}
              className={`w-full pl-10 pr-4 py-2.5 rounded-xl bg-[#111827] text-white placeholder-slate-500 text-sm border transition-all duration-200 focus:outline-none focus:ring-2 ${
                error
                  ? 'border-rose-500/80 focus:ring-rose-500/30'
                  : 'border-slate-700/80 hover:border-slate-600 focus:border-cyan-500 focus:ring-cyan-500/30'
              }`}
            />
          </div>
        </div>

        {/* Send Reset Link Button */}
        <button
          type="submit"
          disabled={isLoading}
          className="w-full mt-2 py-2.5 px-4 rounded-xl font-semibold text-sm text-[#0B0F19] bg-gradient-to-r from-[#00D4FF] via-cyan-400 to-[#00D4FF] hover:opacity-95 focus:outline-none focus:ring-2 focus:ring-cyan-400/50 shadow-lg shadow-cyan-500/20 transition-all duration-200 flex items-center justify-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed cursor-pointer"
        >
          {isLoading ? (
            <>
              <div className="w-4 h-4 border-2 border-slate-900 border-t-transparent rounded-full animate-spin" />
              <span>Sending Reset Email...</span>
            </>
          ) : (
            <>
              <span>Send Reset Link</span>
              <ArrowRight className="w-4 h-4" />
            </>
          )}
        </button>
      </form>

      {/* Back to Login link */}
      <div className="mt-8 pt-5 border-t border-slate-800/80 text-center">
        <button
          type="button"
          onClick={() => onNavigate('login')}
          className="inline-flex items-center gap-2 text-xs font-medium text-slate-400 hover:text-cyan-400 transition-colors focus:outline-none focus:underline"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to Login</span>
        </button>
      </div>
    </div>
  );
};
