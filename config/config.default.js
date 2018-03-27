exports.assets = {
  extensions: [ 'txt', 'svg', 'png', 'jpg', 'jpeg', 'webp', 'gif' ],
  regExp: '.*/static/(.+)',
  name: '/static/[1]?[sha512:hash:base64:7]',
};

exports.build = {
  babel: (babelConfig, config) => {
    let { name } = config.assets;

    if (config.build.assetPrefix) {
      const uuid = require('uuid');
      const buildId = uuid.v4();
      config.build.buildId = buildId;

      name =
        config.build.assetPrefix.replace(/\/$/, '') +
        name.replace('static', `static/${buildId}`);
    }

    babelConfig.plugins.push([
      require.resolve('babel-plugin-transform-assets'),
      {
        extensions: config.assets.extensions,
        regExp: config.assets.regExp,
        name,
      },
    ]);

    return babelConfig;
  },
};
