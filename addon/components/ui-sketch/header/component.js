import Component from '@ember/component';
import layout from './template';
import { inject as service } from '@ember/service';
import { computed } from '@ember/object';
import { or } from '@ember/object/computed';

const sketch = delta => computed('sketches.names', 'sketch', function() {
  let id = this.sketch.id;
  let names = this.sketches.names;
  let idx = names.indexOf(id);
  if(idx === -1) {
    return;
  }
  let i = idx + delta;
  if(i < 0 || i > names.length - 1) {
    return;
  }
  return names[i];
}).readOnly();

export default Component.extend({
  classNameBindings: [ ':ui-sketch-header' ],
  layout,

  sketches: service(),

  next: sketch(+1),
  prev: sketch(-1),

  prevOrNext: or('prev', 'next'),

  route: 'sketches.sketch'

});
