import { runTest } from "../utils/runTest.js";
import {
  Board,
  checkOffNumber,
  getBoards,
  getBoardScore,
  getNumbers,
  isBoardComplete,
} from "./part1.js";

const partitionBoards = (boards: Board[]) => {
  const completeBoards: Board[] = [];
  const incompleteBoards: Board[] = [];

  boards.forEach((board) => {
    (isBoardComplete(board) ? completeBoards : incompleteBoards).push(board);
  });

  return [completeBoards, incompleteBoards];
};

const playBingo = (boards: Board[], numbers: number[]): [number, number] => {
  let completeBoards: Board[] = [];
  let incompleteBoards: Board[] = [...boards];
  let i = 0;
  for (; i < numbers.length && incompleteBoards.length > 0; i++) {
    checkOffNumber(boards, numbers[i]);
    // This actually just returns the most recently completed boards. When the final
    // board is completed, "completeBoards" will only contain that board.
    [completeBoards, incompleteBoards] = partitionBoards(incompleteBoards);
  }
  return [numbers[i - 1], getBoardScore(completeBoards.pop())];
};

const findSolution = (values: string[]) => {
  const numbers = getNumbers(values);
  const boards = getBoards(values);

  const [lastNumber, winningScore] = playBingo(boards, numbers);
  return lastNumber * winningScore;
};

export const solvePart = () =>
  runTest({ day: 4, part: 2, testMethod: findSolution });
