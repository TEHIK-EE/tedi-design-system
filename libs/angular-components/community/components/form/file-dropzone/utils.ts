import { IECFileSize, SIFileSize } from "./constants";
import { FileDropzone, SizeDisplayStandard } from "./types";

export function formatBytes(
  bytes: number,
  standard: SizeDisplayStandard
): string {
  let kB: number = 0;
  let MB: number = 0;

  switch (standard) {
    case "IEC":
      kB = IECFileSize.kB;
      MB = IECFileSize.MB;
      break;
    case "SI":
      kB = SIFileSize.kB;
      MB = SIFileSize.MB;
      break;
    default:
      throw new Error(`Unknown filesize display standard: ${standard}`);
  }
  if (bytes >= MB) {
    const mbString = standard === "SI" ? "MB" : "MiB";
    return `${roundNumber(bytes / MB)} ${mbString}`;
  }
  if (bytes >= kB) {
    const bytesString = standard === "SI" ? "kB" : "KiB";
    return `${roundNumber(bytes / kB)} ${bytesString}`;
  }
  return `${bytes} B`;
}

export function roundNumber(num: number, decimals = 2): string {
  const rounded = num.toFixed(decimals);
  return rounded.includes(".") ? rounded.replace(/\.?0+$/, "") : rounded;
}

export function getDefaultHelpers(
  accept: string,
  maxSize: number,
  standard: SizeDisplayStandard,
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
      `${translate("file-upload.max-size")} ${formatBytes(maxSize, standard)}`
    );
  }
  return textArray.filter(Boolean).join(". ");
}

export function validateFileSize(
  maxSize: number,
  acceptFileTypes: string,
  file: FileDropzone,
  standard: SizeDisplayStandard,
  translate: (key: string, ...args: unknown[]) => string
) {
  if (maxSize && file.size > maxSize) {
    const maxSizeMB = formatBytes(maxSize, standard);
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
  standard: SizeDisplayStandard,
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
