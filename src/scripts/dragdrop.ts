export const dropZoneElement = document.getElementById("dropzone")!;

export const enableHighlight = (enable = true) => {
  if (enable) {
    dropZoneElement.classList.add("highlight");
    return;
  }

  dropZoneElement.classList.remove("highlight");
};

// Prevent drag and drop defaul events and propagation
["dragenter", "dragover", "dragleave", "drop"].forEach((eventName) => {
  dropZoneElement.addEventListener(
    eventName,
    (event) => {
      event.preventDefault();
      event.stopPropagation();
    },
    false
  );
});

["dragenter", "dragover"].forEach((eventName) => {
  dropZoneElement.addEventListener(eventName, () => {
    enableHighlight();
  });
});

["dragleave", "drop"].forEach((eventName) => {
  dropZoneElement.addEventListener(eventName, () => {
    enableHighlight(false);
  });
});
