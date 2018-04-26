module.exports = function() {

  let escpos = require('escpos');
  let Job = require('./job');

  let pretender = () => {
    return new Proxy({}, {
      get(target, key) {
        return (...args) => {
          console.log(`• printer.${key}`, args);
        }
      }
    });
  }

  class Printer {

    device() {
      let device = this._device;
      if(!device) {
        device = escpos.USB.getDevice();
        this._device = device;
      }
      return this._device;
    }

    async printer() {
      let printer = this._printer;
      if(!printer) {
        let device = await this.device();
        printer = escpos.Printer.create(device);
        this._printer = printer;
      }
      return printer;
    }

    async print(tasks, pretend=false) {
      let printer;

      if(pretend) {
        printer = pretender();
      } else {
        printer = await this.printer();
      }

      let job = new Job(printer, tasks);

      await job.run();
    }
  }

  return Printer;
}();
