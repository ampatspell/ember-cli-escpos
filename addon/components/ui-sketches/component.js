import Component from '@ember/component';
import layout from './template';
import { inject as service } from '@ember/service';

export default Component.extend({
  classNameBindings: [ ':ui-sketches' ],
  layout,

  sketches: service(),

  route: 'sketches.sketch',

});
