gulp-frontend-boilerplate
=========================

> An ES6 boilerplate with common frontend tasks using Gulp 4 as build system.

This is a work in progress. Feel free to contribute. For an older version without Gulp 4, see [0.6.1](https://github.com/dmnsgn/gulp-frontend-boilerplate/releases/tag/0.6.1).


## Install
### Requirements

Node (use brew or install it from [here](http://nodejs.org/download/))

```bash
brew install node
```

Gulp ([Getting started](https://github.com/gulpjs/gulp/blob/master/docs/getting-started.md#getting-started))

```bash
npm install -g gulpjs/gulp-cli#4.0
```

### Clone this repository

*OSX & Linux*

```bash
git clone --depth 1 https://github.com/dmnsgn/gulp-frontend-boilerplate.git && cd gulp-frontend-boilerplate && rm -rf .git
```

*Windows*

```bash
git clone --depth 1 https://github.com/dmnsgn/gulp-frontend-boilerplate.git && cd gulp-frontend-boilerplate && rd /s /q .git
```

### Init (once)

This step sets up the boilerplate to fit your needs (App Name, JS compiler/transpiler, JS framework, CSS preprocessor).

```bash
npm run init
```

### Install

Then each time you clone the repo, use:

```bash
npm install
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
|**browsers**: the browser(s) targeted for autoprefixer (see full list of options [here](https://github.com/ai/autoprefixer#browsers))|Array|['last 2 version', 'safari 5', 'ie 8', 'ie 9', 'opera 12.1', 'ios 6', 'android 4']|
|**prodURL**: the absolute url to use in the sitemap and for metas|String|''|
|**shareImageURL**: the absolute url of the share image for metas|String|''|
|**twitterHandle**: twitter handle for metas|String|''|
|**analyticsUA**: your google analytics UA|String|''|
|**developerURL**: your URL.|String|''|

Others keys:

* [Babel](https://babeljs.io/docs/usage/babelrc/)
* [ESLint](http://eslint.org/docs/user-guide/configuring)
* [stylelint](https://github.com/stylelint/stylelint/blob/master/docs/user-guide/configuration.md)

### Tasks

#### Launch it

This is the default task.

```bash
npm run dev
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
Note: if you just want to build the project and serve it, run `npm run prod` then `gulp serve`.


#### Make changes

 * Write your markup in `src` folder and in `src/inc`. Include your partials with `<!-- @include inc/_filename.html -->`
 * Add some `scss`, `less` or `styl` styles.
 * Add some `scripts`: `.js` or `.coffee`.
 * Add images in the - wait for it - `images` folder.
 * Generate a spritesheet with corresponding mixins (located in `styles/_sprite{.scss,.less,.styl}`) by adding `.png` files into `images/sprite` folder and retina version with `@2x` suffix.

#### Build

When you are happy with your changes, run:

```bash
npm run prod
```

* Replace build tags with `.min` files, generates these minified files in `dist` folder (with optimization tasks)
* Add copyright headers and generate a `sitemap.xml`file

#### Tests tasks

Quick tests and stats with:

```bash
# w3c validation
gulp testMarkup

# mocha tests (written in test folder)
gulp testScripts

# PageSpeed Insights reporter for mobile and desktop
gulp testPsi
```

#### Clean it

Clean dist dir (except static folder) and clear all caches (sass cache, gulp cache)

```bash
gulp clean
```
#### Help

This command will give you a list of all tasks available and their description.

```bash
gulp --tasks
```

## External issues

* On some OS, napa needs to be installed globally first `npm install -g napa`

## Licence

MIT
