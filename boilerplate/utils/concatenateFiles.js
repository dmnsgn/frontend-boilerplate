import fs from 'fs';
import path from 'path';

export default function (opts, cb) {
  const out = opts.src.map((filePath) => fs.readFileSync(filePath).toString());

  fs.exists(opts.dest, (exists) => {
    if (!exists) {
      fs.mkdirSync(opts.dest);
    }
    fs.writeFile(path.join(opts.dest, opts.fileName), out.join('\n'), (err) => {
      if (err) {
        console.log(err);
      } else if (cb) {
        cb();
      }
    });
  });
}
