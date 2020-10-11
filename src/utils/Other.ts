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
  // let a = Uint8Array.from(input, (c: string) => c.codePointAt(0));
  const promise = new Promise(function (resolve, reject) {
    ZblibU(Buffer.from(input, "base64"), options, function (
      error: any,
      result: any
    ) {
      if (!error) resolve(result);
      else reject(Error(error));
    });
  });
  return promise;
};

// https://developers.google.com/web/updates/2012/06/How-to-convert-ArrayBuffer-to-and-from-String

// function ab2str(buf: any): String {
//   return String.fromCharCode.apply(null, new Uint16Array(buf));
// }

// function str2ab(str: any): ArrayBuffer {
//   var buf = new ArrayBuffer(str.length * 2); // 2 bytes for each char
//   var bufView = new Uint16Array(buf);
//   for (var i = 0, strLen = str.length; i < strLen; i++) {
//     bufView[i] = str.charCodeAt(i);
//   }
//   return buf;
// }
