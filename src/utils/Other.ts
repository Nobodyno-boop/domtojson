import { gzip as ZblibZ, gunzip as ZblibU } from "zlib";
import { Buffer } from "buffer";

export function formatBytes(a: any, b = 2) {
  if (0 === a) return "0 Bytes";
  const c = 0 > b ? 0 : b,
    d = Math.floor(Math.log(a) / Math.log(1024));
  return (
    parseFloat((a / Math.pow(1024, d)).toFixed(c)) +
    " " +
    ["Bytes", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"][d]
  );
}

export const gzip = (input: any, options?: any) => {
  const promise = new Promise(function (resolve, reject) {
    ZblibZ(input.toString("base64"), options, function (
      error: any,
      result: Buffer
    ) {
      if (!error) resolve(result);
      else reject(Error(error));
    });
  });
  return promise;
};

export const ungzip = (input: any, options?: any) => {
  const promise = new Promise(function (resolve, reject) {
    ZblibU(Buffer.from(input, "base64"), options, function (
      error: any,
      result: any
    ) {
      if (!error) resolve(result.toString("utf8"));
      else reject(Error(error));
    });
  });
  return promise;
};
