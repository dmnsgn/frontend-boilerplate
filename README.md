gulp-frontend-boilerplate
=========================

> A gulp boilerplate with common frontend tasks.

This is a work in progress. Feel free to contribute.


## Install
### Requirements

Node (use brew or install it from [here](http://nodejs.org/download/))

	brew install node

Gulp (are you new with the streaming build system ? Take a sip [here](https://github.com/gulpjs/gulp/blob/master/docs/getting-started.md#getting-started))

	npm install -g gulp

Sass (go check on its superpowers [here](http://sass-lang.com/))

	gem install sass

Bower (A package manager for the web, [here](http://bower.io/))

	npm install -g bower

Coffeescript: ["It's just JavaScript"](http://coffeescript.org/)

	sudo npm install -g coffee-script

Graphicsmagick (used for favicons task)

	brew install graphicsmagick

### Clone this repository

	git clone https://github.com/DamienSeguin/gulp-frontend-boilerplate.git

### Install dependencies

	// It's up to you to install packages with
	bower install <package> --save
	// Run at least once
	bower install

	// Npm
	npm install

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
|**bower**: the `bower_components` folder path (it has to be in the dist folder)|String|dist/bower_components|
|**browsers**: the browser(s) targeted for autoprefixer and autopolyfiller (see full list of options [here](https://github.com/ai/autoprefixer#browsers))|Array|['last 2 version', 'safari 5', 'ie 8', 'ie 9', 'opera 12.1', 'ios 6', 'android 4']|
|**prodUrl**: the absolute url to use in the sitemap|String|''|
|**analyticsUA**: your google analytics UA|String|''|
|**banner**: add a text header above your main files.|String|*filled with `package.json` datas*|


### Gulp tasks

#### Launch it
This is the default task.

	gulp

All the magic begins here:

* process `.html` files (adding bower dependencies and including templates)
* process `.scss` files (adding bower dependencies, autoprefixing for dev)
* process `.js` and `.coffee` files with lint reports
* create a server with BrowserSync and serve `dist` folder
* watch changes in source folder
* reload on changes in source folder

---
Note: if you just want to build the project and serve a 'production ready' version, run `gulp --prod`.


#### Make changes

 * Write your markup in `src` folder and in `src/templates`. Include your partials with `<!-- @include templates/_filename.html -->`
 * Add some `scss` styles.
 * Add some `scripts`: `.js` or `.coffee`.
 * Run your `bower install <package> --save`. This will automatically include the main files of each package. If there is a warning in your CLI, just include them manually (for instance, `<script src="bower_components/history.js/scripts/bundled-uncompressed/html5/native.history.js"></script>`) inside the build tag (`<!-- build:js scripts/main.min.js -->`)
 * Add images in the - wait for it - `images` folder.
 * Generate a spritesheet with corresponding mixins (located in `styles/_sprite.scss`) by adding `.png` files into `images/sprite` folder .

#### Build for deploy

When you are happy with your changes, run:

	gulp build

* Replace build tags with `.min` files, generates these minified files in `dist` folder (with optimization tasks)
* Add copyright headers and generate a `sitemap.xml`file

#### Tests tasks

Quick tests and stats with:

	// w3c validation
	gulp test:markup

	// mocha tests (written in test folder)
	gulp test:scripts

	// PageSpeed Insights reporter for mobile and desktop
	gulp test:psi


#### Clean it

Clean dist dir and clear all caches (sass cache, gulp cache)

	gulp clean

#### Help

This command will give you a list of all tasks available.

	gulp help

---
Note: Each task is self documented. You can use them individually (e.g. `gulp images:spritesheet`, `gulp images:optimization`) but you should use the tasks above (`default` then `build`. Then `default` if neeeded and `build` again. `serve` to check if all is ok before deploying).


## External issues
* Gaze break watchers when renaming folder: https://github.com/shama/gaze/issues/56. Waiting for gaze 0.6 https://github.com/gulpjs/gulp/issues/600
* watch doesn't work when adding files: https://github.com/floatdrop/gulp-watch/issues/50
* images task is slow
* Run sequence is intended to be a temporary solution until orchestrator is updated to support non-dependent ordered tasks: https://github.com/gulpjs/gulp/issues/347
* Gulp 4 will change. A lot: https://github.com/gulpjs/gulp/issues/355 & https://github.com/gulpjs/gulp/issues/347

### Change log

0.3.0

* Add browserify (coffee, hbs, sourcemaps)
* Add sass sourcemaps
* Remove jshint
* Muted images:favicons task

0.2.2

* Clean/Upgrade dependencies
* Update images:favicons tasks

0.2.1

* Update images:favicons tasks

0.2.0

* Switch from livereload to browsersync
* Add Bower
* Add coffeescript
* Add gulp-favicon
* Add test task
* Add mocha tests
* Add google analytics snippet and config UA option
* Add browserhappy snippet
* Code style: less task files, rename to `task:subtask`

##Licence

MIT
