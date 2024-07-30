export const accepted_files = {
  "image/*": [
    ".jpg",
    ".jpeg",
    ".png",
    ".gif",
    ".bmp",
    ".webp",
    ".ico",
    ".tif",
    ".tiff",
    ".raw",
    ".tga",
  ],
  "audio/*": [],
  "video/*": [],
};

export function fileToIcon(fileType: string) {
  if (fileType.startsWith("image")) return "/images/image.png";
  if (fileType.startsWith("audio")) return "/images/audio.png";
  return "/images/video.png";
}

const maxLengthFileName = 15;

export function compressFileName(fileName: string) {
  const fileNameWithoutExtension = fileName
    .split(".")
    .slice(0, -1)
    .join(".")
    .trim();
  const fileExtension = fileName.split(".").pop()?.trim();

  if (fileNameWithoutExtension.length > maxLengthFileName) {
    const compressedFileName =
      fileNameWithoutExtension.substring(0, maxLengthFileName - 6) +
      "..." +
      fileNameWithoutExtension.slice(-3) +
      "." +
      fileExtension;

    return compressedFileName;
  } else {
    return fileName.trim();
  }
}
