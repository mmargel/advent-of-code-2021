import { runTest } from "../utils/runTest.js";

type ConnectionMap = Record<string, string[]>;
type Route = string[];

const getConnectionMap = (pairs: string[]): ConnectionMap => {
  const map: ConnectionMap = {};
  pairs.forEach((pair) => {
    const [first, second] = pair.split("-");

    if (map[first]) {
      map[first].push(second);
    } else {
      map[first] = [second];
    }

    if (map[second]) {
      map[second].push(first);
    } else {
      map[second] = [first];
    }
  });
  return map;
};

const explore = (
  cave: string,
  connections: ConnectionMap,
  visitList: Route,
  routes: Route[],
  revisitsRemaining: number
): void => {
  const updatedVisitList = [...visitList, cave];

  // Base case: we're at the exit, so return the completed route
  if (cave === "end") {
    routes.push(updatedVisitList);
    return;
  }

  connections[cave].forEach((nextCave) => {
    if (nextCave === "start") {
      // We don't want to repeat this.
    } else if (isBigCave(nextCave)) {
      explore(
        nextCave,
        connections,
        updatedVisitList,
        routes,
        revisitsRemaining
      );
    } else if (!updatedVisitList.includes(nextCave)) {
      explore(
        nextCave,
        connections,
        updatedVisitList,
        routes,
        revisitsRemaining
      );
    } else if (revisitsRemaining > 0) {
      explore(
        nextCave,
        connections,
        updatedVisitList,
        routes,
        revisitsRemaining - 1
      );
    }
  });
};

const isBigCave = (cave: string) => {
  return cave.match(/^[A-Z]+$/);
};

export const exploreCaveSystem = (
  caves: string[],
  revisitsAllowed: number
): Route[] => {
  const routes: Route[] = [];
  const connectionMap = getConnectionMap(caves);
  explore("start", connectionMap, [], routes, revisitsAllowed);
  return routes;
};

const findSolution = (caves: string[]): number => {
  const routes = exploreCaveSystem(caves, 0);
  return routes.length;
};

// 4573
export const solvePart = () =>
  runTest({ day: 12, part: 1, testMethod: findSolution, test: false });
