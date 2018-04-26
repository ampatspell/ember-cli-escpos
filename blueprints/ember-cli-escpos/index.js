/* eslint-env node */
'use strict';

module.exports = {
  normalizeEntityName() {
  },
  fileMapTokens() {
    return {
      __root__: () => '/app'
    };
  },
  afterInstall() {
    return this.addPackageToProject('ember-fetch');
  },
};
