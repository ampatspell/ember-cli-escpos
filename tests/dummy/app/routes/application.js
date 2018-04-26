import Route from '@ember/routing/route';
import preloadFonts from 'ember-cli-escpos/util/preload-fonts';

export default Route.extend({

  beforeModel() {
    return preloadFonts({
      google: {
        families: [ 'Roboto Mono:400,700:latin-ext' ]
      }
    });
  }

});
