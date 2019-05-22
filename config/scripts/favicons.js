import path from "path";
import fs from "fs";
import mkdirp from "mkdirp";
import favicons from "favicons";
import chalk from "chalk";

import { NODE_ENV, ROOT, PATHS, PACKAGE, GIT_INFO } from "../config";

const source = path.join(ROOT, PATHS.get("src"), "/assets/favicon.png");
const faviconPath = "/images/favicon/";
const destination = path.join(ROOT, PATHS.get("dist"), faviconPath);

const configuration = {
  path: faviconPath, // Path for overriding default icons path. `string`
  appName: PACKAGE.config.title, // Your application's name. `string`
  appDescription: PACKAGE.config.description, // Your application's description. `string`
  developerName: PACKAGE.author.name, // Your (or your developer's) name. `string`
  developerURL: PACKAGE.author.url, // Your (or your developer's) URL. `string`
  dir: "auto", // Primary text direction for name, short_name, and description
  lang: PACKAGE.config.lang, // Primary language for name and short_name
  background: "#fff", // Background colour for flattened icons. `string`
  theme_color: "#fff", // Theme color for browser chrome. `string`
  display: "standalone", // Android display: "browser" or "standalone". `string`
  orientation: "portrait", // Android orientation: "portrait" or "landscape". `string`
  start_url: "/?homescreen=1", // Android start application's URL. `string`
  version: GIT_INFO.get("version"), // Your application's version number. `number`
  logging: NODE_ENV === "development", // Print logs to console? `boolean`
  icons: {
    // Platform Options:
    // - offset - offset in percentage
    // - shadow - drop shadow for Android icons, available online only
    // - background:
    //   * false - use default
    //   * true - force use default, e.g. set background for Android icons
    //   * color - set background for the specified icons
    //
    android: true, // Create Android homescreen icon. `boolean` or `{ offset, background, shadow }`
    appleIcon: true, // Create Apple touch icons. `boolean` or `{ offset, background }`
    appleStartup: true, // Create Apple startup images. `boolean` or `{ offset, background }`
    coast: true, // Create Opera Coast icon with offset 25%. `boolean` or `{ offset, background }`
    favicons: true, // Create regular favicons. `boolean`
    firefox: true, // Create Firefox OS icons. `boolean` or `{ offset, background }`
    windows: true, // Create Windows 8 tile icons. `boolean` or `{ background }`
    yandex: true // Create Yandex browser icon. `boolean` or `{ background }`
  }
};

const callback = (error, response) => {
  if (error) {
    console.log(chalk.red(error.status)); // HTTP error code (e.g. `200`) or `null`
    console.log(chalk.red(error.name)); // Error name e.g. "API Error"
    console.log(chalk.red(error.message)); // Error description e.g. "An unknown error has occurred"
    return;
  }

  if (response.images) {
    mkdirp.sync(destination);
    response.images.forEach(image =>
      fs.writeFileSync(`${destination}${image.name}`, image.contents)
    );
    console.log(chalk.green("Favicons images generated."));
  } else {
    console.log(chalk.yellow("Favicons images missing in the response."));
  }

  if (response.files) {
    mkdirp.sync(destination);
    response.files.forEach(file =>
      fs.writeFileSync(`${destination}${file.name}`, file.contents)
    );
    console.log(chalk.green("Favicons files generated."));
  } else {
    console.log(chalk.yellow("Favicons files missing in the response."));
  }

  if (response.html) {
    fs.writeFileSync(
      `${PATHS.get("src")}/templates/_favicons.ejs`,
      response.html.join("\n")
    );
    console.log(chalk.green("Favicons template generated."));
  } else {
    console.log(chalk.yellow("Favicons template missing in the response."));
  }
};

favicons(source, configuration, callback);
