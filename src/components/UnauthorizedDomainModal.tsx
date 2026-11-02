import React, { useState } from 'react';
import { X, ExternalLink, Copy, Check, ShieldAlert, ArrowRight, Globe } from 'lucide-react';

interface UnauthorizedDomainModalProps {
  isOpen: boolean;
  onClose: () => void;
  domain: string;
  onContinueDemo: () => void;
}

export const UnauthorizedDomainModal: React.FC<UnauthorizedDomainModalProps> = ({
  isOpen,
  onClose,
  domain,
  onContinueDemo,
}) => {
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const handleCopy = () => {
    navigator.clipboard.writeText(domain);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const firebaseSettingsUrl =
    'https://console.firebase.google.com/project/liquid-nature-bt3g1/authentication/settings';

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-sm animate-in fade-in duration-200">
      <div
        className="w-full max-w-lg bg-[#111827] border border-slate-700/80 rounded-3xl p-6 sm:p-7 shadow-2xl relative overflow-hidden text-left"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-amber-500 via-rose-500 to-cyan-400" />

        {/* Header */}
        <div className="flex items-start justify-between pb-4 border-b border-slate-800">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-2xl bg-amber-500/10 border border-amber-500/20 text-amber-400 shrink-0">
              <Globe className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-white tracking-tight">
                Authorize Vercel Domain in Firebase
              </h3>
              <p className="text-xs text-slate-400">Google OAuth Security Policy</p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="py-4 space-y-4 text-xs text-slate-300">
          <p className="leading-relaxed text-slate-300">
            Firebase requires every production domain (like Vercel) to be allowlisted in the Firebase Console before Google allows popup authentication.
          </p>

          {/* Domain Box with 1-click Copy */}
          <div className="p-3.5 rounded-2xl bg-slate-900 border border-slate-800 space-y-1.5">
            <span className="text-[10px] uppercase font-mono tracking-wider text-slate-400">
              Your Vercel Domain to Allowlist:
            </span>
            <div className="flex items-center justify-between gap-2 bg-black/40 px-3 py-2 rounded-xl border border-slate-800 font-mono text-cyan-300 font-semibold text-xs">
              <span className="truncate">{domain || window.location.hostname}</span>
              <button
                type="button"
                onClick={handleCopy}
                className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-[11px] transition-colors cursor-pointer shrink-0"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copied ? 'Copied' : 'Copy'}</span>
              </button>
            </div>
          </div>

          {/* Quick 2-Step Instructions */}
          <div className="p-3.5 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-2">
            <span className="font-semibold text-white block">2 Steps to Fix in 30 Seconds:</span>
            <ol className="list-decimal pl-4 space-y-1.5 text-slate-400 text-[11px] leading-relaxed">
              <li>
                Open the{' '}
                <a
                  href={firebaseSettingsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-cyan-400 hover:underline font-medium inline-flex items-center gap-1"
                >
                  Firebase Authentication Settings
                  <ExternalLink className="w-3 h-3" />
                </a>
              </li>
              <li>
                Scroll down to <strong className="text-slate-200">"Authorized domains"</strong>, click <strong className="text-slate-200">"Add domain"</strong>, and paste your domain.
              </li>
            </ol>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="pt-4 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-3">
          <button
            type="button"
            onClick={() => {
              onContinueDemo();
              onClose();
            }}
            className="w-full sm:w-auto px-4 py-2.5 rounded-xl text-xs font-medium text-slate-300 bg-slate-800 hover:bg-slate-700 hover:text-white transition-colors cursor-pointer order-2 sm:order-1"
          >
            Continue in Demo Officer Session
          </button>

          <a
            href={firebaseSettingsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto px-5 py-2.5 rounded-xl text-xs font-semibold text-[#0B0F19] bg-gradient-to-r from-amber-400 to-[#00D4FF] hover:opacity-95 shadow-lg shadow-cyan-500/20 transition-all flex items-center justify-center gap-2 cursor-pointer order-1 sm:order-2"
          >
            <span>Open Firebase Settings</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>
      </div>
    </div>
  );
};
