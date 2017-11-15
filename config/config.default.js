exports.assets = {
  extensions: [ 'txt', 'svg', 'png' ],
  regExp: '.*/static/(.+)',
  name: '/static/[1]?[sha512:hash:base64:7]',
};

exports.build = {
  babel: (babelConfig, config) => {
    console.log('=======', config.assets);
    babelConfig.plugins.push([
      require.resolve('babel-plugin-transform-assets'),
      {
        extensions: config.assets.extensions,
        regExp: config.assets.regExp,
        name: config.assets.name,
      },
    ]);

    return babelConfig;
  },
};
