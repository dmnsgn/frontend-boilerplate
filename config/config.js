import fs from "fs";
import GitRevSync from "git-rev-sync";

const NODE_ENV = process.env.NODE_ENV;
const ROOT = process.env.PWD;
const PATHS = new Map()
  .set("config", "config")
  .set("src", "src")
  .set("dist", "dist")
  .set("test", "test");

const PACKAGE = JSON.parse(
  fs.readFileSync("./package.json", { encoding: "utf-8" })
);

const GIT_INFO = new Map()
  .set("GIT_VERSION", GitRevSync.count())
  .set("GIT_DATE", GitRevSync.date())
  .set("GIT_TAG", GitRevSync.tag())
  .set("GIT_HASH", GitRevSync.short());

const BANNER = `${PACKAGE.config.title}
${PACKAGE.config.description}
Compiled: ${Date()}
@version v${GitRevSync.count()}
@link ${PACKAGE.config.url}
@copyright ${PACKAGE.config.copyright}`;

// https://github.com/ai/browserslist
const BROWSERS = ["defaults"];

export { NODE_ENV, ROOT, PATHS, PACKAGE, GIT_INFO, BANNER, BROWSERS };
