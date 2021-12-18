import { runTest } from "../utils/runTest.js";

type Trajectory = [number, number];

interface Target {
  x: { min: number; max: number };
  y: { min: number; max: number };
}

export const getTarget = (string: string): Target => {
  const [xMin, xMax] = string
    .match(/x=(-?\d+\.\.-?\d+)/)![1]
    .split("..")
    .map((x) => parseInt(x));
  const [yMin, yMax] = string
    .match(/y=(-?\d+\.\.-?\d+)/)![1]
    .split("..")
    .map((y) => parseInt(y));

  return {
    x: {
      min: xMin,
      max: xMax,
    },
    y: {
      min: yMin,
      max: yMax,
    },
  };
};

const findStepsInRange = (
  v: number,
  { min: t_y_0, max: t_y_1 }: { min: number; max: number }
): number[] => {
  // a b and c as used in the quadratic formula
  const a = 1;
  const b = -(2 * v + 1);
  const c_0 = 2 * t_y_0;
  const c_1 = 2 * t_y_1;

  // console.log("[v]", v);
  // console.log("[a]", a);
  // console.log("[b]", b);
  // console.log("[c_0]", c_0);
  // console.log("[c_1]", c_1);

  // n_0 is the range of values for which we are above the lower border of the target
  const n_0 = [
    Math.max(Math.floor((-b - Math.sqrt(b * b - 4 * a * c_0)) / (2 * a)), 0),
    Math.floor((-b + Math.sqrt(b * b - 4 * a * c_0)) / (2 * a)),
  ];
  // console.log("[n_0]", n_0);

  // n_1 is the minimum value for which we are below the upper border of the target
  const n_1 = Math.ceil((-b + Math.sqrt(b * b - 4 * a * c_1)) / (2 * a));
  // console.log("[n_1]", n_1);

  // This returns the list of values for which we were inside the target
  return new Array(n_0[1] - n_0[0] + 1)
    .fill(0)
    .map((_, index) => n_0[0] + index)
    .filter((val) => val >= n_1);
};

const calculateY = (v0: number, n: number): number => {
  return v0 * n - 0.5 * n * (n - 1);
};

const calculateX = (v0: number, n: number): number => {
  return n > v0 ? 0.5 * v0 * (v0 + 1) : n * v0 - 0.5 * n * (n - 1);
};

const findMaxVx = (xMax: number): number => {
  return xMax;
};

const findMinVx = (xMin: number): number => {
  const a = 1;
  const b = -1;
  const c = -2 * xMin;

  return Math.floor((-b + Math.sqrt(b - 4 * a * c)) / 2);
};

const inTarget = (x: number, y: number, t: Target): boolean => {
  return t.x.min <= x && x <= t.x.max && t.y.min <= y && y <= t.y.max;
};

const getMaxHeight = ([, vy]: Trajectory): number => {
  return 0.5 * vy * vy + 0.5 * vy;
};

const uniqueTrajectories = (trajectories: Trajectory[]): Trajectory[] => {
  const seen: Set<String> = new Set();
  const uniqueTrajectories: Trajectory[] = [];

  trajectories.forEach((trajectory) => {
    const key = `${trajectory[0]}_${trajectory[1]}`;
    if (!seen.has(key)) {
      seen.add(key);
      uniqueTrajectories.push(trajectory);
    }
  });

  return uniqueTrajectories;
};

export const getTrajectories = (target: Target) => {
  const hits: Trajectory[] = [];
  const maxVx0 = findMaxVx(target.x.max);
  const minVx0 = findMinVx(target.x.min);

  // console.log("[target]", target);
  // console.log("[maxVx0]", maxVx0);
  // console.log("[minVx0]", minVx0);

  // for (let n = 0; n < 10; n++) {
  //   const y = calculateY(3, n);
  //   const x = calculateX(6, n);

  //   console.log(
  //     "[shot]",
  //     `v:[${6}, ${3}]`,
  //     `p:[${x}, ${y}]`,
  //     n,
  //     inTarget(x, y, target)
  //   );
  // }

  for (let v_y = target.y.min; v_y <= -target.y.min; v_y++) {
    const stepsToCheck = findStepsInRange(v_y, target.y);
    // console.log("[stepsToCheck]", v_y, stepsToCheck);
    // stepsToCheck.forEach((n) => console.log("[y]", calculateY(v_y, n)));

    if (stepsToCheck.length === 0) {
      continue;
    }

    for (let i = 0; i < stepsToCheck.length; i++) {
      for (let v_x = minVx0; v_x <= maxVx0; v_x++) {
        const n = stepsToCheck[i];
        const y = calculateY(v_y, n);
        const x = calculateX(v_x, n);

        // console.log(
        //   "[shot]",
        //   `v:[${v_x}, ${v_y}]`,
        //   `p:[${x}, ${y}]`,
        //   n,
        //   inTarget(x, y, target)
        // );

        if (inTarget(x, y, target)) {
          hits.push([v_x, v_y]);
        }
      }
    }
  }

  return uniqueTrajectories(hits);
};

const findSolution = (values: string[]): number => {
  const target = getTarget(values[0]);
  const trajectories = getTrajectories(target);

  const highestTrajectory = trajectories.sort(([, y1], [, y2]) => y2 - y1)[0];
  return getMaxHeight(highestTrajectory);
};

// 6555
export const solvePart = () =>
  runTest({ day: 17, part: 1, testMethod: findSolution, test: false });
