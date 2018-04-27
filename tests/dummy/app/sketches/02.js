import Sketch, { tasks, canvas } from 'ember-cli-escpos/sketch';
import { atkinson } from 'ember-cli-escpos/canvas/pixels';

export default Sketch.extend({

  picture: canvas({
    size: {
      width: 384,
      height: 200
    },
    draw(canvas, ctx, size) {
      ctx.fillStyle = '#555';
      ctx.fillRect(0, 0, size.width, size.height);

      let pixels = ctx.getImageData(0, 0, size.width, size.height);
      pixels = atkinson(pixels);
      ctx.putImageData(pixels, 0, 0);
    }
  }),

  tasks: tasks('picture', async function(printer) {
    printer.reset();
    printer.font('b');
    printer.text(this+'');
    printer.image(this.picture);
    printer.feed(3);
    printer.flush();
  })

});
