import { runTest } from "../utils/runTest.js";

type Rules = Record<string, string>; // Maps AB -> C
type Census = Record<string, number>;

export const parseInputs = (values: string[]): [string, Rules] => {
  const rules: Rules = {};
  const starter = values[0];

  values.slice(2).forEach((rule) => {
    const [start, end] = rule.split(" -> ");
    rules[start] = end;
  });

  return [starter, rules];
};

const iteratePolymer = (
  compounds: Census,
  elements: Census,
  rules: Rules
): [Census, Census] => {
  const updatedCompounds: Census = { ...compounds };
  const updatedElements: Census = { ...elements };

  Object.keys(compounds)
    .filter((compound) => compounds[compound] > 0)
    .forEach((compound) => {
      const element = rules[compound];
      const outputs = [`${compound[0]}${element}`, `${element}${compound[1]}`];
      const scale = compounds[compound];

      updatedCompounds[compound] -= scale;
      updatedElements[element] = (updatedElements[element] ?? 0) + scale;
      outputs.forEach((output) => {
        updatedCompounds[output] = (updatedCompounds[output] ?? 0) + scale;
      });
    });
  return [updatedCompounds, updatedElements];
};

export const simulatePolymer = (
  polymer: string,
  rules: Rules,
  iterations: number
): Census => {
  let compoundCensus: Census = {};
  let elementCensus: Census = {};

  for (let i = 0; i < polymer.length; i++) {
    if (polymer[i + 1]) {
      const index = `${polymer[i]}${polymer[i + 1]}`;
      compoundCensus[index] = (compoundCensus[index] ?? 0) + 1;
    }
    elementCensus[polymer[i]] = (elementCensus[polymer[i]] ?? 0) + 1;
  }

  for (let i = 0; i < iterations; i++) {
    [compoundCensus, elementCensus] = iteratePolymer(
      compoundCensus,
      elementCensus,
      rules
    );
  }

  return elementCensus;
};

export const calculateScore = (elementCensus: Census): number => {
  const sortedScores = Object.values(elementCensus).sort((a, b) => b - a);
  return sortedScores[0] - sortedScores[sortedScores.length - 1];
};

const findSolution = (values: string[]): number => {
  const [polymer, rules] = parseInputs(values);
  const finalPolymer = simulatePolymer(polymer, rules, 10);
  const score = calculateScore(finalPolymer);

  return score;
};

// 2874
export const solvePart = () =>
  runTest({ day: 14, part: 1, testMethod: findSolution, test: false });
