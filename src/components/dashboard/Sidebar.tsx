import React from 'react';
import {
  LayoutDashboard,
  Activity,
  ScanFace,
  Mic,
  Fingerprint,
  FileText,
  ShieldCheck,
  User,
  HelpCircle,
  LogOut,
  ChevronLeft,
  ChevronRight,
  Shield,
  X,
  ExternalLink,
} from 'lucide-react';
import { TriShieldLogo } from '../TriShieldLogo';

export type DashboardTab =
  | 'overview'
  | 'activity'
  | 'face'
  | 'voice'
  | 'fingerprint'
  | 'logs'
  | 'security'
  | 'profile'
  | 'help';

interface SidebarProps {
  currentTab: DashboardTab;
  onSelectTab: (tab: DashboardTab) => void;
  isCollapsed: boolean;
  onToggleCollapse: () => void;
  isMobileOpen: boolean;
  onCloseMobile: () => void;
  onLogout: () => void;
  onSwitchToAuth: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  currentTab,
  onSelectTab,
  isCollapsed,
  onToggleCollapse,
  isMobileOpen,
  onCloseMobile,
  onLogout,
  onSwitchToAuth,
}) => {
  const navSections = [
    {
      title: 'Main',
      items: [
        { id: 'overview' as DashboardTab, label: 'Dashboard', icon: LayoutDashboard },
        { id: 'activity' as DashboardTab, label: 'Overview', icon: Activity },
      ],
    },
    {
      title: 'Biometric Authentication',
      items: [
        { id: 'face' as DashboardTab, label: 'Face Recognition', icon: ScanFace },
        { id: 'voice' as DashboardTab, label: 'Voice Recognition', icon: Mic },
        { id: 'fingerprint' as DashboardTab, label: 'Fingerprint Recognition', icon: Fingerprint },
      ],
    },
    {
      title: 'Security & Management',
      items: [
        { id: 'logs' as DashboardTab, label: 'Access Logs', icon: FileText },
        { id: 'security' as DashboardTab, label: 'Security Settings', icon: ShieldCheck },
        { id: 'profile' as DashboardTab, label: 'Profile Settings', icon: User },
      ],
    },
    {
      title: 'Additional',
      items: [
        { id: 'help' as DashboardTab, label: 'Help & Support', icon: HelpCircle },
      ],
    },
  ];

  const handleItemClick = (tab: DashboardTab) => {
    onSelectTab(tab);
    onCloseMobile();
  };

  const sidebarContent = (
    <div className="flex flex-col h-full bg-[#0D1322] border-r border-slate-800/90 text-slate-300 select-none">
      {/* Brand Header */}
      <div className={`p-4 border-b border-slate-800/80 flex items-center justify-between ${isCollapsed ? 'justify-center px-2' : ''}`}>
        {!isCollapsed ? (
          <div className="flex items-center gap-3">
            <TriShieldLogo size="sm" />
            <div className="flex flex-col">
              <span className="text-[10px] uppercase font-bold tracking-wider text-cyan-400 font-mono">
                Security System
              </span>
            </div>
          </div>
        ) : (
          <div title="TriShield Security">
            <TriShieldLogo size="sm" />
          </div>
        )}

        {/* Desktop Collapse Toggle */}
        <button
          type="button"
          onClick={onToggleCollapse}
          className="hidden lg:flex p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer"
          title={isCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
        >
          {isCollapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
        </button>

        {/* Mobile Close Button */}
        <button
          type="button"
          onClick={onCloseMobile}
          className="lg:hidden p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      {/* Navigation Sections */}
      <div className="flex-1 overflow-y-auto p-3 space-y-6">
        {navSections.map((section) => (
          <div key={section.title} className="space-y-1">
            {!isCollapsed && (
              <h4 className="px-3 text-[10px] font-semibold tracking-wider text-slate-400 uppercase mb-2">
                {section.title}
              </h4>
            )}
            <div className="space-y-1">
              {section.items.map((item) => {
                const Icon = item.icon;
                const isActive = currentTab === item.id;
                return (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => handleItemClick(item.id)}
                    title={isCollapsed ? item.label : undefined}
                    className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-medium transition-all duration-200 cursor-pointer group ${
                      isActive
                        ? 'bg-gradient-to-r from-cyan-500/15 via-indigo-500/10 to-transparent text-cyan-300 border border-cyan-500/30 shadow-sm shadow-cyan-500/5'
                        : 'text-slate-400 hover:text-slate-100 hover:bg-slate-800/60'
                    } ${isCollapsed ? 'justify-center px-0' : ''}`}
                  >
                    <Icon
                      className={`w-4 h-4 shrink-0 transition-colors ${
                        isActive ? 'text-[#00D4FF]' : 'text-slate-400 group-hover:text-slate-200'
                      }`}
                    />
                    {!isCollapsed && (
                      <span className="truncate">{item.label}</span>
                    )}
                    {!isCollapsed && isActive && (
                      <span className="ml-auto w-1.5 h-1.5 rounded-full bg-[#00D4FF] shadow-[0_0_8px_#00D4FF]" />
                    )}
                  </button>
                );
              })}
            </div>
          </div>
        ))}
      </div>

      {/* Footer System Status & Actions */}
      <div className="p-3 border-t border-slate-800/80 space-y-1">
        {/* Quick Auth Screens Preview Link */}
        <button
          type="button"
          onClick={onSwitchToAuth}
          title={isCollapsed ? 'Preview Auth Screens' : undefined}
          className={`w-full flex items-center gap-3 px-3 py-2 rounded-xl text-xs font-medium text-slate-400 hover:text-cyan-300 hover:bg-slate-800/40 transition-colors cursor-pointer ${
            isCollapsed ? 'justify-center px-0' : ''
          }`}
        >
          <ExternalLink className="w-4 h-4 text-cyan-400/80 shrink-0" />
          {!isCollapsed && <span className="truncate">Auth Screens View</span>}
        </button>

        {/* Logout Button */}
        <button
          type="button"
          onClick={onLogout}
          title={isCollapsed ? 'Logout' : undefined}
          className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-semibold text-rose-300/90 hover:text-rose-200 hover:bg-rose-950/30 transition-colors cursor-pointer ${
            isCollapsed ? 'justify-center px-0' : ''
          }`}
        >
          <LogOut className="w-4 h-4 text-rose-400 shrink-0" />
          {!isCollapsed && <span>Logout</span>}
        </button>
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop Persistent Sidebar */}
      <aside
        className={`hidden lg:block shrink-0 transition-all duration-300 ease-in-out h-screen sticky top-0 ${
          isCollapsed ? 'w-20' : 'w-64'
        }`}
      >
        {sidebarContent}
      </aside>

      {/* Mobile Drawer Backdrop */}
      {isMobileOpen && (
        <div
          className="lg:hidden fixed inset-0 z-40 bg-black/70 backdrop-blur-sm transition-opacity"
          onClick={onCloseMobile}
        />
      )}

      {/* Mobile Drawer */}
      <div
        className={`lg:hidden fixed inset-y-0 left-0 z-50 w-72 max-w-[85vw] transform transition-transform duration-300 ease-in-out ${
          isMobileOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        {sidebarContent}
      </div>
    </>
  );
};
