import Service from '@ember/service';
import fetch from 'fetch';

export default Service.extend({

  _print(json) {
    return fetch('/escpos/print', {
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(json)
    }).then(() => {
      return undefined;
    });
  },

  print(tasks, pretend) {
    return this._print({ tasks, pretend });
  }

});
