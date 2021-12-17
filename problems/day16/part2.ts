import { runTest } from "../utils/runTest.js";
import { hexToBinary, parsePackets, Node } from "./part1.js";

const evaluateTree = (node: Node): number => {
  switch (node.type) {
    case 0:
      return node.children!.reduce(
        (acc, child) => acc + evaluateTree(child),
        0
      );
    case 1:
      return node.children!.reduce(
        (acc, child) => acc * evaluateTree(child),
        1
      );
    case 2:
      return Math.min(...node.children!.map(evaluateTree));
    case 3:
      return Math.max(...node.children!.map(evaluateTree));
    case 4:
      return node.value!;
    case 5:
      return evaluateTree(node.children![0]) > evaluateTree(node.children![1])
        ? 1
        : 0;
    case 6:
      return evaluateTree(node.children![0]) < evaluateTree(node.children![1])
        ? 1
        : 0;
    case 7:
      return evaluateTree(node.children![0]) === evaluateTree(node.children![1])
        ? 1
        : 0;
    default:
      return 0;
  }
};

const findSolution = (values: string[]): number => {
  const hexString = values[0];
  const transmission = hexToBinary(hexString);

  const tree: Node = parsePackets(transmission, 1)[0][0];
  // console.log("[tree]", JSON.stringify(tree));

  return evaluateTree(tree);
};

export const solvePart = () =>
  runTest({ day: 16, part: 2, testMethod: findSolution, test: false });
