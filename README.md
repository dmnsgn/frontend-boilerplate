gulp-frontend-boilerplate
=========================

> A gulp boilerplate with common frontend tasks.

This is a work in progress. Feel free to contribute.


## Install
### Requirements

Node (use brew or install it from [here](http://nodejs.org/download/))
```bash
$ brew install node
```
Gulp (are you new with the streaming build system ? Take a sip [here](https://github.com/gulpjs/gulp/blob/master/docs/getting-started.md#getting-started))
```bash
$ npm install -g gulp
```
Sass (go check on its superpowers [here](http://sass-lang.com/))
```bash
$ gem install sass compass sass-css-importer sass-globbing
```
### Clone this repository or grab it from npm
```bash
$ git clone https://github.com/dmnsgn/gulp-frontend-boilerplate.git

$ npm i gulp-frontend-boilerplate
```
### Install dependencies
```bash
// Npm
$ npm install
```
## Usage

### Configuration

Open `gulp/config.js` with your favorite text editor.

|Option|Type|Default
|:---------|:---------:|:----------:|
|**verbose**: provide a more verbose output when available (useful for debugging).|Boolean|false|
|**port**: the server port.|Number|3000|
|**src**: the source folder path, that's where you write code.|String|src|
|**dist**: the destination folder path, that's where your code is compiled.|String|dist|
|**test**: the `test` folder path.|String|test|
|**browsers**: the browser(s) targeted for autoprefixer and autopolyfiller (see full list of options [here](https://github.com/ai/autoprefixer#browsers))|Array|['last 2 version', 'safari 5', 'ie 8', 'ie 9', 'opera 12.1', 'ios 6', 'android 4']|
|**prodUrl**: the absolute url to use in the sitemap|String|''|
|**analyticsUA**: your google analytics UA|String|''|
|**banner**: add a text header above your main files.|String|*filled with `package.json` datas*|


### Gulp tasks

#### Launch it
This is the default task.
```bash
gulp
```
All the magic begins here:

* process `.html` files
* process `.scss` files
* process `.js` and `.coffee` files with lint reports
* create a server with BrowserSync and serve `dist` folder
* watch changes in source folder
* reload on changes in source folder

---
Note: if you just want to build the project and serve a 'production ready' version, run `gulp --prod`.


#### Make changes

 * Write your markup in `src` folder and in `src/inc`. Include your partials with `<!-- @include templates/_filename.html -->`
 * Add some `scss` styles.
 * Add some `scripts`: `.js` or `.coffee`.
 * Add images in the - wait for it - `images` folder.
 * Generate a spritesheet with corresponding mixins (located in `styles/_sprite.scss`) by adding `.png` files into `images/sprite` folder .

#### Build for deploy

When you are happy with your changes, run:
```bash
gulp build
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
Note: Each task is self documented. You can use them individually (e.g. `gulp images:spritesheet`, `gulp images:optimization`) but you should use the tasks above (`default` then `build`. Then `default` if neeeded and `build` again. `serve` to check if all is ok before deploying).


## External issues
* Gaze break watchers when renaming folder: https://github.com/shama/gaze/issues/56. Waiting for gaze 0.6 https://github.com/gulpjs/gulp/issues/600
* watch doesn't work when adding files: https://github.com/floatdrop/gulp-watch/issues/50
* Run sequence is intended to be a temporary solution until orchestrator is updated to support non-dependent ordered tasks: https://github.com/gulpjs/gulp/issues/347
* Gulp 4 will change. A lot: https://github.com/gulpjs/gulp/issues/355 & https://github.com/gulpjs/gulp/issues/347

##Licence

MIT
