export const theme = {
  colors: {
    background: '#f6f4f1',
    surface: '#ffffff',
    text: '#1c1b1f',
    textMuted: '#6b6870',
    primary: '#e4572e',
    border: '#e7e3dd',
  },
  fonts: {
    body: "'Inter', system-ui, -apple-system, 'Segoe UI', Roboto, sans-serif",
  },
  radii: {
    md: '12px',
    lg: '20px',
  },
  spacing: {
    xs: '4px',
    sm: '8px',
    md: '16px',
    lg: '24px',
    xl: '40px',
  },
  breakpoints: {
    tablet: '768px',
    desktop: '1024px',
  },
} as const;

export type AppTheme = typeof theme;
