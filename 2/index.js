// import * as lib from '../lib.js';
import fs from 'node:fs/promises';
import { checkLevel } from '../lib.mjs';
let file = await fs.readFile('./input');
const reports = file.toString().split(/\r?\n/);

const solve = (reports) => {
  let count = 0;
  for (const report of reports) {
    const levels = report.split(/\s+/).map((e) => +e);
    let result = checkLevel(levels);
    if (result) {
      count++;
    }
  }
  return count;
};

const solve2 = (reports) => {
  let count = 0;
  for (const report of reports) {
    const levels = report.split(/\s+/).map((e) => +e);
    let result = checkLevel(levels);
    if (result) {
      count++;
    } else {
      for (let i in levels) {
        let l = levels.toSpliced(i, 1);
        let result = checkLevel(l);
        if (result) {
          count++;
          break;
        }
      }
    }
  }
  return count;
};

console.log(solve(reports));
console.log(solve2(reports));
