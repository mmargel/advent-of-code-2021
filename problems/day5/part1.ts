import { runTest } from "../utils/runTest.js";

type Point = {
  x: number;
  y: number;
};

type Line = [Point, Point];

const coordinateToPoint = (coordinate: string): Point => {
  const [x, y] = coordinate.split(",");
  return { x: parseInt(x), y: parseInt(y) };
};

const parseLine = (rawLine: string): Line => {
  const [start, end] = rawLine.split(" -> ");
  return [coordinateToPoint(start), coordinateToPoint(end)];
};

export const parseLines = (rawLines: string[]): Line[] => {
  return rawLines.map(parseLine);
};

const getDelta = (x0: number, x1: number) => {
  return Math.sign(x1 - x0);
};

const drawLine = (
  grid: number[][],
  [start, end]: Line,
  allowDiagonals = false
) => {
  let [x0, y0] = [start.x, start.y];
  const [x1, y1] = [end.x, end.y];

  const dx = getDelta(x0, x1);
  const dy = getDelta(y0, y1);

  if (dx && dy && !allowDiagonals) {
    return;
  }

  const steps = dx ? Math.abs(x1 - x0) : Math.abs(y1 - y0);
  for (let i = 0; i <= steps; i++) {
    grid[y0] ||= [];
    grid[y0][x0] = (grid[y0][x0] || 0) + 1;

    x0 += dx;
    y0 += dy;
  }
};

export const countIntersections = (
  grid: number[][],
  lines: Line[],
  allowDiagonals: boolean = false
) => {
  lines.forEach((line) => {
    drawLine(grid, line, allowDiagonals);
  });

  return grid.flat().filter((value) => value >= 2).length;
};

const findSolution = (values: string[]) => {
  const grid: number[][] = [];
  const lines = parseLines(values);

  return countIntersections(grid, lines, false);
};

export const solvePart = () =>
  runTest({ day: 5, part: 1, testMethod: findSolution });
