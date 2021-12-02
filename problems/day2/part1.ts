import { runTest } from "../utils/runTest.js";

export interface Coordinates {
  position: number;
  depth: number;
}

type MoveMethod<T> = (coordinates: T, instruction: string) => void;

export const getMovementVector = (instruction: string): [string, number] => {
  const [direction, magnitude] = instruction.split(" ");
  return [direction, parseInt(magnitude)];
};

export const getMovementSign = (direction: string) => {
  return direction === "forward" || direction === "down" ? 1 : -1;
};

export const navigate = <T extends Coordinates>(
  coordinates: T,
  updateCoordinates: MoveMethod<T>,
  directions: string[]
) => {
  for (const direction of directions) {
    updateCoordinates(coordinates, direction);
  }

  return coordinates.position * coordinates.depth;
};

const move = (coordinates: Coordinates, instruction: string) => {
  const [direction, magnitude] = getMovementVector(instruction);

  if (direction === "forward") {
    coordinates.position += magnitude;
  } else {
    coordinates.depth += getMovementSign(direction) * magnitude;
  }
};

const getFinalPosition = (directions: string[]) => {
  const coordinates: Coordinates = {
    position: 0,
    depth: 0,
  };

  return navigate(coordinates, move, directions);
};

export const solvePart = () =>
  runTest({ day: 2, part: 1, testMethod: getFinalPosition });
