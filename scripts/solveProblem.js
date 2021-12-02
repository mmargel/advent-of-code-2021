import fs from "fs";
import { validateDay } from "./args.js";
import { PARTS_PER_PROBLEM } from "./constants.js";

const verifySolvePartMethod = (day, part, promiseResult) => {
  if (promiseResult.solvePart) {
    return true;
  } else {
    console.error(
      `Day ${day}, Part ${part} does not define solvePart(values: string[]) => number`
    );
    return false;
  }
};

const logMissingPart = (day, part) => {
  console.error(`Could not find Day ${day}, Part ${part}`);
};

const validateDayPath = (path, day) => {
  if (!fs.existsSync(path)) {
    throw new Error(`Problems could not be found for Day ${day}.`);
  }
};

const importAndRunParts = async (path, day, part) => {
  return import(`../${path}/part${part}.js`)
    .then(
      (result) => verifySolvePartMethod(day, part, result) && result.solvePart()
    )
    .catch(() => logMissingPart(day, part));
};

const solveProblem = async (day) => {
  validateDay(day);

  const dayPath = `./dist/day${day}`;
  validateDayPath(dayPath, day);

  for (let part = 1; part <= PARTS_PER_PROBLEM; part++) {
    await importAndRunParts(dayPath, day, part);
  }
};

await solveProblem(process.argv[2]);
