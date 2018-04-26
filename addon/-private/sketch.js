import EmberObject from '@ember/object';
import { inject as service } from '@ember/service';

export default EmberObject.extend({

  sketches: service(),
  
  id: null,

  print(key, pretend) {
    return this.sketches.print(this, key, pretend);
  }

});
