import { runTest } from "../utils/runTest.js";

// I really don't like this solution, but this problem was giving me more trouble
// than I'd expected and this was the best I was able to come up with (without spending
// more than a few days working on it).

interface Leaf {
  value: number;
  parent?: Branch;
}

interface Branch {
  left: Node;
  right: Node;
  parent?: Branch;
}

type Node = Leaf | Branch;

const splitNodeString = (nodeString: string): [string, string] => {
  let depth = 0;
  let separator: number | undefined;
  for (let i = 0; separator === undefined; i++) {
    const char = nodeString[i];
    if (char === "[") {
      depth++;
    } else if (char === "]") {
      depth--;
    } else if (char === "," && depth === 1) {
      separator = i;
    }
  }

  return [
    nodeString.slice(1, separator),
    nodeString.slice(separator + 1, nodeString.length - 1),
  ];
};

export const parseNode = (nodeString: string): Node => {
  const value = parseInt(nodeString);
  if (isNaN(value)) {
    const [leftString, rightString] = splitNodeString(nodeString);
    const leftNode = parseNode(leftString);
    const rightNode = parseNode(rightString);
    const node = {
      left: leftNode,
      right: rightNode,
    };
    leftNode.parent = node;
    rightNode.parent = node;

    return node;
  } else {
    return { value };
  }
};

export const add = (a: Node, b: Node): Branch => {
  const sum: Node = {
    left: a,
    right: b,
  };
  a.parent = sum;
  b.parent = sum;

  reduceTree(sum);
  return sum;
};

const getNextLeaf = (node: Node): Leaf | null => {
  let prevNode: Node | undefined = node;
  let currentNode: Node | undefined = node.parent;

  while (currentNode) {
    if (isLeaf(currentNode)) {
      // We've descended to a leaf
      return currentNode;
    } else if (prevNode === currentNode.parent) {
      // We're in the descent
      prevNode = currentNode;
      currentNode = currentNode.left;
    } else if (prevNode === currentNode.right) {
      // We're in the ascent and are looking for a branch with an unvisited right node
      prevNode = currentNode;
      currentNode = currentNode.parent;
    } else if (prevNode === currentNode.left) {
      // We've entered a node with an unvisited right branch
      prevNode = currentNode;
      currentNode = currentNode.right;
    }
  }

  return currentNode ?? null;
};

const getPreviousLeaf = (node: Node): Leaf | null => {
  let prevNode: Node | undefined = node;
  let currentNode: Node | undefined = node.parent;

  while (currentNode) {
    if (isLeaf(currentNode)) {
      return currentNode;
    } else if (prevNode === currentNode.parent) {
      prevNode = currentNode;
      currentNode = currentNode.right;
    } else if (prevNode === currentNode.left) {
      prevNode = currentNode;
      currentNode = currentNode.parent;
    } else if (prevNode === currentNode.right) {
      prevNode = currentNode;
      currentNode = currentNode.left;
    }
  }

  return currentNode ?? null;
};

const isLeaf = (node: Node): node is Leaf => {
  return Object.keys(node).includes("value");
};

const replace = (b: Branch, original: Node, replacement: Node) => {
  if (original === b.left) {
    b.left = replacement;
  } else {
    b.right = replacement;
  }
};

const split = (leaf: Leaf): Boolean => {
  if (leaf.value < 10) {
    return false;
  }
  const left = Math.floor(leaf.value / 2);
  const right = Math.ceil(leaf.value / 2);
  const newNode: Branch = {
    left: { value: left },
    right: { value: right },
    parent: leaf.parent,
  };
  newNode.left.parent = newNode;
  newNode.right.parent = newNode;
  if (leaf.parent) {
    replace(leaf.parent, leaf, newNode);
  }
  return true;
};

const getDepth = (node: Node) => {
  let currentNode: Node | undefined = node;
  let depth = 0;
  while (currentNode) {
    depth++;
    currentNode = currentNode.parent;
  }
  return depth;
};

const explode = (branch: Branch): void => {
  const prevLeaf = getPreviousLeaf(branch);
  const nextLeaf = getNextLeaf(branch);

  if (isLeaf(branch.left) && prevLeaf) {
    prevLeaf.value += branch.left.value;
  }

  if (isLeaf(branch.right) && nextLeaf) {
    nextLeaf.value += branch.right.value;
  }

  const newNode = { value: 0, parent: branch.parent };
  if (branch.parent) {
    replace(branch.parent, branch, newNode);
  }
};

const explodeTree = (node: Branch): Boolean => {
  if (isLeaf(node.left) && isLeaf(node.right) && getDepth(node) > 4) {
    explode(node);
    return true;
  } else if (!isLeaf(node.left) && !isLeaf(node.right)) {
    return explodeTree(node.left) || explodeTree(node.right);
  } else if (!isLeaf(node.left)) {
    return explodeTree(node.left);
  } else if (!isLeaf(node.right)) {
    return explodeTree(node.right);
  } else {
    return false;
  }
};

const splitTree = (node: Branch): Boolean => {
  if (isLeaf(node.left)) {
    if (split(node.left)) {
      return true;
    } else {
      return isLeaf(node.right) ? split(node.right) : splitTree(node.right);
    }
  } else if (splitTree(node.left)) {
    return true;
  } else {
    return isLeaf(node.right) ? split(node.right) : splitTree(node.right);
  }
};

const reduceTree = (root: Branch): void => {
  let reduced = false;
  while (!reduced) {
    // Loop until there are no more nodes to explode
    while (explodeTree(root));
    // Then try to split a single node
    reduced = !splitTree(root);
  }
};

export const print = (node: Node): string => {
  if (isLeaf(node)) {
    return node.value.toString();
  } else {
    return `[${print(node.left)},${print(node.right)}]`;
  }
};

export const getMagnitude = (node: Node): number => {
  if (isLeaf(node)) {
    return node.value;
  } else {
    return 3 * getMagnitude(node.left) + 2 * getMagnitude(node.right);
  }
};

const findSolution = (values: string[]): number => {
  const root = parseNode(values[0]) as Branch;
  const tree = values
    .slice(1)
    .reduce((acc, node) => add(acc, parseNode(node)), root);

  return getMagnitude(tree);
};

// 3675
export const solvePart = () =>
  runTest({ day: 18, part: 1, testMethod: findSolution, test: false });
