import { computed } from '@ember/object';
import createCanvas from './create-canvas';
import canvasToBlob from './canvas-to-blob';

const value = (owner, value) => {
  if(typeof value === 'function') {
    return value.call(owner, owner);
  }
  return value;
};

export const canvas = (...args) => {
  let opts = args.pop();
  return computed(...args, async function() {
    let size = {
      width:  value(this, opts.size.width || 384),
      height: value(this, opts.size.height)
    };
    let { canvas, ctx } = createCanvas(size.width, size.height);
    await opts.draw.call(this, canvas, ctx, size, this);
    return canvasToBlob(canvas);
  }).readOnly();
}
