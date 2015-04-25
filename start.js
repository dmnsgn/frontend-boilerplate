"use strict";

var exec     = require('child_process').exec;
var fs       = require('fs')
var chalk    = require('chalk')

var inquirer = require('inquirer');

var questions = [
  {
    type: "input",
    name: "app_name",
    message: "What's your app name?",
    default: 'App'
  },
  {
    type: "list",
    name: "scripts_language",
    message: "What scripts compiler/transpiler do you want to use?",
    choices: [
      {
        name: "ECMAScript 6 (ES6 using Babel transpiler)",
        value: {
          devDependencies: ["babelify"],
          transform: ["babelify"]
        }
      },
      {
        name: "Coffeescript",
        value: {
          extension: 'coffee',
          devDependencies: ["coffeeify"],
          transform: ["coffeeify"]
        }
      },
      {
        name: "Good ol' JS",
        value: {
          extension: 'js',
        }
      }
    ]
  },
  {
    type: "list",
    name: "scripts_framework",
    message: "What js framework do you want to use?",
    choices: [
      {
        name: "React + JSX",
        value: {
          devDependencies: ["reactify"],
          dependencies: ["react"],
          transform: ["reactify"]
        }
      },
      {
        name: "Backbone.js",
        value: {
          dependencies: ["backbone"]
        }
      },
      {
        name: "Backbone.js + Marionette.js",
        value: {
          dependencies: ["backbone", "backbone.marionette"]
        }
      },
      {
        name: "Nothing, I am fine",
        value: {}
      }
    ]
  },
  {
    type: "list",
    name: "styles",
    message: "What css preprocessor do you want to use?",
    choices: [
      {
        name: "Sass",
        value: {
          extension: 'scss',
          dependencies: ["sass-easing", "sass-font-face"],
          devDependencies: ["gulp-ruby-sass"]
        }
      },
      {
        name: "Less",
        value: {
          extension: 'less',
          dependencies: ["less-easing", "less-font-face"],
          devDependencies: ["gulp-less", "less-plugin-glob"]
        }
      },
      {
        name: "Stylus",
        value: {
          extension: 'styl',
          dependencies: ["styl-easing", "styl-font-face"],
          devDependencies: ["gulp-styl"]
        }
      },
      {
        name: "Nothing, I am fine",
        value: {
          extension: 'css',
        }
      }
    ]
  }
];

inquirer.prompt(questions, function(datas) {

  var transform = ['browserify-shim'].concat(datas.scripts_language.transform, datas.scripts_framework.transform);
  var extensions = {
    scripts: datas.scripts_language.extension || 'js',
    styles: datas.styles.extension || 'css'
  }
  updatePackageFile(datas.app_name, transform.filter(function(t) { return t; }), extensions);

  var dependencies = [].concat(datas.scripts_language.dependencies, datas.scripts_framework.dependencies, datas.styles.dependencies);
  var devDependencies = [].concat(datas.scripts_language.devDependencies, datas.scripts_framework.devDependencies, datas.styles.devDependencies);
  updateDependencies(dependencies, devDependencies);

});

// Inspired by https://github.com/mattdesl/shimbro/
function hasTransform(transforms, key) {
  for (var i=0; i<transforms.length; i++) {
    var t = transforms[i];
    if (typeof t === "string" && t == key){
      return true;
    } else if (t[0] == key) {
      return true;
    }
  }
  return false;
}

function updatePackageFile(appName, transform, extensions) {
  var path = './package.json';
  var file = fs.readFileSync(path);
  var pkg = JSON.parse(file);

  pkg.title = appName;
  pkg.extensions = extensions;

  if (!pkg.browserify) {
    pkg.browserify = {
      'transform': transform
    };
    console.log(chalk.green('Adding ' + transform.join(' ') + ' transforms to package.json.'));
  } else if (!pkg.browserify.transform) {
    pkg.browserify.transform = transform;
    console.log(chalk.green('Adding ' + transform.join(' ') + ' transforms to package.json.'));
  } else {

    var transforms = pkg.browserify.transform;

    if (typeof transforms === 'string') {
      transforms = [ transforms ];
    }

    if (!Array.isArray(transforms)) {
      throw 'Browserify transform object should be a string or an array';
    }

    var newTransforms = [];
    for (var i = 0; i < transform.length; i++) {
      if (!hasTransform(transforms, transform[i])) {
        newTransforms.push(transform[i])
      }
    }

    if (newTransforms.length == 0) {
      console.log(chalk.yellow('All transforms already in package.json.'));
      return;
    } else {
      transforms = transforms.concat(newTransforms);

      pkg.browserify.transform = transforms;

      console.log(chalk.green('Adding ' + newTransforms.join(' ') + ' transforms to package.json.'));
    }
  }

  fs.writeFile(path, JSON.stringify(pkg, undefined, 2));

}


function updateDependencies(dependencies, devDependencies) {

  var command = '';

  if (dependencies.join('') !== '') {
    command += 'npm install --save' + dependencies.join(' ');
  }
  if (devDependencies.join('') !== '') {
    command += '; npm install --save-dev ' + devDependencies.join(' ');
  }
  command += '; npm install';

  if (dependencies || devDependencies) {
    console.log(chalk.green('Installing dependencies and adding them to package.json...', dependencies.join(' '), devDependencies.join(' ')));
    exec(command, function (error, stdout, stderr) {
      console.log(stdout);
      if (error !== null) {
        console.log(error);
      }
    });
  }
}
