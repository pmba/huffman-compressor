import { FileInfo } from "..";

type CompressionTypes = "compress" | "decompress";

export interface Command extends FileInfo {
  type: CompressionTypes;
}

export interface Message {
  type: CompressionTypes;
  bytes: Uint8Array;
  extension?: string;
}

interface HuffmanWorker extends Omit<Worker, "postMessage" | "onmessage"> {
  postMessage(command: Command): void;
  onmessage: ((this: HuffmanWorker, ev: MessageEvent<Message>) => any) | null;
}

export default HuffmanWorker;
