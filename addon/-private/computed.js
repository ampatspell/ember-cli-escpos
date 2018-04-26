import { computed } from '@ember/object';
import { getOwner } from '@ember/application';

export const tasks = (...args) => {
  let fn = args.pop();
  return computed(...args, function(key) {
    let tasks = getOwner(this).factoryFor('escpos:tasks').create({ owner: this, key });
    tasks.build(fn);
    return tasks;
  }).meta({ _sketch: 'tasks' }).readOnly();
}
