import React from 'react';
import ReactDom from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import App from './components/app';
import './css/app.css';

const initialState = window.__INITIAL_STATE__ || {};

ReactDom.hydrate((
  <BrowserRouter>
    <App initialState={initialState} />
  </BrowserRouter>
), document.getElementById('app'));

if (module.hot) {
  module.hot.accept();
}
