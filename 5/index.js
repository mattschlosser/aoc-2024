// import * as lib from '../lib.js';
import fs from 'node:fs/promises';
import { getMidPoint } from '../lib.mjs';
let file = await fs.readFile('./input');
const lines = file.toString().split(/\r?\n/);

const map = [];
const rejectedLines = [];
let count = 0;
let mapFinished = false;

const isLineGood = (nums, map) => {
  let lineIsGood = true;
  for (let [key, value] of map) {
    let firstIndex = nums.findIndex((e) => e === key);
    let secondIndex = nums.findIndex((e) => e === value);
    if (firstIndex !== -1 && secondIndex !== -1 && secondIndex < firstIndex) {
      lineIsGood = false;
      // auto-patch the line
      nums[firstIndex] = value;
      nums[secondIndex] = key;
    }
  }
  return lineIsGood;
};

for (let line of lines) {
  if (line == '') {
    mapFinished = true;
    continue;
  }
  if (!mapFinished) {
    let [key, value] = line.split('|');
    map.push([+key, +value]);
  } else {
    /** @type {number[]} */
    let nums = line.split(',').map((e) => +e);
    let lineIsGood = isLineGood(nums, map);
    if (lineIsGood) {
      count += getMidPoint(nums);
    } else {
      rejectedLines.push(nums);
    }
  }
}

console.log(count);

let secondCount = 0;
for (let line in rejectedLines) {
  let lineIsGood = isLineGood(rejectedLines[line], map);
  while (!lineIsGood) {
    lineIsGood = isLineGood(rejectedLines[line], map);
  }
  secondCount += getMidPoint(rejectedLines[line]);
}

console.log(secondCount);
