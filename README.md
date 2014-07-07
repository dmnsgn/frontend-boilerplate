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

### Clone this repository

	git clone https://github.com/DamienSeguin/gulp-frontend-boilerplate.git

### Install dependencies

	npm install

## Usage

### Configuration

Open `gulp/config.js` with your favorite text editor.

|Option|Type|Default
|:---------|:---------:|:----------:|
|**verbose**: provide a more verbose output when available (useful for debugging).|Boolean|false|
|**port**: the connect webserver port.|Number|8080|
|**src**: the source folder, that's where you write code.|String|src|
|**dist**: the destination folder, that's where your code is compiled.|String|dist|
|**autoprefixer**: the browser(s) targeted (see full list of options [here](https://github.com/ai/autoprefixer#browsers))|Array|['last 2 version', 'safari 5', 'ie 8', 'ie 9', 'opera 12.1', 'ios 6', 'android 4']|
|**copyFiles**: a list of file copied directly to the dist folder|Array|[]|
|**banner**: add a text header above your main files.|String|*filled with `package.json` datas*|


### Gulp tasks

#### Launch it
This is the default task.

	gulp

All the magic begins here:

* create a simple server with livereload
* serve to localhost
* copy non-processed files to dist folder
* watch changes in source folder
* reload on changes

---
Note: Each task is self documented if you want to use them individually (e.g. `gulp spritesheet`, `gulp images`)

#### Make changes
 * Write your markup in `src` folder
 * Add some styles and some scripts
 * Add images in the - wait for it - `images` folder.
 * Generate a spritesheet with corresponding mixins (located in `styles/_sprite.scss`) by adding `.png` files into `images/sprite` folder .


#### Clean it
Clean dist dir and clear all caches (sass cache, gulp-cache)

	gulp clean


## External issues
* Gaze break watchers when renaming folder : https://github.com/shama/gaze/issues/56
* connect deprecated connect(middleware) warning : https://github.com/AveVlad/gulp-connect/issues/67
* images task is slow

##Licence
MIT
