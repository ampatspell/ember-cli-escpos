import Component from '@ember/component';
import layout from './template';
import { computed } from '@ember/object';

export default Component.extend({
  classNameBindings: [ ':ui-sketch-preview-task' ],
  layout,

  componentName: computed('task.ui.name', function() {
    let name = this.get('task.ui.name');
    if(!name) {
      return;
    }
    return `ui-sketch/preview/task/${name}`;
  }).readOnly()

});
