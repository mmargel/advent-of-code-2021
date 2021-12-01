import { strictEqual } from "assert";
import { getTestInput } from "./input.js";

export const runTest = (testMethod, inputArgs) => {
  const input = getTestInput(inputArgs);
  const pathComponents = process.argv[1].split("/");
  const testDir = pathComponents[pathComponents.length - 2];

  const currentTest = testDir.replace(
    /[A-Za-z]+/,
    (substring) => substring[0].toUpperCase() + substring.slice(1) + " "
  );

  process.stdout.write(`Running test: ${currentTest}... `);
  const result = testMethod(input);
  console.log(`Done!`);
  console.log(`Result: ${result}`);
};
