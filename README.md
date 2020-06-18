# frontend-boilerplate

[![travis](https://img.shields.io/travis/dmnsgn/frontend-boilerplate)](https://travis-ci.org/dmnsgn/frontend-boilerplate)
[![dependencies](https://img.shields.io/david/dmnsgn/frontend-boilerplate)](https://github.com/dmnsgn/frontend-boilerplate/blob/master/package.json)
[![repo size](https://img.shields.io/github/repo-size/dmnsgn/frontend-boilerplate)](https://github.com/dmnsgn/frontend-boilerplate)
[![version](https://img.shields.io/github/package-json/v/dmnsgn/frontend-boilerplate/master)](https://github.com/dmnsgn/frontend-boilerplate/blob/master/package.json)
[![twitter](https://img.shields.io/twitter/follow/dmnsgn?style=social)](https://twitter.com/dmnsgn)
[![styled with prettier](https://img.shields.io/badge/styled_with-prettier-ff69b4.svg)](https://github.com/prettier/prettier)
[![license](https://img.shields.io/github/license/dmnsgn/frontend-boilerplate)](https://github.com/frontend-boilerplate/frontend-boilerplate/blob/master/LICENSE)

> An ES20XX starter with common frontend tasks using [Webpack 4](https://webpack.js.org/) as module bundler and npm scripts as task runner.

If you serve your files over HTTPS with HTTP/2, use compression (gzip, brotli...) for text-based resources, and respect [accessibility rules](https://developers.google.com/web/fundamentals/accessibility/), your [lighthouse](https://developers.google.com/web/tools/lighthouse/) score will be 100%.

## Setup

### Requirements

Node `">=6.0.0"` (use brew or install it from [here](http://nodejs.org/download/))

```bash
brew install node
```

### Clone the repository

_OSX & Linux_:

```bash
git clone --depth 1 https://github.com/dmnsgn/frontend-boilerplate.git && cd frontend-boilerplate && rm -rf .git && git init
```

_Windows_:

```bash
git clone --depth 1 https://github.com/dmnsgn/frontend-boilerplate.git && cd frontend-boilerplate && rd /s /q .git && git init
```

### Dependencies

```bash
npm install
```

### Configuration

Open `config/config.js`:

| Key          | Description                                                                                                                | Type  |
| :----------- | :------------------------------------------------------------------------------------------------------------------------- | :---: |
| **PATHS**    | map of paths to the differents folders needed by `webpack` and `npm scripts`                                               |  Map  |
| **BROWSERS** | the browsers targeted for `babel-preset-env` and `browserslist` (see full list [here](https://github.com/ai/browserslist)) | Array |

Open `package.json`:

| Key                    | Description                                                |  Type  |
| :--------------------- | :--------------------------------------------------------- | :----: |
| **config.title**       | title used for metas and favicons                          | String |
| **config.url**         | absolute url used for metas, robotstxt, sitemap and banner | String |
| **config.lang**        | language for index.html and favicons                       | String |
| **config.description** | title used for metas, favicons and banner                  | String |
| **config.copyright**   | license acronym used for banner                            | String |
| **config.handle**      | twitter handle for metas                                   | String |
| **config.analyticsUA** | google analytics UA                                        | String |
| **author.name**        | author name used for favicons                              | String |
| **author.url**         | author url used for favicons                               | String |

## Develop

```bash
npm run dev
// or npm start
```

## Production

```bash
npm run prod
// or npm run build
```

## Features

### Webpack [loaders](https://webpack.js.org/loaders/)

- [Babel](https://babeljs.io/) with [preset-env](https://github.com/babel/babel/tree/master/packages/babel-preset-env) and [TypeScript](https://github.com/babel/babel/tree/master/packages/babel-preset-typescript)
- [PostCSS](https://github.com/postcss/postcss): see [postcss.config.js](./config/postcss.config.js)
- [Sass](http://sass-lang.com/)
- [Less](http://lesscss.org/)
- [Stylus](http://stylus-lang.com/)
- fonts via [file-loader](https://github.com/webpack-contrib/file-loader)
- images via [file-loader](https://github.com/webpack-contrib/file-loader) and optimised with [image-webpack-loader](https://github.com/tcoopman/image-webpack-loader)
- svg via [file-loader](https://github.com/webpack-contrib/file-loader) and optimised with [svgo-loader](https://github.com/rpominov/svgo-loader)
- [html-loader](https://github.com/webpack-contrib/html-loader)
- [ejs-loader](https://github.com/okonet/ejs-loader)
- [glslify](https://github.com/stackgl/glslify)

### Webpack [plugins](https://webpack.js.org/plugins/)

- [DefinePlugin](https://webpack.js.org/plugins/define-plugin/): create global constants which can be configured at compile time
- [HotModuleReplacementPlugin](https://webpack.js.org/plugins/hot-module-replacement-plugin/): enable Hot Module Replacement
- [HtmlWebpackPlugin](https://webpack.js.org/plugins/html-webpack-plugin/) with [Lodash](https://lodash.com/docs/4.17.5#template) templates: simplify creation of HTML files
- [MiniCssExtractPlugin](https://webpack.js.org/plugins/mini-css-extract-plugin/): lightweight CSS extraction plugin
- [SpritesmithPlugin](https://github.com/mixtur/webpack-spritesmith): convert a set of images into a spritesheet and SASS/LESS/Stylus mixins
- [CompressionPlugin](https://github.com/webpack-contrib/compression-webpack-plugin): Prepare compressed versions of assets to serve them with Content-Encoding (default to gzip). Requires server configuration so it is commented [here](./config/plugins.js#L26)
- [OfflinePlugin](https://github.com/NekR/offline-plugin): provide an offline experience using ServiceWorker, and AppCache as a fallback.
- [BannerPlugin](https://webpack.js.org/plugins/banner-plugin/): add a banner to the top of each generated chunk.
- [WebpackStatsPlugin](https://github.com/FormidableLabs/webpack-stats-plugin): ingest the webpack stats object, process / transform the object and write out to a file for further consumption.

### npm scripts

- `npm run clean`: remove all the files from the `dist` directory
- `npm run favicons`: generate [favicons](https://github.com/evilebottnawi/favicons) files and `/src/templates/_favicons.ejs`
- `npm run robotstxt`: generate [robots.txt](https://github.com/itgalaxy/generate-robotstxt) file
- `npm run sitemap`: generate [sitemap.xml](https://github.com/ekalinin/sitemap.js) file

### Prettier [formatter](https://github.com/prettier/prettier)

- [Prettier](https://github.com/prettier/prettier)
- [ESLint Prettier Plugin](https://github.com/prettier/eslint-plugin-prettier)
- [ESLint Prettier Config](https://github.com/prettier/eslint-config-prettier)

## Licence

MIT
