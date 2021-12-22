import { runTest } from "../utils/runTest.js";
import { getStartingPositions } from "./part1.js";

type WinCount = [number, number];
type WinCache = Record<string, WinCount>;

const WINNING_SCORE = 21;
const POSSIBLE_ROLLS: Record<number, number> = {
  3: 1,
  4: 3,
  5: 6,
  6: 7,
  7: 6,
  8: 3,
  9: 1,
};

const cacheKey = (params: number[]): string => {
  return params.reduce<string>((acc, val) => `${acc}_${val}`, "");
};

const advance = (pos: number, distance: number): number => {
  pos = (pos + distance) % 10;
  return pos === 0 ? pos + 10 : pos;
};

// This was probably the hardest puzzle yet in AOC2021. I ended up needing some direction from reddit on how
// to solve it. I was able to get the basic idea figured out (e.g. dynamic programming so we don't actually need
// to simulate all possible games), but I had a really hard time trying to figure out how to actually implement
// it all.
const countWins = (
  scores: [number, number],
  positions: [number, number],
  currentPlayer: number,
  cache: WinCache = {}
): [number, number] => {
  const key = cacheKey([...scores, ...positions, currentPlayer]);
  // If we have already figured out the win distribution from a given state, we just
  // return those results.
  if (cache[key]) {
    return cache[key];
  }

  // Base case - if the game is over, return the result.
  if (scores[0] >= WINNING_SCORE) {
    cache[key] = [1, 0];
    return cache[key];
  } else if (scores[1] >= WINNING_SCORE) {
    cache[key] = [0, 1];
    return cache[key];
  }

  // Otherwise, for each possible roll, recurse.
  let winCount: WinCount = [0, 0];
  Object.keys(POSSIBLE_ROLLS)
    .map((roll) => parseInt(roll))
    .forEach((roll) => {
      const nextPos = advance(positions[currentPlayer], roll);
      const nextWins = countWins(
        [
          scores[0] + (currentPlayer === 0 ? nextPos : 0),
          scores[1] + (currentPlayer === 1 ? nextPos : 0),
        ],
        [
          currentPlayer === 0 ? nextPos : positions[0],
          currentPlayer === 1 ? nextPos : positions[1],
        ],
        (currentPlayer + 1) % 2,
        cache
      );
      winCount = [
        winCount[0] + POSSIBLE_ROLLS[roll] * nextWins[0],
        winCount[1] + POSSIBLE_ROLLS[roll] * nextWins[1],
      ];
    });

  cache[key] = winCount;
  return winCount;
};

const findSolution = (values: string[]): number => {
  const positions: number[] = getStartingPositions(values);
  const winCounts = countWins([0, 0], [positions[0], positions[1]], 0);
  return winCounts.sort((a, b) => b - a)[0];
};

export const solvePart = () =>
  runTest({ day: 21, part: 2, testMethod: findSolution, test: false });
