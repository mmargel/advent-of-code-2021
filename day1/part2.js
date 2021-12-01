import { runTest } from "../utils/runTest.js";

const windowLength = 3;

const countPositiveChanges = (values) => {
  return values.filter((_, index, array) =>
    index > array.length - windowLength
      ? false
      : array[index + windowLength] > array[index]
  ).length;
};

runTest(countPositiveChanges);
