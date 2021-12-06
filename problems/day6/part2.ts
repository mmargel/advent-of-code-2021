import { runTest } from "../utils/runTest.js";
import { countFish, getCensus, simulateGenerations } from "./part1.js";

const findSolution = (values: string[]) => {
  const fish = getCensus(values[0]);
  const futureFish = simulateGenerations(fish, 256);
  return countFish(futureFish);
};

export const solvePart = () =>
  runTest({ day: 6, part: 2, testMethod: findSolution, test: false });
