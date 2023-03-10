module.exports = {
  all: true,
  extension: ['.js', '.vue'],
  exclude: ['**/*.{spec,test}.{js,ts}', '.nuxt/**/*'],
  include: [
    'pages/**/*.{vue,js,ts}',
    'layouts/**/*.{vue,js,ts}',
    'components/**/*.{vue,js,ts}',
    'modals/**/*.{vue,js}',
    'tables/**/*.{vue,js}',
    'store/**/*.js',
    'plugins/**/*.js',
    'utils/**/*.js',
  ],
}
