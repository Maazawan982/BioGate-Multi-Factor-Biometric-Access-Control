import React from 'react';
import {
  HelpCircle,
  BookOpen,
  Phone,
  ShieldAlert,
  ChevronDown,
  ExternalLink,
  MessageSquare,
} from 'lucide-react';

export const HelpSupportPage: React.FC = () => {
  const faqs = [
    {
      q: 'How does Adaptive Quality-Aware Fusion (AQF) function?',
      a: 'AQF dynamically evaluates the signal-to-noise ratio of each biometric sensor (e.g. ambient lighting for facial capture or background acoustic noise for voice) and reweights the modal match score to maintain a mathematically zero-compromise access decision.',
    },
    {
      q: 'Are raw biometric photos or voice recordings saved on servers?',
      a: 'Never. TriShield operates exclusively on irreversible mathematical minutiae and deep topological embeddings. Raw physical waveforms or images are instantly discarded after vector quantization.',
    },
    {
      q: 'What should I do if a biometric modality fails verification?',
      a: 'TriShield requires multi-factor clearance. If one sensor fails due to environmental interference, secondary and tertiary modalities (such as voice and fingerprint) allow authenticated clearance provided your overall AQF confidence score passes threshold.',
    },
    {
      q: 'How do I request emergency physical terminal override?',
      a: 'Contact the designated Chief Security Officer or Security Operations Desk directly with your physical cryptographic badge token.',
    },
  ];

  return (
    <div className="space-y-6 max-w-4xl mx-auto animate-in fade-in duration-300">
      {/* Header */}
      <div className="pb-4 border-b border-slate-800">
        <div className="flex items-center gap-2 text-cyan-400 font-mono text-xs uppercase tracking-wider mb-1">
          <HelpCircle className="w-4 h-4" />
          <span>Support Desk</span>
        </div>
        <h2 className="text-2xl font-bold tracking-tight text-white">Help & Security Documentation</h2>
        <p className="text-xs sm:text-sm text-slate-400 mt-1 max-w-2xl leading-relaxed">
          Operational guidelines, hardware sensor specifications, and troubleshooting protocols for TriShield Gateways.
        </p>
      </div>

      {/* Quick Action Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="p-5 rounded-2xl bg-[#111827] border border-slate-800 space-y-2">
          <div className="w-9 h-9 rounded-xl bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 flex items-center justify-center">
            <BookOpen className="w-5 h-5" />
          </div>
          <h3 className="text-sm font-semibold text-white">Sensor Calibration Guide</h3>
          <p className="text-xs text-slate-400">Step-by-step instructions for 500 DPI optical and IR sensor tuning.</p>
        </div>

        <div className="p-5 rounded-2xl bg-[#111827] border border-slate-800 space-y-2">
          <div className="w-9 h-9 rounded-xl bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 flex items-center justify-center">
            <Phone className="w-5 h-5" />
          </div>
          <h3 className="text-sm font-semibold text-white">Security Operations Desk</h3>
          <p className="text-xs text-slate-400">Internal extension: +1 (800) 555-SHIELD (24/7 Monitoring).</p>
        </div>

        <div className="p-5 rounded-2xl bg-[#111827] border border-slate-800 space-y-2">
          <div className="w-9 h-9 rounded-xl bg-rose-500/10 border border-rose-500/20 text-rose-400 flex items-center justify-center">
            <ShieldAlert className="w-5 h-5" />
          </div>
          <h3 className="text-sm font-semibold text-white">Emergency Revocation</h3>
          <p className="text-xs text-slate-400">Immediate master token invalidation protocol for lost credentials.</p>
        </div>
      </div>

      {/* FAQ Section */}
      <div className="p-6 rounded-3xl bg-[#111827] border border-slate-800 shadow-xl space-y-4">
        <h3 className="text-base font-bold text-white tracking-tight">Frequently Asked Questions</h3>
        <div className="space-y-3">
          {faqs.map((faq, idx) => (
            <div key={idx} className="p-4 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-1.5">
              <h4 className="text-xs sm:text-sm font-semibold text-cyan-300">{faq.q}</h4>
              <p className="text-xs text-slate-400 leading-relaxed">{faq.a}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
