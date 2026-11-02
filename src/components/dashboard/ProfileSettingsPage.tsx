import React, { useState } from 'react';
import {
  User,
  Mail,
  Lock,
  Eye,
  EyeOff,
  Shield,
  CheckCircle2,
  ScanFace,
  Mic,
  Fingerprint,
  Save,
  ArrowRight,
} from 'lucide-react';
import { UserProfile } from '../../services/auth';
import { DashboardTab } from './Sidebar';

interface ProfileSettingsPageProps {
  currentUser: UserProfile | null;
  onNavigateTab: (tab: DashboardTab) => void;
  onShowToast: (msg: string) => void;
}

export const ProfileSettingsPage: React.FC<ProfileSettingsPageProps> = ({
  currentUser,
  onNavigateTab,
  onShowToast,
}) => {
  const [fullName, setFullName] = useState(currentUser?.displayName || 'Maaz Awan');
  const [email, setEmail] = useState(currentUser?.email || 'maazawan2468@gmail.com');
  const [department, setDepartment] = useState('Cybersecurity Research Group');
  
  // Password change
  const [currentPass, setCurrentPass] = useState('');
  const [newPass, setNewPass] = useState('');
  const [confirmPass, setConfirmPass] = useState('');
  const [showPass, setShowPass] = useState(false);

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    onShowToast('Profile details updated successfully.');
  };

  const handleChangePassword = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newPass || newPass !== confirmPass) {
      onShowToast('Passwords do not match or are empty.');
      return;
    }
    setCurrentPass('');
    setNewPass('');
    setConfirmPass('');
    onShowToast('Master security passphrase updated successfully.');
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto animate-in fade-in duration-300">
      {/* Header */}
      <div className="pb-4 border-b border-slate-800">
        <div className="flex items-center gap-2 text-cyan-400 font-mono text-xs uppercase tracking-wider mb-1">
          <User className="w-4 h-4" />
          <span>Account Credentials</span>
        </div>
        <h2 className="text-2xl font-bold tracking-tight text-white">Profile & Account Settings</h2>
        <p className="text-xs sm:text-sm text-slate-400 mt-1 max-w-2xl leading-relaxed">
          Manage your personal identification vector, organizational credentials, and master passkey.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Column: Profile Information Form */}
        <div className="lg:col-span-7 space-y-6">
          {/* Identity Info Card */}
          <form onSubmit={handleSaveProfile} className="p-6 rounded-3xl bg-[#111827] border border-slate-800 shadow-xl space-y-4">
            <h3 className="text-sm font-semibold text-white flex items-center gap-2 pb-2 border-b border-slate-800">
              <User className="w-4 h-4 text-cyan-400" />
              <span>Identity Vector Details</span>
            </h3>

            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1">Full Name</label>
              <input
                type="text"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white text-xs focus:outline-none focus:border-cyan-500"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1">Email Address</label>
              <input
                type="email"
                value={email}
                disabled
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900/60 border border-slate-800 text-slate-400 text-xs font-mono cursor-not-allowed"
              />
              <span className="text-[10px] text-slate-500 mt-1 block">
                Email address is anchored to your primary authentication provider.
              </span>
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1">Department / Organization</label>
              <input
                type="text"
                value={department}
                onChange={(e) => setDepartment(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white text-xs focus:outline-none focus:border-cyan-500"
              />
            </div>

            <div className="pt-2 flex justify-end">
              <button
                type="submit"
                className="py-2 px-5 rounded-xl text-xs font-semibold text-[#0B0F19] bg-[#00D4FF] hover:bg-cyan-300 transition-colors flex items-center gap-1.5 cursor-pointer shadow-sm"
              >
                <Save className="w-3.5 h-3.5" />
                <span>Save Profile</span>
              </button>
            </div>
          </form>

          {/* Master Password Change Card */}
          <form onSubmit={handleChangePassword} className="p-6 rounded-3xl bg-[#111827] border border-slate-800 shadow-xl space-y-4">
            <h3 className="text-sm font-semibold text-white flex items-center gap-2 pb-2 border-b border-slate-800">
              <Lock className="w-4 h-4 text-indigo-400" />
              <span>Change Master Passphrase</span>
            </h3>

            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1">Current Passphrase</label>
              <input
                type={showPass ? 'text' : 'password'}
                value={currentPass}
                onChange={(e) => setCurrentPass(e.target.value)}
                placeholder="••••••••••••"
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white text-xs focus:outline-none focus:border-cyan-500"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1">New Passphrase</label>
              <input
                type={showPass ? 'text' : 'password'}
                value={newPass}
                onChange={(e) => setNewPass(e.target.value)}
                placeholder="••••••••••••"
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white text-xs focus:outline-none focus:border-cyan-500"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1">Confirm New Passphrase</label>
              <input
                type={showPass ? 'text' : 'password'}
                value={confirmPass}
                onChange={(e) => setConfirmPass(e.target.value)}
                placeholder="••••••••••••"
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white text-xs focus:outline-none focus:border-cyan-500"
              />
            </div>

            <div className="flex items-center justify-between pt-2">
              <button
                type="button"
                onClick={() => setShowPass(!showPass)}
                className="text-xs text-slate-400 hover:text-cyan-400 transition-colors flex items-center gap-1.5 cursor-pointer"
              >
                {showPass ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                <span>{showPass ? 'Hide characters' : 'Show characters'}</span>
              </button>

              <button
                type="submit"
                className="py-2 px-5 rounded-xl text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-500 transition-colors flex items-center gap-1.5 cursor-pointer shadow-sm"
              >
                <Save className="w-3.5 h-3.5" />
                <span>Update Passphrase</span>
              </button>
            </div>
          </form>
        </div>

        {/* Right Column: Active Biometrics Status */}
        <div className="lg:col-span-5 space-y-5">
          <div className="p-6 rounded-3xl bg-[#111827] border border-slate-800 shadow-xl space-y-4">
            <h3 className="text-sm font-semibold text-white flex items-center gap-2">
              <Shield className="w-4 h-4 text-cyan-400" />
              <span>Biometric Vault Credentials</span>
            </h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              TriShield enforces multi-factor modal verification. Check your enrollment below:
            </p>

            <div className="space-y-3 text-xs">
              {/* Face */}
              <div className="p-3 rounded-2xl bg-slate-900/80 border border-slate-800 flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <div className="p-2 rounded-xl bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
                    <ScanFace className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="font-semibold text-white">Face Template</div>
                    <div className="text-[10px] text-slate-500">3D Landmark Matrix</div>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => onNavigateTab('face')}
                  className="px-2.5 py-1 rounded-lg text-[11px] font-semibold text-cyan-400 bg-cyan-950/40 border border-cyan-800/40 hover:bg-cyan-900/40 transition-colors cursor-pointer"
                >
                  Manage
                </button>
              </div>

              {/* Voice */}
              <div className="p-3 rounded-2xl bg-slate-900/80 border border-slate-800 flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <div className="p-2 rounded-xl bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
                    <Mic className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="font-semibold text-white">Voiceprint Passkey</div>
                    <div className="text-[10px] text-slate-500">Acoustic Harmonics</div>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => onNavigateTab('voice')}
                  className="px-2.5 py-1 rounded-lg text-[11px] font-semibold text-indigo-300 bg-indigo-950/40 border border-indigo-800/40 hover:bg-indigo-900/40 transition-colors cursor-pointer"
                >
                  Manage
                </button>
              </div>

              {/* Fingerprint */}
              <div className="p-3 rounded-2xl bg-slate-900/80 border border-slate-800 flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <div className="p-2 rounded-xl bg-sky-500/10 text-sky-400 border border-sky-500/20">
                    <Fingerprint className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="font-semibold text-white">Fingerprint Minutiae</div>
                    <div className="text-[10px] text-slate-500">500 DPI Optical Hash</div>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => onNavigateTab('fingerprint')}
                  className="px-2.5 py-1 rounded-lg text-[11px] font-semibold text-sky-400 bg-sky-950/40 border border-sky-800/40 hover:bg-sky-900/40 transition-colors cursor-pointer"
                >
                  Manage
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
