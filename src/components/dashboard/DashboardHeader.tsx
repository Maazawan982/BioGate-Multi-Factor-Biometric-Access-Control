import React from 'react';
import { Menu, ShieldCheck, Bell, User, Lock, Search } from 'lucide-react';
import { UserProfile } from '../../services/auth';
import { DashboardTab } from './Sidebar';

interface DashboardHeaderProps {
  currentTab: DashboardTab;
  onOpenMobileSidebar: () => void;
  currentUser: UserProfile | null;
  onNavigateTab: (tab: DashboardTab) => void;
  onSwitchToAuth: () => void;
}

export const DashboardHeader: React.FC<DashboardHeaderProps> = ({
  currentTab,
  onOpenMobileSidebar,
  currentUser,
  onNavigateTab,
  onSwitchToAuth,
}) => {
  const getTabTitle = (tab: DashboardTab) => {
    switch (tab) {
      case 'overview':
        return { category: 'Main', title: 'Dashboard Overview' };
      case 'activity':
        return { category: 'Main', title: 'Security Activity & Telemetry' };
      case 'face':
        return { category: 'Biometric Modality', title: 'Face Recognition' };
      case 'voice':
        return { category: 'Biometric Modality', title: 'Voice Recognition' };
      case 'fingerprint':
        return { category: 'Biometric Modality', title: 'Fingerprint Recognition' };
      case 'logs':
        return { category: 'Security & Management', title: 'Access Logs & Forensic Audit' };
      case 'security':
        return { category: 'Security & Management', title: 'Security & Policy Settings' };
      case 'profile':
        return { category: 'Security & Management', title: 'Profile & Account Settings' };
      case 'help':
        return { category: 'Support', title: 'Help & Documentation' };
      default:
        return { category: 'Dashboard', title: 'Overview' };
    }
  };

  const { category, title } = getTabTitle(currentTab);

  return (
    <header className="sticky top-0 z-20 w-full bg-[#0B0F19]/90 backdrop-blur-md border-b border-slate-800/80 px-4 sm:px-6 py-3.5 flex items-center justify-between gap-4">
      {/* Left zone: Mobile hamburger & Page Breadcrumb */}
      <div className="flex items-center gap-3">
        <button
          type="button"
          onClick={onOpenMobileSidebar}
          className="lg:hidden p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          aria-label="Open navigation menu"
        >
          <Menu className="w-5 h-5" />
        </button>

        <div className="flex flex-col">
          <div className="flex items-center gap-1.5 text-[11px] text-slate-400 font-medium">
            <span>TriShield</span>
            <span aria-hidden="true">/</span>
            <span>{category}</span>
          </div>
          <h1 className="text-base sm:text-lg font-bold text-white tracking-tight leading-tight">
            {title}
          </h1>
        </div>
      </div>

      {/* Right zone: Security Status, Search, User Avatar */}
      <div className="flex items-center gap-2 sm:gap-3 shrink-0">
        {/* Live System Status */}
        <div className="hidden sm:flex items-center gap-2 px-2.5 py-1 rounded-xl bg-cyan-950/40 border border-cyan-800/40 text-cyan-300 text-xs font-mono">
          <span className="w-2 h-2 rounded-full bg-[#00D4FF] inline-block animate-pulse" />
          <span>System Armed</span>
        </div>

        {/* Quick link to Auth Screens for reviewer convenience */}
        <button
          type="button"
          onClick={onSwitchToAuth}
          className="hidden md:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-900 border border-slate-700/80 hover:border-cyan-500/40 text-slate-300 hover:text-white text-xs font-medium transition-colors cursor-pointer"
        >
          <Lock className="w-3.5 h-3.5 text-cyan-400" />
          <span>Auth Portal</span>
        </button>

        {/* User Profile preview */}
        <button
          type="button"
          onClick={() => onNavigateTab('profile')}
          className="flex items-center gap-2.5 p-1 sm:px-2.5 sm:py-1 rounded-xl bg-slate-900/60 border border-slate-800 hover:border-slate-700 transition-colors cursor-pointer text-left"
        >
          {currentUser?.photoURL ? (
            <img
              src={currentUser.photoURL}
              alt={currentUser.displayName || 'User'}
              className="w-7 h-7 rounded-full border border-cyan-500/50 object-cover"
              referrerPolicy="no-referrer"
            />
          ) : (
            <div className="w-7 h-7 rounded-full bg-gradient-to-tr from-cyan-600 to-indigo-600 text-white font-bold text-xs flex items-center justify-center">
              {currentUser?.displayName ? currentUser.displayName[0].toUpperCase() : 'A'}
            </div>
          )}
          <div className="hidden md:flex flex-col">
            <span className="text-xs font-semibold text-slate-200 truncate max-w-[120px]">
              {currentUser?.displayName || 'Security Officer'}
            </span>
            <span className="text-[10px] text-cyan-400/90 font-mono">Clearance Level 3</span>
          </div>
        </button>
      </div>
    </header>
  );
};
