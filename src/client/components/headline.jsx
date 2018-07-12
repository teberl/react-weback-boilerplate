import React from 'react';

import art from '../images/artwork.jpg';

export default function Headline() {
  return (
    <React.Fragment>
      <h1 className="f1 dark-blue customCss pa4">
      @ React-Webpack-Boilerplate @
      </h1>
      <img src={art} alt="artwork" />
    </React.Fragment>
  );
}
