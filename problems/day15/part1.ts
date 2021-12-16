import { runTest } from "../utils/runTest.js";

type Point = [number, number];
export type Map = number[][];

const min = (a: number | undefined, b: number | undefined): number => {
  return Math.min(a ?? Infinity, b ?? Infinity);
};

export const findTotalRisk = (map: Map): Map => {
  const totalRisk: Map = new Array(map.length);
  const visited: Set<string> = new Set();
  for (let i = 0; i < totalRisk.length; i++) {
    totalRisk[i] = new Array(map[0].length).fill(Infinity);
  }
  const queue: Point[] = [[0, 0]];
  let routeFound = false;

  while (queue.length > 0 && !routeFound) {
    // console.log("[queue]", queue);
    const [x, y] = queue
      .sort(([x0, y0], [x1, y1]) => {
        return totalRisk[x0][y0] - totalRisk[x1][y1];
      })
      .shift()!;

    if (visited.has(`${x}_${y}`)) {
      continue;
    }

    if (x === 0 && y === 0) {
      totalRisk[x][y] = 0;
      totalRisk[x + 1][y] = map[x + 1][y];
      totalRisk[x][y + 1] = map[x][y + 1];
      queue.unshift([x + 1, y], [x, y + 1]);
    } else {
      [
        [1, 0],
        [-1, 0],
        [0, 1],
        [0, -1],
      ].forEach(([dx, dy]) => {
        if (totalRisk[x + dx]?.[y + dy] != undefined) {
          totalRisk[x + dx][y + dy] = min(
            totalRisk[x + dx][y + dy],
            totalRisk[x][y] + map[x + dx][y + dy]
          );

          if (!visited.has(`${x + dx}_${y + dy}`)) {
            queue.unshift([x + dx, y + dy]);
          }
        }

        if (
          x + dx === totalRisk.length - 1 &&
          y + dy === totalRisk[0].length - 1
        ) {
          routeFound = true;
        }
      });
    }

    visited.add(`${x}_${y}`);
  }

  return totalRisk;
};

export const findSafestRoute = (riskMap: Map): number => {
  return riskMap[riskMap.length - 1][riskMap[0].length - 1];
};

const findSolution = (values: string[]): number => {
  const map = values.map((row) => row.split("").map((cell) => parseInt(cell)));
  const totalRiskMap = findTotalRisk(map);
  const safestRoute = findSafestRoute(totalRiskMap);

  return safestRoute;
};

// 652
export const solvePart = () =>
  runTest({ day: 15, part: 1, testMethod: findSolution, test: false });
