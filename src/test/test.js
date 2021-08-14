import css from "./test.css";
import ejs from "./test.ejs";
import glsl from "./test.glsl";
import html from "./test.html";
import img from "./test.png";
import less from "./test.less";
import md from "./test.md";
import scss from "./test.scss";
import styl from "./test.styl";
import svg from "./test.svg";
import svgSource from "./test.svg?source";
import svgSprite from "./test.svg?sprite";
import xml from "./test.xml";
import Component from "./test.ts";

console.log("css", css);
console.log("ejs", ejs({ data: "data" }));
console.log("glsl", glsl);
console.log("html", html);
console.log("img", img);
console.log("less", less);
console.log("md", md);
console.log("scss", scss);
console.log("styl", styl);
console.log("svg", svg);
console.log("svgSource", svgSource);
console.log("svgSprite", svgSprite);
console.log("xml", xml);

const svgImage = document.createElement("img");
svgImage.src = svg;
document.body.appendChild(svgImage);

// typescript
const component = new Component();
component.init();

// syntax-dynamic-import
async function getComponent() {
  var element = document.createElement("div");
  const { default: _ } = await import(
    /* webpackChunkName: "lodash" */ "lodash"
  );
  element.innerHTML = _.join(["Hello", "webpack"], " ");
  return element;
}

getComponent().then((component) => {
  console.log(component);
  document.body.appendChild(component);
});

// class-properties
export default class App {
  instanceProperty = "app";
  boundFunction = () => {
    return this.instanceProperty;
  };

  static staticProperty = "staticProperty";
  static staticFunction = function () {
    return App.staticProperty;
  };
}

// rest
let { x, y, ...z } = { x: 1, y: 2, a: 3, b: 4 };
console.log(x); // 1
console.log(y); // 2
console.log(z); // { a: 3, b: 4 }

// spread
let n = { x, y, ...z };
console.log(n); // { x: 1, y: 2, a: 3, b: 4 }
