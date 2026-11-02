import React from 'react';
import { X, ShieldCheck, CheckCircle2, AlertTriangle, Key, Terminal, MapPin, Clock } from 'lucide-react';

interface ViewDetailsModalProps {
  activity: any | null;
  onClose: () => void;
}

export const ViewDetailsModal: React.FC<ViewDetailsModalProps> = ({ activity, onClose }) => {
  if (!activity) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div
        className="w-full max-w-lg bg-[#111827] border border-slate-700/80 rounded-3xl p-6 shadow-2xl relative overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-cyan-500 via-indigo-500 to-cyan-400" />

        {/* Modal Header */}
        <div className="flex items-center justify-between pb-4 border-b border-slate-800">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-cyan-500/10 border border-cyan-500/20 text-cyan-400">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-semibold text-white">Forensic Access Audit Details</h3>
              <p className="text-xs text-slate-400 font-mono">Event ID: {activity.id}</p>
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

        {/* Body */}
        <div className="py-4 space-y-4 text-xs">
          {/* Status Banner */}
          <div
            className={`p-3.5 rounded-2xl border flex items-center justify-between ${
              activity.status === 'Granted'
                ? 'bg-emerald-950/40 border-emerald-500/30 text-emerald-300'
                : 'bg-rose-950/40 border-rose-500/30 text-rose-300'
            }`}
          >
            <div className="flex items-center gap-2">
              {activity.status === 'Granted' ? (
                <CheckCircle2 className="w-5 h-5 text-emerald-400" />
              ) : (
                <AlertTriangle className="w-5 h-5 text-rose-400" />
              )}
              <span className="font-semibold text-sm">Access Request {activity.status}</span>
            </div>
            <span className="font-mono text-xs">Confidence: {activity.score || '99.2%'}</span>
          </div>

          {/* Details Grid */}
          <div className="grid grid-cols-2 gap-3">
            <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 space-y-1">
              <span className="text-[10px] uppercase font-mono text-slate-500">Authenticated Subject</span>
              <div className="font-semibold text-white">{activity.user}</div>
              <div className="text-[11px] text-slate-400 font-mono truncate">{activity.email}</div>
            </div>

            <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 space-y-1">
              <span className="text-[10px] uppercase font-mono text-slate-500">Authentication Method</span>
              <div className="font-semibold text-cyan-300">{activity.method}</div>
              <div className="text-[11px] text-slate-400">AQF Sensor Fusion</div>
            </div>

            <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 space-y-1">
              <span className="text-[10px] uppercase font-mono text-slate-500">Access Terminal</span>
              <div className="font-medium text-slate-200">{activity.terminal}</div>
              <div className="text-[10px] text-slate-500 font-mono">IP: {activity.ip || '192.168.1.104'}</div>
            </div>

            <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 space-y-1">
              <span className="text-[10px] uppercase font-mono text-slate-500">Timestamp</span>
              <div className="font-medium text-slate-200">{activity.timestamp}</div>
              <div className="text-[10px] text-slate-500 font-mono">UTC +00:00 Synchronized</div>
            </div>
          </div>

          {/* Cryptographic Ledger Block */}
          <div className="p-3 rounded-xl bg-slate-900/80 border border-slate-800 space-y-1.5">
            <div className="flex items-center gap-1.5 text-cyan-400 font-mono text-[11px] font-semibold">
              <Key className="w-3.5 h-3.5" />
              <span>Immutable Cryptographic Audit Proof</span>
            </div>
            <p className="text-[10px] font-mono text-slate-400 break-all bg-black/40 p-2 rounded-lg border border-slate-800">
              {activity.auditHash || '0x8f2c7a914e19b8823f66c0d45e128f317c3812d4'}
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="pt-3 border-t border-slate-800 flex justify-end">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-200 bg-slate-800 hover:bg-slate-700 transition-colors"
          >
            Close Inspector
          </button>
        </div>
      </div>
    </div>
  );
};
