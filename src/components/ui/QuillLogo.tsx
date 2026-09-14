import React from 'react';

interface QuillLogoProps {
  className?: string;
  size?: number;
}

export const QuillLogo: React.FC<QuillLogoProps> = ({ className = '', size = 44 }) => {
  return (
    <div 
      className={`relative flex items-center justify-center flex-shrink-0 ${className}`}
      style={{ width: size, height: size }}
    >
      <svg
        width={size}
        height={size}
        viewBox="0 0 100 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full drop-shadow-md transition-transform duration-300 group-hover:scale-105"
      >
        <defs>
          {/* Main Gold Gradient for Feather Quill */}
          <linearGradient id="featherGoldGrad" x1="15%" y1="10%" x2="85%" y2="90%">
            <stop offset="0%" stopColor="#F5E4B3" />
            <stop offset="35%" stopColor="#D4B056" />
            <stop offset="70%" stopColor="#B08D57" />
            <stop offset="100%" stopColor="#7E5F28" />
          </linearGradient>

          {/* Secondary Shading Gradient for Depth */}
          <linearGradient id="featherShadeGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FAF0D7" stopOpacity="0.9" />
            <stop offset="60%" stopColor="#C59B27" stopOpacity="0.8" />
            <stop offset="100%" stopColor="#5E4314" stopOpacity="0.9" />
          </linearGradient>

          {/* Subtle Glow Filter */}
          <filter id="goldGlow" x="-20%" y="-20%" width="140%" height="140%">
            <feDropShadow dx="0" dy="1" stdDeviation="1.5" floodColor="#000" floodOpacity="0.4" />
          </filter>
        </defs>

        <g filter="url(#goldGlow)">
          {/* 1. Curved Base Swoop & Ink flourish */}
          <path
            d="M 18 84 C 28 88 44 85 54 78 C 44 80 32 80 24 76"
            stroke="url(#featherGoldGrad)"
            strokeWidth="2"
            strokeLinecap="round"
            fill="none"
            opacity="0.85"
          />

          {/* 2. Main Feather Spine / Shaft (Rachis & Nib) - Graceful S-Curve from bottom left to top right */}
          <path
            d="M 22 84 Q 38 68 56 46 T 84 14"
            stroke="url(#featherGoldGrad)"
            strokeWidth="3.2"
            strokeLinecap="round"
            fill="none"
          />

          {/* Refined Quill Nib Tip Point */}
          <path
            d="M 22 84 L 18 88"
            stroke="url(#featherGoldGrad)"
            strokeWidth="2"
            strokeLinecap="round"
          />

          {/* Nib Slit Detail */}
          <path
            d="M 22 84 L 27 79"
            stroke="#3E171B"
            strokeWidth="1.2"
            strokeLinecap="round"
          />

          {/* 3. Outer Left Feather Plume Vanes (Asymmetric, organic curved flow) */}
          <path
            d="M 84 14 
               C 74 18 64 16 54 22 
               C 58 26 66 26 72 23
               C 60 30 50 30 40 38
               C 44 42 54 41 61 37
               C 48 45 38 48 30 58
               C 34 62 42 60 48 56
               C 38 64 30 68 24 76
               C 30 72 38 66 46 58
               C 56 46 66 36 84 14 Z"
            fill="url(#featherGoldGrad)"
          />

          {/* 4. Inner Right Feather Plume Vanes (Softer, textured back edge) */}
          <path
            d="M 84 14 
               C 80 24 74 34 66 44 
               C 70 42 76 38 80 32
               C 72 44 64 52 56 60
               C 60 57 66 53 70 48
               C 60 58 52 66 44 72
               C 48 69 54 65 58 60
               C 50 67 40 73 34 78
               C 44 68 56 54 84 14 Z"
            fill="url(#featherShadeGrad)"
            opacity="0.88"
          />

          {/* 5. Delicate Vane Notches / Feather Texture Highlights */}
          <path
            d="M 76 22 L 68 28 M 66 32 L 56 40 M 54 44 L 44 52 M 42 56 L 34 64"
            stroke="#FAF0D7"
            strokeWidth="0.9"
            strokeLinecap="round"
            opacity="0.6"
          />
        </g>
      </svg>
    </div>
  );
};

