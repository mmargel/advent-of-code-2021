import { readFileSync } from "fs";

export interface InputArgs {
  day: number;
  test: boolean;
  allowComments: boolean;
}

export const getTestInput = ({
  day,
  test = false,
  allowComments = true,
}: InputArgs) => {
  const inputPath = [
    ".",
    "data",
    `day${day}`,
    test ? "test.txt" : "input.txt",
  ].join("/");

  return readFileSync(inputPath)
    .toString()
    .split("\n")
    .filter((line) => !allowComments || line[0] != "#");
};
