module.exports = {
  plugins: [
    'lodash',
    ...(process.env.NODE_ENV === 'test'
      ? []
      : [
          ['component', {
            libraryName: 'element-ui',
            styleLibraryName: 'theme-chalk'
          }],
          ['import', {
            libraryName: 'iview',
            libraryDirectory: 'src/components'
          }]
      ]
    )
  ],
  presets: [
    '@vue/app'
  ]
}
