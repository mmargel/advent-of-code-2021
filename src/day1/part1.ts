import { runTest } from "../utils/runTest.js";

const countPositiveChanges = (values: number[]) => {
  return values.filter((_, index, array) =>
    index == 0 ? false : array[index] > array[index - 1]
  ).length;
};

export const part1 = () =>
  runTest({ day: 1, part: 1, testMethod: countPositiveChanges });
