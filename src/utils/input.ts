import { readFileSync } from "fs";

export interface InputArgs {
  test?: boolean;
}

export const getTestInput = ({ test = false }: InputArgs = { test: false }) => {
  const pathComponents = process.argv[1].split("/");
  pathComponents[pathComponents.length - 3] = "data";
  pathComponents[pathComponents.length - 1] = test ? "test.txt" : `input.txt`;
  const inputPath = pathComponents.join("/");
  return readFileSync(inputPath)
    .toString()
    .split("\n")
    .map((line) => +line);
};
