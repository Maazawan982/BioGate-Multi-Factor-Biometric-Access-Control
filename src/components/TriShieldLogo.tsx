import React from 'react';

interface TriShieldLogoProps {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
}

export const TriShieldLogo: React.FC<TriShieldLogoProps> = ({
  size = 'md',
  className = '',
}) => {
  const iconSizes = {
    sm: 'w-7 h-7',
    md: 'w-9 h-9',
    lg: 'w-11 h-11',
    xl: 'w-14 h-14',
  };

  const titleSizes = {
    sm: 'text-base',
    md: 'text-lg',
    lg: 'text-xl',
    xl: 'text-2xl',
  };

  return (
    <div className={`flex items-center gap-3 ${className}`}>
      {/* TriShield Geometric Security Shield Icon */}
      <div className={`relative ${iconSizes[size]} shrink-0 flex items-center justify-center`}>
        <div className="absolute inset-0 bg-gradient-to-tr from-cyan-500/30 to-indigo-500/30 blur-md rounded-xl" />
        <svg
          viewBox="0 0 48 48"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="relative w-full h-full drop-shadow-[0_2px_10px_rgba(0,212,255,0.35)]"
        >
          <path
            d="M24 3L40 9V22C40 32.5 33.2 41.8 24 45C14.8 41.8 8 32.5 8 22V9L24 3Z"
            className="fill-[#0B0F19] stroke-[#00D4FF]"
            strokeWidth="2"
            strokeLinejoin="round"
          />
          <path
            d="M24 8L35 12.5V21C35 28.5 30.5 35 24 38C17.5 35 13 28.5 13 21V12.5L24 8Z"
            fill="url(#shield-grad-clean)"
            opacity="0.3"
          />
          <circle cx="24" cy="18" r="2.5" fill="#00D4FF" />
          <circle cx="19" cy="27" r="2" fill="#6366F1" />
          <circle cx="29" cy="27" r="2" fill="#38BDF8" />
          <path
            d="M24 18L19 27M24 18L29 27M19 27L29 27"
            stroke="#00D4FF"
            strokeWidth="1.5"
            strokeLinecap="round"
          />
          <circle cx="24" cy="24" r="1.5" fill="#FFFFFF" />
          <defs>
            <linearGradient id="shield-grad-clean" x1="13" y1="8" x2="35" y2="38" gradientUnits="userSpaceOnUse">
              <stop stopColor="#00D4FF" stopOpacity="0.7" />
              <stop offset="1" stopColor="#6366F1" stopOpacity="0.3" />
            </linearGradient>
          </defs>
        </svg>
      </div>

      {/* Brand Title */}
      <span className={`font-bold tracking-tight text-white ${titleSizes[size]}`}>
        Tri<span className="text-[#00D4FF]">Shield</span>
      </span>
    </div>
  );
};
