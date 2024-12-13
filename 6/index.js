// import * as lib from '../lib.js';
import fs from 'node:fs/promises';
import { getMidPoint } from '../lib.mjs';
let file = await fs.readFile('./input');
const lines = file.toString().split(/\r?\n/);

let map = lines.map((line) => line.split(''));

let guardRow = -1;
let guardCol = -1;
let searchMap = {
  up: [-1, 0],
  down: [1, 0],
  right: [0, 1],
  left: [0, -1],
};
let nextDir = {
  up: 'right',
  right: 'down',
  down: 'left',
  left: 'up',
};
for (let row in map) {
  let searchIndex = map[row].findIndex((e) => e == '^');
  if (searchIndex !== -1) {
    guardRow = +row;
    guardCol = searchIndex;
    break;
  }
}
console.log(guardRow, guardCol);

/**
 * For each place on the map, returns the number of different routes that
 * the guard can take and returns the total number of places visited
 */
let countRoutes = (map, { guardRow, guardCol }) => {
  let count = 1;
  let guardPos = 'up';
  let visited = {
    [`${guardRow},${guardCol}`]: true,
  };
  let advancedVisited = {};
  while (
    guardRow >= 0 &&
    guardRow <= map.length - 1 &&
    guardCol >= 0 &&
    guardCol <= map[0].length - 1
  ) {
    let nextRow = guardRow + searchMap[guardPos][0];
    let nextCol = guardCol + searchMap[guardPos][1];
    // if barrier
    if (!(nextRow in map) || !(nextCol in map[nextRow])) {
      // guard has left the map
      break;
    }
    if (map[nextRow][nextCol] == '#') {
      // turn the guard
      if (advancedVisited[`${guardRow},${guardCol},${guardPos}`]) {
        // we have looped
        return { count: Infinity, visited };
      } else {
        advancedVisited[`${guardRow},${guardCol},${guardPos}`] = true;
      }
      guardPos = nextDir[guardPos];
    } else {
      // advance the guard
      let key = `${nextRow},${nextCol}`;
      if (!visited[key]) {
        count += 1;
        visited[key] = true;
      }
      guardRow = nextRow;
      guardCol = nextCol;
    }
  }
  return { count, visited };
};
let { visited, count } = countRoutes(map, { guardRow, guardCol });
console.log(count, visited);
// console.log(countRoutes(map, { guardRow, guardCol }).count);

// brute force method
let loopCount = 0;
for (let rowCol in visited) {
  let [row, col] = rowCol.split(',');
  if (map[row][col] !== '#' && map[row][col] !== '^') {
    map[row][col] = '#';
    let count = countRoutes(map, { guardRow, guardCol });
    if (count.count == Infinity) {
      loopCount++;
    }
    map[row][col] = '.';
  }
}
console.log(loopCount);

// console.log(map)
