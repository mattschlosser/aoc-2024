// import * as lib from '../lib.js';
import fs from 'node:fs/promises';
import { getMidPoint } from '../lib.mjs';
let file = await fs.readFile('./input');
const lines = file.toString().split(/\r?\n/);

let targets = {};

for (let line of lines) {
  let [target, nums] = line.split(': ');
  nums = nums.split(' ').map((e) => +e);
  targets[target] = nums;
}

const sumOrMulToTraget = (target, [first, second, ...rest]) => {
  if (second === undefined) {
    return target === first;
  }
  if (first > target) {
    return false;
  }
  return (
    sumOrMulToTraget(target, [first + second, ...rest]) ||
    sumOrMulToTraget(target, [first * second, ...rest])
  );
};

const sumMulorConcatToTarget = (target, [first, second, ...rest]) => {
  if (second === undefined) {
    return target === first;
  }
  if (first > target) {
    return false;
  }
  return (
    sumMulorConcatToTarget(target, [first + second, ...rest]) ||
    sumMulorConcatToTarget(target, [first * second, ...rest]) ||
    sumMulorConcatToTarget(target, [+`${first}${second}`, ...rest])
  );
};

const part1 = (targets) => {
  let values = 0;
  for (let target in targets) {
    let isValid = sumOrMulToTraget(+target, targets[target]);
    if (isValid) {
      values += +target;
    }
  }
  return values;
};

const part2 = (targets) => {
  let values = 0;
  for (let target in targets) {
    let isValid = sumMulorConcatToTarget(+target, targets[target]);
    if (isValid) {
      values += +target;
    }
  }
  return values;
};
console.log(part1(targets));
console.log(part2(targets));
