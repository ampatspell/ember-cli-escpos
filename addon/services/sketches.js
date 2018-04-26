import Service from '@ember/service';
import { getOwner } from '@ember/application';
import { assert } from '@ember/debug';
import { inject as service } from '@ember/service';
import { computed } from '@ember/object';
import { A } from '@ember/array';

export default Service.extend({

  escpos: service(),

  names: computed(function() {
    let owner = getOwner(this);
    let appname = owner.application.name || 'dummy';
    let entries = require.entries; // eslint-disable-line no-undef
    let prefix = `${appname}/sketches/`;
    let names = A();
    for(let key in entries) {
      if(!key.startsWith(prefix)) {
        continue;
      }
      let name = key.substr(prefix.length);
      names.push(name);
    }
    return names;
  }).readOnly(),

  create(name, props) {
    this.names;
    let factory = getOwner(this).factoryFor(`sketch:${name}`);
    assert(`sketch '${name}' not found`, !!factory);
    return factory.create(props);
  },

  print(sketch, key, pretend=false) {
    let tasks = sketch.get(key);
    assert(`no tasks for '${key}' in ${sketch}`, !!tasks);
    return tasks.serialize().then(tasks => this.escpos.print(tasks, pretend));
  }

});
