import Tasks from 'ember-cli-escpos/-private/tasks';
import Task from 'ember-cli-escpos/-private/task';

import Resolver from 'ember-resolver';

const pluralizedTypes = {
  'sketch': 'sketches'
};

Resolver.reopen({
  pluralizedTypes
});

export default {
  name: 'escpos',
  initialize(container) {
    container.register('escpos:tasks', Tasks);
    container.register('escpos:task', Task);
  }
}
