import Component from '../task';
import layout from './template';
import { computed } from '@ember/object';

export default Component.extend({
  layout,

  url: computed('task.opts.blob', function() {
    let blob = this.get('task.opts.blob');
    if(!blob) {
      return;
    }
    return URL.createObjectURL(blob);
  }).readOnly()

});
