import { runTest } from "../utils/runTest.js";
import { getTarget, getTrajectories } from "./part1.js";

const findSolution = (values: string[]): number => {
  const target = getTarget(values[0]);
  const trajectories = getTrajectories(target);

  console.log("[trajectories]", trajectories);

  return trajectories.length;
};

export const solvePart = () =>
  runTest({ day: 17, part: 2, testMethod: findSolution, test: false });
