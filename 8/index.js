// import * as lib from '../lib.js';
import fs from 'node:fs/promises';
let file = await fs.readFile('./input');
const lines = file.toString().split(/\r?\n/);

let map = lines.map((line) => line.split(''));

/**
 * @param {string[][]} map 2d map of a list of antennas
 * 
 * Antennas are represented by a digit/letter. Empty spaces are represented by a '.'
 * 
 * Each pair of antennas creates two antinodes on either side of the antennas, equidistantly
 * propportional to their distance from each other. 
 */
const calculateAntinodes = (map) => {
  /** Keeps track of where each  */
  let locations = {};
  const HEIGHT = map.length;
  const WIDTH = map[0].length;
  let visited = {};
  for (let row in map) {
    for (let col in map[row]) {
      let node = map[row][col];
      if (node !== '.') {
        if (locations[node]) {
          for (let location of locations[node]) {
            let antinodes = calculateAntinodeLocations(
              { x: +row, y: +col },
              location
            );
            for (let antinode of antinodes) {
              if (antinode.x < 0 || antinode.x >= WIDTH) {
                continue;
              }
              if (antinode.y < 0 || antinode.y >= HEIGHT) {
                continue;
              }
              if (!visited[`${antinode.x},${antinode.y}`]) {
                visited[`${antinode.x},${antinode.y}`] = true;
              }
            }
          }
        }
        locations[node] ??= [];
        locations[node].push({ x: +row, y: +col });
      }
    }
  }
  return Object.keys(visited).length;
};

const calculateAntinodeLocations = (a, b) => {
  return [
    { x: b.x + b.x - a.x, y: b.y + b.y - a.y },
    { x: a.x + a.x - b.x, y: a.y + a.y - b.y },
  ];
};

const calculateAntinodeDeltas = (a, b) => {
  return [
    {
      dx: b.x - a.x,
      dy: b.y - a.y,
    },
    {
      dx: a.x - b.x,
      dy: a.y - b.y,
    },
  ];
};

const calculateAntinodesAdvanced = (map) => {
  let visited = {};
  const HEIGHT = map.length;
  const WIDTH = map[0].length;
  let locations = {};
  for (let row in map) {
    for (let col in map[row]) {
      let node = map[row][col];
      if (node !== '.') {
        if (locations[node]) {
          for (let location of locations[node]) {
            let antinodes = calculateAntinodeDeltas(
              { x: +row, y: +col },
              location
            );
            /** For the delta in each direction of each pair of nodes */
            for (let antinodeDelta of antinodes) {
              let antinode = { x: +row, y: +col };
              /**
               * While we are still on the map
               */
              while (true) {
                /**
                 * Add this node beceuase we already know it will be an antinode
                 */
                if (!visited[`${antinode.x},${antinode.y}`]) {
                  visited[`${antinode.x},${antinode.y}`] = true;
                }
                /**
                 * Add the deltas to find the next antinode
                 */
                antinode.x += antinodeDelta.dx;
                antinode.y += antinodeDelta.dy;
                /**
                 * If we've gone off the map, we cna stop
                 */
                if (antinode.x < 0 || antinode.x >= WIDTH) {
                  break;
                }
                if (antinode.y < 0 || antinode.y >= HEIGHT) {
                  break;
                }
              }
            }
          }
        }
        locations[node] ??= [];
        locations[node].push({ x: +row, y: +col });
      }
    }
  }
  return Object.keys(visited).length;
};

console.log(calculateAntinodes(map));
console.log(calculateAntinodesAdvanced(map));
