/**
 * NAUKA Mood Themes — 4 Atmospheres
 * Each mood controls: background gradient, typography colors, accent, particles, animation speed
 * Layout NEVER changes. Only atmosphere changes.
 */

export type MoodKey = "calm-morning" | "soft-evening" | "earth-serenity" | "warm-sand";

export interface MoodTheme {
  key: MoodKey;
  label: string;
  emoji: string;
  /** Background CSS gradient */
  bgGradient: string;
  /** Paper grain texture opacity */
  grainOpacity: number;
  /** Primary text color */
  textPrimary: string;
  /** Secondary text color */
  textSecondary: string;
  /** Tertiary/muted text color */
  textMuted: string;
  /** Accent color (UI highlights, links, active states) */
  accent: string;
  /** Accent color with alpha */
  accentAlpha: string;
  /** Card background */
  cardBg: string;
  /** Card border */
  cardBorder: string;
  /** Gold decorative color */
  gold: string;
  /** Particle type: "dust" | "firefly" | "leaf" | "sand" */
  particleType: string;
  /** Particle color */
  particleColor: string;
  /** Particle opacity range [min, max] */
  particleOpacity: [number, number];
  /** Animation speed multiplier (always slow) */
  animSpeed: number;
  /** Sound file path */
  soundFile: string;
  /** Sound description */
  soundDesc: string;
  /** Visual hint for mood card */
  visualHint: string;
  /** Lighting tone — a subtle overlay color */
  lightingTone: string;
}

export const MOOD_THEMES: Record<MoodKey, MoodTheme> = {
  "calm-morning": {
    key: "calm-morning",
    label: "Calm Morning",
    emoji: "🌿",
    bgGradient: "linear-gradient(180deg, #FAF7F2 0%, #F5F0E8 40%, #EDE6DA 100%)",
    grainOpacity: 0.025,
    textPrimary: "#3D3328",
    textSecondary: "#6F6F6F",
    textMuted: "#8A8A8A",
    accent: "#7D9B76",
    accentAlpha: "rgba(125, 155, 118, 0.12)",
    cardBg: "rgba(125, 110, 99, 0.04)",
    cardBorder: "rgba(125, 110, 99, 0.12)",
    gold: "#9AAF8E",
    particleType: "dust",
    particleColor: "rgba(154, 175, 142, 0.3)",
    particleOpacity: [0.15, 0.4],
    animSpeed: 1,
    soundFile: "/assets/sounds/calm-morning.mp3",
    soundDesc: "Birds + soft morning wind",
    visualHint: "Soft green glow, floating dust motes",
    lightingTone: "rgba(154, 175, 142, 0.03)",
  },
  "soft-evening": {
    key: "soft-evening",
    label: "Soft Evening",
    emoji: "🌙",
    bgGradient: "linear-gradient(180deg, #F0EDE8 0%, #E8E2DA 40%, #DDD5CB 100%)",
    grainOpacity: 0.03,
    textPrimary: "#2E2A26",
    textSecondary: "#5E5850",
    textMuted: "#8A8278",
    accent: "#A89070",
    accentAlpha: "rgba(168, 144, 112, 0.12)",
    cardBg: "rgba(110, 100, 88, 0.05)",
    cardBorder: "rgba(110, 100, 88, 0.15)",
    gold: "#C9B79C",
    particleType: "firefly",
    particleColor: "rgba(201, 183, 156, 0.5)",
    particleOpacity: [0.1, 0.6],
    animSpeed: 0.85,
    soundFile: "/assets/sounds/soft-evening.mp3",
    soundDesc: "Crickets + night breeze",
    visualHint: "Warm amber glow, floating firefly dots",
    lightingTone: "rgba(201, 183, 156, 0.04)",
  },
  "earth-serenity": {
    key: "earth-serenity",
    label: "Earth Serenity",
    emoji: "🌾",
    bgGradient: "linear-gradient(180deg, #F5F0E8 0%, #EDE5D8 40%, #E3D9CA 100%)",
    grainOpacity: 0.035,
    textPrimary: "#3A332B",
    textSecondary: "#6B5E54",
    textMuted: "#8E7E72",
    accent: "#8B7D5E",
    accentAlpha: "rgba(139, 125, 94, 0.12)",
    cardBg: "rgba(139, 125, 94, 0.04)",
    cardBorder: "rgba(139, 125, 94, 0.12)",
    gold: "#B89B6A",
    particleType: "leaf",
    particleColor: "rgba(184, 155, 106, 0.25)",
    particleOpacity: [0.12, 0.35],
    animSpeed: 0.9,
    soundFile: "/assets/sounds/earth-serenity.mp3",
    soundDesc: "Forest ambience + river sound",
    visualHint: "Warm earth tones, drifting leaf particles",
    lightingTone: "rgba(184, 155, 106, 0.03)",
  },
  "warm-sand": {
    key: "warm-sand",
    label: "Warm Sand",
    emoji: "🏜️",
    bgGradient: "linear-gradient(180deg, #F8F3EC 0%, #F0E8DD 40%, #E6DBCF 100%)",
    grainOpacity: 0.03,
    textPrimary: "#3D3328",
    textSecondary: "#6F6F6F",
    textMuted: "#8A8A8A",
    accent: "#C4A06A",
    accentAlpha: "rgba(196, 160, 106, 0.12)",
    cardBg: "rgba(196, 160, 106, 0.04)",
    cardBorder: "rgba(196, 160, 106, 0.12)",
    gold: "#D4BC94",
    particleType: "sand",
    particleColor: "rgba(212, 188, 148, 0.3)",
    particleOpacity: [0.1, 0.35],
    animSpeed: 0.95,
    soundFile: "/assets/sounds/warm-sand.mp3",
    soundDesc: "Soft desert wind + open field breeze",
    visualHint: "Golden warmth, drifting sand particles",
    lightingTone: "rgba(212, 188, 148, 0.04)",
  },
};

export const MOOD_KEYS: MoodKey[] = ["calm-morning", "soft-evening", "earth-serenity", "warm-sand"];
