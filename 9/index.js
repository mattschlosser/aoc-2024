// import * as lib from '../lib.js';
import fs from 'node:fs/promises';
let file = await fs.readFile('./input');
const lines = file.toString().split(/\r?\n/);
const line = lines[0];

const part1 = line => {
  
  let index = 0;
  let freeSpaces = [];
  for (let i in line) {
    if (i % 2 !== 0) {
      freeSpaces.push([-1,+line[i]]);
      index += line[i];
      continue;
    }
    freeSpaces.push([i / 2, +line[i]]);
    index += line[i];
  }
  
  let result = [];
  let front = 0;
  let back = freeSpaces.length - 1;
  while (front <= back) {
    let [key,spaces] = freeSpaces[front];
    if (key >= 0 || spaces == 0) {
      result.push([key, spaces]);
    } else {
      // we have some empty spaces
      while (spaces > 0) {
        // get the last item from the spaces to move
        let toMove = freeSpaces[back];
        if (toMove[0] == -1 || toMove[1] == 0) {
          back--;
          continue;
        }
        // if we can only move some of the blocks
        let spacesToMove = Math.min(spaces, toMove[1]);
        // subtract the number of spaces we can move
        toMove[1] -= spacesToMove;
        // set the numbher of spaces we moved for the current element to zero
        spaces -= spacesToMove;
        // push the key and number of spaces to the result array
        result.push([toMove[0], spacesToMove]);
      }
    }
    front++;
  }

  let sum = 0;
  let resultIndex = 0;
  for (let [fileId, spaces] of result) {
    for (let i = 0; i < spaces; i++, resultIndex++) {
      sum += fileId * resultIndex;
    }
  }
  return sum;
}
console.log(part1(line));