import EmberObject from '@ember/object';
import { all, reject } from 'rsvp';

const blobToBase64 = blob => new Promise(resolve => {
  let reader = new FileReader();
  reader.readAsDataURL(blob);
  reader.onloadend = () => resolve(reader.result);
});

export default EmberObject.extend({

  name: null,

  promise: null,
  opts: null,

  isLoading: true,
  isLoaded: false,
  isError: false,
  error: null,

  init() {
    this._super(...arguments);
    this.promise = this._promise.then(opts => {
      this.setProperties({
        isLoading: false,
        isLoaded: true,
        opts
      });
      return this;
    }, error => {
      this.setProperties({
        isLoading: false,
        isError: true,
        error
      });
      return reject(error);
    });
  },

  async serializeOpts() {
    let json = {};
    let opts = this.opts || {};
    await all(Object.keys(opts).map(async key => {
      let value = opts[key];
      if(value instanceof Blob) {
        value  = await blobToBase64(value);
      }
      json[key] = value;
    }));
    return json;
  },

  async serialize() {
    let name = this.name;
    let opts = await this.serializeOpts();
    return {
      name,
      opts
    };
  },

  toStringExtension() {
    return `${this.name}`;
  }

});
