import { runTest } from "../utils/runTest.js";

const BOARD_SIZE = 5;

export type Board = (number | null)[];

export const getNumbers = (values: string[]) => {
  return values[0].split(",").map((value) => parseInt(value));
};

export const getBoards = (values: string[]) => {
  const boards: Board[] = [];
  for (let i = 2; i < values.length; i += BOARD_SIZE + 1) {
    boards.push(
      values
        .slice(i, i + BOARD_SIZE)
        .join(" ")
        .trim()
        .split(/\s+/)
        .map((value) => parseInt(value))
    );
  }

  return boards;
};

export const checkOffNumber = (boards: Board[], number: number) => {
  boards.forEach((board) => {
    const index = board.indexOf(number);
    if (~index) {
      board[index] = null;
    }
  });
};

const hasFullLine = (
  board: Board,
  findCell: (i: number, j: number) => number
) => {
  let anyLineCompleted = false;
  for (let i = 0; i < BOARD_SIZE && !anyLineCompleted; i++) {
    let thisLineCompleted = true;
    for (let j = 0; j < BOARD_SIZE && thisLineCompleted; j++) {
      thisLineCompleted &&= board[findCell(i, j)] === null;
    }

    anyLineCompleted ||= thisLineCompleted;
  }

  return anyLineCompleted;
};

const hasFullRow = (board: Board) =>
  hasFullLine(board, (i, j) => BOARD_SIZE * i + j);

const hasFullColumn = (board: Board) =>
  hasFullLine(board, (i, j) => i + BOARD_SIZE * j);

export const isBoardComplete = (board: Board) =>
  hasFullRow(board) || hasFullColumn(board);

export const getBoardScore = (board: Board | undefined) =>
  (board || []).reduce<number>((acc, value) => acc + (value || 0), 0);

const playBingo = (boards: Board[], numbers: number[]): [number, number] => {
  for (const number of numbers) {
    checkOffNumber(boards, number);
    const winningBoard = boards.find(isBoardComplete);
    if (winningBoard) {
      const score = getBoardScore(winningBoard);
      return [number, score];
    }
  }

  return [0, 0];
};

const findSolution = (values: string[]) => {
  const numbers = getNumbers(values);
  const boards = getBoards(values);

  const [lastNumber, winningScore] = playBingo(boards, numbers);
  return lastNumber * winningScore;
};

export const solvePart = () =>
  runTest({ day: 4, part: 1, testMethod: findSolution });
