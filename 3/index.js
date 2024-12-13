// import * as lib from '../lib.js';
import fs from 'node:fs/promises';
import { checkLevel } from '../lib.mjs';
let file = await fs.readFile('./input');
const commands = file.toString().split(/\r?\n/);

console.log(commands);

let equations = [
  ...commands[0].matchAll(/mul\((\d{1,3}),(\d{1,3})\)|do\(\)|don't\(\)/g),
];
// console.log(equations);

let sum = 0;
let enabled = true;
for (const equation of equations) {
  if (equation[0] == 'do()') {
    enabled = true;
  } else if (equation[0] == "don't()") {
    enabled = false;
  } else if (enabled) {
    console.log(equation);
    sum += equation[1] * equation[2];
  }
}

console.log(sum);
