import EmberObject from '@ember/object';
import { assign } from '@ember/polyfills';
import { A } from '@ember/array';
import { getOwner } from '@ember/application'
import { all, resolve } from 'rsvp';

const task = (name, mapping, ui={}) => {
  return function(...args) {
    ui = assign({ name: 'basic' }, ui);
    let promise = all(args).then(resolved => mapping ? mapping(...resolved) : {});
    return this.createTask(name, promise, ui);
  }
};

export default EmberObject.extend({

  owner: null,
  tasks: null,

  init() {
    this._super(...arguments);
    this.tasks = A();
  },

  build(fn) {
    this.promise = resolve()
      .then(() => fn.call(this.owner, this))
      .then(() => all(this.tasks.map(task => task.promise)))
      .then(() => this);
  },

  serialize() {
    return this.promise.then(() => all(this.tasks.map(task => task.serialize())));
  },

  createTask(name, _promise, ui) {
    let task = getOwner(this).factoryFor('escpos:task').create({ name, ui, _promise });
    this.tasks.pushObject(task);
    return this;
  },

  // type: bottom, left, right
  // size: int
  margin: task('margin', (type, size) => ({ type, size }), { name: 'format', format: opts => `${opts.type},${opts.size}` }),

  print: task('print', value => ({ value }), { name: 'value' }),

  println: task('print-ln', value => ({ value }), { name: 'value' }),

  text: task('text', (value, encoding) => ({ value, encoding }), { name: 'text' }),

  pureText: task('pure-text', (value, encoding) => ({ value, encoding }), { name: 'text' }),

  encode: task('encode', value => ({ value }), { name: 'value' }),

  feed: task('feed', value => ({ value: value || 1 }), { name: 'value' }),

  // lf, glf
  control: task('control', value => ({ value }), { name: 'value' }),

  // lt, ct, rt
  align: task('align', value => ({ value }), { name: 'value' }),

  // a, b, c
  font: task('font', value => ({ value }), { name: 'value' }),

  // b, i, u, u2, bi, biu, biu2, bu2, iu, iu2, normal
  style: task('style', value => ({ value }), { name: 'value' }),

  // width:int, height:int
  size: task('size', (width, height) => ({ width, height }), { name: 'format', format: opts => `${opts.width},${opts.height}` }),

  // null or int
  spacing: task('spacing', value => ({ value }), { name: 'value' }),

  // null or int
  lineSpace: task('line-space', value => ({ value }), { name: 'value' }),

  // init, select, reset
  hardware: task('hardware', value => ({ value }), { name: 'value' }),

  barcode: task('barcode', (code, type, options) => ({ code, type, options }), {
    name: 'format',
    format: opts => `${opts.code} ${opts.type} ${JSON.stringify(opts.options)}`
  }),

  qrcode: task('qrcode', (code, version, level, size) => ({ code, version, level, size }), {
    name: 'format',
    format: opts => `${opts.code} ${opts.version} ${opts.level} ${opts.size}`
  }),

  // s8, d8, s24, d24
  image: task('image', (blob, density) => ({ blob, density }), { name: 'image', prop: 'density' }),

  // normal, dw, dh, dwdh
  raster: task('raster', (blob, mode) => ({ blob, mode }), { name: 'image', prop: 'mode' }),

  reset: task('reset'),

  flush: task('flush')

});
