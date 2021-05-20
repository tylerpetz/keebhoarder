module.exports = {
  presets: ['@vue/cli-plugin-babel/preset'],
  plugins: [
    ['istanbul', {
      exclude: [
        '**/*.spec.js'
      ]
    }]
  ],
  env: {
    test: {
      presets: [['env', { targets: { node: 'current' } }]]
    }
  }
}
