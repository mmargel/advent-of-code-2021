import fs from "fs";

export const getTestInput = ({ test = false } = {}) => {
  const pathComponents = process.argv[1].split("/");
  pathComponents[pathComponents.length - 1] = test ? "test.txt" : `input.txt`;
  const inputPath = pathComponents.join("/");
  return fs
    .readFileSync(inputPath)
    .toString()
    .split("\n")
    .map((line) => +line);
};
