# React - Webpack - Boilerplate

Server Side Rendering with react + webpack.

> It is under construction and a playground for different approaches.
> Please feel free to have a look ask questions or tell me how to improve this setup !

## Styling

Styling in this project is a mix off different approaches

* [Tachyons](http://tachyons.io/docs) as general styling framework
* [Styled-Components](https://www.styled-components.com/) as special styling in react components

## Images

* required images in js files we be resolved from babel with [inline-import-data-uri](https://github.com/pomle/babel-plugin-inline-import-data-uri)

* background images from url() will be resolved with the appropriate loader depending on size and file type
  * [svg-url-loader](https://github.com/bhovhannes/svg-url-loader)
  * [url-loader](https://webpack.js.org/loaders/url-loader/)
  * [file-loader](https://webpack.js.org/loaders/file-loader/)
