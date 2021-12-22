import { runTest } from "../utils/runTest.js";

export const getStartingPositions = (values: string[]): number[] => {
  return values.reduce<number[]>((acc, val) => {
    const match = val.match(/\d+$/);
    if (match) {
      acc.push(parseInt(match[0]));
    }
    return acc;
  }, []);
};

const isGameOver = (scores: number[]) => {
  return scores.some((val) => val >= 1000);
};

let rollsTaken = 0;
const roll = (): number => {
  return ++rollsTaken;
};

const findSolution = (values: string[]): number => {
  const positions: number[] = getStartingPositions(values);
  const scores: number[] = new Array(positions.length).fill(0);
  let currentPlayer = 0;

  while (!isGameOver(scores)) {
    const totalRoll = roll() + roll() + roll();
    positions[currentPlayer] = (positions[currentPlayer] + totalRoll) % 10;
    if (positions[currentPlayer] === 0) {
      positions[currentPlayer] = 10;
    }
    scores[currentPlayer] += positions[currentPlayer];
    currentPlayer = (currentPlayer + 1) % scores.length;
  }

  // Ascending order
  const sortedScores = scores.sort((a, b) => a - b);

  return rollsTaken * sortedScores[0];
};

// 921585
export const solvePart = () =>
  runTest({ day: 21, part: 1, testMethod: findSolution, test: false });
