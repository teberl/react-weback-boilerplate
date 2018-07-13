import React from 'react';

import logo from '../images/logo.svg';

export default function Headline() {
  return (
    <React.Fragment>
      <img src={logo} className="App-logo" alt="logo" />
      <h1 className="f1 shiny-yellow">
        SSR Boilerplate
      </h1>
    </React.Fragment>
  );
}
