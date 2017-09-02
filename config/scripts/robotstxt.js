import fs from "fs";
import path from "path";
import robotstxt from "generate-robotstxt";

import { ROOT, PATHS, PACKAGE } from "../config";

const destination = path.join(ROOT, PATHS.get("dist"), "robots.txt");

const options = {
  policy: [
    {
      userAgent: "Googlebot",
      allow: "/",
      disallow: "/search",
      crawlDelay: 2
    },
    {
      userAgent: "*",
      allow: "/",
      disallow: "/search",
      crawlDelay: 10,
      cleanParam: "ref /articles/"
    }
  ],
  sitemap: `${PACKAGE.homepage}/sitemap.xml`,
  host: PACKAGE.homepage
};

robotstxt(options).then(content => fs.writeFileSync(destination, content));
