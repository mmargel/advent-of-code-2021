import { runTest } from "../utils/runTest.js";

export interface Node {
  version: number;
  type: number;
  value?: number;
  children?: Node[];
}

export const hexToBinary = (hexString: string): string =>
  hexString
    .split("")
    .map((hexChar) => parseInt(hexChar, 16).toString(2))
    .map((binString) => binString.padStart(4, "0"))
    .join("");

const binToDec = (binString: string): number => parseInt(binString, 2);

const getVersion = (packet: string): number => parseInt(packet.slice(0, 3), 2);

const getType = (packet: string): number => parseInt(packet.slice(3, 6), 2);

const getPayload = (packet: string): string => packet.slice(6);

const evaluateLiteral = (payload: string): [number, number] => {
  const values: string[] = [];
  const wordLength = 5;
  let endReached = false;
  let pointer = 0;

  while (!endReached) {
    if (payload[pointer] === "0") {
      endReached = true;
    }
    values.push(payload.slice(pointer + 1, pointer + wordLength));
    pointer += wordLength;
  }

  const binString = values.join("");
  return [binToDec(binString), pointer];
};

export const parsePackets = (
  packetBits: string,
  numPackets: number
): [Node[], number] => {
  const packets: Node[] = [];
  let pointer = 0;
  while (pointer < packetBits.length && packets.length < numPackets) {
    const bits = packetBits.slice(pointer);
    const version = getVersion(bits);
    const type = getType(bits);
    const payload = getPayload(bits);

    // The header always has 6 bits
    pointer += 6;

    if (type === 4) {
      const [value, packetLength] = evaluateLiteral(payload);
      packets.push({ type, version, value });
      pointer += packetLength;
    } else {
      const sizeMode = payload[0];
      if (sizeMode === "0") {
        const subPacketSize = binToDec(payload.slice(1, 16));
        const subPackets = payload.slice(16, 16 + subPacketSize);
        const [children, childLength] = parsePackets(subPackets, Infinity);
        packets.push({ type, version, children });
        pointer += 16 + childLength;
      } else {
        const subPacketCount = binToDec(payload.slice(1, 12));
        const subPackets = payload.slice(12);
        const [children, childLength] = parsePackets(
          subPackets,
          subPacketCount
        );
        packets.push({ type, version, children });
        pointer += 12 + childLength;
      }
    }
  }
  return [packets, pointer];
};

const getVersionSum = (node: Node): number =>
  node.version +
  (node.children ?? []).reduce((acc, val) => acc + getVersionSum(val), 0);

const findSolution = (values: string[]): number => {
  const hexString = values[0];
  const transmission = hexToBinary(hexString);

  const tree: Node = parsePackets(transmission, 1)[0][0];
  // console.log("[tree]", JSON.stringify(tree));

  return getVersionSum(tree);
};

export const solvePart = () =>
  runTest({ day: 16, part: 1, testMethod: findSolution, test: false });
