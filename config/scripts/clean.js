import del from "del";
import chalk from "chalk";

import { PATHS } from "../config.js";

del.sync([
  `${PATHS.get("dist")}/**`,
  `!${PATHS.get("dist")}`,
  `!${PATHS.get("dist")}/static/**`,
]);
console.log(chalk.green(`${PATHS.get("dist")} files deleted.`));
