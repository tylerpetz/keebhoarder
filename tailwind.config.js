const { themes } = require('./utils/themes.js')
const themeNames = themes.map((theme) => `theme-${theme.id}`)

module.exports = {
  important: true,
  mode: 'jit',
  purge: {
    content: [
      './components/**/*.vue',
      './layouts/**/*.vue',
      './modals/**/*.vue',
      './pages/**/*.vue',
      './tables/**/*.vue',
    ],
    safelist: [
      ...themeNames,
      'scrollbar-thin',
      'scrollbar-track-accent-legend',
      'scrollbar-thumb-accent-cap',
      'hover:scrollbar-thumb-accent-cap-hover',
    ],
  },
  theme: {
    fontFamily: {
      body: ['Nunito', 'sans-serif'],
    },
    extend: {
      borderRadius: {
        sm: '0.175rem',
        lg: '1rem',
      },
      fontSize: {
        xs: '0.813rem',
      },
      colors: {
        theme: {
          bg: 'var(--theme-bg)',
          'bg-l': 'var(--theme-bg-light)',
          'bg-d': 'var(--theme-bg-dark)',
          text: 'var(--theme-text)',
          'text-l': 'var(--theme-text-light)',
          'text-d': 'var(--theme-text-dark)',
          'text-placeholder': 'var(--theme-text-transparent)',
          link: 'var(--theme-link)',
          'link-hover': 'var(--theme-link-hover)',
          'link-press': 'var(--theme-link-press)',
          border: 'var(--theme-border)',
          'border-hover': 'var(--theme-border-hover)',
        },
        alpha: {
          cap: 'var(--alpha-cap)',
          'cap-side': 'var(--alpha-cap-side)',
          'cap-hover': 'var(--alpha-cap-hover)',
          'cap-press': 'var(--alpha-cap-press)',
          legend: 'var(--alpha-legend)',
          'legend-hover': 'var(--alpha-legend-hover)',
          'legend-press': 'var(--alpha-legend-press)',
        },
        mod: {
          cap: 'var(--mod-cap)',
          'cap-side': 'var(--mod-cap-side)',
          'cap-hover': 'var(--mod-cap-hover)',
          'cap-press': 'var(--mod-cap-press)',
          legend: 'var(--mod-legend)',
          'legend-hover': 'var(--mod-legend-hover)',
          'legend-press': 'var(--mod-legend-press)',
        },
        accent: {
          cap: 'var(--accent-cap)',
          'cap-side': 'var(--accent-cap-side)',
          'cap-hover': 'var(--accent-cap-hover)',
          'cap-press': 'var(--accent-cap-press)',
          legend: 'var(--accent-legend)',
          'legend-hover': 'var(--accent-legend-hover)',
          'legend-press': 'var(--accent-legend-press)',
        },
      },
      spacing: {
        72: '18rem',
        80: '20rem',
        96: '24rem',
      },
    },
  },
  variants: {
    backgroundColor: ['responsive', 'hover', 'focus', 'active'],
    textColor: ['responsive', 'hover', 'focus', 'active'],
  },
  plugins: [require('tailwind-scrollbar')],
}
