import { runTest } from "../utils/runTest.js";

const countPositiveChanges = (values: string[]) => {
  const numericValues = values.map(parseInt);
  return numericValues.filter((_, index, array) =>
    index == 0 ? false : array[index] > array[index - 1]
  ).length;
};

export const solvePart = () =>
  runTest({ day: 1, part: 1, testMethod: countPositiveChanges });
