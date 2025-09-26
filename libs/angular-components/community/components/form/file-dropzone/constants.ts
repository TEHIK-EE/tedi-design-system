const IECkiloBytes = 1024;
const SIkiloBytes = 1000;

const IECMegabytes = IECkiloBytes * IECkiloBytes;
const SIMegabytes = SIkiloBytes * SIkiloBytes;

export enum SIFileSize {
  kB = SIkiloBytes,
  MB = SIMegabytes,
}

export enum IECFileSize {
  kB = IECkiloBytes,
  MB = IECMegabytes,
}

export const FileSizeStandards = {
  SI: SIFileSize,
  IEC: IECFileSize,
};
