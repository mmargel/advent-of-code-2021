import { runTest } from "../utils/runTest.js";

const countPositiveChanges = (values) => {
  return values.filter((_, index, array) =>
    index == 0 ? false : array[index] > array[index - 1]
  ).length;
};

runTest(countPositiveChanges);
