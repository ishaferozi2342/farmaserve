export const LightColors = {
  primary: '#6366f1',
  primaryDark: '#4f46e5',
  primaryLight: '#818cf8',
  secondary: '#f59e0b',
  background: '#ffffff',
  backgroundLight: '#f8fafc',
  backgroundDark: '#1e293b',
  text: '#1e293b',
  textLight: '#64748b',
  textWhite: '#ffffff',
  border: '#e2e8f0',
  success: '#10b981',
  error: '#ef4444',
  warning: '#f59e0b',
  info: '#3b82f6',
  card: '#ffffff',
  shadow: 'rgba(0, 0, 0, 0.1)',
  overlay: 'rgba(0, 0, 0, 0.5)',
  gradient1: '#6366f1',
  gradient2: '#8b5cf6',
  star: '#fbbf24',
};

export const DarkColors = {
  primary: '#818cf8',
  primaryDark: '#6366f1',
  primaryLight: '#a5b4fc',
  secondary: '#fbbf24',
  background: '#0f172a',
  backgroundLight: '#1e293b',
  backgroundDark: '#020617',
  text: '#f1f5f9',
  textLight: '#94a3b8',
  textWhite: '#ffffff',
  border: '#334155',
  success: '#34d399',
  error: '#f87171',
  warning: '#fbbf24',
  info: '#60a5fa',
  card: '#1e293b',
  shadow: 'rgba(0, 0, 0, 0.3)',
  overlay: 'rgba(0, 0, 0, 0.7)',
  gradient1: '#818cf8',
  gradient2: '#a78bfa',
  star: '#fbbf24',
};

// Default export for backward compatibility
export const Colors = LightColors;

export const getColors = (isDark: boolean) => isDark ? DarkColors : LightColors;

export const Gradients = {
  primary: ['#6366f1', '#8b5cf6'],
  secondary: ['#f59e0b', '#f97316'],
  hero: ['#6366f1', '#8b5cf6', '#a78bfa'],
  error: ['#ef4444', '#dc2626'],
};

export const DarkGradients = {
  primary: ['#818cf8', '#a78bfa'],
  secondary: ['#fbbf24', '#fb923c'],
  hero: ['#818cf8', '#a78bfa', '#c4b5fd'],
  error: ['#f87171', '#ef4444'],
};

export const getGradients = (isDark: boolean) => isDark ? DarkGradients : Gradients;