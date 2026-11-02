import React, { useState, useEffect } from 'react';
import { CheckCircle2, Mail, ArrowLeft, RefreshCw, AlertCircle } from 'lucide-react';
import { TriShieldLogo } from './TriShieldLogo';
import { sendPasswordReset } from '../services/auth';

interface PasswordResetSuccessScreenProps {
  email?: string;
  onNavigate: (screen: 'login' | 'register' | 'forgot-password' | 'reset-success') => void;
}

export const PasswordResetSuccessScreen: React.FC<PasswordResetSuccessScreenProps> = ({
  email = 'name@example.com',
  onNavigate,
}) => {
  const [countdown, setCountdown] = useState(45);
  const [isResending, setIsResending] = useState(false);
  const [resendStatus, setResendStatus] = useState<{ type: 'success' | 'error'; message: string } | null>(null);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (countdown > 0) {
      timer = setTimeout(() => setCountdown(countdown - 1), 1000);
    }
    return () => clearTimeout(timer);
  }, [countdown]);

  const handleResend = async () => {
    if (countdown > 0 || isResending) return;
    setIsResending(true);
    setResendStatus(null);

    try {
      await sendPasswordReset(email);
      setIsResending(false);
      setCountdown(45);
      setResendStatus({
        type: 'success',
        message: 'A fresh password reset link has been dispatched to your email address.',
      });
      setTimeout(() => setResendStatus(null), 5000);
    } catch (err: any) {
      setIsResending(false);
      setResendStatus({
        type: 'error',
        message: err?.message || 'Failed to resend reset email. Please try again.',
      });
    }
  };

  return (
    <div className="w-full text-center">
      {/* Brand Header */}
      <div className="mb-6 flex justify-center">
        <TriShieldLogo size="lg" />
      </div>

      {/* Main Success Container */}
      <div className="p-6 rounded-2xl bg-[#111827] border border-slate-800 shadow-xl relative overflow-hidden">
        {/* Glow accent */}
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-cyan-500 to-emerald-400" />

        {/* Success Icon */}
        <div className="relative w-16 h-16 mx-auto mb-4 flex items-center justify-center">
          <div className="absolute inset-0 rounded-2xl bg-gradient-to-tr from-cyan-500/20 via-emerald-500/20 to-cyan-500/10 blur-md" />
          <div className="relative w-16 h-16 rounded-2xl bg-[#0B0F19] border border-cyan-500/40 flex items-center justify-center shadow-lg">
            <Mail className="w-8 h-8 text-[#00D4FF]" />
            <div className="absolute -bottom-1 -right-1 w-6 h-6 rounded-full bg-emerald-500 border-2 border-[#0B0F19] flex items-center justify-center text-slate-950">
              <CheckCircle2 className="w-4 h-4 stroke-[3]" />
            </div>
          </div>
        </div>

        {/* Confirmation Message */}
        <h1 className="text-xl font-bold tracking-tight text-white">Password Reset Email Sent</h1>
        <p className="text-xs text-slate-400 mt-2 leading-relaxed">
          We have sent a password reset link to:
        </p>

        {/* Email Address Placeholder */}
        <div className="mt-3.5 p-2.5 rounded-xl bg-slate-900 border border-slate-700 inline-flex items-center gap-2 max-w-full">
          <Mail className="w-4 h-4 text-cyan-400 shrink-0" />
          <span className="text-xs font-mono font-medium text-white truncate max-w-[280px]">
            {email}
          </span>
        </div>

        {/* Instructions */}
        <p className="text-[11px] text-slate-400 mt-3 leading-relaxed">
          Please check your inbox (and spam or junk folder). Click the link in the email to define your new password.
        </p>

        {/* Resend status toast */}
        {resendStatus && (
          <div
            className={`mt-3 p-2.5 rounded-lg text-xs flex items-center justify-center gap-2 animate-in fade-in ${
              resendStatus.type === 'success'
                ? 'bg-emerald-950/50 border border-emerald-500/30 text-emerald-300'
                : 'bg-rose-950/50 border border-rose-500/30 text-rose-300'
            }`}
          >
            {resendStatus.type === 'success' ? (
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
            ) : (
              <AlertCircle className="w-3.5 h-3.5 text-rose-400 shrink-0" />
            )}
            <span>{resendStatus.message}</span>
          </div>
        )}

        {/* Resend Email Option */}
        <div className="mt-5 pt-4 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
          <span className="text-slate-400 text-[11px]">Didn't receive the email?</span>
          <button
            type="button"
            onClick={handleResend}
            disabled={countdown > 0 || isResending}
            className={`inline-flex items-center gap-1.5 font-medium transition-colors cursor-pointer ${
              countdown > 0 || isResending
                ? 'text-slate-600 cursor-not-allowed'
                : 'text-cyan-400 hover:text-cyan-300'
            }`}
          >
            <RefreshCw className={`w-3.5 h-3.5 ${isResending ? 'animate-spin' : ''}`} />
            <span>
              {countdown > 0 ? `Resend email in ${countdown}s` : 'Resend email now'}
            </span>
          </button>
        </div>
      </div>

      {/* Return to Login Button */}
      <div className="mt-6">
        <button
          type="button"
          onClick={() => onNavigate('login')}
          className="w-full py-2.5 px-4 rounded-xl font-semibold text-sm text-[#0B0F19] bg-gradient-to-r from-[#00D4FF] via-cyan-400 to-[#00D4FF] hover:opacity-95 shadow-lg shadow-cyan-500/20 transition-all flex items-center justify-center gap-2 cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Return to Login</span>
        </button>
      </div>
    </div>
  );
};
