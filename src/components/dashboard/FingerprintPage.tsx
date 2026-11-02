import React, { useState } from 'react';
import {
  Fingerprint,
  CheckCircle2,
  AlertCircle,
  RefreshCw,
  Shield,
  Layers,
  Sparkles,
  Zap,
} from 'lucide-react';

export const FingerprintPage: React.FC = () => {
  const [isScanning, setIsScanning] = useState(false);
  const [enrollmentComplete, setEnrollmentComplete] = useState(false);
  const [scanProgress, setScanProgress] = useState(0);

  const handleStartScan = () => {
    setIsScanning(true);
    setScanProgress(0);

    const interval = setInterval(() => {
      setScanProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsScanning(false);
          setEnrollmentComplete(true);
          return 100;
        }
        return prev + 12;
      });
    }, 200);
  };

  const handleReset = () => {
    setEnrollmentComplete(false);
    setScanProgress(0);
    setIsScanning(false);
  };

  return (
    <div className="space-y-6 max-w-5xl mx-auto animate-in fade-in duration-300">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-800">
        <div>
          <div className="flex items-center gap-2 text-sky-400 font-mono text-xs uppercase tracking-wider mb-1">
            <Fingerprint className="w-4 h-4" />
            <span>Biometric Modality #3</span>
          </div>
          <h2 className="text-2xl font-bold tracking-tight text-white">Fingerprint Recognition Engine</h2>
          <p className="text-xs sm:text-sm text-slate-400 mt-1 max-w-2xl leading-relaxed">
            High-resolution sub-dermal optical minutiae scanner extracting ridge endings, bifurcations, and skin impedance metrics.
          </p>
        </div>

        {/* Enrollment Status Pill */}
        <div className="flex items-center gap-2">
          <span className="text-xs text-slate-400">Enrollment Status:</span>
          <span
            className={`px-3 py-1 rounded-full text-xs font-mono font-semibold border ${
              enrollmentComplete
                ? 'bg-emerald-950/40 text-emerald-300 border-emerald-500/30'
                : 'bg-amber-950/40 text-amber-300 border-amber-500/30'
            }`}
          >
            {enrollmentComplete ? 'Minutiae Enrolled' : 'Not Enrolled'}
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Column: Optical Scanner Surface */}
        <div className="lg:col-span-7 bg-[#111827] border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-2xl relative overflow-hidden flex flex-col justify-between">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2.5">
              <div className="p-2 rounded-xl bg-sky-500/10 border border-sky-500/20 text-sky-400">
                <Fingerprint className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-sm font-semibold text-white">Sub-Dermal Optical Prism</h3>
                <p className="text-[11px] text-slate-400">500 DPI Active Capacitive Sensor</p>
              </div>
            </div>

            <div className="flex items-center gap-2 text-[11px] font-mono text-slate-400">
              <span className={`w-2 h-2 rounded-full ${isScanning ? 'bg-cyan-400 animate-ping' : 'bg-slate-600'}`} />
              <span>{isScanning ? `Extracting Minutiae (${scanProgress}%)...` : 'Scanner Ready'}</span>
            </div>
          </div>

          {/* Placeholder Scanner Glass Area */}
          <div className="relative h-64 w-full rounded-2xl bg-[#090D16] border border-slate-800 overflow-hidden flex flex-col items-center justify-center shadow-inner group">
            {/* Ambient Cyan Scanner Glow */}
            <div
              className={`absolute inset-0 bg-gradient-to-t from-cyan-500/10 via-transparent to-transparent transition-opacity duration-300 ${
                isScanning ? 'opacity-100' : 'opacity-20'
              }`}
            />

            {/* Scanning Laser Beam Line */}
            {isScanning && (
              <div className="absolute inset-x-0 h-1 bg-gradient-to-r from-transparent via-[#00D4FF] to-transparent shadow-[0_0_20px_#00D4FF] animate-pulse top-1/2" />
            )}

            {/* Fingerprint Visual Representation */}
            <div
              className={`relative w-28 h-36 rounded-3xl border-2 transition-all duration-300 flex items-center justify-center p-3 ${
                enrollmentComplete
                  ? 'border-emerald-500/80 bg-emerald-950/20 shadow-[0_0_35px_rgba(16,185,129,0.25)]'
                  : isScanning
                  ? 'border-cyan-400 bg-cyan-950/30 shadow-[0_0_35px_rgba(0,212,255,0.35)] animate-pulse'
                  : 'border-slate-700 bg-slate-900/40 hover:border-slate-600'
              }`}
            >
              <Fingerprint
                className={`w-20 h-20 transition-all duration-300 ${
                  enrollmentComplete
                    ? 'text-emerald-400'
                    : isScanning
                    ? 'text-[#00D4FF] scale-105'
                    : 'text-slate-600'
                }`}
                strokeWidth={1.5}
              />

              {enrollmentComplete && (
                <div className="absolute inset-0 flex items-center justify-center bg-black/40 backdrop-blur-[1px] rounded-3xl">
                  <CheckCircle2 className="w-10 h-10 text-emerald-400 drop-shadow-md" />
                </div>
              )}
            </div>

            {/* Instruction text */}
            <div className="mt-4 text-center">
              {enrollmentComplete ? (
                <span className="text-xs font-semibold text-emerald-400 font-mono block">
                  Fingerprint Minutiae Successfully Registered
                </span>
              ) : isScanning ? (
                <span className="text-xs font-semibold text-cyan-300 font-mono animate-pulse block">
                  Mapping Ridge Bifurcations: {scanProgress}%
                </span>
              ) : (
                <span className="text-xs text-slate-400 block">
                  Place right index finger flat on optical glass
                </span>
              )}
            </div>

            {/* Telemetry Footer */}
            <div className="absolute bottom-2 left-4 right-4 flex items-center justify-between text-[10px] font-mono text-slate-500">
              <span>RESOLUTION: 500 DPI</span>
              <span>PRESSURE: OPTIMAL</span>
              <span>TYPE: OPTICAL CAPACITIVE</span>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="mt-6 flex items-center gap-3">
            {!enrollmentComplete ? (
              <button
                type="button"
                onClick={handleStartScan}
                disabled={isScanning}
                className="flex-1 py-3 px-4 rounded-xl font-semibold text-xs sm:text-sm text-[#0B0F19] bg-gradient-to-r from-cyan-400 via-[#00D4FF] to-sky-400 hover:opacity-95 shadow-lg shadow-cyan-500/20 transition-all flex items-center justify-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed cursor-pointer"
              >
                {isScanning ? (
                  <>
                    <RefreshCw className="w-4 h-4 animate-spin text-slate-950" />
                    <span>Scanning Minutiae Points ({scanProgress}%)...</span>
                  </>
                ) : (
                  <>
                    <Fingerprint className="w-4 h-4 text-slate-950" />
                    <span>Enroll Fingerprint</span>
                  </>
                )}
              </button>
            ) : (
              <button
                type="button"
                onClick={handleReset}
                className="flex-1 py-3 px-4 rounded-xl font-semibold text-xs text-slate-300 bg-slate-900 border border-slate-700 hover:border-slate-600 hover:text-white transition-colors flex items-center justify-center gap-2 cursor-pointer"
              >
                <RefreshCw className="w-4 h-4 text-cyan-400" />
                <span>Re-Enroll Fingerprint</span>
              </button>
            )}
          </div>
        </div>

        {/* Right Column: Minutiae Specs & Guidelines */}
        <div className="lg:col-span-5 space-y-5">
          <div className="p-6 rounded-3xl bg-[#111827] border border-slate-800 shadow-xl space-y-4">
            <h3 className="text-sm font-semibold text-white flex items-center gap-2">
              <Shield className="w-4 h-4 text-sky-400" />
              <span>Fingerprint Scanner Metrics</span>
            </h3>

            <div className="space-y-3 text-xs">
              <div className="flex items-center justify-between p-3 rounded-xl bg-slate-900/80 border border-slate-800">
                <span className="text-slate-400">Minutiae Points Extracted</span>
                <span className={`font-semibold ${enrollmentComplete ? 'text-emerald-400' : 'text-amber-400'}`}>
                  {enrollmentComplete ? '78 Verified Points' : '0 Points'}
                </span>
              </div>

              <div className="flex items-center justify-between p-3 rounded-xl bg-slate-900/80 border border-slate-800 font-mono">
                <span className="text-slate-400">Optical Resolution</span>
                <span className="text-cyan-400 font-medium">500 DPI Standard</span>
              </div>

              <div className="flex items-center justify-between p-3 rounded-xl bg-slate-900/80 border border-slate-800 font-mono">
                <span className="text-slate-400">Sub-Dermal Pulse Sensor</span>
                <span className="text-emerald-400 font-semibold">Active & Live</span>
              </div>

              <div className="flex items-center justify-between p-3 rounded-xl bg-slate-900/80 border border-slate-800 font-mono">
                <span className="text-slate-400">Template Format</span>
                <span className="text-sky-400 font-medium">ANSI/NIST-ITL 1-2011</span>
              </div>
            </div>
          </div>

          <div className="p-6 rounded-3xl bg-[#111827] border border-slate-800 shadow-xl space-y-3 text-xs text-slate-400">
            <h4 className="font-semibold text-white flex items-center gap-2">
              <Layers className="w-4 h-4 text-cyan-400" />
              <span>Scanning Guidelines</span>
            </h4>
            <ul className="list-disc pl-4 space-y-1.5 leading-relaxed text-[11px]">
              <li>Ensure sensor surface and finger are dry and clean.</li>
              <li>Apply firm, even pressure directly centered on the prism.</li>
              <li>Do not slide or rotate finger during the laser pass.</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};
