import { runTest } from "../utils/runTest.js";
import { exploreCaveSystem } from "./part1.js";

const findSolution = (caves: string[]): number => {
  const routes = exploreCaveSystem(caves, 1);

  return routes.length;
};

// 117509
export const solvePart = () =>
  runTest({ day: 12, part: 2, testMethod: findSolution, test: false });
