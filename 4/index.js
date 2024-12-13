// import * as lib from '../lib.js';
import fs from 'node:fs/promises';
import { rotate } from '../lib.mjs';
let file = await fs.readFile('./input');
const commands = file.toString().split(/\r?\n/);
let grid = commands.map((command) => command.split(''));

const countXmas = (grid) => {
  let count = 0;

  for (let i = 0; i < grid.length; i++) {
    for (let j = 3; j < grid[i].length; j++) {
      if (
        grid[i][j - 3] == 'X' &&
        grid[i][j - 2] == 'M' &&
        grid[i][j - 1] == 'A' &&
        grid[i][j] == 'S'
      ) {
        count++;
      }
    }
  }
  for (let i = 3; i < grid.length; i++) {
    for (let j = 3; j < grid[i].length; j++) {
      if (
        grid[i - 3][j - 3] == 'X' &&
        grid[i - 2][j - 2] == 'M' &&
        grid[i - 1][j - 1] == 'A' &&
        grid[i][j] == 'S'
      ) {
        count++;
      }
    }
  }
  return count;
};

const countMas = (acc, grid) => {
  for (let i = 2; i < grid.length; i++) {
    for (let j = 2; j < grid[i].length; j++) {
      if (
        grid[i - 2][j - 2] == 'M' &&
        grid[i - 1][j - 1] == 'A' &&
        grid[i][j] == 'S'
      ) {
        acc[i - 1][j - 1]++;
      }
    }
  }
};

const part1 = (grid) => {
  let count = 0;
  count += countXmas(grid);

  for (let i = 0; i <= 2; i++) {
    grid = rotate(grid);
    count += countXmas(grid);
  }
  return count;
};

const part2 = () => {
  let acc = new Array(grid.length)
    .fill(0)
    .map(() => new Array(grid[0].length).fill(0));

  countMas(acc, grid);

  for (let i = 0; i <= 2; i++) {
    grid = rotate(grid);
    acc = rotate(acc);
    countMas(acc, grid);
  }
  let count = 0;
  for (let i = 1; i < acc.length; i++) {
    for (let j = 1; j < acc[i].length; j++) {
      count += acc[i][j] >= 2 ? 1 : 0;
    }
  }
  return count;
};

console.log(part1(grid));
console.log(part2(grid));
