import { exec } from 'child_process';
import fs from 'fs';

import chalk from 'chalk';
import inquirer from 'inquirer';
import { Spinner } from 'cli-spinner';
import del from 'del';

import choices from './choices.js';
import pkg from '../../package.json';

const questions = [{
  type: 'input',
  name: 'app_name',
  message: 'App name',
  default: 'App'
}, {
  type: 'list',
  name: 'language',
  message: 'Script compiler/transpiler:',
  choices: choices(`${__dirname}/language/`)
}, {
  type: 'list',
  name: 'framework',
  message: 'JS framework:',
  choices: choices(`${__dirname}/framework/`)
}, {
  type: 'list',
  name: 'preprocessor',
  message: 'CSS preprocessor:',
  choices: choices(`${__dirname}/preprocessor/`)
}];

// Inspired by https://github.com/mattdesl/shimbro/
function hasTransform(transforms, key) {
  for (let i = 0; i < transforms.length; i++) {
    const t = transforms[i];
    if (typeof t === 'string' && t === key) {
      return true;
    } else if (t[0] === key) {
      return true;
    }
  }
  return false;
}

function updatePackageFile(appName, transform, extensions) {
  pkg.title = appName;
  pkg.extensions = extensions;

  if (!pkg.browserify) {
    pkg.browserify = {
      transform
    };
    console.log(chalk.green(`Adding ${transform.join(' ')} transform(s) to package.json.`));
  } else if (!pkg.browserify.transform) {
    pkg.browserify.transform = transform;
    console.log(chalk.green(`Adding ${transform.join(' ')} transform(s) to package.json.`));
  } else {
    let transforms = pkg.browserify.transform;

    if (typeof transforms === 'string') {
      transforms = [transforms];
    }

    if (!Array.isArray(transforms)) {
      throw new Error('Browserify transform object should be a string or an array');
    }

    const newTransforms = [];
    for (let i = 0; i < transform.length; i++) {
      if (!hasTransform(transforms, transform[i])) {
        newTransforms.push(transform[i]);
      }
    }

    if (newTransforms.length === 0) {
      console.log(chalk.yellow('All transforms already in package.json.'));
      return;
    }
    transforms = transforms.concat(newTransforms);
    pkg.browserify.transform = transforms;

    console.log(chalk.green(`Adding ${newTransforms.join(' ')} transform(s) to package.json.`));
  }

  fs.writeFile(`${process.cwd()}/package.json`, JSON.stringify(pkg, undefined, 2));
}

function updateSourceFiles(extensions, cb) {
  inquirer.prompt([{
    type: 'confirm',
    name: 'delete_sourcefiles',
    message: `Remove files in source folder that don't have the following extensions: \
${extensions.styles} ${extensions.scripts}`,
    default: true
  }]).then((data) => {
    if (data.delete_sourcefiles) {
      del([
        `${pkg.directories.src}/styles/**/*.!(${extensions.styles})`,
        `${pkg.directories.src}/scripts/**/*.!(${extensions.scripts})`
      ], cb());
    } else {
      cb();
    }
  });
}

function updateDependencies(dependencies, devDependencies) {
  let command = '';

  if (dependencies.join('') !== '') {
    command += `npm install --save ${dependencies.join(' ')} && `;
  }
  if (devDependencies.join('') !== '') {
    command += `npm install --save-dev ${devDependencies.join(' ')} && `;
  }
  command += 'npm install';
  if (dependencies || devDependencies) {
    const spinner = new Spinner('This may take a while.');
    spinner.setSpinnerString('|/-\\');
    spinner.start();

    console.log(chalk.green(
      'Installing dependencies and adding them to package.json...',
      dependencies.join(' '),
      devDependencies.join(' ')
    ));

    exec(command, (error, stdout) => {
      spinner.stop();
      console.log(stdout);
      if (error !== null) {
        console.log(error);
      }
    });
  }
}

inquirer.prompt(questions).then((data) => {
  const transform = [
    ...(data.language.transform || []),
    ...(data.framework.transform || [])
  ];
  const extensions = {
    scripts: data.language.extension || 'js',
    styles: data.preprocessor.extension || 'css'
  };
  updatePackageFile(data.app_name, transform, extensions);

  updateSourceFiles(extensions, () => {
    const dependencies = [
      ...(data.language.dependencies || []),
      ...(data.framework.dependencies || []),
      ...(data.preprocessor.dependencies || [])
    ];
    const devDependencies = [
      ...(data.language.devDependencies || []),
      ...(data.framework.devDependencies || []),
      ...(data.preprocessor.devDependencies || [])
    ];
    updateDependencies(dependencies, devDependencies);
  });
});
