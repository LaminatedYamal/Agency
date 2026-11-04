/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      colors: {
        bruto: {
          dark: '#080A0F',
          surface: '#0E121B',
          card: '#141A24',
          border: 'rgba(255, 255, 255, 0.08)',
          blue: '#453E9B',
          gold: '#E5A83B',
          amber: '#F5C842'
        },
        brand: {
          astro: '#FF5D01',
          astroviolet: '#BC52EE',
          wordpress: '#21759B',
          shopify: '#7AB55C',
          n8n: '#EA4B71',
          googleads: '#4285F4',
          meta: '#0467DF',
          linkedin: '#0A66C2',
          tiktok: '#FE2C55',
          reddit: '#FF4500'
        }
      },
      fontFamily: {
        mono: ['Space Mono', 'monospace'],
        display: ['Syne', 'sans-serif'],
        serif: ['Playfair Display', 'serif']
      },
      borderRadius: {
        none: '0',
        DEFAULT: '0',
        sm: '0',
        md: '0',
        lg: '0',
        xl: '0',
        '2xl': '0',
        '3xl': '0',
        full: '0'
      }
    }
  },
  plugins: []
};
