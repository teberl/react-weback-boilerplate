const settings = {
  name: 'reactBoilerplate',
  version: 'v1.0.0',
  env: process.env.ENV || 'development',
  port: process.env.PORT || 3000,
  shutdownTimeout: process.env.SHUTDOWN_TIMEOUT || 10000,
};

switch (settings.env) {
  case 'prod':
    settings.logLevel = 'info';
    break;
  default:
    settings.logLevel = 'debug';
    break;
}

settings.devMode = settings.env === 'development';

export default settings;
