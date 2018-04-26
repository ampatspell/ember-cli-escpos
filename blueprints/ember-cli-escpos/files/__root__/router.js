import EmberRouter from '@ember/routing/router';
import config from './config/environment';

const Router = EmberRouter.extend({
  location: config.locationType,
  rootURL: config.rootURL
});

Router.map(function() {

  this.route('sketches', function() {
    this.route('sketch', { path: '/:sketch_id' }, function() {
    });
  });

});

export default Router;
