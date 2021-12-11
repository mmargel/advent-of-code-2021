import { runTest } from "../utils/runTest.js";
import { Octopus, propagateOctopi } from "./part1.js";

const findSolution = (values: string[]): number => {
  const octopi = values.map((line) =>
    line.split("").map((val) => parseInt(val))
  ) as Octopus[][];

  const [_, generation] = propagateOctopi(octopi, 1000);
  return generation;
};

// 249
export const solvePart = () =>
  runTest({ day: 11, part: 2, testMethod: findSolution, test: false });
