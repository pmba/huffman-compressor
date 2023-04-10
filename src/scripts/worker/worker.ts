import { Command } from ".";
import HuffmanCompressor from "../huffman/compression";
import { Message } from "./index.d";

const huffman = new HuffmanCompressor();

onmessage = function (message: MessageEvent<Command>) {
  const { type, data, name } = message.data;

  let bytes: Uint8Array;
  let extension: string | undefined;

  if (type === "compress") {
    bytes = huffman.compress({
      data,
      name,
    });
  } else {
    const decompressed = huffman.decompress({
      data,
      name,
    });

    bytes = decompressed.bytes;
    extension = decompressed.extension;
  }

  postMessage({
    type,
    bytes,
    extension,
  } satisfies Message);
};
