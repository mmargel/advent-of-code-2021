import fs from "fs";

const PARTS_PER_PROBLEM = 2;

const verifySolvePartMethod = (day, part, promiseResult) => {
  if (promiseResult.solvePart) {
    return true;
  } else {
    console.error(
      `Day ${day}, Part ${part} does not define solvePart(values: number[])`
    );
    return false;
  }
};

const logMissingPart = (day, part) => {
  console.error(`Could not find Day ${day}, Part ${part}`);
};

const validateDay = (day) => {
  if (!day) {
    throw new Error("Day number not supplies. Usage: yarn run day <dayNumber>");
  } else if (day <= 0) {
    throw new Error("Day number must be positive.");
  }
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
