import { runTest } from "../utils/runTest.js";
import { parseInput, fold } from "./part1.js";

const findSolution = (values: string[]): number => {
  const [paper, instructions] = parseInput(values);

  const finalPaper = instructions.reduce(
    (acc, instruction) => fold(acc, instruction),
    paper
  );

  const output = finalPaper.map((row) =>
    row
      .map((cell) => cell || " ")
      .reverse()
      .join("")
  );

  console.log("\n--- STARTING OUTPUT ---");
  output.forEach((row) => console.log(row));
  console.log("--- OUTPUT FINISHED ---");

  // logs HEJHJRCJ
  return 0;
};

export const solvePart = () =>
  runTest({ day: 13, part: 2, testMethod: findSolution, test: false });
