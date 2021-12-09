import { runTest } from "../utils/runTest.js";

const findLowPoints = (heightMap: number[][]): number[] => {
  const lowPoints = [];

  for (let i = 0; i < heightMap.length; i++) {
    for (let j = 0; j < heightMap[i].length; j++) {
      const height = heightMap[i][j];
      if (
        height < (heightMap[i][j - 1] ?? Infinity) &&
        height < (heightMap[i][j + 1] ?? Infinity) &&
        height < ((heightMap[i - 1] ?? [])[j] ?? Infinity) &&
        height < ((heightMap[i + 1] ?? [])[j] ?? Infinity)
      ) {
        lowPoints.push(height);
      }
    }
  }

  return lowPoints;
};

const calculateRisks = (lowPoints: number[]): number[] => {
  return lowPoints.map((height) => height + 1);
};

const findSolution = (values: string[]) => {
  const heightMap = values.map((value) => {
    return value.split("").map((val) => parseInt(val));
  });
  const lowPoints = findLowPoints(heightMap);
  const riskList = calculateRisks(lowPoints);
  return riskList.reduce((acc, val) => acc + val, 0);
};

export const solvePart = () =>
  runTest({ day: 9, part: 1, testMethod: findSolution, test: false });
