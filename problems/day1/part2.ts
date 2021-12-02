import { runTest } from "../utils/runTest.js";

const windowLength = 3;

const countPositiveChanges = (values: string[]) => {
  const numericValues = values.map(parseInt);
  return numericValues.filter((_, index, array) =>
    index > array.length - windowLength
      ? false
      : array[index + windowLength] > array[index]
  ).length;
};

export const solvePart = () =>
  runTest({ day: 1, part: 2, testMethod: countPositiveChanges });
