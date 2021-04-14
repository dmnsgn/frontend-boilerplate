import { writeFileSync } from "fs";
import { join } from "path";
import robotstxt from "generate-robotstxt";

import { ROOT, PATHS, PACKAGE } from "../config.js";

const destination = join(ROOT, PATHS.get("dist"), "robots.txt");

const options = {
  policy: [
    {
      userAgent: "Googlebot",
      allow: "/",
      disallow: "/search",
      crawlDelay: 2,
    },
    {
      userAgent: "*",
      allow: "/",
      disallow: "/search",
      crawlDelay: 10,
      cleanParam: "ref /articles/",
    },
  ],
  sitemap: `${PACKAGE.config.url}/sitemap.xml`,
  host: PACKAGE.config.url,
};

robotstxt(options).then((content) => writeFileSync(destination, content));
