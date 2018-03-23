import fs from "fs";
import path from "path";
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
${PACKAGE.description}
Compiled: ${Date()}
@version v${GitRevSync.count()}
@link ${PACKAGE.homepage}
@copyright ${PACKAGE.license}`;

// https://github.com/ai/browserslist
const BROWSERS = [
  "last 2 Android versions", // for Android WebView.
  "last 2 BlackBerry versions", // or bb for Blackberry browser.
  "last 2 Chrome versions", // for Google Chrome.
  "last 2 ChromeAndroid versions", // or and_chr for Chrome for Android
  "last 2 Edge versions", // for Microsoft Edge.
  "last 2 Electron versions", // for Electron framework. It will be converted to Chrome version.
  "last 2 Explorer versions", // or ie for Internet Explorer.
  "last 2 ExplorerMobile versions", // or ie_mob for Internet Explorer Mobile.
  "last 2 Firefox versions", // or ff for Mozilla Firefox.
  "last 2 FirefoxAndroid versions", // or and_ff for Firefox for Android.
  "last 2 iOS versions", // or ios_saf for iOS Safari.
  "last 2 Opera versions", // for Opera.
  "last 2 OperaMini versions", // or op_mini for Opera Mini.
  "last 2 OperaMobile versions", // or op_mob for Opera Mobile.
  "last 2 QQAndroid versions", // or and_qq for QQ Browser for Android.
  "last 2 Safari versions", // for desktop Safari.
  "last 2 Samsung versions", // for Samsung Internet.
  "last 2 UCAndroid versions" // or and_uc for UC Browser for Android.
];

export { NODE_ENV, ROOT, PATHS, PACKAGE, GIT_INFO, BANNER, BROWSERS };
