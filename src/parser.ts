import Dom from "./lib/dom";
import { Json } from "./lib/json";
import { formatBytes, gzip, ungzip } from "./utils/Other";
import { ParserConfig } from "./api/config";
import L from "./utils/L";

export class Parser {
  private config: ParserConfig = new ParserConfig(false, {
    Helper: { gzip: false },
    logger: true,
  });
  constructor(public isDebug = false, useGzip: boolean = false) {
    if (useGzip) this.config.config.Helper.gzip = true;
  }

  api(fn: { (api: ParserConfig): ParserConfig }) {
    let napi: ParserConfig = fn.call(
      null,
      new ParserConfig(true, this.config.config)
    );

    this.config = napi;
  }
  /**
   *
   * @param element {HTMLElement} the HTMLElement you want to json
   * @returns Json or
   */
  toJson(element: HTMLElement): Promise<[] | String> {
    return new Promise((resolve, reject) => {
      let json;

      if (this.isDebug) {
        let d = Date.now();
        json = new Dom(element, this.config);
        let dt = Date.now();
        L.info("time elapsed:", dt - d, "ms");
      } else {
        json = new Dom(element, this.config);
      }
      let out = json.getJson() as [];

      if (this.isDebug) {
        L.info("Size of json", formatBytes(JSON.stringify(out).length));
      }
      if (this.config.config.Helper.gzip) {
        gzip(JSON.stringify(out))
          .then((r: String) => {
            if (this.isDebug) {
              let iB = JSON.stringify(out).length;
              let ratio = (iB / r.length) * 100;
              L.info(`Ratio compress ${ratio.toFixed(2)}%`);
              L.info("Size of compress wtih Gzip", formatBytes(r.length));
            }

            resolve(r);
          })
          .catch((e) => {
            if (this.isDebug) L.error(e);
            reject("Use debug mode for more info.");
          });
      } else {
        resolve(out);
      }
    });
  }

  toDom(json: [] | string, element?: HTMLElement): Promise<HTMLElement> {
    return new Promise((resolve, reject) => {
      if (typeof json === "string") {
        ungzip(json).then((x: any) => {
          let dom = new Json(JSON.parse(x));
          element = element ?? document.createElement("div");
          dom.getElement().forEach((x: any) => {
            element.appendChild(x);
          });
          resolve(element);
        });
      } else {
        let dom = new Json(json as []);
        element = element ?? document.createElement("div");
        dom.getElement().forEach((x: any) => {
          element.appendChild(x);
        });
        resolve(element);
      }
    });
  }

  newInstance(): Parser {
    return new Parser();
  }
}
