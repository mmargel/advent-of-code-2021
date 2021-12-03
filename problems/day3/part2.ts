import { runTest } from "../utils/runTest.js";
import {
  binToDec,
  findLeastCommonBitValues,
  findMostCommonBitValues,
} from "./part1.js";

const findRating = (
  values: string[],
  tallyMethod: (values: string[]) => number[]
) => {
  let validValues = [...values];
  for (let i = 0; i < validValues[0].length; i++) {
    if (validValues.length === 1) {
      break;
    }

    // Since the data changes on each iteration, we can't memoize this
    const mostCommonValue = tallyMethod(validValues)[i];
    validValues = validValues.filter(
      (value) => parseInt(value[i]) === mostCommonValue
    );
  }

  return binToDec(validValues[0]);
};

const findSolution = (values: string[]) => {
  const oxygen = findRating(values, findMostCommonBitValues);
  const co2 = findRating(values, findLeastCommonBitValues);

  return oxygen * co2;
};

export const solvePart = () =>
  runTest({ day: 3, part: 2, testMethod: findSolution });
