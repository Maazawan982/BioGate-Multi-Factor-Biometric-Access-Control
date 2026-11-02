import React, { useState } from 'react';
import {
  Mic,
  Volume2,
  CheckCircle2,
  AlertCircle,
  RefreshCw,
  Shield,
  Radio,
  AudioWaveform as WaveformIcon,
  Play,
  Square,
} from 'lucide-react';

export const VoiceRecognitionPage: React.FC = () => {
  const [isRecording, setIsRecording] = useState(false);
  const [enrollmentComplete, setEnrollmentComplete] = useState(false);
  const [recordSeconds, setRecordSeconds] = useState(0);

  const samplePassphrase = '"My sovereign voice is my biometric passport to TriShield"';

  const handleStartRecording = () => {
    setIsRecording(true);
    setRecordSeconds(0);

    const interval = setInterval(() => {
      setRecordSeconds((prev) => {
        if (prev >= 4) {
          clearInterval(interval);
          setIsRecording(false);
          setEnrollmentComplete(true);
          return 5;
        }
        return prev + 1;
      });
    }, 1000);
  };

  const handleReset = () => {
    setEnrollmentComplete(false);
    setRecordSeconds(0);
    setIsRecording(false);
  };

  return (
    <div className="space-y-6 max-w-5xl mx-auto animate-in fade-in duration-300">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-800">
        <div>
          <div className="flex items-center gap-2 text-indigo-400 font-mono text-xs uppercase tracking-wider mb-1">
            <Mic className="w-4 h-4" />
            <span>Biometric Modality #2</span>
          </div>
          <h2 className="text-2xl font-bold tracking-tight text-white">Voice Recognition Engine</h2>
          <p className="text-xs sm:text-sm text-slate-400 mt-1 max-w-2xl leading-relaxed">
            Acoustic spectrogram frequency analysis capturing vocal tract resonance, pitch cadence, and anti-replay harmonic distortion.
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
            {enrollmentComplete ? 'Voiceprint Enrolled' : 'Not Enrolled'}
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Column: Audio Recording Studio & Visualizer */}
        <div className="lg:col-span-7 bg-[#111827] border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-2xl relative overflow-hidden flex flex-col justify-between">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2.5">
              <div className="p-2 rounded-xl bg-indigo-500/10 border border-indigo-500/20 text-indigo-400">
                <Mic className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-sm font-semibold text-white">Acoustic Sensor Feed</h3>
                <p className="text-[11px] text-slate-400">Studio Condenser Array · 48 kHz / 24-bit</p>
              </div>
            </div>

            <div className="flex items-center gap-2 text-[11px] font-mono text-slate-400">
              <span className={`w-2 h-2 rounded-full ${isRecording ? 'bg-indigo-400 animate-ping' : 'bg-slate-600'}`} />
              <span>{isRecording ? `Recording (${recordSeconds}s / 5s)...` : 'Audio Standby'}</span>
            </div>
          </div>

          {/* Passphrase Prompt Box */}
          <div className="mb-4 p-4 rounded-2xl bg-slate-900/90 border border-slate-800 text-center">
            <span className="text-[10px] uppercase font-mono tracking-wider text-slate-400 block mb-1">
              Read Verification Passphrase Aloud
            </span>
            <p className="text-sm sm:text-base font-semibold text-white tracking-wide">
              {samplePassphrase}
            </p>
          </div>

          {/* Simulated Audio Waveform Visualizer Area */}
          <div className="relative h-44 w-full rounded-2xl bg-[#090D16] border border-slate-800 overflow-hidden flex flex-col items-center justify-center shadow-inner p-4">
            {/* Visualizer Frequency Bars */}
            <div className="flex items-center justify-center gap-1.5 w-full max-w-sm h-24">
              {[18, 35, 60, 42, 85, 96, 45, 78, 62, 90, 50, 70, 32, 64, 88, 40, 25, 55, 75, 48, 65, 30].map(
                (barHeight, idx) => {
                  const dynamicHeight = isRecording
                    ? Math.max(15, Math.min(95, barHeight + (Math.sin(idx + recordSeconds) * 35)))
                    : enrollmentComplete
                    ? 30
                    : 10;
                  return (
                    <div
                      key={idx}
                      className={`w-1.5 rounded-full transition-all duration-150 ${
                        isRecording
                          ? 'bg-gradient-to-t from-indigo-500 via-cyan-400 to-indigo-300 shadow-[0_0_8px_#6366F1]'
                          : enrollmentComplete
                          ? 'bg-emerald-500/60'
                          : 'bg-slate-700/60'
                      }`}
                      style={{ height: `${dynamicHeight}%` }}
                    />
                  );
                }
              )}
            </div>

            {/* Central status notification */}
            <div className="mt-2 text-center text-xs font-mono">
              {enrollmentComplete ? (
                <span className="text-emerald-400 font-semibold flex items-center justify-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Acoustic Signature Staged & Encrypted</span>
                </span>
              ) : isRecording ? (
                <span className="text-cyan-300 font-medium animate-pulse">
                  Analyzing Harmonics & Vocal Cadence...
                </span>
              ) : (
                <span className="text-slate-500">Press record and speak into your microphone</span>
              )}
            </div>
          </div>

          {/* Action Button */}
          <div className="mt-6 flex items-center gap-3">
            {!enrollmentComplete ? (
              <button
                type="button"
                onClick={handleStartRecording}
                disabled={isRecording}
                className="flex-1 py-3 px-4 rounded-xl font-semibold text-xs sm:text-sm text-white bg-gradient-to-r from-indigo-500 via-cyan-500 to-indigo-600 hover:opacity-95 shadow-lg shadow-indigo-500/20 transition-all flex items-center justify-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed cursor-pointer"
              >
                {isRecording ? (
                  <>
                    <Square className="w-4 h-4 text-rose-300 animate-pulse fill-rose-300" />
                    <span>Listening... ({recordSeconds}s)</span>
                  </>
                ) : (
                  <>
                    <Mic className="w-4 h-4" />
                    <span>Record Voice Passphrase</span>
                  </>
                )}
              </button>
            ) : (
              <button
                type="button"
                onClick={handleReset}
                className="flex-1 py-3 px-4 rounded-xl font-semibold text-xs text-slate-300 bg-slate-900 border border-slate-700 hover:border-slate-600 hover:text-white transition-colors flex items-center justify-center gap-2 cursor-pointer"
              >
                <RefreshCw className="w-4 h-4 text-indigo-400" />
                <span>Re-Record Voiceprint</span>
              </button>
            )}
          </div>
        </div>

        {/* Right Column: Technical Verification Metrics */}
        <div className="lg:col-span-5 space-y-5">
          <div className="p-6 rounded-3xl bg-[#111827] border border-slate-800 shadow-xl space-y-4">
            <h3 className="text-sm font-semibold text-white flex items-center gap-2">
              <Shield className="w-4 h-4 text-indigo-400" />
              <span>Voiceprint Engine Parameters</span>
            </h3>

            <div className="space-y-3 text-xs">
              <div className="flex items-center justify-between p-3 rounded-xl bg-slate-900/80 border border-slate-800">
                <span className="text-slate-400">Voiceprint Vector</span>
                <span className={`font-semibold ${enrollmentComplete ? 'text-emerald-400' : 'text-amber-400'}`}>
                  {enrollmentComplete ? '128-D Embedded' : 'Uninitialized'}
                </span>
              </div>

              <div className="flex items-center justify-between p-3 rounded-xl bg-slate-900/80 border border-slate-800 font-mono">
                <span className="text-slate-400">Signal-to-Noise Ratio (SNR)</span>
                <span className="text-indigo-400 font-medium">32.4 dB (Optimal)</span>
              </div>

              <div className="flex items-center justify-between p-3 rounded-xl bg-slate-900/80 border border-slate-800 font-mono">
                <span className="text-slate-400">Anti-Spoofing Model</span>
                <span className="text-emerald-400 font-semibold">Synthetic Replay Guard</span>
              </div>

              <div className="flex items-center justify-between p-3 rounded-xl bg-slate-900/80 border border-slate-800 font-mono">
                <span className="text-slate-400">Sampling Rate</span>
                <span className="text-cyan-400 font-medium">48,000 Hz / Lossless</span>
              </div>
            </div>
          </div>

          <div className="p-6 rounded-3xl bg-[#111827] border border-slate-800 shadow-xl space-y-3 text-xs text-slate-400">
            <h4 className="font-semibold text-white flex items-center gap-2">
              <Volume2 className="w-4 h-4 text-cyan-400" />
              <span>Acoustic Guidelines</span>
            </h4>
            <ul className="list-disc pl-4 space-y-1.5 leading-relaxed text-[11px]">
              <li>Speak naturally at a steady volume without rushing.</li>
              <li>Avoid background ambient audio or echoes.</li>
              <li>Position microphone 15–20 cm from your mouth.</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};
