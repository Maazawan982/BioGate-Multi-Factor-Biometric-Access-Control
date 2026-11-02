import React, { useMemo } from 'react';
import { Check, X } from 'lucide-react';

interface PasswordStrengthMeterProps {
  password: string;
}

export interface PasswordCriteria {
  label: string;
  met: boolean;
}

export const PasswordStrengthMeter: React.FC<PasswordStrengthMeterProps> = ({ password }) => {
  const criteria = useMemo<PasswordCriteria[]>(() => {
    return [
      { label: 'At least 8 characters', met: password.length >= 8 },
      { label: 'One uppercase letter (A-Z)', met: /[A-Z]/.test(password) },
      { label: 'One lowercase letter (a-z)', met: /[a-z]/.test(password) },
      { label: 'One numeric digit (0-9)', met: /[0-9]/.test(password) },
      { label: 'One symbol (!@#$%^&*)', met: /[^A-Za-z0-9]/.test(password) },
    ];
  }, [password]);

  const score = useMemo(() => {
    if (!password) return 0;
    return criteria.filter((c) => c.met).length;
  }, [criteria, password]);

  const strengthInfo = useMemo(() => {
    if (score === 0) return { label: 'Empty', color: 'text-slate-500', barColor: 'bg-slate-700', activeBars: 0 };
    if (score <= 2) return { label: 'Weak', color: 'text-rose-400', barColor: 'bg-rose-500', activeBars: 1 };
    if (score === 3) return { label: 'Fair', color: 'text-amber-400', barColor: 'bg-amber-500', activeBars: 2 };
    if (score === 4) return { label: 'Good', color: 'text-cyan-400', barColor: 'bg-[#00D4FF]', activeBars: 3 };
    return { label: 'Strong', color: 'text-emerald-400', barColor: 'bg-emerald-400', activeBars: 4 };
  }, [score]);

  if (!password) return null;

  return (
    <div className="mt-2 space-y-2.5">
      {/* Strength Bar & Label */}
      <div className="flex items-center justify-between text-xs">
        <span className="text-slate-400 font-medium">Password Strength</span>
        <span className={`font-semibold tracking-wide ${strengthInfo.color}`}>
          {strengthInfo.label}
        </span>
      </div>

      {/* 4 Segment Progress Bar */}
      <div className="grid grid-cols-4 gap-1.5 h-1.5">
        {[0, 1, 2, 3].map((index) => {
          const isActive = index < strengthInfo.activeBars;
          return (
            <div
              key={index}
              className={`rounded-full transition-all duration-300 ${
                isActive ? strengthInfo.barColor : 'bg-slate-800'
              }`}
            />
          );
        })}
      </div>

      {/* Criteria Checklist */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5 pt-1 text-[11px]">
        {criteria.map((item, idx) => (
          <div
            key={idx}
            className={`flex items-center gap-1.5 transition-colors duration-200 ${
              item.met ? 'text-slate-300' : 'text-slate-500'
            }`}
          >
            {item.met ? (
              <Check className="w-3.5 h-3.5 text-cyan-400 shrink-0" strokeWidth={2.5} />
            ) : (
              <X className="w-3.5 h-3.5 text-slate-600 shrink-0" />
            )}
            <span className={item.met ? 'font-medium' : ''}>{item.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
};
