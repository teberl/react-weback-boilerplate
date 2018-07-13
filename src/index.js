import path from 'path';
import { hostname } from 'os';
import express from 'express';
import cookieParser from 'cookie-parser';
import handlebars from 'express-handlebars';
import gracefulShutdown from 'http-graceful-shutdown';
import { handleDefault, handleTodos, handleTodoById } from './server/requestHandler';
import urls from './routes/urls';
import settings from './settings';

const app = express();

const server = app.listen(settings.port, hostname(), (error) => {
  if (error) {
    console.error(error);
  } else {
    app.use(cookieParser());

    app.use(express.static(path.join(__dirname, '../dist')));

    app.engine('hbs', handlebars({ extname: '.hbs' }));

    app.set('view engine', 'hbs');

    app.set('views', path.join(__dirname, 'views'));

    if (settings.devMode) {
      const config = require('../webpack.dev.js');
      const compiler = require('webpack')(config);
      require('webpack-hot-client')(compiler, { server });
      app.use(require('webpack-dev-middleware')(compiler, { serverSideRender: true }));
    }


    app.get(
      urls.root,
      handleDefault,
    );

    app.get(
      urls.todos,
      handleTodos,
    );

    app.get(
      urls.todoById,
      handleTodoById,
    );

    app.get(
      'healthcheck/',
      (req, res) => res.status(200),
    );

    console.info(`Service listening on port ${settings.port}...`);
  }
});

gracefulShutdown(server, { timeout: settings.shutdownTimeout });
