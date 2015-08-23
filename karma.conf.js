module.exports = function(config) {
  config.set({
    browsers: ['PhantomJS'],
    files: [
      { pattern: 'tests.webpack.js', watched: false },
    ],
    frameworks: ['jasmine'],
    preprocessors: {
      'tests.webpack.js': ['webpack'],
    },
    reporters: ['dots'],
    singleRun: true,
    webpack: {
      module: {
        loaders: [
          {
            test: /\.(jsx|js)$/,
            exclude: /node_modules/,
            loader: 'babel?plugins=babel-plugin-rewire'
          }
        ],
      },
      watch: true,
      resolve: {
        extensions: ['', '.js', '.jsx']
      }
    },
    webpackServer: {
      noInfo: true,
    },
  });
};
