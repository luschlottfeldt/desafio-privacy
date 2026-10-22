export const theme = {
  colors: {
    background: '#f3f1f6',
    surface: '#ffffff',
    text: '#1d1a26',
    textMuted: '#6c6878',
    primary: '#4b1d6b',
    primaryHover: '#3a1554',
    primarySoft: '#efe7f6',
    border: '#e3dfea',
    danger: '#b3261e',
    overlay: 'rgba(29, 26, 38, 0.48)',
  },
  fonts: {
    body: "'Bricolage Grotesque', system-ui, -apple-system, 'Segoe UI', sans-serif",
  },
  radii: {
    sm: '8px',
    md: '14px',
    lg: '24px',
    full: '999px',
  },
  spacing: {
    xs: '4px',
    sm: '8px',
    md: '16px',
    lg: '24px',
    xl: '40px',
    xxl: '64px',
  },
  breakpoints: {
    tablet: '768px',
    desktop: '1024px',
  },
} as const;

export type AppTheme = typeof theme;
