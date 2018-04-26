import Component from '@ember/component';
import layout from './template';
import { reads } from '@ember/object/computed';

export default Component.extend({
  classNameBindings: [ ':ui-sketch' ],
  layout,

  tasks: reads('sketch.tasks'),

  actions: {
    print() {
      this.sketch.print(this.tasks.key);
    }
  }

});
