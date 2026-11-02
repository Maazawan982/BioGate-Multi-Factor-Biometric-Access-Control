import React, { useState } from 'react';
import {
  Users,
  CheckCircle2,
  AlertTriangle,
  Cpu,
  ScanFace,
  Mic,
  Fingerprint,
  ArrowRight,
  ShieldAlert,
  Clock,
  ChevronRight,
  Filter,
  Eye,
} from 'lucide-react';
import { UserProfile } from '../../services/auth';
import { DashboardTab } from './Sidebar';

interface DashboardOverviewProps {
  currentUser: UserProfile | null;
  onNavigateTab: (tab: DashboardTab) => void;
  onViewActivityDetails: (activity: any) => void;
}

export const DashboardOverview: React.FC<DashboardOverviewProps> = ({
  currentUser,
  onNavigateTab,
  onViewActivityDetails,
}) => {
  // Format current date
  const todayDate = new Intl.DateTimeFormat('en-US', {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  }).format(new Date());

  // Statistics Data
  const stats = [
    {
      title: 'Total Registered Users',
      value: '2,847',
      change: '+12.4%',
      trend: 'up',
      subtitle: 'Verified credentials in directory',
      icon: Users,
      color: 'from-cyan-500/20 to-blue-500/10',
      border: 'border-cyan-500/30',
      iconColor: 'text-[#00D4FF]',
    },
    {
      title: 'Successful Access Attempts',
      value: '18,492',
      change: '99.54%',
      trend: 'up',
      subtitle: 'Zero false-acceptance events',
      icon: CheckCircle2,
      color: 'from-emerald-500/20 to-teal-500/10',
      border: 'border-emerald-500/30',
      iconColor: 'text-emerald-400',
    },
    {
      title: 'Failed Access Attempts',
      value: '84',
      change: '-18.2%',
      trend: 'down',
      subtitle: 'Anomalies flagged & blocked',
      icon: AlertTriangle,
      color: 'from-rose-500/20 to-amber-500/10',
      border: 'border-rose-500/30',
      iconColor: 'text-rose-400',
    },
    {
      title: 'Active Biometric Modalities',
      value: '3 / 3',
      change: '100% Online',
      trend: 'neutral',
      subtitle: 'Face, Voice & Fingerprint engines',
      icon: Cpu,
      color: 'from-indigo-500/20 to-purple-500/10',
      border: 'border-indigo-500/30',
      iconColor: 'text-indigo-400',
    },
  ];

  // Biometric Enrollment Status Cards
  const biometricCards = [
    {
      id: 'face' as DashboardTab,
      title: 'Face Recognition',
      tech: '3D Geometric Mesh & Liveness',
      icon: ScanFace,
      status: 'Not Enrolled',
      statusColor: 'text-amber-400 bg-amber-950/40 border-amber-500/30',
      btnText: 'Enroll Face',
      desc: 'Infrared & RGB facial contour mapping with passive liveness detection.',
    },
    {
      id: 'voice' as DashboardTab,
      title: 'Voice Recognition',
      tech: 'Acoustic Voiceprint Spectrogram',
      icon: Mic,
      status: 'Not Enrolled',
      statusColor: 'text-amber-400 bg-amber-950/40 border-amber-500/30',
      btnText: 'Enroll Voice',
      desc: 'Dynamic voice frequency resonance analysis resistant to synthetic replay.',
    },
    {
      id: 'fingerprint' as DashboardTab,
      title: 'Fingerprint Recognition',
      tech: '500 DPI Sub-Dermal Minutiae',
      icon: Fingerprint,
      status: 'Not Enrolled',
      statusColor: 'text-amber-400 bg-amber-950/40 border-amber-500/30',
      btnText: 'Enroll Fingerprint',
      desc: 'Bifurcation and ridge frequency minutiae extraction with subdermal optical sensor.',
    },
  ];

  // Recent Access Activity Mock Data
  const recentActivities = [
    {
      id: 'ACT-9041',
      user: 'Dr. Sarah Mitchell',
      email: 's.mitchell@trishield.org',
      avatar: 'SM',
      method: 'Multi-Factor (Face + Fingerprint)',
      timestamp: 'Today, 10:42 AM',
      terminal: 'Main Data Vault — Door A',
      status: 'Granted',
      score: '99.4%',
      risk: 'Low',
    },
    {
      id: 'ACT-9040',
      user: 'Maaz Awan',
      email: 'maazawan2468@gmail.com',
      avatar: 'MA',
      method: 'Face Recognition',
      timestamp: 'Today, 09:18 AM',
      terminal: 'Research Lab Entrance',
      status: 'Granted',
      score: '98.8%',
      risk: 'Low',
    },
    {
      id: 'ACT-9039',
      user: 'Unknown Subject',
      email: 'unidentified_vector@scanner.03',
      avatar: '?',
      method: 'Fingerprint Scanner',
      timestamp: 'Today, 08:55 AM',
      terminal: 'Secure Server Room B',
      status: 'Denied',
      score: '41.2%',
      risk: 'High',
    },
    {
      id: 'ACT-9038',
      user: 'Marcus Chen',
      email: 'm.chen@trishield.org',
      avatar: 'MC',
      method: 'Voice Recognition',
      timestamp: 'Yesterday, 18:30 PM',
      terminal: 'Executive Access Portal',
      status: 'Granted',
      score: '97.2%',
      risk: 'Low',
    },
    {
      id: 'ACT-9037',
      user: 'Elena Rostova',
      email: 'e.rostova@trishield.org',
      avatar: 'ER',
      method: 'Multi-Factor (Voice + Face)',
      timestamp: 'Yesterday, 16:14 PM',
      terminal: 'Biometrics Archive',
      status: 'Granted',
      score: '99.1%',
      risk: 'Low',
    },
    {
      id: 'ACT-9036',
      user: 'External Contractor #12',
      email: 'guest.12@contractors.io',
      avatar: 'EC',
      method: 'Face Recognition',
      timestamp: 'Yesterday, 14:02 PM',
      terminal: 'Peripheral Gate 4',
      status: 'Denied',
      score: '62.0%',
      risk: 'Medium',
    },
  ];

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      {/* 1. Welcome Section */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-[#111827] via-[#0F172A] to-[#131B2E] border border-slate-800 p-6 sm:p-8 shadow-2xl">
        {/* Ambient Top Glow */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="flex items-center gap-4 sm:gap-5">
            {/* Avatar */}
            {currentUser?.photoURL ? (
              <img
                src={currentUser.photoURL}
                alt={currentUser.displayName || 'User'}
                className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl border-2 border-cyan-400 shadow-lg object-cover"
                referrerPolicy="no-referrer"
              />
            ) : (
              <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-gradient-to-tr from-cyan-600 via-indigo-600 to-cyan-400 text-white font-bold text-xl flex items-center justify-center shadow-lg border border-cyan-400/40">
                {currentUser?.displayName ? currentUser.displayName[0].toUpperCase() : 'O'}
              </div>
            )}

            <div>
              <div className="text-xs font-mono text-cyan-400 font-semibold tracking-wider uppercase mb-1">
                {todayDate}
              </div>
              <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-white">
                Welcome back, {currentUser?.displayName || 'Security Officer'}
              </h2>
              <p className="text-xs sm:text-sm text-slate-400 mt-1 max-w-xl leading-relaxed">
                TriShield Biometric Gateway is operating normally. All security telemetry channels and verification engines are standing by.
              </p>
            </div>
          </div>

          {/* Quick CTA */}
          <div className="flex items-center gap-3 shrink-0">
            <button
              type="button"
              onClick={() => onNavigateTab('face')}
              className="px-4 py-2.5 rounded-xl text-xs font-semibold text-[#0B0F19] bg-[#00D4FF] hover:bg-cyan-300 transition-colors shadow-lg shadow-cyan-500/20 flex items-center gap-2 cursor-pointer"
            >
              <span>Enroll Biometrics</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* 2. Statistics Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((item, idx) => {
          const Icon = item.icon;
          return (
            <div
              key={idx}
              className={`p-5 rounded-2xl bg-[#111827]/80 border ${item.border} shadow-lg relative overflow-hidden backdrop-blur-md transition-all duration-200 hover:-translate-y-0.5`}
            >
              <div className={`absolute top-0 right-0 w-24 h-24 bg-gradient-to-br ${item.color} rounded-bl-full pointer-events-none`} />

              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-medium text-slate-400">{item.title}</span>
                <div className={`p-2 rounded-xl bg-slate-900 border border-slate-800 ${item.iconColor}`}>
                  <Icon className="w-4 h-4" />
                </div>
              </div>

              <div className="flex items-baseline gap-2.5">
                <span className="text-2xl font-extrabold text-white font-mono tabular-nums tracking-tight">
                  {item.value}
                </span>
                <span
                  className={`text-xs font-semibold font-mono ${
                    item.trend === 'up'
                      ? 'text-emerald-400'
                      : item.trend === 'down'
                      ? 'text-cyan-400'
                      : 'text-slate-400'
                  }`}
                >
                  {item.change}
                </span>
              </div>
              <p className="text-[11px] text-slate-500 mt-1">{item.subtitle}</p>
            </div>
          );
        })}
      </div>

      {/* 3. Biometric Status Section (3 Dedicated Cards) */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-base sm:text-lg font-bold text-white tracking-tight">
              Biometric Modality Status
            </h3>
            <p className="text-xs text-slate-400 mt-0.5">
              Individual access control enrollment status for your security profile.
            </p>
          </div>
          <span className="text-xs font-mono text-cyan-400 bg-cyan-950/40 px-3 py-1 rounded-full border border-cyan-800/40">
            3 Modalities Required
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {biometricCards.map((card) => {
            const Icon = card.icon;
            return (
              <div
                key={card.id}
                className="p-6 rounded-2xl bg-[#111827] border border-slate-800/90 shadow-xl relative flex flex-col justify-between transition-all duration-300 hover:border-slate-700 group"
              >
                <div>
                  <div className="flex items-start justify-between mb-4">
                    <div className="w-12 h-12 rounded-2xl bg-slate-900 border border-slate-800 flex items-center justify-center text-cyan-400 shadow-md group-hover:scale-105 group-hover:border-cyan-500/40 transition-all">
                      <Icon className="w-6 h-6" />
                    </div>
                    <span className={`text-[11px] font-mono px-2.5 py-1 rounded-full border font-semibold ${card.statusColor}`}>
                      {card.status}
                    </span>
                  </div>

                  <h4 className="text-base font-bold text-white tracking-tight">{card.title}</h4>
                  <div className="text-xs text-cyan-400/90 font-mono mt-0.5">{card.tech}</div>
                  <p className="text-xs text-slate-400 mt-2.5 leading-relaxed">{card.desc}</p>
                </div>

                <div className="pt-5 mt-6 border-t border-slate-800/80">
                  <button
                    type="button"
                    onClick={() => onNavigateTab(card.id)}
                    className="w-full py-2.5 px-4 rounded-xl text-xs font-semibold text-slate-200 bg-slate-900 border border-slate-700 hover:border-cyan-500/50 hover:bg-slate-800 hover:text-white transition-all flex items-center justify-center gap-2 cursor-pointer group-hover:border-cyan-500/40"
                  >
                    <span>{card.btnText}</span>
                    <ArrowRight className="w-4 h-4 text-cyan-400" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* 4. Recent Access Activity Table */}
      <div className="rounded-3xl bg-[#111827] border border-slate-800 shadow-xl overflow-hidden">
        <div className="p-6 border-b border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h3 className="text-base sm:text-lg font-bold text-white tracking-tight">
              Recent Access Activity
            </h3>
            <p className="text-xs text-slate-400 mt-0.5">
              Live audit stream of all biometric entry requests across secure access terminals.
            </p>
          </div>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => onNavigateTab('logs')}
              className="px-3.5 py-1.5 rounded-xl bg-slate-900 border border-slate-700 text-xs font-medium text-slate-300 hover:text-white hover:border-slate-600 transition-colors flex items-center gap-2 cursor-pointer"
            >
              <span>View Full Access Logs</span>
              <ChevronRight className="w-3.5 h-3.5 text-cyan-400" />
            </button>
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-[#0D1322] text-slate-400 uppercase font-mono text-[10px] tracking-wider border-b border-slate-800">
              <tr>
                <th className="py-3.5 px-6">User / Identity</th>
                <th className="py-3.5 px-4">Authentication Method</th>
                <th className="py-3.5 px-4">Date & Time</th>
                <th className="py-3.5 px-4">Terminal</th>
                <th className="py-3.5 px-4">Status</th>
                <th className="py-3.5 px-6 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/80">
              {recentActivities.map((row) => (
                <tr key={row.id} className="hover:bg-slate-900/50 transition-colors group">
                  {/* User */}
                  <td className="py-3.5 px-6">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-xl bg-slate-800 border border-slate-700 text-cyan-300 font-bold text-xs flex items-center justify-center shrink-0">
                        {row.avatar}
                      </div>
                      <div>
                        <div className="font-semibold text-white group-hover:text-cyan-300 transition-colors">
                          {row.user}
                        </div>
                        <div className="text-[11px] text-slate-500 font-mono">{row.email}</div>
                      </div>
                    </div>
                  </td>

                  {/* Authentication Method */}
                  <td className="py-3.5 px-4">
                    <span className="font-medium text-slate-300">{row.method}</span>
                  </td>

                  {/* Date & Time */}
                  <td className="py-3.5 px-4 text-slate-400 font-mono text-[11px]">
                    {row.timestamp}
                  </td>

                  {/* Terminal */}
                  <td className="py-3.5 px-4 text-slate-300">
                    {row.terminal}
                  </td>

                  {/* Status */}
                  <td className="py-3.5 px-4">
                    <span
                      className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-semibold border ${
                        row.status === 'Granted'
                          ? 'bg-emerald-950/40 text-emerald-300 border-emerald-500/30'
                          : 'bg-rose-950/40 text-rose-300 border-rose-500/30'
                      }`}
                    >
                      <span
                        className={`w-1.5 h-1.5 rounded-full ${
                          row.status === 'Granted' ? 'bg-emerald-400' : 'bg-rose-400'
                        }`}
                      />
                      <span>{row.status}</span>
                    </span>
                  </td>

                  {/* Action */}
                  <td className="py-3.5 px-6 text-right">
                    <button
                      type="button"
                      onClick={() => onViewActivityDetails(row)}
                      className="p-1.5 rounded-lg text-slate-400 hover:text-cyan-300 hover:bg-slate-800 transition-colors cursor-pointer inline-flex items-center gap-1 text-xs"
                      title="Inspect log details"
                    >
                      <Eye className="w-4 h-4" />
                      <span className="hidden sm:inline">Details</span>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
