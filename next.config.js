/* eslint-disable @typescript-eslint/no-var-requires */
const withCSS = require('@zeit/next-css');
const MonacoWebpackPlugin = require('monaco-editor-webpack-plugin');

module.exports = withCSS({
  target: 'serverless',
  webpack(config) {
    config.module.rules.push({ test: /\.md$/, use: 'raw-loader' });

    config.module.rules.push({
      test: /\.(png|jpg|gif|svg|eot|ttf|woff|woff2)$/,
      use: {
        loader: 'url-loader',
        options: {
          limit: 100000
        }
      }
    });

    config.plugins.push(
      new MonacoWebpackPlugin({
        // Add languages as needed...
        languages: ['html', 'javascript'],
        filename: 'static/[name].worker.js'
      })
    );

    return config;
  }
});
