import { FileInfo } from "..";
import BitSet from "../structures/bitset";
import PreorderTraversal from "../structures/traversal";
import { numberToBinString } from "./../utils/binary";
import { HuffmanUtils } from "./utils";

export default class HuffmanCompressor {
  private utils = new HuffmanUtils();

  private assertData(data: string) {
    if (!data || data.length === 0) {
      throw new Error("data must not be empty");
    }
  }

  public compress({ data, name }: FileInfo): string {
    this.assertData(data);

    const { traversal, table } = this.utils.getInfos(data);

    // The compressed file structure should be:
    // - 5 Bits for extension length (without dot), max value 32
    // - 3 Bits for thrash size, max value 8
    // - 16 Bits for tree traversal size, max value 65536
    // - Tree traversal
    // - Compressed Bytes (including trash)

    let compressedData: string[] = [];
    let bitBuffer: string[] = [];

    for (let byte of data) {
      let bitPath = table.get(byte);

      console.log(byte, bitPath);

      if (!bitPath) {
        throw new Error(
          `Something went wrong, byte '${byte}' - ${byte.charCodeAt(
            0
          )} was not found within the lookup table.`
        );
      }

      bitPath.forEach((bit) => {
        bitBuffer.push(bit === 1 ? "1" : "0");
      });

      while (bitBuffer.length >= 8) {
        // if len is greater than 8, we can build an entire byte
        const byte = new BitSet();

        for (let bit = 7; bit >= 0; --bit) {
          let bitActive = bitBuffer.shift() === "1";

          if (bitActive) {
            byte.set(bit);
          }
        }

        compressedData.push(String.fromCharCode(byte.value));
      }
    }

    let value = 0;
    let trashSize = 0;

    if (bitBuffer.length > 0) {
      const startAtBit = 8 - bitBuffer.length;
      trashSize = startAtBit;

      for (let bit = startAtBit; bit < 8; ++bit) {
        let bitActive = bitBuffer.pop() === "1";

        if (bitActive) {
          value += Math.pow(2, bit);
        }
      }

      compressedData.push(String.fromCharCode(value));
    }

    console.log(name);
    const extension = name.split(".")[1];

    const extLength = extension.length;

    // Build First Byte:
    // - 5 Bits for extension length (without dot), max value 32
    // - 3 Bits for thrash size, max value 8

    const extLenBin = numberToBinString(extLength, 5);
    const trashBin = numberToBinString(trashSize, 3);

    const firstByte = new BitSet();

    for (let i = 2, bit = 0; bit < 3; ++bit, --i) {
      let bitActive = trashBin[i] === "1";

      if (bitActive) {
        firstByte.set(bit);
      }
    }

    for (let i = 4, bit = 3; bit < 8; ++bit, --i) {
      let bitActive = extLenBin[i] === "1";

      if (bitActive) {
        firstByte.set(bit);
      }
    }

    console.log(`FirstByte: ${firstByte.value} - ${firstByte.binary()}`);

    // Build next two bytes:
    // - 16 Bits for tree traversal size, max value 65536

    const traversalLenBin = numberToBinString(traversal.length, 16);

    const secondByte = new BitSet();
    const thirdByte = new BitSet();

    for (let i = 15, bit = 0; bit < 8; ++bit, --i) {
      let bitActive = traversalLenBin[i] === "1";

      if (bitActive) {
        thirdByte.set(bit);
      }
    }

    for (let i = 7, bit = 0; bit < 8; ++bit, --i) {
      let bitActive = traversalLenBin[i] === "1";

      if (bitActive) {
        secondByte.set(bit);
      }
    }

    console.log(`SecondByte: ${secondByte.value} - ${secondByte.binary()}`);
    console.log(`ThirdByte: ${thirdByte.value} - ${thirdByte.binary()}`);

    const header = [firstByte, secondByte, thirdByte].map((byte) =>
      String.fromCharCode(byte.value)
    );

    console.log(header);
    console.log(traversal);
    console.log(compressedData);

    compressedData.forEach((byte) => {
      console.log(numberToBinString(byte.charCodeAt(0), 8));
    });

    console.log(
      `Final Length: ${
        header.length + traversal.length + compressedData.length
      }`
    );

    return header.join("") + traversal + compressedData.join("");
  }

  public decompress({ data }: FileInfo): string {
    // The compressed file structure should be:
    // - 5 Bits for extension length (without dot), max value 32
    // - 3 Bits for thrash size, max value 8
    // - 16 Bits for tree traversal size, max value 65536
    // - Tree traversal
    // - Compressed Bytes (including trash)

    // Get first byte values:
    // - 5 Bits for extension length (without dot)
    // - 3 Bits for thrash size

    const firstByte = new BitSet(data[0].charCodeAt(0));
    console.log(
      "🚀 ~ file: compression.ts:169 ~ HuffmanCompressor ~ decompress ~ firstByte:",
      firstByte.value
    );

    const trashSize = new BitSet();

    for (let bit = 0; bit < 3; ++bit) {
      if (firstByte.test(bit)) {
        trashSize.set(bit);
      }
    }

    console.log(
      "🚀 ~ file: compression.ts:180 ~ HuffmanCompressor ~ decompress ~ trashSize:",
      trashSize.value
    );

    const extensionLen = new BitSet();

    for (let bit = 3; bit < 8; ++bit) {
      if (firstByte.test(bit)) {
        extensionLen.set(bit - 3);
      }
    }

    console.log(
      "🚀 ~ file: compression.ts:194 ~ HuffmanCompressor ~ decompress ~ extensionLen:",
      extensionLen.value
    );

    // Get tree traversal length:
    // - 16 Bits for tree traversal size

    const secondByte = new BitSet(data[1].charCodeAt(0));
    const thirdByte = new BitSet(data[2].charCodeAt(0));

    const treeTraversalLen = new BitSet();

    for (let bit = 0; bit < 8; ++bit) {
      if (thirdByte.test(bit)) {
        treeTraversalLen.set(bit);
      }

      if (secondByte.test(bit)) {
        treeTraversalLen.set(bit + 8);
      }
    }

    console.log(
      "🚀 ~ file: compression.ts:206 ~ HuffmanCompressor ~ decompress ~ treeTraversalLen:",
      treeTraversalLen.value
    );

    // Get tree travesal

    const traversal = data.substring(3, treeTraversalLen.value + 3);
    console.log(
      "🚀 ~ file: compression.ts:225 ~ HuffmanCompressor ~ decompress ~ traversal:",
      traversal
    );

    const treeTraversal = new PreorderTraversal(traversal);
    console.log(treeTraversal.tree);

    let index = traversal.length + 3;
    let head = treeTraversal.tree;

    const decompData: string[] = [];

    while (index < data.length) {
      const char = data[index];
      let byte = new BitSet(char.charCodeAt(0));

      const endAt = index < data.length - 1 ? 0 : trashSize.value;
      for (let bit = 7; bit >= endAt; --bit) {
        if (byte.test(bit)) {
          // Go Right
          head = head.right!;
        } else {
          // Go Left
          head = head.left!;
        }

        if (head.value !== "") {
          decompData.push(head.value);
          head = treeTraversal.tree;
        }
      }

      ++index;
    }

    console.log(decompData);

    return decompData.join("");
  }
}
