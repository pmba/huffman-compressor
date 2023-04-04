import { dropZoneElement } from "./dragdrop";
import HuffmanCompressor from "./huffman/compression";
import {
  setCurrentState,
  setupFileDownload,
  setupFileInfo,
  showCompressionPanel,
} from "./ui";
import { getFileData } from "./utils/file-utils";

const fileInput = document.getElementById("fileInput")! as HTMLInputElement;
const searchFileButton = document.getElementById("searchFileButton")!;

const compressButton = document.getElementById("compressButton")!;
const decompressButton = document.getElementById("decompressButton")!;

export interface FileInfo {
  name: string;
  data: string;
}

let fileInfo: FileInfo = {
  name: "",
  data: "",
};

const setupFile = async (file: File): Promise<FileInfo> => {
  const fileName = file.name;
  const fileData = await getFileData(file);

  setupFileInfo({
    name: fileName,
    size: fileData.length,
  });

  showCompressionPanel();

  return {
    name: fileName,
    data: fileData,
  } satisfies FileInfo;
};

/* -------------------------------------------------------------------------- */
/*                       Input and drag and drop events                       */
/* -------------------------------------------------------------------------- */

//#region Input and drag and drop events

searchFileButton.onclick = () => {
  fileInput.click();
};

fileInput.onchange = async () => {
  const files = fileInput.files;

  if (!files || !files.length) return;

  const info = await setupFile(files[0]);
  fileInfo = { ...info };
};

dropZoneElement.ondrop = async (event) => {
  const dataTransfer = event.dataTransfer;

  if (!dataTransfer) return;

  const files = dataTransfer.files;
  fileInput.files = files;

  const info = await setupFile(files[0]);
  fileInfo = { ...info };
};

//#endregion

/* -------------------------------------------------------------------------- */
/*                       Compress and Decompress buttons                      */
/* -------------------------------------------------------------------------- */

//#region Compress and Decompress buttons config

const huffman = new HuffmanCompressor();

compressButton.onclick = () => {
  setCurrentState("COMPRESSION");

  const compressedBytes = huffman.compress(fileInfo);

  setupFileDownload({
    bytes: compressedBytes,
    fileInfo: fileInfo,
    compressed: true,
  });
};

decompressButton.onclick = () => {
  setCurrentState("COMPRESSION");
  const { bytes, extension } = huffman.decompress(fileInfo);

  fileInfo.name = fileInfo.name.split(".")[0] + "." + extension;

  setupFileDownload({
    bytes,
    fileInfo,
    compressed: false,
  });
};

//#endregion
