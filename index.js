'use strict';

module.exports = {
  name: 'ember-cli-escpos',
  isDevelopingAddon() {
    return true;
  },
  included(app) {
    this._super.included(app);
    app.import('vendor/ember-cli-escpos/webfontloader.js');
    app.import('vendor/ember-cli-escpos/webfontloader-shim.js');
    app.import('vendor/ember-cli-escpos/konva.js');
    app.import('vendor/ember-cli-escpos/konva-shim.js');
  },
  serverMiddleware(config) {
    let app = config.app;
    let server = require('./lib/server');
    app.use('/escpos', server);
  },
  treeForVendor(tree) {
    let mergeTrees = require('broccoli-merge-trees');
    let Funnel = require('broccoli-funnel');
    let path = require('path');

    let trees = [];
    if(tree) {
      trees.push(tree);
    }

    trees.push(new Funnel(path.join(path.dirname(require.resolve('webfontloader'))), {
      files: [
        'webfontloader.js'
      ],
      destDir: '/ember-cli-escpos'
    }));

    trees.push(new Funnel(path.dirname(require.resolve('konva')), {
      files: [
        'konva.js'
      ],
      destDir: '/ember-cli-escpos'
    }));

    return mergeTrees(trees);
  }
};
