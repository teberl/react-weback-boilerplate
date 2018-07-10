import React from 'react';
import { renderToString } from 'react-dom/server';
import { StaticRouter } from 'react-router';

import App from '../client/components/app';
import settings from '../settings';

function normalizeAssets(assets) {
  return Array.isArray(assets) ? assets : [assets];
}

function getJsAssets(webpackStats) {
  const assets = getWebpackAssets(webpackStats);
  if (assets) {
    return assets.filter(path => path.endsWith('.js')).map(path => `<script defer src="${path}?v=${settings.serviceVersion}"></script>`).join('\n');
  }
  return `<script defer src="bundle.${settings.env}.js?v=${settings.serviceVersion}"></script>`;
}

function getCssAssets(webpackStats) {
  if (settings.isDev) {
    return [];
  }
  const assets = getWebpackAssets(webpackStats);
  if (assets) {
    return assets.filter(path => path.endsWith('.css')).map(path => `<link rel="stylesheet" href="${path}?v=${settings.release}" />`).join('\n');
  }
  return `<link rel="stylesheet" href="index.css?v=${settings.release}"/>`;
}

function getWebpackAssets(webpackStats) {
  return webpackStats ? normalizeAssets(webpackStats.toJson().assetsByChunkName.main) : null;
}

export default function render(req, res, initialServerState) {
  const extendedInitialServerState = Object.assign({}, initialServerState, { query: req.query, cookies: req.cookies });
  const context = {};
  const template = 'index.hbs';
  const html = renderToString(
    <StaticRouter context={context} location={req.url}>
      <App initialState={extendedInitialServerState} />
    </StaticRouter>);
  const baseUrl = req.forwardedBaseUrl || '/';
  const serverState = `<script>window.__INITIAL_STATE__ = ${JSON.stringify(initialServerState)}</script>`;
  const jsAssets = getJsAssets(res.locals.webpackStats, settings);
  const cssAssets = getCssAssets(res.locals.webpackStats, settings);
  const templateVariables = {
    html,
    serverState,
    baseUrl,
    jsAssets,
    cssAssets
  };
  return res.render(template, templateVariables);
}
