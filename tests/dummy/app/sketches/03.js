import { computed } from '@ember/object';
import Sketch, { tasks } from 'ember-cli-escpos/sketch';
import { createCanvas, canvasToBlob } from 'ember-cli-escpos/canvas';
import { atkinson } from 'ember-cli-escpos/canvas/pixels';

export default Sketch.extend({

  picture: computed(async function() {
    let { canvas, ctx, size } = createCanvas(384, 200);
    ctx.fillStyle = '#555';
    ctx.fillRect(0, 0, size.width, size.height);

    let pixels = ctx.getImageData(0, 0, size.width, size.height);
    pixels = atkinson(pixels);
    ctx.putImageData(pixels, 0, 0);

    return canvasToBlob(canvas);
  }).readOnly(),

  tasks: tasks('picture', async function(printer) {
    printer.reset();
    printer.font('b');
    printer.text(this+'');
    printer.image(this.picture);
    printer.feed(3);
    printer.flush();
  })

});
