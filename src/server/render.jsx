import React from 'react';
import { renderToString } from 'react-dom/server';
import { StaticRouter } from 'react-router';

import App from '../client/components/App';
import settings from '../settings';

export default function render(req, res, initialServerState) {
  const extendedInitialServerState = Object.assign({}, initialServerState,
    { query: req.query, cookies: req.cookies });
  const context = {};
  const template = 'index.hbs';
  const html = renderToString(
    <StaticRouter context={context} location={req.url}>
      <App initialState={extendedInitialServerState} />
    </StaticRouter>,
  );
  const baseUrl = req.forwardedBaseUrl || '/';
  const serverState = `<script>window.__INITIAL_STATE__ = ${JSON.stringify(initialServerState)}</script>`;
  const jsAssets = `<script defer src="bundle${settings.devMode ? '-dev' : ''}.js"></script>`;
  const cssAssets = settings.devMode ? '' : '<link rel="stylesheet" href="bundle.css"/>';
  const templateVariables = {
    html,
    serverState,
    baseUrl,
    jsAssets,
    cssAssets,
  };
  return res.render(template, templateVariables);
}
