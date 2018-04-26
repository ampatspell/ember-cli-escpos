(function() {

  function vendorModule() {
    'use strict';

    var webfont = self['WebFont'];
    return webfont;
  }

  define('webfont', [], vendorModule);
})();
