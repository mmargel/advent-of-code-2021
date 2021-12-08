import { runTest } from "../utils/runTest.js";

type Tally = number[];

// Maps the number of lit segments to the number it represents, for unique digits only
export const uniqueDigitMap: Record<number, number> = {
  2: 1,
  4: 4,
  3: 7,
  7: 8,
};

const countDigits = (digits: string): Tally => {
  const numbers: string[] = digits.split(" ");
  const tally: Tally = new Array(10).fill(0);

  numbers.forEach((number) => {
    const index = uniqueDigitMap[number.length];
    if (index) {
      tally[index]++;
    }
  });

  return tally;
};

const findSolution = (values: string[]) => {
  const outputs = values.map((value) => value.split(" | ")[1]);

  const digitCounts = outputs.reduce((acc, output) => {
    const tally = countDigits(output);
    for (let i = 0; i < acc.length; i++) acc[i] += tally[i];
    return acc;
  }, new Array(10).fill(0));

  return [1, 4, 7, 8].reduce((acc, number) => (acc += digitCounts[number]), 0);
};

// 412
export const solvePart = () =>
  runTest({ day: 8, part: 1, testMethod: findSolution, test: false });
