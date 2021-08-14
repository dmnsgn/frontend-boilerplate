import markdownItTableOfContents from "markdown-it-toc-done-right";
import markdownItAttrs from "markdown-it-attrs";

import { NODE_ENV } from "../config.js";

const markup = {
  test: /\.html$/,
  exclude: /(index.html)/, // Exclude entry from the HtmlWebpackPlugin
  use: [
    {
      loader: "html-loader",
      options: {
        minimize: NODE_ENV === "production",
        sources: {
          urlFilter: (attribute, value) => {
            return !(attribute === "xlink:href" && /sprite\.svg/.test(value));
          },
        },
      },
    },
  ],
};

const ejs = {
  test: /\.ejs$/,
  use: [
    {
      loader: "ejs-loader",
      options: { esModule: false },
    },
  ],
};

const markdown = {
  test: /\.md$/,
  use: [
    ...markup.use,
    {
      loader: "markdown-it-loader",
      options: {
        preset: "default",
        html: true,
        linkify: true,
        typographer: true,
        use: [
          [
            markdownItAttrs,
            {
              leftDelimiter: "<!--attrs ",
              rightDelimiter: "-->",
              // allowedAttributes: [] // empty array = all attributes are allowed
            },
          ],
          [
            markdownItTableOfContents,
            {
              placeholder: "(<!--toc-->)", // Can't put space here :/
              containerClass: "TableOfContents",
              level: [2],
            },
          ],
        ],
      },
    },
  ],
};

export { markup, ejs, markdown };
