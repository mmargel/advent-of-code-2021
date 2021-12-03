import { runTest } from "../utils/runTest.js";

export const binToDec = (bin: string | string[] | number[]) => {
  if (typeof bin === "string") {
    return parseInt(bin, 2);
  } else {
    return parseInt(bin.join(""), 2);
  }
};

export const findMostCommonBitValues = (values: string[]) => {
  const tally = new Array(values[0].length).fill(0);
  for (let value of values) {
    const bits = value.split("").map((bit) => parseInt(bit));
    for (let i = 0; i < bits.length; i++) {
      tally[i] += bits[i];
    }
  }

  // implicitly rounds ties to 1, since 0.5 => 1
  return tally.map((value) => Math.round(value / values.length));
};

export const findLeastCommonBitValues = (values: string[]) => {
  return findMostCommonBitValues(values).map((value) => 1 - value);
};

const findSolution = (readings: string[]) => {
  const gamma = binToDec(findMostCommonBitValues(readings));
  const epsilon = binToDec(findLeastCommonBitValues(readings));

  return gamma * epsilon;
};

export const solvePart = () =>
  runTest({ day: 3, part: 1, testMethod: findSolution });
