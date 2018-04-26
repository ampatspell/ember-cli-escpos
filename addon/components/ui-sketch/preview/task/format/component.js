import Component from '../task';
import layout from './template';
import { computed } from '@ember/object';

export default Component.extend({
  layout,

  value: computed('task.{opts,ui.format}', function() {
    let fn = this.get('task.ui.format');
    let opts = this.get('task.opts');
    return fn(opts);
  }).readOnly()

});
