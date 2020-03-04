import fs from "fs";
import path from "path";
import { createSitemap } from "sitemap";

import { ROOT, PATHS, PACKAGE } from "../config";

const destination = path.join(ROOT, PATHS.get("dist"), "sitemap.xml");

const sm = createSitemap({
  hostname: PACKAGE.config.url,
  cacheTime: 600000,
  urls: [
    {
      url: "/",
      changefreq: "weekly",
      priority: 1.0,
      lastmodrealtime: true
    }
  ]
});

fs.writeFileSync(destination, sm.toString());
