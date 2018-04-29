import Sketch, { tasks } from 'ember-cli-escpos/sketch';

export default Sketch.extend({

  tasks: tasks(async function(p) {
    p.reset();
    p.font('b');
    p.text('To whom it may concern: It is springtime. It is late afternoon.');
    p.text('-- Kurt Vonnegut');
    p.feed(3);
    p.flush();
  })

});
