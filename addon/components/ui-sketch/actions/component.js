import Component from '@ember/component';
import layout from './template';

export default Component.extend({
  classNameBindings: [ ':ui-sketch-actions' ],
  layout,

  actions: {
    print() {
      this.print && this.print();
    }
  }

});
