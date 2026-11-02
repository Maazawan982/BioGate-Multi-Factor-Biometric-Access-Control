import React, { useState } from 'react';
import {
  ScanFace,
  Camera,
  CheckCircle2,
  AlertCircle,
  RefreshCw,
  Shield,
  Eye,
  Sliders,
  Sparkles,
} from 'lucide-react';

export const FaceRecognitionPage: React.FC = () => {
  const [isEnrolling, setIsEnrolling] = useState(false);
  const [enrollmentComplete, setEnrollmentComplete] = useState(false);
  const [scanProgress, setScanProgress] = useState(0);

  const handleStartEnrollment = () => {
    setIsEnrolling(true);
    setScanProgress(0);

    const interval = setInterval(() => {
      setScanProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsEnrolling(false);
          setEnrollmentComplete(true);
          return 100;
        }
        return prev + 10;
      });
    }, 250);
  };

  const handleReset = () => {
    setEnrollmentComplete(false);
    setScanProgress(0);
    setIsEnrolling(false);
  };

  return (
    <div className="space-y-6 max-w-5xl mx-auto animate-in fade-in duration-300">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-800">
        <div>
          <div className="flex items-center gap-2 text-cyan-400 font-mono text-xs uppercase tracking-wider mb-1">
            <ScanFace className="w-4 h-4" />
            <span>Biometric Modality #1</span>
          </div>
          <h2 className="text-2xl font-bold tracking-tight text-white">Face Recognition Engine</h2>
          <p className="text-xs sm:text-sm text-slate-400 mt-1 max-w-2xl leading-relaxed">
            High-assurance 3D facial topological landmark mapping with active anti-spoofing depth analysis and micro-expression liveness detection.
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
            {enrollmentComplete ? 'Enrolled & Verified' : 'Not Enrolled'}
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Column: Camera Preview & Enrollment Action */}
        <div className="lg:col-span-7 bg-[#111827] border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-2xl relative overflow-hidden flex flex-col justify-between">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2.5">
              <div className="p-2 rounded-xl bg-cyan-500/10 border border-cyan-500/20 text-cyan-400">
                <Camera className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-sm font-semibold text-white">Optical Sensor Feed</h3>
                <p className="text-[11px] text-slate-400">RGB-Infrared Sensor 1080p</p>
              </div>
            </div>

            <div className="flex items-center gap-2 text-[11px] font-mono text-slate-400">
              <span className={`w-2 h-2 rounded-full ${isEnrolling ? 'bg-cyan-400 animate-ping' : 'bg-slate-600'}`} />
              <span>{isEnrolling ? 'Scanning Geometry...' : 'Camera Standby'}</span>
            </div>
          </div>

          {/* Placeholder Camera Preview Area with Biometric Mesh Guides */}
          <div className="relative aspect-video w-full rounded-2xl bg-[#090D16] border border-slate-800/90 overflow-hidden flex items-center justify-center shadow-inner group">
            {/* Grid overlay */}
            <div
              className="absolute inset-0 opacity-20 pointer-events-none"
              style={{
                backgroundImage: 'radial-gradient(circle at 1px 1px, #00D4FF 1px, transparent 0)',
                backgroundSize: '24px 24px',
              }}
            />

            {/* Simulated Scanning Laser Line */}
            {isEnrolling && (
              <div className="absolute inset-x-0 h-0.5 bg-gradient-to-r from-transparent via-[#00D4FF] to-transparent shadow-[0_0_15px_#00D4FF] animate-pulse transition-all duration-300 top-1/2" />
            )}

            {/* Oval Face Positioning Guide Reticle */}
            <div
              className={`relative w-48 h-60 rounded-[50%] border-2 transition-all duration-300 flex items-center justify-center ${
                enrollmentComplete
                  ? 'border-emerald-400/80 shadow-[0_0_30px_rgba(16,185,129,0.2)]'
                  : isEnrolling
                  ? 'border-cyan-400/80 shadow-[0_0_30px_rgba(0,212,255,0.3)] animate-pulse'
                  : 'border-slate-700 border-dashed'
              }`}
            >
              {/* Corner crosshairs */}
              <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-4 h-1 bg-cyan-400" />
              <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-4 h-1 bg-cyan-400" />
              <div className="absolute top-1/2 -left-2 -translate-y-1/2 w-1 h-4 bg-cyan-400" />
              <div className="absolute top-1/2 -right-2 -translate-y-1/2 w-1 h-4 bg-cyan-400" />

              {/* Center status message */}
              <div className="text-center p-4">
                {enrollmentComplete ? (
                  <div className="space-y-1 animate-in zoom-in duration-300">
                    <CheckCircle2 className="w-10 h-10 text-emerald-400 mx-auto" />
                    <span className="text-xs font-semibold text-emerald-300 block">3D Template Locked</span>
                    <span className="text-[10px] text-slate-400 font-mono">128-Point Vector Saved</span>
                  </div>
                ) : isEnrolling ? (
                  <div className="space-y-2">
                    <div className="w-10 h-10 border-2 border-cyan-400 border-t-transparent rounded-full animate-spin mx-auto" />
                    <span className="text-xs font-semibold text-cyan-300 block font-mono">
                      Extracting Landmarks: {scanProgress}%
                    </span>
                  </div>
                ) : (
                  <div className="space-y-1 text-slate-500">
                    <ScanFace className="w-10 h-10 mx-auto text-slate-600" />
                    <span className="text-xs font-medium text-slate-400 block">Position Face Within Oval</span>
                    <span className="text-[10px] text-slate-500">Ensure neutral lighting</span>
                  </div>
                )}
              </div>
            </div>

            {/* Bottom feed telemetry */}
            <div className="absolute bottom-2 left-3 right-3 flex items-center justify-between text-[10px] font-mono text-slate-500">
              <span>FPS: 30.0</span>
              <span>LIVENESS CHECK: PASSIVE</span>
              <span>FOV: 84°</span>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="mt-6 flex items-center gap-3">
            {!enrollmentComplete ? (
              <button
                type="button"
                onClick={handleStartEnrollment}
                disabled={isEnrolling}
                className="flex-1 py-3 px-4 rounded-xl font-semibold text-xs sm:text-sm text-[#0B0F19] bg-gradient-to-r from-[#00D4FF] via-cyan-400 to-[#00D4FF] hover:opacity-95 shadow-lg shadow-cyan-500/20 transition-all flex items-center justify-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed cursor-pointer"
              >
                {isEnrolling ? (
                  <>
                    <RefreshCw className="w-4 h-4 animate-spin text-slate-950" />
                    <span>Capturing 3D Geometry ({scanProgress}%)...</span>
                  </>
                ) : (
                  <>
                    <Camera className="w-4 h-4" />
                    <span>Enroll Face Profile</span>
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
                <span>Re-Enroll Face Template</span>
              </button>
            )}
          </div>
        </div>

        {/* Right Column: Verification & Technical Specs */}
        <div className="lg:col-span-5 space-y-5">
          {/* Status Details Card */}
          <div className="p-6 rounded-3xl bg-[#111827] border border-slate-800 shadow-xl space-y-4">
            <h3 className="text-sm font-semibold text-white flex items-center gap-2">
              <Shield className="w-4 h-4 text-cyan-400" />
              <span>Biometric Verification Status</span>
            </h3>

            <div className="space-y-3 text-xs">
              <div className="flex items-center justify-between p-3 rounded-xl bg-slate-900/80 border border-slate-800">
                <span className="text-slate-400">Template Status</span>
                <span className={`font-semibold ${enrollmentComplete ? 'text-emerald-400' : 'text-amber-400'}`}>
                  {enrollmentComplete ? 'Active in Vault' : 'Pending Enrollment'}
                </span>
              </div>

              <div className="flex items-center justify-between p-3 rounded-xl bg-slate-900/80 border border-slate-800 font-mono">
                <span className="text-slate-400">False Match Rate (FMR)</span>
                <span className="text-cyan-400 font-medium">&lt; 0.001%</span>
              </div>

              <div className="flex items-center justify-between p-3 rounded-xl bg-slate-900/80 border border-slate-800 font-mono">
                <span className="text-slate-400">False Non-Match Rate (FNMR)</span>
                <span className="text-cyan-400 font-medium">&lt; 0.12%</span>
              </div>

              <div className="flex items-center justify-between p-3 rounded-xl bg-slate-900/80 border border-slate-800 font-mono">
                <span className="text-slate-400">Anti-Spoofing Liveness</span>
                <span className="text-emerald-400 font-semibold">Active Depth IR</span>
              </div>
            </div>
          </div>

          {/* Enrollment Instructions Card */}
          <div className="p-6 rounded-3xl bg-[#111827] border border-slate-800 shadow-xl space-y-3 text-xs text-slate-400">
            <h4 className="font-semibold text-white flex items-center gap-2">
              <Eye className="w-4 h-4 text-indigo-400" />
              <span>Enrollment Best Practices</span>
            </h4>
            <ul className="list-disc pl-4 space-y-1.5 leading-relaxed text-[11px]">
              <li>Remove tinted sunglasses or obstructive headgear.</li>
              <li>Maintain direct eye contact with the center reticle.</li>
              <li>Hold position steadily until the 100% vector lock sound chimes.</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};
