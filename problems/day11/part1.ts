import { runTest } from "../utils/runTest.js";

export type Octopus = number;
type Point = [number, number];

const ageOctopi = (octopi: Octopus[][]): void => {
  for (let i = 0; i < octopi.length; i++) {
    for (let j = 0; j < octopi[i].length; j++) {
      if (typeof octopi[i][j] === "number") {
        octopi[i][j] = (octopi[i][j] as number) + 1;
      }
    }
  }
};

const findFlashPoints = (octopi: Octopus[][]): Point[] => {
  const points: Point[] = [];
  for (let i = 0; i < octopi.length; i++) {
    for (let j = 0; j < octopi[i].length; j++) {
      if (octopi[i][j] > 9) {
        points.push([i, j]);
      }
    }
  }
  return points;
};

const applyFlashes = (octopi: Octopus[][]): number => {
  let numFlashes = 0;
  let startingPoints = findFlashPoints(octopi);

  const pointsToCheck: Point[] = startingPoints;
  while (pointsToCheck.length > 0) {
    const [x, y] = pointsToCheck.pop()!;
    const octopus = (octopi[x] || [])[y];

    if (octopus === undefined) {
      continue;
    }

    if (octopus < 0) {
      // do nothing
    } else if (octopus < 9) {
      octopi[x][y] = octopus + 1;
    } else {
      numFlashes++;
      octopi[x][y] = -1;
      pointsToCheck.push(
        [x - 1, y - 1],
        [x - 1, y],
        [x - 1, y + 1],
        [x, y - 1],
        // [x, y], - this is the square we're currently on
        [x, y + 1],
        [x + 1, y - 1],
        [x + 1, y],
        [x + 1, y + 1]
      );
    }
  }

  for (let i = 0; i < octopi.length; i++) {
    for (let j = 0; j < octopi[i].length; j++) {
      if (octopi[i][j] < 0) {
        octopi[i][j] = 0;
      }
    }
  }

  return numFlashes;
};

const areAllOctopiFlashing = (octopi: Octopus[][]): boolean => {
  return octopi.flat().find((x) => x !== 0) === undefined;
};

export const propagateOctopi = (
  octopi: Octopus[][],
  generations: number = Infinity
): [number, number] => {
  let numFlashes = 0;
  let gen: number = 0;
  while (gen++ < generations) {
    ageOctopi(octopi);
    numFlashes += applyFlashes(octopi);

    if (areAllOctopiFlashing(octopi)) {
      return [numFlashes, gen];
    }
  }

  return [numFlashes, gen];
};

const findSolution = (values: string[]): number => {
  const octopi = values.map((line) =>
    line.split("").map((val) => parseInt(val))
  ) as Octopus[][];

  const [numberOfFlashes, _] = propagateOctopi(octopi, 100);
  return numberOfFlashes;
};

// 1615
export const solvePart = () =>
  runTest({ day: 11, part: 1, testMethod: findSolution, test: false });
