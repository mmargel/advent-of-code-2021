import { runTest } from "../utils/runTest.js";
import { findMedian } from "./part1.js";

const triangleDistance = (a: number, b: number) =>
  (Math.abs(a - b) * (Math.abs(a - b) + 1)) / 2;

const findSolution = (values: string[]) => {
  const positions = values[0].split(",").map((value) => parseInt(value));
  const optimalPosition = findMedian(positions, triangleDistance);

  const totalDistance = positions.reduce(
    (acc, pos) => acc + triangleDistance(pos, optimalPosition),
    0
  );
  return totalDistance;
};

// 94813675
export const solvePart = () =>
  runTest({ day: 7, part: 2, testMethod: findSolution, test: false });
