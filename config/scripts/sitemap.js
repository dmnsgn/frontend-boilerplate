import { writeFileSync } from "fs";
import { join } from "path";
import { Readable } from "stream";
import { SitemapStream, streamToPromise } from "sitemap";

import { ROOT, PATHS, PACKAGE } from "../config.js";

const destination = join(ROOT, PATHS.get("dist"), "sitemap.xml");

const links = [];
const getPageInstance = (page) => {
  if (!page.pages) return;

  page.pages.forEach((page) => {
    getPageInstance(page);
    links.push({
      url: page.id === "index" ? "/" : `/${page.id}/`,
      changefreq: "weekly",
      priority: page.id === "index" ? 1.0 : 0.8,
      lastmodrealtime: true,
    });
  });
};
getPageInstance(PACKAGE.config);

(async () => {
  // Create a stream to write to
  const stream = new SitemapStream({
    hostname: PACKAGE.config.url,
    cacheTime: 600000,
  });

  writeFileSync(
    destination,
    (await streamToPromise(Readable.from(links).pipe(stream))).toString()
  );
})();
