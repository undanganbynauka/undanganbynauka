'use client';

import Link from 'next/link';
import Image from 'next/image';
import { NAUKA_COLORS } from '@/lib/design-tokens';

export default function Hero() {
  return (
    <section
      style={{
        position: 'relative',
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'space-between',
        textAlign: 'center',
        padding: '80px 24px 80px',
        background: NAUKA_COLORS.background,
        overflow: 'hidden',
      }}
    >
      {/* Decorative glow — kiri bawah */}
      <div
        aria-hidden
        style={{
          position: 'absolute',
          bottom: '-200px',
          left: '-200px',
          width: '500px',
          height: '500px',
          borderRadius: '50%',
          background: NAUKA_COLORS.accent,
          opacity: 0.1,
          filter: 'blur(120px)',
          pointerEvents: 'none',
          zIndex: 0,
        }}
      />

      {/* Decorative glow — kanan atas */}
      <div
        aria-hidden
        style={{
          position: 'absolute',
          top: '-200px',
          right: '-200px',
          width: '500px',
          height: '500px',
          borderRadius: '50%',
          background: NAUKA_COLORS.accent,
          opacity: 0.1,
          filter: 'blur(120px)',
          pointerEvents: 'none',
          zIndex: 0,
        }}
      />

      {/* Cluster atas: logo + headline */}
      <div
        style={{
          position: 'relative',
          zIndex: 1,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '20px',
          maxWidth: '480px',
          width: '100%',
          paddingTop: '40px',
        }}
      >
        <Image
          src="/nauka-logo.png"
          alt="Nauka"
          width={208}
          height={208}
          priority
          style={{
            width: '100%',
            height: 'auto',
            maxWidth: '130px',
            objectFit: 'contain',
            filter: 'brightness(0) invert(1)',
          }}
        />

        <h1
          style={{
            color: NAUKA_COLORS.primaryText,
            fontFamily: 'Georgia, "Times New Roman", serif',
            fontSize: 'clamp(26px, 5vw, 40px)',
            fontWeight: 400,
            margin: 0,
            lineHeight: 1.3,
            letterSpacing: '0.01em',
          }}
        >
          Langkah awal menuju momen bahagia
        </h1>
      </div>

      {/* Cluster bawah: subtext + tombol collection */}
      <div
        style={{
          position: 'relative',
          zIndex: 1,
          display: 'flex',
          flexDirection: 'column',
          gap: '14px',
          width: '100%',
          maxWidth: '320px',
          paddingBottom: '40px',
        }}
      >
        <p
          style={{
            color: NAUKA_COLORS.accent,
            fontSize: 'clamp(12px, 2vw, 13px)',
            letterSpacing: '0.2em',
            textTransform: 'uppercase',
            margin: '0 0 6px 0',
          }}
        >
          Pilih Jalur Anda
        </p>
        <HeroButton href="/#etalase-syari" label="Syar'i Collection" />
        <HeroButton href="/#etalase-universal" label="Universal Collection" />
      </div>
    </section>
  );
}

function HeroButton({ href, label }: { href: string; label: string }) {
  return (
    <Link
      href={href}
      style={{
        display: 'block',
        padding: '16px 32px',
        borderRadius: '999px',
        color: NAUKA_COLORS.primaryText,
        fontFamily: 'Georgia, "Times New Roman", serif',
        fontSize: '15px',
        fontWeight: 500,
        letterSpacing: '0.05em',
        textDecoration: 'none',
        background: 'rgba(201, 169, 110, 0.04)',
        border: '1px solid rgba(201, 169, 110, 0.35)',
        transition: 'all 0.3s ease',
        backdropFilter: 'blur(4px)',
        textAlign: 'center',
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.boxShadow = '0 0 24px rgba(201, 169, 110, 0.4)';
        e.currentTarget.style.borderColor = 'rgba(201, 169, 110, 0.8)';
        e.currentTarget.style.background = 'rgba(201, 169, 110, 0.08)';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.boxShadow = 'none';
        e.currentTarget.style.borderColor = 'rgba(201, 169, 110, 0.35)';
        e.currentTarget.style.background = 'rgba(201, 169, 110, 0.04)';
      }}
    >
      {label}
    </Link>
  );
}
