import { runTest } from "../utils/runTest.js";
import { uniqueDigitMap } from "./part1.js";

type DigitMap = Record<string, number>;
type ReverseDigitMap = Record<number, string>;

const sortString = (s: string) => s.split("").sort().join("");

const determineUniqueNumber = (digits: string) => {
  return uniqueDigitMap[digits.length];
};

const countMatchingDigits = (digits: string, target: string) => {
  return digits.match(new RegExp(`[${target}]`, "g"))?.length;
};

const tryIdentify235 = (digits: string, digitMap: ReverseDigitMap) => {
  if (countMatchingDigits(digits, digitMap[1]) === 2) {
    return 3;
  }

  if (countMatchingDigits(digits, digitMap[4]) === 3) {
    return 5;
  }

  if (countMatchingDigits(digits, digitMap[4]) === 2) {
    return 2;
  }
};

const tryIdentify069 = (digits: string, digitMap: ReverseDigitMap) => {
  if (countMatchingDigits(digits, digitMap[7]) === 2) {
    return 6;
  }

  if (countMatchingDigits(digits, digitMap[4]) === 4) {
    return 9;
  }

  if (
    countMatchingDigits(digits, digitMap[4]) === 3 &&
    countMatchingDigits(digits, digitMap[7]) === 3
  ) {
    return 0;
  }
};

const tryIdentifyNumber = (digits: string, digitMap: ReverseDigitMap) => {
  if (digits.length === 5) {
    return tryIdentify235(digits, digitMap);
  } else if (digits.length === 6) {
    return tryIdentify069(digits, digitMap);
  }
};

const createDigitMap = (inputString: string): DigitMap => {
  const digitMap: DigitMap = {};
  const reverseDigitMap: ReverseDigitMap = {};
  const digitList = inputString.split(" ").map(sortString);

  // Start by processing the easily-identifiable numbers
  digitList.forEach((digits) => {
    const uniqueNumber = determineUniqueNumber(digits);
    if (uniqueNumber != undefined) {
      digitMap[digits] = uniqueNumber;
      reverseDigitMap[uniqueNumber] = digits;
    }
  });

  // Then get a list of all still-unidentified numbers
  const unidentifiedNumbers = digitList.filter(
    (digits) => digitMap[digits] === undefined
  );

  // Loop until we identify everything
  while (unidentifiedNumbers.length > 0) {
    const digits = unidentifiedNumbers.shift();
    if (digits === undefined) {
      // This is mostly to satisfy TS - we should never get here
      continue;
    }

    const number = tryIdentifyNumber(digits, reverseDigitMap);
    if (number != undefined) {
      digitMap[digits] = number;
      reverseDigitMap[number] = digits;
    } else {
      unidentifiedNumbers.push(digits);
    }
  }

  return digitMap;
};

const findSolution = (values: string[]) => {
  return values.reduce((acc, line) => {
    const [inputString, outputString] = line.split(" | ");
    const digitMap = createDigitMap(inputString);
    const output = outputString
      .split(" ")
      .map(sortString)
      .reduce((acc, val) => acc + `${digitMap[val]}`, "");

    return acc + parseInt(output);
  }, 0);
};

// 978171
export const solvePart = () =>
  runTest({ day: 8, part: 2, testMethod: findSolution, test: false });
