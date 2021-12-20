import { runTest } from "../utils/runTest.js";

export const pad = (values: string[][], padWidth: number): string[][] => {
  const paddedValues = values.map((row) => [...row]);
  const fillChar = ".";
  const paddingRow: string[] = new Array(values[0].length).fill(fillChar);

  for (let i = 0; i < padWidth; i++) {
    paddedValues.push([...paddingRow]);
    paddedValues.unshift([...paddingRow]);
  }

  const padding = new Array(padWidth).fill(fillChar) as string[];
  for (let i = 0; i < paddedValues.length; i++) {
    paddedValues[i].unshift(...padding);
    paddedValues[i].push(...padding);
  }
  return paddedValues;
};

export const enhance = (
  input: string[][],
  map: string,
  filler: string
): string[][] => {
  const output = [...input.map((row) => [...row])];
  // Each time we enhance the image, it's possible for it to "grow" by 1 in each direction.
  // To accommodate this, we add a gutter of padding around the entire image.
  const fillerRow = new Array(input[0].length).fill(filler);
  output.push([...fillerRow]);
  output.unshift([...fillerRow]);
  output.forEach((_, index) => {
    output[index].push(filler);
    output[index].unshift(filler);
  });
  const paddedInput = [...output.map((row) => [...row])];

  // Once the padding is in place, we calculate the new pixel data "normally"
  for (let i = 0; i < paddedInput.length; i++) {
    for (let j = 0; j < paddedInput[0].length; j++) {
      const pixelData = [
        (paddedInput[i - 1] ?? [])[j - 1] || filler,
        (paddedInput[i - 1] ?? [])[j] || filler,
        (paddedInput[i - 1] ?? [])[j + 1] || filler,
        paddedInput[i][j - 1] || filler,
        paddedInput[i][j] || filler,
        paddedInput[i][j + 1] || filler,
        (paddedInput[i + 1] ?? [])[j - 1] || filler,
        (paddedInput[i + 1] ?? [])[j] || filler,
        (paddedInput[i + 1] ?? [])[j + 1] || filler,
      ]
        .join("")
        .replace(/\./g, "0")
        .replace(/#/g, "1");
      const pixelIndex = parseInt(pixelData, 2);
      const newPixel = map[pixelIndex];
      output[i][j] = newPixel;
    }
  }
  return output;
};

// const print = (grid: string[][]): string =>
//   grid.map((row) => row.join("")).join("\n");

const findSolution = (values: string[]): number => {
  const iterations = 2;
  const map = values[0];
  const input = pad(
    values.slice(2).map((row) => row.split("")),
    2
  );

  let output = input;
  for (let i = 0; i < iterations; i++) {
    // This is a little simplified - technically for odd values over 2, i = map[0] === '#' ? map[map.length-1] : map[0];
    output = enhance(output, map, i % 2 === 0 ? "." : map[0]);
  }

  return output.reduce(
    (acc, val) => acc + val.filter((char) => char === "#").length,
    0
  );
};

// 5419
export const solvePart = () =>
  runTest({
    day: 20,
    part: 1,
    testMethod: findSolution,
    test: false,
    allowComments: false,
  });
