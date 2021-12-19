import { runTest } from "../utils/runTest.js";
import { add, getMagnitude, parseNode } from "./part1.js";

const findSolution = (values: string[]): number => {
  let maxMagnitude = 0;
  for (let i = 0; i < values.length; i++) {
    for (let j = 0; j < values.length; j++) {
      if (i === j) {
        continue;
      }

      // Adding mutates the operands, so we need to redefine a in each iteration
      const a = parseNode(values[i]);
      const b = parseNode(values[j]);
      const sum = add(a, b);
      const magnitude = getMagnitude(sum);

      maxMagnitude = Math.max(maxMagnitude, magnitude);
    }
  }

  return maxMagnitude;
};

// 4650
export const solvePart = () =>
  runTest({ day: 18, part: 2, testMethod: findSolution, test: false });
