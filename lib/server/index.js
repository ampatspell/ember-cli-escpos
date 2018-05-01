module.exports = function() {

  let express = require('express');
  let bodyParser = require('body-parser');
  let app = express();

  let Printer = require('../printer');
  let printer = new Printer();

  app.use(bodyParser.json({ limit: '100mb' }));

  const info = () => {
    let { name, version } = require('../../package.json');
    return {
      name,
      version
    };
  };

  const handler = fn => async (req, res) => {
    try {
      let json = await fn(req, res);
      res.json(json || {});
    } catch(err) {
      console.error(err.stack);
      res.status(err.status || 422);
      res.json({ message: err.message, stack: err.stack });
    }
  };

  app.get('/', handler(() => info()));

  app.get('/test', handler(async () => {
    let tasks = [
      { name: 'reset' },
      { name: 'font', opts: { value: 'b' } },
      { name: 'text', opts: { value: JSON.stringify(info(), null, 2) } },
      { name: 'feed', opts: { value: 3 } },
      { name: 'flush' }
    ];
    await printer.print(tasks, false);
    return tasks;
  }));

  app.post('/print', handler(async req => {
    let { tasks, pretend } = req.body;
    await printer.print(tasks, pretend);
  }));

  app.get('/proxy', (req, res) => {
    let { url } = req.query;
    if(!url) {
      res.status(422);
      res.json({ error: 'url query parameter is required' });
    }
    require('request')(url).pipe(res);
  });

  return app;
}();
