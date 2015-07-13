import fs from 'fs';
import path from 'path';

export default function(opts, cb) {

  let out = opts.src.map(function(filePath) {
    return fs.readFileSync(filePath).toString();
  });

  fs.exists(opts.dest, function (exists) {
    if (!exists) {
      fs.mkdirSync(opts.dest);
    }
    fs.writeFile(path.join(opts.dest, opts.fileName), out.join('\n'), function(err) {
      if (err) {
        console.log( err);
      } else if (cb) {
        cb();
      }
    });
  });
}
