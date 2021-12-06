import { runTest } from "../utils/runTest.js";

const MAX_TIME_TO_SPAWN = 8;
const TIME_TO_NEXT_SPAWN = 6;

export const getCensus = (allFish: string) => {
  const fishList = allFish.split(",");
  const census: number[] = new Array(MAX_TIME_TO_SPAWN + 1).fill(0);
  fishList.forEach((fish) => census[parseInt(fish)]++);
  return census;
};

export const simulateGenerations = (
  census: number[],
  generations: number
): number[] => {
  for (let i = 0; i < generations; i++) {
    census = census.map((_, index) => {
      const newSpawn = index === TIME_TO_NEXT_SPAWN ? census[0] : 0;
      return census[(index + 1) % (MAX_TIME_TO_SPAWN + 1)] + newSpawn;
    });
  }
  return census;
};

export const countFish = (census: number[]) =>
  census.reduce((acc, val) => acc + val, 0);

const findSolution = (values: string[]) => {
  const fish = getCensus(values[0]);
  const futureFish = simulateGenerations(fish, 80);
  return countFish(futureFish);
};

export const solvePart = () =>
  runTest({ day: 6, part: 1, testMethod: findSolution, test: false });
