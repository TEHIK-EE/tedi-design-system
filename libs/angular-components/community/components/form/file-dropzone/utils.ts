import { FileDropzone } from "./types";

/** SI Standard https://wiki.ubuntu.com/UnitsPolicy */
export function formatBytes(bytes: number): string {
  const MB = 100000;
  const kB = 1000;
  if (bytes > MB) {
    return `${bytes / MB} MB`;
  }
  if (bytes > kB) {
    return `${bytes / kB} kB`;
  }
  return `${bytes} B`;
}

export function getDefaultHelpers(
  accept: string,
  maxSize: number,
  translate?: (key: string, ...args: unknown[]) => string
): string {
  if (!translate)
    throw new Error(
      "Translate function is required to generate default helpers."
    );
  const textArray = [];
  if (accept) {
    textArray.push(
      `${translate("file-upload.accept")} ${accept.replaceAll(",", ", ")}`
    );
  }
  if (maxSize) {
    textArray.push(
      `${translate("file-upload.max-size")} ${formatBytes(maxSize)}`
    );
  }
  return textArray.filter(Boolean).join(". ");
}

export function validateFileSize(
  maxSize: number,
  acceptFileTypes: string,
  file: FileDropzone,
  translate: (key: string, ...args: unknown[]) => string
) {
  if (maxSize && file.size > maxSize) {
    const maxSizeMB = formatBytes(maxSize);
    return translate(
      `file-upload.size-rejected-extended`,
      file.name,
      maxSizeMB
    );
  }
  return undefined;
}

export function validateFileType(
  maxSize: number,
  acceptFileTypes: string,
  file: FileDropzone,
  translate: (key: string, ...args: unknown[]) => string
) {
  if (acceptFileTypes) {
    const validTypes = acceptFileTypes
      .split(",")
      .map((type) => type.trim().toLowerCase());

    const fileType = file.type.toLowerCase();
    const fileName = file.name.toLowerCase() || "";

    const matches = validTypes.some((type) => {
      if (type.startsWith(".")) {
        return fileName.endsWith(type);
      }
      if (type.endsWith("/*")) {
        return fileType.startsWith(type.replace("/*", ""));
      }
      return fileType === type;
    });

    if (!matches) {
      return translate(
        `file-upload.extension-rejected-extended`,
        file.name,
        acceptFileTypes
      );
    }
  }
  return undefined;
}
