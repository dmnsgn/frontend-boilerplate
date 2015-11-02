import fs from 'fs';

export default function getChoicesFiles(path) {
  let results = [];

  fs.readdirSync(path).forEach(function(choice) {
    results.push(JSON.parse(fs.readFileSync(path + choice, 'utf-8')));
  });

  return results;
}
