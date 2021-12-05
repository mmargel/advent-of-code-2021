import { runTest } from "../utils/runTest.js";
import { countIntersections, parseLines } from "./part1.js";

const findSolution = (values: string[]) => {
  const grid: number[][] = [];
  const lines = parseLines(values);

  return countIntersections(grid, lines, true);
};

export const solvePart = () =>
  runTest({ day: 5, part: 2, testMethod: findSolution });
