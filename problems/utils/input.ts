import { readFileSync } from "fs";

export interface InputArgs {
  day: number;
  test: boolean;
}

export const getTestInput = ({ day, test = false }: InputArgs) => {
  const inputPath = [
    ".",
    "data",
    `day${day}`,
    test ? "test.txt" : "input.txt",
  ].join("/");

  return readFileSync(inputPath)
    .toString()
    .split("\n")
    .filter((line) => line[0] != "#");
};
