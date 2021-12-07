import { runTest } from "../utils/runTest.js";

// From wikipedia:
// The geometric median of a discrete set of sample points in a Euclidean space is the point minimizing the
// sum of distances to the sample points. This generalizes the median, which has the property of minimizing
// the sum of distances for one-dimensional data,
//
// (Allegedly) the geometric median has no local minimum, so we can use a naive iterative approach
// to step towards the solution. Instead of incrementing by 1, this uses a variation of binary search.
export const findMedian = (
  values: number[],
  findDistance: (value: number, target: number) => number
) => {
  let median = values.reduce((acc, val) => Math.max(acc, val), 0) / 2;
  let step = median / 2;
  let distance = values.reduce(
    (acc, val) => acc + findDistance(val, median),
    0
  );

  while (Math.abs(step) >= 1) {
    const reverseDistance = values.reduce(
      (acc, val) => acc + findDistance(val, median - step),
      0
    );
    const advanceDistance = values.reduce(
      (acc, val) => acc + findDistance(val, median + step),
      0
    );

    if (
      reverseDistance > distance &&
      advanceDistance > distance &&
      Math.abs(step) <= 1
    ) {
      step = 0;
    } else if (reverseDistance > distance && advanceDistance > distance) {
      // This means we're jumping over the minimum and landing somewhere equally distant
    } else if (reverseDistance < distance) {
      median -= step;
      step *= -1;
      distance = reverseDistance;
    } else if (advanceDistance < distance) {
      median += step;
      distance = advanceDistance;
    }
    step /= 2;
  }

  return Math.round(median);
};

const linearDistance = (a: number, b: number) => Math.abs(a - b);

const findSolution = (values: string[]) => {
  const positions = values[0].split(",").map((value) => parseInt(value));
  const optimalPosition = findMedian(positions, (value, target) =>
    linearDistance(value, target)
  );
  const totalDistance = positions.reduce(
    (acc, pos) => acc + linearDistance(pos, optimalPosition),
    0
  );

  return totalDistance;
};

// 336040
export const solvePart = () =>
  runTest({ day: 7, part: 1, testMethod: findSolution, test: false });
