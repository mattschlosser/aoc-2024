/**
 * @template T
 * @param {T[]} array
 * @return {Record<T, number>}
 */
export const counts = (array) => {
  return array.reduce((a, e) => {
    a[e] ??= 0;
    a[e]++;
    return a;
  }, {});
};

export const checkLevel = (levels) => {
  const increasing = levels.reduce((acc, e, i) => {
    if (!i) return acc;
    const current = levels[i - 1] < levels[i];
    return current && acc;
  }, true);
  const decreasing = levels.reduce((acc, e, i) => {
    if (!i) return acc;
    const current = levels[i - 1] > levels[i];
    return current && acc;
  }, true);
  const diffs = levels.reduce(
    (acc, e, i) => {
      if (!i) return acc;
      acc.max = Math.max(acc.max, Math.abs(levels[i] - levels[i - 1]));
      acc.min = Math.min(acc.min, Math.abs(levels[i] - levels[i - 1]));
      return acc;
    },
    { max: 0, min: Infinity }
  );
  return (increasing || decreasing) && diffs.max <= 3 && diffs.min >= 1;
};

/**
 * Rotates a 2x2 array counterclockwise
 *
 * @param {any[]}
 * @return {any[]}
 */
export const rotate = (grid) => {
  let copy = [];
  for (let j in grid[0]) {
    copy.push([]);
  }
  for (let j in grid[0]) {
    for (let i in grid) {
      copy[grid[0].length - j - 1][i] = grid[i][j];
    }
  }
  return copy;
};

/**
 * Gets the midpoint of an array
 *
 * @template T
 * @param {T[]} nums
 * @return {T}
 */
export const getMidPoint = (nums) => nums[(nums.length + 1) / 2 - 1];
