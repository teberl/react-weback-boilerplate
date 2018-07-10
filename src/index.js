import path from 'path';
import { hostname } from 'os';
import express from 'express';
import cookieParser from 'cookie-parser';
import handlebars from 'express-handlebars';
import gracefulShutdown from 'http-graceful-shutdown';
import { handleDefault, handleTodos, handleTodoById } from './server/requestHandler';
import { urls } from './routes/urls';
import settings from './settings';

const app = express();

app.use(cookieParser());

app.use(express.static(path.join(__dirname, '../dist')));

app.engine('hbs', handlebars({ extname: '.hbs' }));

app.set('view engine', 'hbs');

app.set('views', path.join(__dirname, 'views'));

app.get(
  'healthcheck/',
  (req, res) => {
    return res.status(200);
  }
)

app.get(
  urls.home,
  handleDefault
);

app.get(
  urls.todos,
  handleTodos
);

app.get(
  urls.todoById,
  handleTodoById
);

const server = app.listen(settings.port, hostname(), (error) => {
  if (error) {
    console.error(error);
  } else {
    if (settings.isDev) {
      const config = require('../webpack.dev.js');
      const compiler = require('webpack')(config);
      require('webpack-hot-client')(compiler, { server });
      app.use(require('webpack-dev-middleware')(compiler, { serverSideRender: true }));
    }
    console.info(`Service listening on port ${settings.port}...`);
  }
});

gracefulShutdown(server, { timeout: settings.shutdownTimeout });
