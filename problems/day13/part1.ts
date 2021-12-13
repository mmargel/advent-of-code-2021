import { runTest } from "../utils/runTest.js";

type Paper = string[][];
type Instruction = {
  direction: "x" | "y";
  line: number;
};

const INSTRUCTION_REGEX = /[xy]=\d+/;

const isDot = (line: string): boolean => {
  return line.match(/^\d+,\d+$/) != null;
};

const isInstruction = (line: string): boolean => {
  return line.match(INSTRUCTION_REGEX) != null;
};

const parseInstruction = (instruction: string): Instruction => {
  const [direction, value] = instruction
    .match(INSTRUCTION_REGEX)![0]
    .split("=");

  return {
    direction: direction as "x" | "y",
    line: parseInt(value),
  };
};

export const parseInput = (values: string[]): [Paper, Instruction[]] => {
  const paper: Paper = [];
  const instructions: Instruction[] = [];

  values.forEach((value) => {
    if (isDot(value)) {
      const [x, y] = value.split(",").map((digit) => parseInt(digit));
      paper[y] ||= [];
      paper[y][x] = "#";
    } else if (isInstruction(value)) {
      instructions.push(parseInstruction(value));
    }
  });

  return [paper, instructions];
};

const foldVertical = (paper: Paper, line: number): Paper => {
  const foldedPaper: Paper = [];

  for (let i = 0; i < line; i++) {
    foldedPaper.push([]);
    const rowLength = Math.max(
      paper[i]?.length || 0,
      paper[paper.length - (i + 1)]?.length || 0
    );

    for (let x = 0; x < rowLength; x++) {
      const x1 = (paper[i] || [])[x];
      const x2 = (paper[paper.length - (i + 1)] || [])[x];
      foldedPaper[i][x] = x1 || x2;
    }
  }

  return foldedPaper;
};

const foldHorizontal = (paper: Paper, line: number): Paper => {
  const foldedPaper: Paper = [];

  for (let y = 0; y < paper.length; y++) {
    const row = [];
    if (!paper[y]) {
      continue;
    }

    for (let i = 1; i <= line; i++) {
      row.push(paper[y][line - i] || paper[y][line + i]);
    }
    foldedPaper[y] = row;
  }

  return foldedPaper;
};

export const fold = (paper: Paper, { direction, line }: Instruction): Paper => {
  if (direction === "x") {
    return foldHorizontal(paper, line);
  } else {
    return foldVertical(paper, line);
  }
};

const findSolution = (values: string[]): number => {
  const [paper, instructions] = parseInput(values);

  const finalPaper = instructions
    .slice(0, 1)
    .reduce((acc, instruction) => fold(acc, instruction), paper);

  return finalPaper.flat().filter((cell) => cell === "#").length;
};

// 647
export const solvePart = () =>
  runTest({ day: 13, part: 1, testMethod: findSolution, test: false });
