import { runTest } from "../utils/runTest.js";
import { findSafestRoute, findTotalRisk, Map } from "./part1.js";

const SCALE_FACTOR = 5;

const hydrateMap = (originalMap: Map): Map => {
  const width = originalMap.length;
  const height = originalMap[0].length;

  const hydratedMap: Map = new Array(width * SCALE_FACTOR);
  for (let i = 0; i < hydratedMap.length; i++) {
    hydratedMap[i] = new Array(height * SCALE_FACTOR);
    const iScale = Math.floor(i / width);
    const iOriginal = i % width;

    for (let j = 0; j < hydratedMap[0].length; j++) {
      const jScale = Math.floor(j / height);
      const jOriginal = j % height;

      hydratedMap[i][j] = originalMap[iOriginal][jOriginal] + iScale + jScale;
      if (hydratedMap[i][j] > 9) {
        hydratedMap[i][j] -= 9;
      }
    }
  }

  return hydratedMap;
};

const findSolution = (values: string[]): number => {
  const map = values.map((row) => row.split("").map((cell) => parseInt(cell)));
  const hydratedMap = hydrateMap(map);
  const totalRiskMap = findTotalRisk(hydratedMap);
  const safestRoute = findSafestRoute(totalRiskMap);
  return safestRoute;
};

// 2938
export const solvePart = () =>
  runTest({ day: 15, part: 2, testMethod: findSolution, test: false });
