export const theme = {
  colors: {
    primary: '#5B0EA6',
    primaryDark: '#1a0050',
    primaryLight: '#7B2FBE',
    pageBg: 'linear-gradient(135deg, #2d0057 0%, #4a0082 30%, #6b0fa0 60%, #3d0070 100%)',
    cardBg: '#ffffff',
    waveStart: '#b8c8f0',
    waveEnd: '#d4e0f7',
    inputBorder: '#1a0050',
    inputText: '#1a0050',
    inputPlaceholder: '#9990b0',
    inputIcon: '#6b35a0',
    buttonBg: '#1a0050',
    buttonText: '#ffffff',
    muted: '#666666',
    error: '#c0392b',
    dashboard: {
      headerBg: '#5B35A0',
      sidebarBg: '#5B35A0',
      sidebarActiveItemBg: 'rgba(255, 255, 255, 0.18)',
      sidebarActiveText: '#4ade80',
      sidebarText: '#ffffff',
      contentBg: '#f4f5f7',
      statPurple: '#5B35A0',
      statGreen: '#22c55e',
      statBlue: '#3B82F6',
      statRed: '#EF5350',
    },
  },
  fontSizes: {
    sm: '0.85rem',
    md: '1rem',
    lg: '1.25rem',
    xl: '2rem',
  },
  spacing: {
    xs: '8px',
    sm: '12px',
    md: '16px',
    lg: '24px',
    xl: '32px',
    xxl: '48px',
  },
  borderRadius: {
    card: '8px',
    button: '4px',
  },
  shadows: {
    card: '0 20px 60px rgba(0, 0, 0, 0.3)',
  },
};

export type Theme = typeof theme;
