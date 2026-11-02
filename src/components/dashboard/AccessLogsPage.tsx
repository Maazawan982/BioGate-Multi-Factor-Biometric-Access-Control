import React, { useState } from 'react';
import {
  FileText,
  Search,
  Filter,
  Download,
  Calendar,
  CheckCircle2,
  AlertTriangle,
  Eye,
  ShieldCheck,
  RefreshCw,
} from 'lucide-react';

interface AccessLogsPageProps {
  onViewDetails: (entry: any) => void;
}

export const AccessLogsPage: React.FC<AccessLogsPageProps> = ({ onViewDetails }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<'All' | 'Granted' | 'Denied'>('All');
  const [methodFilter, setMethodFilter] = useState<string>('All');

  const logs = [
    {
      id: 'LOG-7729',
      user: 'Dr. Sarah Mitchell',
      email: 's.mitchell@trishield.org',
      role: 'Faculty Reviewer',
      method: 'Multi-Factor (Face + Fingerprint)',
      timestamp: '2026-11-01 10:42:15',
      terminal: 'Main Data Vault — Door A',
      ip: '192.168.1.104',
      status: 'Granted',
      score: '99.4%',
      auditHash: '0x8f2c...4e19',
    },
    {
      id: 'LOG-7728',
      user: 'Maaz Awan',
      email: 'maazawan2468@gmail.com',
      role: 'Project Lead',
      method: 'Face Recognition',
      timestamp: '2026-11-01 09:18:22',
      terminal: 'Research Lab Entrance',
      ip: '192.168.1.112',
      status: 'Granted',
      score: '98.8%',
      auditHash: '0x3a91...7b82',
    },
    {
      id: 'LOG-7727',
      user: 'Unknown Subject',
      email: 'unidentified_vector@scanner.03',
      role: 'Unregistered',
      method: 'Fingerprint Scanner',
      timestamp: '2026-11-01 08:55:04',
      terminal: 'Secure Server Room B',
      ip: '192.168.2.45',
      status: 'Denied',
      score: '41.2%',
      auditHash: '0x1d44...99a0',
    },
    {
      id: 'LOG-7726',
      user: 'Marcus Chen',
      email: 'm.chen@trishield.org',
      role: 'Security Engineer',
      method: 'Voice Recognition',
      timestamp: '2026-10-31 18:30:19',
      terminal: 'Executive Access Portal',
      ip: '192.168.1.108',
      status: 'Granted',
      score: '97.2%',
      auditHash: '0x5e22...8f31',
    },
    {
      id: 'LOG-7725',
      user: 'Elena Rostova',
      email: 'e.rostova@trishield.org',
      role: 'Database Admin',
      method: 'Multi-Factor (Voice + Face)',
      timestamp: '2026-10-31 16:14:45',
      terminal: 'Biometrics Archive',
      ip: '192.168.1.115',
      status: 'Granted',
      score: '99.1%',
      auditHash: '0x7c38...12d4',
    },
    {
      id: 'LOG-7724',
      user: 'External Contractor #12',
      email: 'guest.12@contractors.io',
      role: 'Contractor',
      method: 'Face Recognition',
      timestamp: '2026-10-31 14:02:11',
      terminal: 'Peripheral Gate 4',
      ip: '10.0.4.88',
      status: 'Denied',
      score: '62.0%',
      auditHash: '0x9b11...33ee',
    },
    {
      id: 'LOG-7723',
      user: 'Dr. Sarah Mitchell',
      email: 's.mitchell@trishield.org',
      role: 'Faculty Reviewer',
      method: 'Fingerprint Scanner',
      timestamp: '2026-10-31 11:20:00',
      terminal: 'Main Data Vault — Door B',
      ip: '192.168.1.104',
      status: 'Granted',
      score: '98.5%',
      auditHash: '0x2a77...55cb',
    },
  ];

  const filteredLogs = logs.filter((log) => {
    const matchesSearch =
      log.user.toLowerCase().includes(searchTerm.toLowerCase()) ||
      log.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      log.terminal.toLowerCase().includes(searchTerm.toLowerCase()) ||
      log.id.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus = statusFilter === 'All' || log.status === statusFilter;
    const matchesMethod =
      methodFilter === 'All' || log.method.toLowerCase().includes(methodFilter.toLowerCase());

    return matchesSearch && matchesStatus && matchesMethod;
  });

  return (
    <div className="space-y-6 max-w-6xl mx-auto animate-in fade-in duration-300">
      {/* Header & Export */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-800">
        <div>
          <div className="flex items-center gap-2 text-cyan-400 font-mono text-xs uppercase tracking-wider mb-1">
            <FileText className="w-4 h-4" />
            <span>Forensic Audit Trail</span>
          </div>
          <h2 className="text-2xl font-bold tracking-tight text-white">Access Logs</h2>
          <p className="text-xs sm:text-sm text-slate-400 mt-1 max-w-2xl leading-relaxed">
            Cryptographically immutable records of all physical and digital biometric access events.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => alert('Exporting audit logs as CSV report...')}
            className="px-3.5 py-2 rounded-xl bg-slate-900 border border-slate-700 hover:border-slate-600 text-xs font-semibold text-slate-200 hover:text-white transition-colors flex items-center gap-2 cursor-pointer"
          >
            <Download className="w-4 h-4 text-cyan-400" />
            <span>Export CSV Report</span>
          </button>
        </div>
      </div>

      {/* Filter & Search Bar */}
      <div className="p-4 rounded-2xl bg-[#111827] border border-slate-800 flex flex-col md:flex-row items-center justify-between gap-3 shadow-lg">
        {/* Search */}
        <div className="relative w-full md:w-80">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-500">
            <Search className="w-4 h-4" />
          </div>
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search by user, terminal, or log ID..."
            className="w-full pl-9 pr-4 py-2 rounded-xl bg-slate-900 border border-slate-700 text-white placeholder-slate-500 text-xs focus:outline-none focus:border-cyan-500"
          />
        </div>

        {/* Filters */}
        <div className="flex items-center gap-2 w-full md:w-auto overflow-x-auto">
          {/* Status filter buttons */}
          <div className="flex items-center p-1 rounded-xl bg-slate-900 border border-slate-800 shrink-0">
            {(['All', 'Granted', 'Denied'] as const).map((s) => (
              <button
                key={s}
                type="button"
                onClick={() => setStatusFilter(s)}
                className={`px-3 py-1 rounded-lg text-xs font-medium transition-colors cursor-pointer ${
                  statusFilter === s
                    ? 'bg-[#111827] text-cyan-300 shadow-sm border border-cyan-500/30'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                {s}
              </button>
            ))}
          </div>

          {/* Modality Filter Dropdown */}
          <select
            value={methodFilter}
            onChange={(e) => setMethodFilter(e.target.value)}
            className="px-3 py-1.5 rounded-xl bg-slate-900 border border-slate-800 text-xs text-slate-300 focus:outline-none focus:border-cyan-500 cursor-pointer shrink-0"
          >
            <option value="All">All Modalities</option>
            <option value="Face">Face Recognition</option>
            <option value="Voice">Voice Recognition</option>
            <option value="Fingerprint">Fingerprint</option>
            <option value="Multi-Factor">Multi-Factor (AQF)</option>
          </select>
        </div>
      </div>

      {/* Logs Table */}
      <div className="rounded-3xl bg-[#111827] border border-slate-800 shadow-2xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-[#0D1322] text-slate-400 uppercase font-mono text-[10px] tracking-wider border-b border-slate-800">
              <tr>
                <th className="py-3.5 px-6">Event ID</th>
                <th className="py-3.5 px-4">Subject</th>
                <th className="py-3.5 px-4">Modality</th>
                <th className="py-3.5 px-4">Terminal & IP</th>
                <th className="py-3.5 px-4">Timestamp</th>
                <th className="py-3.5 px-4">Match Score</th>
                <th className="py-3.5 px-4">Status</th>
                <th className="py-3.5 px-6 text-right">Details</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/80">
              {filteredLogs.length > 0 ? (
                filteredLogs.map((log) => (
                  <tr key={log.id} className="hover:bg-slate-900/50 transition-colors group">
                    <td className="py-3.5 px-6 font-mono font-semibold text-cyan-400">
                      {log.id}
                    </td>

                    <td className="py-3.5 px-4">
                      <div>
                        <div className="font-semibold text-white group-hover:text-cyan-300 transition-colors">
                          {log.user}
                        </div>
                        <div className="text-[11px] text-slate-500 font-mono">{log.email}</div>
                      </div>
                    </td>

                    <td className="py-3.5 px-4">
                      <span className="text-slate-300 font-medium">{log.method}</span>
                    </td>

                    <td className="py-3.5 px-4">
                      <div className="text-slate-200">{log.terminal}</div>
                      <div className="text-[10px] text-slate-500 font-mono">{log.ip}</div>
                    </td>

                    <td className="py-3.5 px-4 text-slate-400 font-mono text-[11px]">
                      {log.timestamp}
                    </td>

                    <td className="py-3.5 px-4 font-mono font-semibold text-slate-200">
                      {log.score}
                    </td>

                    <td className="py-3.5 px-4">
                      <span
                        className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-semibold border ${
                          log.status === 'Granted'
                            ? 'bg-emerald-950/40 text-emerald-300 border-emerald-500/30'
                            : 'bg-rose-950/40 text-rose-300 border-rose-500/30'
                        }`}
                      >
                        <span
                          className={`w-1.5 h-1.5 rounded-full ${
                            log.status === 'Granted' ? 'bg-emerald-400' : 'bg-rose-400'
                          }`}
                        />
                        <span>{log.status}</span>
                      </span>
                    </td>

                    <td className="py-3.5 px-6 text-right">
                      <button
                        type="button"
                        onClick={() => onViewDetails(log)}
                        className="p-1.5 rounded-lg text-slate-400 hover:text-cyan-300 hover:bg-slate-800 transition-colors cursor-pointer inline-flex items-center gap-1"
                        title="View raw entry"
                      >
                        <Eye className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={8} className="py-12 text-center text-slate-500 text-sm">
                    No access log entries match the selected filter criteria.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
