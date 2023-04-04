import { FileInfo } from ".";
import { formatBytes } from "./utils/file-utils";
const compressionActionsContainer = document.getElementById(
  "compressionContainer"
)!;

const fileNameElement = document.getElementById("fileName")!;
const fileInfoElement = document.getElementById("fileInfo")!;

const compressButton = document.getElementById(
  "compressButton"
)! as HTMLButtonElement;
const decompressButton = document.getElementById(
  "decompressButton"
)! as HTMLButtonElement;

const compressButtonsContainer = document.getElementById(
  "compressButtonsContainer"
)!;
const downloadContainer = document.getElementById("downloadContainer")!;
const downloadButton = document.getElementById(
  "downloadButton"
)! as HTMLAnchorElement;
const spinner = document.getElementById("spinner")!;

export const showCompressionPanel = (show = true) => {
  if (show) {
    compressionActionsContainer.classList.remove("hidden");
    return;
  }

  compressionActionsContainer.classList.add("hidden");
};

export const setupFileInfo = (info: { name: string; size: number }) => {
  const {
    length,
    [0]: fileName,
    [length - 1]: fileExtension,
  } = info.name.split(".");

  const formattedSize = formatBytes(info.size);

  fileNameElement.innerHTML = fileName;
  fileInfoElement.innerHTML = `Size ${formattedSize} | Extension .${fileExtension}`;
};

type States = "DEFAULT" | "COMPRESSION" | "DOWNLOAD";

export const setCurrentState = (state: States) => {
  if (state === "COMPRESSION") {
    compressButton.disabled = true;
    decompressButton.disabled = true;

    downloadContainer.classList.remove("hidden");
    compressButtonsContainer.classList.add("hidden");
    spinner.classList.remove("hidden");
    downloadButton.classList.add("hidden");
  } else if (state === "DOWNLOAD") {
    compressButton.disabled = true;
    decompressButton.disabled = true;

    downloadContainer.classList.remove("hidden");
    compressButtonsContainer.classList.add("hidden");
    spinner.classList.add("hidden");
    downloadButton.classList.remove("hidden");
  } else {
    compressButton.disabled = false;
    decompressButton.disabled = false;

    downloadContainer.classList.add("hidden");
    compressButtonsContainer.classList.remove("hidden");
  }
};

export function setupFileDownload({
  bytes,
  fileInfo,
  compressed,
}: {
  bytes: Uint8Array;
  fileInfo: FileInfo;
  compressed: boolean;
}) {
  const blob = new Blob([bytes], {
    type: "text/plain;charset=utf-8;",
  });

  const [fileName, fileExtension] = fileInfo.name.split(".");

  downloadButton.href = URL.createObjectURL(blob);
  downloadButton.download =
    fileName + (compressed ? ".huff" : `.${fileExtension}`);

  setCurrentState("DOWNLOAD");
}
