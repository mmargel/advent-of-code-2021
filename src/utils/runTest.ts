import { getTestInput, InputArgs } from "./input.js";

type TestMethod = (args: number[]) => void;
interface TestDetails {
  part: number;
  day: number;
  testMethod: TestMethod;
}

export const runTest = (
  { day, part, testMethod }: TestDetails,
  inputArgs?: InputArgs
) => {
  const input = getTestInput(inputArgs);

  process.stdout.write(`Running test: Day ${day}, Part ${part} ... `);
  const result = testMethod(input);
  console.log(`Done!`);
  console.log(`Result: ${result}`);
};
