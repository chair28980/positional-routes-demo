import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // Foundation colors
        foundation: {
          primary: '#0A0A0B',
          secondary: '#1A1A1D',
          surface: '#2D2D30',
        },
        // Position-specific semantic colors
        striking: {
          primary: '#E91E63',
          hover: '#F48FB1',
          active: '#AD1457',
        },
        takedown: {
          primary: '#D32F2F',
          hover: '#EF5350',
          active: '#B71C1C',
        },
        guard: {
          primary: '#6D4C41',
          hover: '#8D6E63',
          active: '#4E342E',
        },
        mount: {
          primary: '#2E7D32',
          hover: '#4CAF50',
          active: '#1B5E20',
        },
        sideMount: {
          primary: '#1976D2',
          hover: '#42A5F5',
          active: '#0D47A1',
        },
        turtle: {
          primary: '#F57C00',
          hover: '#FFB74D',
          active: '#E65100',
        },
        backMount: {
          primary: '#E64A19',
          hover: '#FF7043',
          active: '#BF360C',
        },
        leglock: {
          primary: '#7B1FA2',
          hover: '#AB47BC',
          active: '#4A148C',
        },
        rfc: {
          primary: '#0097A7',
          hover: '#26C6DA',
          active: '#006064',
        },
        // Flow connector colors
        connector: {
          primary: '#4A90E2',
          branch: '#4CAF50',
          secondary: '#9C27B0',
        },
      },
      fontFamily: {
        display: ['Bebas Neue', 'Arial Black', 'Helvetica Bold', 'sans-serif'],
        interface: ['Inter', 'SF Pro Display', 'Segoe UI', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'SF Mono', 'Monaco', 'monospace'],
      },
      fontSize: {
        hero: 'clamp(2rem, 4vw, 3.5rem)',
        'route-title': 'clamp(1.5rem, 3vw, 2.5rem)',
        'position-label': '0.875rem',
        metadata: '0.75rem',
      },
      spacing: {
        'node-gap': '32px',
        'route-gap': 'clamp(48px, 8vh, 80px)',
        'label-offset': '24px',
      },
      borderRadius: {
        'position': '22px',
      },
      boxShadow: {
        'position': '0 2px 8px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.1)',
        'position-hover': '0 4px 16px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.15)',
        'position-active': '0 1px 4px rgba(0,0,0,0.3)',
      },
      animation: {
        'flow': 'flow 2s linear infinite',
      },
      keyframes: {
        flow: {
          '0%': { strokeDashoffset: '10' },
          '100%': { strokeDashoffset: '0' },
        },
      },
    },
  },
  plugins: [],
}
export default config