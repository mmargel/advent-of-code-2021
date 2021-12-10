import { runTest } from "../utils/runTest.js";
import { ClosingChar, getClosingChar, Line, processLine } from "./part1.js";

const scoreMap: Record<ClosingChar, number> = {
  ")": 1,
  "]": 2,
  "}": 3,
  ">": 4,
};

const getLineScore = (chars: ClosingChar[]): number => {
  return chars.reduce((acc, char) => acc * 5 + scoreMap[char], 0);
};

const getMissingCharacters = (line: Line): ClosingChar[] => {
  const [missingChars, illegalChar] = processLine(line);
  return missingChars && !illegalChar ? missingChars.map(getClosingChar) : [];
};

const findSolution = (values: string[]): number => {
  const lines = values.map((line) => line.split("") as Line);
  const missingCharsByLine = lines
    .map(getMissingCharacters)
    .filter((chars) => chars.length > 0);

  const lineScores = missingCharsByLine.map(getLineScore);
  const averageScore = lineScores.sort((a, b) => a - b)[
    Math.floor(lineScores.length / 2)
  ];

  return averageScore;
};

// 1698395182
export const solvePart = () =>
  runTest({ day: 10, part: 2, testMethod: findSolution, test: false });
