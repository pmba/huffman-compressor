export const getFileData = async (file: File) => {
  const reader = new FileReader();

  return new Promise<string>((resolve, reject) => {
    reader.onload = (event) => {
      const data = event.target?.result?.toString();

      if (!data) {
        return reject("No data found");
      }

      resolve(data);
    };

    reader.onerror = (err) => {
      reject(err);
    };

    reader.readAsBinaryString(file);
  });
};

export const formatBytes = (bytes: number) => {
  var units = ["B", "KB", "MB", "GB", "TB"];
  var i: number;

  for (i = 0; bytes >= 1024 && i < 4; i++) {
    bytes /= 1024;
  }

  return bytes.toFixed(2) + units[i];
};
