import Component from '@ember/component';
import layout from './template';

export default Component.extend({
  classNameBindings: [ ':ui-sketch-preview-task-content', 'task.ui.name' ],
  layout
});
