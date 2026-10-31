import React from 'react';

export const DecorativeOrbits: React.FC = () => {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
      {/* Upper-Right Large Orange 3D Sphere */}
      <div
        className="absolute w-[360px] h-[360px] sm:w-[400px] sm:h-[400px] rounded-full pointer-events-none"
        style={{
          top: '8%',
          right: '-2%',
          background: 'radial-gradient(circle at 38% 34%, #FFC170 0%, #FF9636 42%, #FF6810 85%, #E65000 100%)',
          boxShadow: '0 30px 90px rgba(255, 110, 20, 0.40), inset 0 2px 14px rgba(255, 255, 255, 0.55)',
          opacity: 0.95,
        }}
      />

      {/* Lower-Right Mustard Yellow 3D Sphere */}
      <div
        className="absolute w-[155px] h-[155px] sm:w-[175px] sm:h-[175px] rounded-full pointer-events-none"
        style={{
          bottom: '10%',
          right: '5%',
          background: 'radial-gradient(circle at 35% 32%, #FFF48A 0%, #FFD438 45%, #FFAF00 90%)',
          boxShadow: '0 20px 60px rgba(235, 160, 10, 0.35), inset 0 2px 10px rgba(255, 255, 255, 0.6)',
          opacity: 0.92,
        }}
      />

      {/* Lower-Left Cobalt Blue 3D Sphere */}
      <div
        className="absolute w-[150px] h-[150px] sm:w-[175px] sm:h-[175px] rounded-full pointer-events-none"
        style={{
          bottom: '22%',
          left: '37%',
          background: 'radial-gradient(circle at 36% 32%, #7CABFF 0%, #3B7BF7 44%, #184ED8 90%)',
          boxShadow: '0 25px 70px rgba(36, 99, 235, 0.45), inset 0 2px 12px rgba(255, 255, 255, 0.5)',
          filter: 'blur(3px)',
          opacity: 0.92,
        }}
      />

      {/* Lower-Left Concentric Translucent Orange Shapes */}
      <div
        className="absolute w-[440px] h-[440px] rounded-full border-[32px] border-[#FF9838]/20 pointer-events-none"
        style={{
          bottom: '-160px',
          left: '-160px',
        }}
      />
      <div
        className="absolute w-[320px] h-[320px] rounded-full bg-[#FFAA4C]/30 blur-2xl pointer-events-none"
        style={{
          bottom: '-80px',
          left: '-80px',
        }}
      />
      <div
        className="absolute w-[220px] h-[220px] rounded-full border-[18px] border-[#FF841C]/25 pointer-events-none"
        style={{
          bottom: '-20px',
          left: '-20px',
        }}
      />

      {/* SVG Thin Orbital Paths with Radiant Nodes */}
      <svg
        className="absolute inset-0 w-full h-full pointer-events-none"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 1671 941"
        preserveAspectRatio="none"
      >
        <defs>
          <linearGradient id="orbitGrad1" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FFA638" stopOpacity="0.4" />
            <stop offset="50%" stopColor="#FFC83B" stopOpacity="0.8" />
            <stop offset="100%" stopColor="#FF8B1F" stopOpacity="0.5" />
          </linearGradient>
          <linearGradient id="orbitGrad2" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FFC33B" stopOpacity="0.6" />
            <stop offset="100%" stopColor="#FF7710" stopOpacity="0.4" />
          </linearGradient>
        </defs>

        {/* Top-Right sweeping orbital arc */}
        <path
          d="M 1020,40 C 1140,80 1280,180 1360,260"
          fill="none"
          stroke="url(#orbitGrad1)"
          strokeWidth="1.5"
          strokeDasharray="4 6"
        />

        {/* Central crossing orbital sweep */}
        <path
          d="M 640,320 C 850,220 1150,150 1440,240"
          fill="none"
          stroke="#F5A824"
          strokeWidth="1.2"
          strokeDasharray="3 5"
          opacity="0.6"
        />

        {/* Bottom sweep passing under preview card */}
        <path
          d="M 720,780 C 950,830 1180,750 1420,670"
          fill="none"
          stroke="url(#orbitGrad2)"
          strokeWidth="1.6"
          strokeDasharray="5 7"
        />

        {/* Outer curved halo line behind right sphere */}
        <path
          d="M 1520,600 C 1600,610 1660,630 1710,650"
          fill="none"
          stroke="#F47B20"
          strokeWidth="1.8"
          opacity="0.75"
        />

        {/* Orbital Nodes (Small glowing planets along paths) */}
        <circle cx="1200" cy="118" r="4.5" fill="#FFA52B" />
        <circle cx="1200" cy="118" r="7.5" fill="#FFA52B" opacity="0.25" />

        <circle cx="1130" cy="805" r="5" fill="#F5BD24" />
        <circle cx="1130" cy="805" r="9" fill="#F5BD24" opacity="0.3" />

        <circle cx="1490" cy="270" r="4" fill="#FF841C" />
      </svg>
    </div>
  );
};

