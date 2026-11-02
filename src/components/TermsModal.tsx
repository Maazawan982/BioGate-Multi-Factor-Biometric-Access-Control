import React from 'react';
import { X, Shield, Lock, FileText, CheckCircle2 } from 'lucide-react';

interface TermsModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAccept: () => void;
}

export const TermsModal: React.FC<TermsModalProps> = ({ isOpen, onClose, onAccept }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div
        className="w-full max-w-lg bg-[#111827] border border-slate-700/80 rounded-2xl p-6 shadow-2xl relative flex flex-col max-h-[85vh] overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-cyan-500 via-indigo-500 to-cyan-400" />

        <div className="flex items-center justify-between pb-4 border-b border-slate-800">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-lg bg-cyan-500/10 border border-cyan-500/20 text-cyan-400">
              <FileText className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-semibold text-white">
                Terms of Service & Privacy Agreement
              </h3>
              <p className="text-xs text-slate-400">TriShield Security Protocol</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto py-4 space-y-4 text-xs text-slate-300 pr-1">
          <div className="p-3 rounded-xl bg-slate-900/60 border border-slate-800 space-y-1.5">
            <div className="flex items-center gap-2 text-cyan-400 font-medium">
              <Shield className="w-4 h-4 shrink-0" />
              <span>1. Account Authorization & Access</span>
            </div>
            <p className="text-slate-400 leading-relaxed">
              By registering or accessing an account, you agree to maintain the security of your authentication credentials and accept responsibility for all activity occurring under your account.
            </p>
          </div>

          <div className="p-3 rounded-xl bg-slate-900/60 border border-slate-800 space-y-1.5">
            <div className="flex items-center gap-2 text-indigo-400 font-medium">
              <Lock className="w-4 h-4 shrink-0" />
              <span>2. Privacy & Data Security</span>
            </div>
            <p className="text-slate-400 leading-relaxed">
              Your profile information and credentials are encrypted using industry-standard protocols. We do not sell or expose personal data to unauthorized third parties.
            </p>
          </div>

          <div className="p-3 rounded-xl bg-slate-900/60 border border-slate-800 space-y-1.5">
            <div className="flex items-center gap-2 text-cyan-400 font-medium">
              <CheckCircle2 className="w-4 h-4 shrink-0" />
              <span>3. User Rights & Termination</span>
            </div>
            <p className="text-slate-400 leading-relaxed">
              You retain the right to close your account, request data deletion, or revoke third-party login authorizations at any time.
            </p>
          </div>
        </div>

        <div className="pt-4 border-t border-slate-800 flex items-center justify-end gap-3">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 rounded-xl text-xs font-medium text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            Decline
          </button>
          <button
            type="button"
            onClick={() => {
              onAccept();
              onClose();
            }}
            className="px-5 py-2 rounded-xl text-xs font-semibold text-slate-950 bg-[#00D4FF] hover:bg-cyan-300 transition-colors shadow-sm"
          >
            Accept & Continue
          </button>
        </div>
      </div>
    </div>
  );
};
