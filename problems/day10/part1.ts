import { runTest } from "../utils/runTest.js";

export type OpeningChar = "{" | "(" | "[" | "<";
export type ClosingChar = "}" | ")" | "]" | ">";
type Char = OpeningChar | ClosingChar;
export type Line = Char[];
type Results = [OpeningChar[] | undefined, ClosingChar | undefined];

const scoreMap: Record<ClosingChar, number> = {
  ")": 3,
  "]": 57,
  "}": 1197,
  ">": 25137,
};

const charPairs: Record<OpeningChar, ClosingChar> = {
  "{": "}",
  "(": ")",
  "[": "]",
  "<": ">",
};

const isOpeningChar = (char: Char): char is OpeningChar =>
  charPairs[char as OpeningChar] != undefined;

export const getClosingChar = (char: OpeningChar): ClosingChar =>
  charPairs[char];

const isInvalidChar = (
  lastOpenChar: OpeningChar | undefined,
  closingChar: ClosingChar
) => lastOpenChar === undefined || closingChar != getClosingChar(lastOpenChar);

export const processLine = (line: Line): Results => {
  const openingChars: OpeningChar[] = [];
  for (let i = 0; i < line.length; i++) {
    const char = line[i];
    if (isOpeningChar(char)) {
      openingChars.unshift(char);
    } else if (isInvalidChar(openingChars.shift(), char)) {
      return [undefined, char];
    }
  }

  return [openingChars, undefined];
};

const getLineScore = (line: string): number => {
  const [, firstIllegalChar] = processLine(line.split("") as Line);
  return firstIllegalChar ? scoreMap[firstIllegalChar] : 0;
};

const findSolution = (lines: string[]): number => {
  return lines.reduce((acc, line) => acc + getLineScore(line), 0);
};

// 362271
export const solvePart = () =>
  runTest({ day: 10, part: 1, testMethod: findSolution, test: false });
