import { runTest } from "../utils/runTest.js";
import { findScannersAndProbes, getScannerResults, Vector } from "./part1.js";

const getDistance = ([x1, y1, z1]: Vector, [x2, y2, z2]: Vector): number => {
  return Math.abs(x1 - x2) + Math.abs(y1 - y2) + Math.abs(z1 - z2);
};

const findMaxDistance = (vectors: Vector[]): number => {
  let maxDistance = 0;
  for (let i = 0; i < vectors.length - 1; i++) {
    for (let j = i + 1; j < vectors.length; j++) {
      maxDistance = Math.max(maxDistance, getDistance(vectors[i], vectors[j]));
    }
  }
  return maxDistance;
};

const findSolution = (values: string[]): number => {
  const scannerResults = getScannerResults(values);
  const [scanners] = findScannersAndProbes(scannerResults);
  return findMaxDistance(scanners);
};

export const solvePart = () =>
  runTest({ day: 19, part: 2, testMethod: findSolution, test: false });
