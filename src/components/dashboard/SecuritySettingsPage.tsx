import React, { useState } from 'react';
import {
  ShieldCheck,
  Sliders,
  Lock,
  Cpu,
  AlertTriangle,
  Bell,
  Save,
  CheckCircle2,
} from 'lucide-react';

interface SecuritySettingsPageProps {
  onShowToast: (msg: string) => void;
}

export const SecuritySettingsPage: React.FC<SecuritySettingsPageProps> = ({ onShowToast }) => {
  const [aqfEnabled, setAqfEnabled] = useState(true);
  const [tripleModalityRequired, setTripleModalityRequired] = useState(true);
  const [antiSpoofStrict, setAntiSpoofStrict] = useState(true);
  const [sensitivityThreshold, setSensitivityThreshold] = useState(95);
  const [sessionTimeout, setSessionTimeout] = useState('15');
  const [emailAlerts, setEmailAlerts] = useState(true);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    onShowToast('Security policy and AQF parameters updated successfully.');
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto animate-in fade-in duration-300">
      {/* Header */}
      <div className="pb-4 border-b border-slate-800">
        <div className="flex items-center gap-2 text-cyan-400 font-mono text-xs uppercase tracking-wider mb-1">
          <Sliders className="w-4 h-4" />
          <span>System Policies</span>
        </div>
        <h2 className="text-2xl font-bold tracking-tight text-white">Security & Policy Settings</h2>
        <p className="text-xs sm:text-sm text-slate-400 mt-1 max-w-2xl leading-relaxed">
          Configure multi-factor biometric fusion rules, anti-spoofing depth thresholds, and access lockout policies.
        </p>
      </div>

      <form onSubmit={handleSave} className="space-y-6">
        {/* Section 1: Biometric Fusion & AQF Policies */}
        <div className="p-6 rounded-3xl bg-[#111827] border border-slate-800 shadow-xl space-y-5">
          <div className="flex items-center gap-3 pb-3 border-b border-slate-800">
            <div className="p-2 rounded-xl bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
              <Cpu className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-semibold text-white">
                Adaptive Quality-Aware Fusion (AQF)
              </h3>
              <p className="text-xs text-slate-400">
                Dynamic weighting of Face, Voice, and Fingerprint signals based on sensor noise.
              </p>
            </div>
          </div>

          {/* Toggle: AQF Active */}
          <div className="flex items-center justify-between py-2">
            <div>
              <label htmlFor="aqf-toggle" className="text-sm font-medium text-slate-200 block cursor-pointer">
                Enable Adaptive Quality-Aware Fusion
              </label>
              <p className="text-xs text-slate-400 mt-0.5">
                Automatically adjusts modality confidence weights in low-light or noisy environments.
              </p>
            </div>
            <input
              id="aqf-toggle"
              type="checkbox"
              checked={aqfEnabled}
              onChange={(e) => setAqfEnabled(e.target.checked)}
              className="w-5 h-5 rounded border-slate-700 bg-slate-900 text-cyan-500 focus:ring-cyan-500/40 cursor-pointer accent-[#00D4FF]"
            />
          </div>

          {/* Toggle: Mandatory 3-Modality Enforcement */}
          <div className="flex items-center justify-between py-2 border-t border-slate-800/80">
            <div>
              <label htmlFor="triple-modality" className="text-sm font-medium text-slate-200 block cursor-pointer">
                Mandatory Triple-Modality Clearance
              </label>
              <p className="text-xs text-slate-400 mt-0.5">
                Requires Face + Voice + Fingerprint simultaneously for High-Security terminal doors.
              </p>
            </div>
            <input
              id="triple-modality"
              type="checkbox"
              checked={tripleModalityRequired}
              onChange={(e) => setTripleModalityRequired(e.target.checked)}
              className="w-5 h-5 rounded border-slate-700 bg-slate-900 text-cyan-500 focus:ring-cyan-500/40 cursor-pointer accent-[#00D4FF]"
            />
          </div>

          {/* Slider: Sensitivity Threshold */}
          <div className="py-2 border-t border-slate-800/80 space-y-2">
            <div className="flex items-center justify-between text-xs">
              <span className="font-medium text-slate-200">Biometric Match Sensitivity Threshold</span>
              <span className="font-mono font-bold text-cyan-400">{sensitivityThreshold}%</span>
            </div>
            <input
              type="range"
              min="80"
              max="99"
              value={sensitivityThreshold}
              onChange={(e) => setSensitivityThreshold(Number(e.target.value))}
              className="w-full h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-[#00D4FF]"
            />
            <div className="flex justify-between text-[10px] text-slate-500 font-mono">
              <span>80% (Permissive)</span>
              <span>90% (Standard)</span>
              <span>99% (High-Assurance Military)</span>
            </div>
          </div>
        </div>

        {/* Section 2: Anti-Spoofing & Session Controls */}
        <div className="p-6 rounded-3xl bg-[#111827] border border-slate-800 shadow-xl space-y-5">
          <div className="flex items-center gap-3 pb-3 border-b border-slate-800">
            <div className="p-2 rounded-xl bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
              <Lock className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-semibold text-white">Access Lockout & Threat Detection</h3>
              <p className="text-xs text-slate-400">
                Liveness verification guards and automatic station lockouts.
              </p>
            </div>
          </div>

          {/* Toggle: Strict Anti-Spoofing */}
          <div className="flex items-center justify-between py-2">
            <div>
              <label htmlFor="anti-spoof" className="text-sm font-medium text-slate-200 block cursor-pointer">
                Strict Infrared & Harmonic Anti-Spoofing
              </label>
              <p className="text-xs text-slate-400 mt-0.5">
                Rejects 2D printouts, screen replays, and deepfake synthetic voice injections.
              </p>
            </div>
            <input
              id="anti-spoof"
              type="checkbox"
              checked={antiSpoofStrict}
              onChange={(e) => setAntiSpoofStrict(e.target.checked)}
              className="w-5 h-5 rounded border-slate-700 bg-slate-900 text-cyan-500 focus:ring-cyan-500/40 cursor-pointer accent-[#00D4FF]"
            />
          </div>

          {/* Dropdown: Session Timeout */}
          <div className="flex items-center justify-between py-2 border-t border-slate-800/80">
            <div>
              <label htmlFor="session-timeout" className="text-sm font-medium text-slate-200 block">
                Session Inactivity Lockout
              </label>
              <p className="text-xs text-slate-400 mt-0.5">
                Automatically terminates active biometric session when station is idle.
              </p>
            </div>
            <select
              id="session-timeout"
              value={sessionTimeout}
              onChange={(e) => setSessionTimeout(e.target.value)}
              className="px-3 py-1.5 rounded-xl bg-slate-900 border border-slate-700 text-xs text-white focus:outline-none focus:border-cyan-500 cursor-pointer"
            >
              <option value="5">5 Minutes</option>
              <option value="15">15 Minutes</option>
              <option value="30">30 Minutes</option>
              <option value="60">1 Hour</option>
            </select>
          </div>

          {/* Notification Alerts */}
          <div className="flex items-center justify-between py-2 border-t border-slate-800/80">
            <div>
              <label htmlFor="alert-toggle" className="text-sm font-medium text-slate-200 block cursor-pointer">
                Security Threat Push Alerts
              </label>
              <p className="text-xs text-slate-400 mt-0.5">
                Sends high-priority dispatch alerts on repeated denied biometric attempts.
              </p>
            </div>
            <input
              id="alert-toggle"
              type="checkbox"
              checked={emailAlerts}
              onChange={(e) => setEmailAlerts(e.target.checked)}
              className="w-5 h-5 rounded border-slate-700 bg-slate-900 text-cyan-500 focus:ring-cyan-500/40 cursor-pointer accent-[#00D4FF]"
            />
          </div>
        </div>

        {/* Submit */}
        <div className="flex justify-end">
          <button
            type="submit"
            className="py-2.5 px-6 rounded-xl font-semibold text-xs text-[#0B0F19] bg-gradient-to-r from-[#00D4FF] via-cyan-400 to-[#00D4FF] hover:opacity-95 shadow-lg shadow-cyan-500/20 transition-all flex items-center gap-2 cursor-pointer"
          >
            <Save className="w-4 h-4" />
            <span>Save Security Policies</span>
          </button>
        </div>
      </form>
    </div>
  );
};
