import fs from "fs";
import { validateDay } from "./args.js";
import { PARTS_PER_PROBLEM } from "./constants.js";

const PROBLEM_ROOT = "./problems";
const DATA_ROOT = "./data";

const getTemplate = (day, part) => `
import { runTest } from "../utils/runTest.js";

const findSolution = (_values: string[]) : number => {
  return -1;
};

export const solvePart = () =>
  runTest({ day: ${day}, part: ${part}, testMethod: findSolution, test: true });
`;

const createPart = (day, part) => {
  const dir = [PROBLEM_ROOT, `day${day}`].join("/");
  const path = [dir, `part${part}.ts`].join("/");

  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir);
  }

  if (!fs.existsSync(path)) {
    fs.writeFileSync(path, getTemplate(day, part));
  }
};

const createDataFile = (day, name) => {
  const dir = [DATA_ROOT, `day${day}`].join("/");
  const path = [dir, name].join("/");
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir);
  }

  if (!fs.existsSync(path)) {
    fs.openSync(path, "w+");
  }
};

const initializeProblem = async (day) => {
  validateDay(day);

  for (let part = 1; part <= PARTS_PER_PROBLEM; part++) {
    createPart(day, part);
  }

  for (const file of ["input.txt", "test.txt"]) {
    createDataFile(day, file);
  }
};

await initializeProblem(process.argv[2]);
