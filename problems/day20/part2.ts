import { runTest } from "../utils/runTest.js";
import { enhance, pad } from "./part1.js";

const findSolution = (values: string[]): number => {
  const iterations = 50;
  const map = values[0];
  const input = pad(
    values.slice(2).map((row) => row.split("")),
    2
  );

  let output = input;
  for (let i = 0; i < iterations; i++) {
    // This is a little simplified - technically for odd values over 2, i = map[0] === '#' ? map[map.length-1] : map[0];
    output = enhance(output, map, i % 2 === 0 ? "." : map[0]);
  }

  return output.reduce(
    (acc, val) => acc + val.filter((char) => char === "#").length,
    0
  );
};

// 17325
export const solvePart = () =>
  runTest({
    day: 20,
    part: 2,
    testMethod: findSolution,
    test: false,
    allowComments: false,
  });
