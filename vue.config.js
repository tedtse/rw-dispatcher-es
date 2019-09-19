const path = require('path')

module.exports = {
  chainWebpack: config => {
    config.resolve.alias
      .set('rw-dispatcher-helper', path.resolve(__dirname, 'packages/rw-dispatcher-helper'))
      .set('element-ui-rw-dispatcher', path.resolve(__dirname, 'packages/element-ui-rw-dispatcher'))
      .set('iview-rw-dispatcher', path.resolve(__dirname, 'packages/iview-rw-dispatcher'))
    config.module
      .rule('md')
        .test(/\.md$/)
        .use('vue')
          .loader('vue-loader')
          .options({ preserveWhitespace: false })
        .end()
        .use('md')
          .loader(path.resolve(__dirname, './md-loader'))
    config.module
      .rule('less')
        .oneOf('vue-modules')
          .use('less-loader')
            .loader('less-loader')
            .tap(options => {
              options.javascriptEnabled = true
              return options
            })
            .end()
          .end()
        .oneOf('vue')
          .use('less-loader')
            .loader('less-loader')
            .tap(options => {
              options.javascriptEnabled = true
              return options
            })
            .end()
          .end()
        .oneOf('normal-modules')
          .use('less-loader')
            .loader('less-loader')
            .tap(options => {
              options.javascriptEnabled = true
              return options
            })
            .end()
          .end()
        .oneOf('normal')
          .use('less-loader')
            .loader('less-loader')
            .tap(options => {
              options.javascriptEnabled = true
              return options
            })
            .end()
          .end()
  }
}
