import { runTest } from "../utils/runTest.js";
import {
  Coordinates as SimpleCoordinates,
  getMovementSign,
  getMovementVector,
  navigate,
} from "./part1.js";

interface Coordinates extends SimpleCoordinates {
  aim: number;
}

const move = (coordinates: Coordinates, instruction: string) => {
  const [direction, magnitude] = getMovementVector(instruction);

  if (direction === "forward") {
    coordinates.position += magnitude;
    coordinates.depth += coordinates.aim * magnitude;
  } else {
    coordinates.aim += getMovementSign(direction) * magnitude;
  }
};

const getFinalPosition = (directions: string[]) => {
  const coordinates: Coordinates = {
    position: 0,
    depth: 0,
    aim: 0,
  };

  return navigate(coordinates, move, directions);
};

export const solvePart = () =>
  runTest({ day: 2, part: 2, testMethod: getFinalPosition });
