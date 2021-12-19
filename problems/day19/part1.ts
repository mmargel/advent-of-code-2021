import { runTest } from "../utils/runTest.js";

type Matrix = [
  [number, number, number],
  [number, number, number],
  [number, number, number]
];
type Vector = [number, number, number];

const rotate = (p: Vector, m: Matrix): Vector => {
  let result = [];
  for (let i = 0; i < m.length; i++) {
    result.push(m[i].reduce((acc, val, index) => acc + val * p[index], 0));
  }
  return result as Vector;
};

const subtract = (a: Vector, b: Vector): Vector => {
  return a.map((_, index) => a[index] - b[index]) as Vector;
};

const add = (a: Vector, b: Vector): Vector => {
  return a.map((_, index) => a[index] + b[index]) as Vector;
};

const multiply = (a: Matrix, b: Matrix): Matrix => {
  const result: number[][] = [];
  for (let i = 0; i < a.length; i++) {
    const row = a[i];
    result[i] = [];
    for (let j = 0; j < b[0].length; j++) {
      const col = b.reduce<number[]>((acc, row) => {
        acc.push(row[j]);
        return acc;
      }, []);

      result[i][j] = row.reduce(
        (acc, _, index) => acc + row[index] * col[index],
        0
      );
    }
  }
  return result as Matrix;
};

const getAllRotations = (): Matrix[] => {
  const A: Matrix[] = [
    [
      [1, 0, 0],
      [0, 1, 0],
      [0, 0, 1],
    ],
    [
      [0, 1, 0],
      [0, 0, 1],
      [1, 0, 0],
    ],
    [
      [0, 0, 1],
      [1, 0, 0],
      [0, 1, 0],
    ],
  ];

  const B: Matrix[] = [
    [
      [1, 0, 0],
      [0, 1, 0],
      [0, 0, 1],
    ],
    [
      [-1, 0, 0],
      [0, -1, 0],
      [0, 0, 1],
    ],
    [
      [-1, 0, 0],
      [0, 1, 0],
      [0, 0, -1],
    ],
    [
      [1, 0, 0],
      [0, -1, 0],
      [0, 0, -1],
    ],
  ];

  const C: Matrix[] = [
    [
      [1, 0, 0],
      [0, 1, 0],
      [0, 0, 1],
    ],

    [
      [0, 0, -1],
      [0, -1, 0],
      [-1, 0, 0],
    ],
  ];

  const permutations: Matrix[] = [];
  for (let a = 0; a < A.length; a++) {
    for (let b = 0; b < B.length; b++) {
      for (let c = 0; c < C.length; c++) {
        permutations.push(multiply(multiply(A[a], B[b]), C[c]));
      }
    }
  }
  return permutations;
};

const getScannerResults = (values: string[]): Vector[][] => {
  const results: Vector[][] = [];
  let currentScanner = 0;

  for (let i = 0; i < values.length; i++) {
    const line = values[i];
    const scannerMatch = line.match(/scanner (\d+) /);
    const vectorMatch = line.match(/(-?\d+),(-?\d+),(-?\d+)/);
    if (scannerMatch) {
      // This is a header
      currentScanner = parseInt(scannerMatch[1]);
      results[currentScanner] = [];
    } else if (vectorMatch) {
      // This is a probe location
      const [, x, y, z] = vectorMatch.map((val) => parseInt(val));
      results[currentScanner].push([x, y, z]);
    } else {
      // this is an empty row
    }
  }

  return results;
};

const findSolution = (values: string[]): number => {
  const [s0, ...unmatchedScanners] = getScannerResults(values);
  const rotations = getAllRotations();
  const requiredMatches = 12;
  let scannerIndex = 0;

  // Continue until all scanners have been matched
  while (unmatchedScanners.length > 0) {
    // console.log("[scannerIndex]", scannerIndex);
    let matchFound = false;

    // Get the next scanner that we want to try to match
    const currentScanner = unmatchedScanners[scannerIndex];

    // Iterate over all possible rotations for the scanner
    for (let r = 0; r < rotations.length && !matchFound; r++) {
      const options: Record<string, number> = {};
      // For each (p0, p1) tuple, figure out the potential position of s1 in s0 space.
      // If we find `requiredMatches` tuples with the same mapping, then it means that we've found a match
      for (let i = 0; i < s0.length && !matchFound; i++) {
        for (let j = 0; j < currentScanner.length && !matchFound; j++) {
          // For the given rotation, figure out where S1 would be, assuming that P0 = P1.
          const potentialS1 = subtract(
            s0[i],
            rotate(currentScanner[j], rotations[r])
          );
          const key = `${potentialS1[0]}_${potentialS1[1]}`;
          // Count how many times we've found that mapping (e.g. how many probes match)
          options[key] = (options[key] || 0) + 1;

          // If we've hit the required number of matching probes, then we've found S1 and determined
          // its rotation - translate the points back into s0 space and append them to s0. Then, we
          // can repeat this process for the new s0 (e.g. against a larger set of identified probes).
          //
          // We can assume that this works because if S2 maps to S1 (in S1 space), then S2 would also
          // map correctly to the S1 points when S1 is translated to S0 space.
          if (options[key] >= requiredMatches) {
            console.log(
              `MATCH FOUND: ${potentialS1} with rotation ${rotations[r]}`
            );
            const translatedPoints = currentScanner.map((probe) =>
              add(potentialS1, rotate(probe, rotations[r]))
            );
            const previousPoints = new Set(
              s0.map(([x, y, z]) => `${x}_${y}_${z}`)
            );
            const newPoints = translatedPoints.filter(
              ([x, y, z]) => !previousPoints.has(`${x}_${y}_${z}`)
            );
            s0.push(...newPoints);
            matchFound = true;
            unmatchedScanners.splice(scannerIndex, 1);
            scannerIndex = 0;
          }
        }
      }
    }

    if (matchFound) {
      scannerIndex = 0;
    } else {
      scannerIndex++;
    }
  }

  return s0.length;
};

// 400
export const solvePart = () =>
  runTest({ day: 19, part: 1, testMethod: findSolution, test: false });
