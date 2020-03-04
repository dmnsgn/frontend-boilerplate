import "@babel/polyfill";
import App from "./App";

const app = new App();
import * as OfflinePluginRuntime from "offline-plugin/runtime";
OfflinePluginRuntime.install();
