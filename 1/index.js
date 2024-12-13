// import * as lib from '../lib.js';
import fs from 'node:fs/promises';
import { counts } from '../lib.mjs';
let file = await fs.readFile('./input');
const lines = file.toString().split(/\r?\n/);
const lefts = [];
const rights = [];
for (const line of lines) {
  const [left, right] = line.split(/\s+/);
  lefts.push(+left);
  rights.push(+right);
}

lefts.sort();
rights.sort();

console.log(lefts);
console.log(rights);

let diffs = 0;
for (const index in lefts) {
  diffs += Math.abs(lefts[index] - rights[index]);
}

console.log(diffs);

const numCounts = counts(rights);

let score = 0;

for (const left of lefts) {
  score += left * (numCounts[left] ?? 0);
}

console.log(score);
