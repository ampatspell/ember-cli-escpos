import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';

export default Route.extend({

  sketches: service(),

  model(params) {
    let id = params.sketch_id;
    return this.sketches.create(id, { id });
  }

});
