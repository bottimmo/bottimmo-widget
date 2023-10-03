const defaultConfig = require('@wordpress/scripts/config/webpack.config.js')
const webpack = require('webpack')
const CopyPlugin = require('copy-webpack-plugin')

const { LP_ENVIRONMENT } = process.env

let jsIncFile
switch (LP_ENVIRONMENT) {
  case 'demo':
    jsIncFile = 'src/demo-settings.inc.js'
    break
  case 'leadturbo':
    jsIncFile = 'src/leadturbo-settings.inc.js'
    break
  default:
    jsIncFile = 'src/settings.inc.js'
}

module.exports = {
  ...defaultConfig,
  plugins: [
    ...defaultConfig.plugins,
    new webpack.EnvironmentPlugin({
      LP_DOMAIN: 'immowissen.org',
      LP_ENVIRONMENT: 'production' // 'production', 'demo', 'leadturbo'
    }),
    new CopyPlugin({
      patterns: [
        {
          from: 'assets/screenshot-*.png',
          to: ''
        },
        {
          from: 'assets/js/**/*.js',
          to: ''
        },
        {
          from: jsIncFile,
          to: 'assets/js/settings.inc.js'
        },
        {
          from: 'readme.txt'
        }
      ]
    })
  ]
}
