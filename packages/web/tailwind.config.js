module.exports = {
  important: true,
  purge: {
    content: [
      './index.html',
      './App.vue',
      '@/components/**/*.vue',
      './main.js'
    ]
  },
  theme: {
    fontFamily: {
      body: ['Nunito', 'sans-serif']
    },
    extend: {
      spacing: {
        7: '1.75rem'
      },
      colors: {
        theme: {
          bg: 'var(--theme-bg)',
          'bg-alt': 'var(--theme-bg-alt)',
          text: 'var(--theme-text)',
          'text-alt': 'var(--theme-text-alt)',
          link: 'var(--theme-link)',
          'link-hover': 'var(--theme-link-hover)',
          border: 'var(--theme-border)',
          'border-hover': 'var(--theme-border-hover)'
        },
        alpha: {
          cap: 'var(--alpha-cap)',
          'cap-side': 'var(--alpha-cap-side)',
          'cap-hover': 'var(--alpha-cap-hover)',
          'cap-press': 'var(--alpha-cap-press)',
          legend: 'var(--alpha-legend)',
          'legend-hover': 'var(--alpha-legend-hover)',
          'legend-press': 'var(--alpha-legend-press)'
        },
        mod: {
          cap: 'var(--mod-cap)',
          'cap-side': 'var(--mod-cap-side)',
          'cap-hover': 'var(--mod-cap-hover)',
          'cap-press': 'var(--mod-cap-press)',
          legend: 'var(--mod-legend)',
          'legend-hover': 'var(--mod-legend-hover)',
          'legend-press': 'var(--mod-legend-press)'
        },
        accent: {
          cap: 'var(--accent-cap)',
          'cap-side': 'var(--accent-cap-side)',
          'cap-hover': 'var(--accent-cap-hover)',
          'cap-press': 'var(--accent-cap-press)',
          legend: 'var(--accent-legend)',
          'legend-hover': 'var(--accent-legend-hover)',
          'legend-press': 'var(--accent-legend-press)'
        }
      }
    },
    boxShadow: {
      default: '2px 2px 0 0 var(--alpha-cap)',
      hover: '2px 2px 0 0 var(--alpha-legend)',
      focus: '1px 1px 0 0 var(--alpha-legend)',
      active: '0px 0px 0 0 var(--alpha-cap)'
    }
  },
  variants: {
    backgroundColor: ['responsive', 'hover', 'focus', 'active'],
    textColor: ['responsive', 'hover', 'focus', 'active']
  }
}
