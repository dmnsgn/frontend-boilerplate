import fs from 'fs';

export default function getChoicesFiles(path) {
  const results = [];

  fs.readdirSync(path).forEach((choice) => {
    results.push(JSON.parse(fs.readFileSync(path + choice, 'utf-8')));
  });

  return results;
}

