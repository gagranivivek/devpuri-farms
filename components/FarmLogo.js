'use client';

export default function FarmLogo() {
  return (
    <svg
      width="60"
      height="60"
      viewBox="0 0 60 60"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="logo-svg"
    >
      {/* Define gradients */}
      <defs>
        <linearGradient id="leafGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#10B981" />
          <stop offset="100%" stopColor="#059669" />
        </linearGradient>
        <linearGradient id="sunGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#F59E0B" />
          <stop offset="100%" stopColor="#D97706" />
        </linearGradient>
      </defs>

      {/* Sun circle background */}
      <circle cx="45" cy="15" r="10" fill="url(#sunGradient)" opacity="0.9" />

      {/* Sun rays */}
      <line x1="45" y1="2" x2="45" y2="5" stroke="url(#sunGradient)" strokeWidth="1.5" strokeLinecap="round" opacity="0.7" />
      <line x1="55" y1="15" x2="52" y2="15" stroke="url(#sunGradient)" strokeWidth="1.5" strokeLinecap="round" opacity="0.7" />

      {/* Main leaf - center */}
      <path
        d="M 30 10 Q 35 15 35 25 Q 35 35 30 40 Q 25 35 25 25 Q 25 15 30 10 Z"
        fill="url(#leafGradient)"
        stroke="#059669"
        strokeWidth="0.5"
      />

      {/* Leaf vein - center */}
      <path
        d="M 30 10 Q 30 25 30 40"
        stroke="#0D9488"
        strokeWidth="1"
        opacity="0.6"
      />

      {/* Left leaf */}
      <path
        d="M 20 25 Q 18 28 17.5 34 Q 18 38 22 38 Q 24 35 24 31 Q 24 27 20 25 Z"
        fill="url(#leafGradient)"
        stroke="#059669"
        strokeWidth="0.5"
        opacity="0.85"
      />

      {/* Right leaf */}
      <path
        d="M 40 25 Q 42 28 42.5 34 Q 42 38 38 38 Q 36 35 36 31 Q 36 27 40 25 Z"
        fill="url(#leafGradient)"
        stroke="#059669"
        strokeWidth="0.5"
        opacity="0.85"
      />

      {/* Soil/earth base */}
      <ellipse cx="30" cy="48" rx="18" ry="6" fill="#8B7355" opacity="0.9" />
      <path
        d="M 12 48 Q 15 50 30 50 Q 45 50 48 48"
        stroke="#6B5344"
        strokeWidth="1"
        fill="none"
        opacity="0.6"
      />

      {/* Small roots */}
      <path d="M 28 48 Q 25 52 23 55" stroke="#6B5344" strokeWidth="1" opacity="0.5" strokeLinecap="round" />
      <path d="M 30 48 Q 30 52 30 55" stroke="#6B5344" strokeWidth="1" opacity="0.5" strokeLinecap="round" />
      <path d="M 32 48 Q 35 52 37 55" stroke="#6B5344" strokeWidth="1" opacity="0.5" strokeLinecap="round" />

      {/* Water droplet accent */}
      <path
        d="M 52 42 Q 52 40 54 38 Q 55 40 54 42 Z"
        fill="#06B6D4"
        opacity="0.7"
      />
    </svg>
  );
}
