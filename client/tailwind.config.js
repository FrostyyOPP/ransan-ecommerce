/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        ink: '#0A0A0A',
        bone: '#F2EFE8',
        'bone-2': '#E8E4DA',
        acid: '#E8F249',
        bleed: '#D92D1F',
        forest: '#2F7D3E',
        muted: '#6B6B68',
      },
      fontFamily: {
        display: ['"Archivo Black"', 'Impact', 'sans-serif'],
        mono: ['"Space Mono"', 'ui-monospace', 'monospace'],
        body: ['Inter', 'system-ui', 'sans-serif'],
      },
      letterSpacing: {
        tightish: '-0.02em',
        wideish: '0.15em',
        wider2: '0.2em',
      },
    },
  },
  plugins: [],
};
