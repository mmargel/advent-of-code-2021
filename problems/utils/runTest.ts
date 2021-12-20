import { getTestInput } from "./input.js";

type TestMethod = (args: string[]) => void;

interface TestDetails {
  part: number;
  day: number;
  testMethod: TestMethod;
  test?: boolean;
  allowComments?: boolean;
}

export const runTest = ({
  day,
  part,
  testMethod,
  test = false,
  allowComments = true,
}: TestDetails) => {
  const input = getTestInput({ day, test, allowComments });

  process.stdout.write(`Running test: Day ${day}, Part ${part} ... `);
  const result = testMethod(input);
  console.log(`Done!`);
  console.log(`Result: ${result}`);
};
