// split-json-stream.js
const fs = require('fs');
const path = require('path');
const { parser } = require('stream-json');
const { streamArray } = require('stream-json/streamers/StreamArray');

const INPUT = 'all-cards.json';
const OUTPUT_DIR = 'split-cards';
const CHUNK_SIZE = 10000;

if (!fs.existsSync(OUTPUT_DIR)) fs.mkdirSync(OUTPUT_DIR);

let chunk = [];
let fileCount = 0;

const pipeline = fs.createReadStream(INPUT)
  .pipe(parser())
  .pipe(streamArray());

pipeline.on('data', ({ value }) => {
  chunk.push(value);
  if (chunk.length === CHUNK_SIZE) {
    const outPath = path.join(OUTPUT_DIR, `cards-${fileCount}.json`);
    fs.writeFileSync(outPath, JSON.stringify(chunk));
    console.log(`Wrote ${outPath} (${chunk.length} cards)`);
    chunk = [];
    fileCount++;
  }
});

pipeline.on('end', () => {
  if (chunk.length > 0) {
    const outPath = path.join(OUTPUT_DIR, `cards-${fileCount}.json`);
    fs.writeFileSync(outPath, JSON.stringify(chunk));
    console.log(`Wrote ${outPath} (${chunk.length} cards)`);
  }
  console.log('Done!');
});