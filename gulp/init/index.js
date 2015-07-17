import { exec } from 'child_process'
import fs from 'fs'

import chalk from 'chalk'
import inquirer from 'inquirer'

import choices from './choices.js'

let questions = [{
  type: "input",
  name: "app_name",
  message: "App name",
  default: 'App'
}, {
  type: "list",
  name: "language",
  message: "Script compiler/transpiler:",
  choices: choices(__dirname + '/language/')
}, {
  type: "list",
  name: "framework",
  message: "JS framework:",
  choices: choices(__dirname + '/framework/')
}, {
  type: "list",
  name: "preprocessor",
  message: "CSS preprocessor:",
  choices: choices(__dirname + '/preprocessor/')
}];

inquirer.prompt(questions, function(data) {

  let transform = [].concat(data.language.transform, data.framework.transform);
  let extensions = {
    scripts: data.language.extension || 'js',
    styles: data.preprocessor.extension || 'css'
  }
  updatePackageFile(data.app_name, transform.filter(function(t) {
    return t;
  }), extensions);

  let dependencies = [].concat(data.language.dependencies, data.framework.dependencies, data.preprocessor.dependencies).filter(function(n) {
    return n != undefined;
  });
  let devDependencies = [].concat(data.language.devDependencies, data.framework.devDependencies, data.preprocessor.devDependencies).filter(function(n) {
    return n != undefined;
  });
  updateDependencies(dependencies, devDependencies);

});

// Inspired by https://github.com/mattdesl/shimbro/
function hasTransform(transforms, key) {
  for (let i = 0; i < transforms.length; i++) {
    let t = transforms[i];
    if (typeof t === "string" && t == key) {
      return true;
    } else if (t[0] == key) {
      return true;
    }
  }
  return false;
}

function updatePackageFile(appName, transform, extensions) {
  let path = './package.json';
  let file = fs.readFileSync(path);
  let pkg = JSON.parse(file);

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

    let transforms = pkg.browserify.transform;

    if (typeof transforms === 'string') {
      transforms = [transforms];
    }

    if (!Array.isArray(transforms)) {
      throw 'Browserify transform object should be a string or an array';
    }

    let newTransforms = [];
    for (let i = 0; i < transform.length; i++) {
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

  let command = '';

  if (dependencies.join('') !== '') {
    command += 'npm install --save' + dependencies.join(' ') + ' && ';
  }
  if (devDependencies.join('') !== '') {
    command += 'npm install --save-dev ' + devDependencies.join(' ') + ' && ';
  }
  command += 'npm install';
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
