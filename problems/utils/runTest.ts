import { getTestInput } from "./input.js";

type TestMethod = (args: number[]) => void;
interface TestDetails {
  part: number;
  day: number;
  testMethod: TestMethod;
  test?: boolean;
}

export const runTest = ({
  day,
  part,
  testMethod,
  test = false,
}: TestDetails) => {
  const input = getTestInput({ day, test });

  process.stdout.write(`Running test: Day ${day}, Part ${part} ... `);
  const result = testMethod(input);
  console.log(`Done!`);
  console.log(`Result: ${result}`);
};
