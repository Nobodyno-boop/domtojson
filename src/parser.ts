import { IParserConfig, ParserConfig } from "./config";
import { ParserAPI } from "./api/config";
import Dom from "./lib/dom";
import { Json } from "./lib/json";
import { formatBytes, gzip, ungzip } from "~utils/Other";

export interface IParser {
  toJson(element: HTMLElement): Object;
  toDom(json: [], element?: HTMLElement): HTMLElement;
  newInstance(): IParser;
}

export class Parser implements IParser {
  private config: ParserConfig = new ParserConfig();
  constructor(public isDebug = false) {}

  api(fn: { (api: ParserAPI): IParserConfig }) {
    let napi: ParserAPI = fn(
      new ParserAPI(new ParserConfig(true))
    ) as ParserAPI;

    this.config = napi.config;
  }

  toJson(element: HTMLElement): Object {
    let json;

    if (this.isDebug) {
      let d = Date.now();
      json = new Dom(element, this.config);
      let dt = Date.now();
      console.log("[DEBUG DTM] time elapsed:", dt - d, "ms");
    } else {
      json = new Dom(element, this.config);
    }
    let out = json.getJson();

    if (this.isDebug) {
      console.log("Size of json", formatBytes(JSON.stringify(out).length));
      gzip(JSON.stringify(out)).then((r: String) => {
        let iB = JSON.stringify(out).length;
        let ratio = (iB / r.length) * 100;
        console.log("Ratio compress ", ratio, "%");
        console.log("Size of compress", formatBytes(r.length));

        ungzip(r).then((x: any) => {
          console.log("Unzip reverse equal:", JSON.stringify(out) === x);
          console.log(JSON.parse(x));
          console.log(out);
        });
      });
    }
    return out;
  }

  toDom(json: [], element?: HTMLElement): HTMLElement {
    let dom = new Json(json);
    let d: HTMLElement;
    if (typeof element === "undefined") {
      d = document.createElement("div");
      dom.getElement().forEach((x: any) => {
        d.appendChild(x);
      });
    } else {
      d = element;
      dom.getElement().forEach((x: any) => {
        d.appendChild(x);
      });
    }
    return d;
  }

  newInstance(): IParser {
    return new Parser();
  }
}
