import { runTest } from "../utils/runTest.js";

type Point = [number, number];
type BasinMap = string[][];

const findStartingPoint = (basinMap: BasinMap): Point | undefined => {
  for (let i = 0; i < basinMap.length; i++) {
    const firstMatch = basinMap[i].join("").indexOf("*");
    if (firstMatch >= 0) {
      return [i, firstMatch];
    }
  }

  return undefined;
};

const chartBasin = (basinMap: BasinMap, startingPoint: Point): number => {
  const pointsToExplore = [startingPoint];
  let numPoints = 0;

  while (pointsToExplore.length > 0) {
    const [x, y] = pointsToExplore.pop()!;
    // This addresses duplicated entries in the queue, since we don't
    // actually check uniqueness.
    if (basinMap[x][y] != "*") {
      continue;
    }

    basinMap[x][y] = "x";
    if (basinMap[x][y + 1] === "*") {
      pointsToExplore.push([x, y + 1]);
    }
    if (basinMap[x][y - 1] === "*") {
      pointsToExplore.push([x, y - 1]);
    }
    if ((basinMap[x - 1] ?? [])[y] === "*") {
      pointsToExplore.push([x - 1, y]);
    }
    if ((basinMap[x + 1] ?? [])[y] === "*") {
      pointsToExplore.push([x + 1, y]);
    }

    numPoints++;
  }

  return numPoints;
};

const findBasinSizes = (basinMap: BasinMap): number[] => {
  const basins: number[] = [];
  let startingPoint: Point | undefined;
  while ((startingPoint = findStartingPoint(basinMap))) {
    const basin = chartBasin(basinMap, startingPoint);
    basins.push(basin);
  }

  return basins;
};

const findSolution = (values: string[]) => {
  const basinMap = values
    .map((line) => line.replace(/[^9]/g, "*"))
    .map((line) => line.split(""));

  return findBasinSizes(basinMap)
    .sort((a, b) => b - a)
    .slice(0, 3)
    .reduce((acc, val) => (acc *= val), 1);
};

export const solvePart = () =>
  runTest({ day: 9, part: 2, testMethod: findSolution, test: false });
