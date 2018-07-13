import React from 'react';
import { renderToString } from 'react-dom/server';
import { StaticRouter } from 'react-router';

import App from '../client/components/App';

export default function render(req, res, initialServerState) {
  let manifest;
  if (res.locals.webpackStats) {
    manifest = Object.values(res.locals.webpackStats.toJson().assetsByChunkName);
  } else {
    manifest = Object.values(require('../manifest.json'));
  }

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
  const jsAssets = manifest
    .filter(path => path && path.endsWith('.js'))
    .map(path => `<script defer src="${path}"></script>`)
    .join('\n');
  const cssAssets = manifest
    .filter(path => path && path.endsWith('.css'))
    .map(path => `<link rel="stylesheet" href="${path}" />`)
    .join('\n');
  const templateVariables = {
    html,
    serverState,
    baseUrl,
    jsAssets,
    cssAssets,
  };
  return res.render(template, templateVariables);
}
