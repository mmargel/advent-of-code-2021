import { runTest } from "../utils/runTest.js";
import { calculateScore, parseInputs, simulatePolymer } from "./part1.js";

const findSolution = (values: string[]): number => {
  const [starter, rules] = parseInputs(values);
  const finalPolymer = simulatePolymer(starter, rules, 40);

  return calculateScore(finalPolymer);
};

// 5208377027195
export const solvePart = () =>
  runTest({ day: 14, part: 2, testMethod: findSolution, test: false });
