gulp-frontend-boilerplate
=========================

> An ES6 boilerplate with common frontend tasks using gulp as build system.

This is a work in progress. Feel free to contribute.


## Install
### Requirements

Node (use brew or install it from [here](http://nodejs.org/download/))

```bash
$ brew install node
```

Gulp ([Getting started](https://github.com/gulpjs/gulp/blob/master/docs/getting-started.md#getting-started)) and Babel ([https://babeljs.io/](https://babeljs.io/))

```bash
$ npm install -g gulp babel
```

[Sass](http://sass-lang.com/)

```bash
$ gem install sass compass sass-css-importer sass-globbing
```

or [Less](http://lesscss.org/)

```bash
$ npm install -g less
```

or [Stylus](https://learnboost.github.io/stylus/)

```bash
$ npm install -g stylus
```

### Clone this repository or grab it from npm

```bash
$ git clone --depth 1 https://github.com/dmnsgn/gulp-frontend-boilerplate.git && cd gulp-frontend-boilerplate && rm -rf .git

or

$ npm i gulp-frontend-boilerplate
```

### Init

This step sets up the boilerplate to fit your needs (App Name, JS compiler/transpiler, JS framework, CSS preprocessor).

```bash
$ npm run init
```

Then each time you clone the repo, use:

```bash
$ npm install
```

## Usage

### Configuration

Open `package.json`:

|Option (`directories` and `config` keys)|Type|Default
|:---------|:---------:|:----------:|
|**src**: the source folder path, that's where you write code.|String|src|
|**dist**: the destination folder path, that's where your code is compiled.|String|dist|
|**test**: the `test` folder path.|String|test|
|**verbose**: provide a more verbose output when available (useful for debugging).|Boolean|false|
|**port**: the server port.|Number|3000|
|**browsers**: the browser(s) targeted for autoprefixer and autopolyfiller (see full list of options [here](https://github.com/ai/autoprefixer#browsers))|Array|['last 2 version', 'safari 5', 'ie 8', 'ie 9', 'opera 12.1', 'ios 6', 'android 4']|
|**prodUrl**: the absolute url to use in the sitemap|String|''|
|**analyticsUA**: your google analytics UA|String|''|
|**developerURL**: your URL.|String|''|

### Gulp tasks

#### Launch it
This is the default task.
```bash
gulp
```
All the magic begins here:

* process `.html` files
* process `.scss`, `.less` or `.styl` files
* process `.js` or `.coffee` files
* create a server with BrowserSync and serve `dist` folder
* watch changes in source folder
* reload on changes in source folder

Same as running `gulp --env dev`.

---
Note: if you just want to build the project and serve it, run `gulp --env prod --serve`.


#### Make changes

 * Write your markup in `src` folder and in `src/inc`. Include your partials with `<!-- @include templates/_filename.html -->`
 * Add some `scss`, `less` or `styl` styles.
 * Add some `scripts`: `.js` or `.coffee`.
 * Add images in the - wait for it - `images` folder.
 * Generate a spritesheet with corresponding mixins (located in `styles/_sprite{.scss,.less,.styl}`) by adding `.png` files into `images/sprite` folder and retina version with `@2x` suffix.

#### Build

When you are happy with your changes, run:

```bash
gulp --env prod
```
* Replace build tags with `.min` files, generates these minified files in `dist` folder (with optimization tasks)
* Add copyright headers and generate a `sitemap.xml`file

#### Tests tasks

Quick tests and stats with:

```bash
// w3c validation
gulp test:markup

// mocha tests (written in test folder)
gulp test:scripts

// PageSpeed Insights reporter for mobile and desktop
gulp test:psi
```

#### Clean it

Clean dist dir and clear all caches (sass cache, gulp cache)

```bash
gulp clean
```
#### Help

This command will give you a list of all tasks available.

```bash
gulp help
```
---
Note: Each task is self documented. You can use them individually (e.g. `gulp images:spritesheet`, `gulp images:optimization`) but you should use the tasks above.


## External issues
* On some OS, napa needs to be installed globally first `npm install -g napa`
* Gaze break watchers when renaming folder: https://github.com/shama/gaze/issues/56. Waiting for gaze 0.6 https://github.com/gulpjs/gulp/issues/600
* watch doesn't work when adding files: https://github.com/floatdrop/gulp-watch/issues/50
* Run sequence is intended to be a temporary solution until orchestrator is updated to support non-dependent ordered tasks: https://github.com/gulpjs/gulp/issues/347
* Gulp 4 will change. A lot: https://github.com/gulpjs/gulp/issues/355 & https://github.com/gulpjs/gulp/issues/347

## Licence

MIT
