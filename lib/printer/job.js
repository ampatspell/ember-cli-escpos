module.exports = function() {

  let escpos = require('escpos');
  let toBuffer = require('data-uri-to-buffer');

  const base64ToImage = string => new Promise(resolve => {
    let buffer = toBuffer(string);
    escpos.Image.load(buffer, 'image/png', image => resolve(image));
  });

  const value = name => (printer, opts) => printer[name].call(printer, opts.value);

  const margin = () => (printer, opts) => {
    let type = opts.type;
    let fn;
    if(type === 'bottom') {
      fn = printer.marginBottom;
    } else if(type === 'left') {
      fn = printer.marginLeft;
    } else if(type === 'right') {
      fn = printer.marginRight;
    } else {
      return;
    }
    return fn.call(printer, opts.size);
  };

  const text = name => (printer, opts) => printer[name].call(printer, opts.value, opts.encoding);

  const size = () => (printer, opts) => printer.size(opts.width, opts.height);

  const image = (name, prop) => async (printer, opts) => {
    let image = await base64ToImage(opts.blob);
    await printer[name].call(printer, image, opts[prop]);
  };

  const reset = () => async printer => {
    await printer.print('\x1b\x3f\x0a\x00');
    await printer.print('\x1b\x40');

    await printer.print('\x1c\x2e');
    await printer.print('\x1b\x74\x19');
    await printer.encode('1257');

    await printer.font('a');
    await printer.style('normal');
    await printer.size(1, 1);
    await printer.align('lt');
  };

  const flush = () => printer => printer.flush();

  const barcode = () => (printer, opts) => printer.barcode(opts.code, opts.type, opts.options);

  const qrcode = () => (printer, opts) => printer.qrcode(opts.code, opts.version, opts.level, opts.size);

  const handlers = {
    'spacing':    value('spacing'),
    'print':      value('print'),
    'print-ln':   value('println'),
    'encode':     value('encode'),
    'feed':       value('feed'),
    'control':    value('control'),
    'align':      value('align'),
    'font':       value('font'),
    'style':      value('style'),
    'line-space': value('lineSpace'),
    'hardware':   value('hardware'),
    'margin':     margin(),
    'text':       text('text'),
    'pure-text':  text('pureText'),
    'size':       size(),
    'image':      image('image', 'density'),
    'raster':     image('raster', 'mode'),
    'reset':      reset(),
    'flush':      flush(),
    'barcode':    barcode(),
    'qrcode':     qrcode()
  };

  class Job {

    constructor(printer, tasks) {
      this.printer = printer;
      this.tasks = tasks;
    }

    async task(task) {
      let { name, opts } = task;
      let fn = handlers[name];
      if(!fn) {
        console.log(`no handler for ${name}`);
        return;
      }
      await fn(this.printer, opts);
    }

    async run() {
      let tasks = this.tasks;
      for(let i = 0; i < tasks.length; i++) {
        await this.task(tasks[i]);
      }
    }

  }

  return Job;
}();
