import { Parser } from "./../parser";
import { ParserConfig } from "../config";
import { Event } from "utils/Event";

export default class Dom {
  private tmpElement: any[];
  private tmpJson: any[];
  private event: Event = new Event();
  constructor(private el: HTMLElement, protected config: ParserConfig) {
    this.tmpElement = [];
    this.tmpJson = [];
    this.init();
  }

  init() {
    this.event.on("override", (x: any) => {
      let el = this.getElement(x["detail"]["v"]);
      if (el === null) {
        throw new Error("[DTM] Cannot catch HTMLELEMENT ! ");
      } else {
        this.override(x["detail"]["o"], el);
      }
    });

    if (this.el.children.length >= 1) {
      this.pre(this.el.children);
      this.el.childNodes.forEach((x) => {
        this.parse(x);
      });
    } else {
      if (this.el.childNodes[0].nodeName === "#text") {
        this.parse(this.el.childNodes[0]);
      } else {
        throw new Error("[DTM] No children ! ");
      }
    }
  }

  pre(h: HTMLCollection, base: boolean = false) {
    for (let index = 0; index < h.length; index++) {
      let element = h[index];
      this.tmpElement.push(element);
      if (element.children.length > 0) {
        this.pre(element.children, true);
      }
    }
  }

  private override(obj: any, v: Element) {
    let attr = [];
    if (this.config.isApi()) {
      let co = this.config
        .getObj()
        .filter((x) => x.node.toLowerCase() === v.nodeName.toLowerCase());
      if (co.length === 1) {
        let m = co[0];
        let bin = typeof m["include"] !== "undefined";
        let bex = typeof m["exclude"] !== "undefined";
        for (let i = 0; i < v.attributes.length; i++) {
          let va = v.attributes.item(i);
          if (bin && bex) {
            let xin = m["include"].filter(
              (x) => x.toLowerCase() === va.name.toLowerCase()
            );
            let xen = m["exclude"].filter(
              (x) => x.toLowerCase() === va.name.toLowerCase()
            );
            if (xin.length > 1 && xen.length >= 1) {
              throw new Error(
                "[DomToJson] " + va.name + "is on exclude and include !"
              );
            }
            if (xin.length >= 1) {
              attr.push({ name: va.name, value: va.value });
            }
            if (xen.length >= 1) {
              attr.push({ name: va.name, value: va.value });
            }
          }

          if (bin) {
            let xin = m["include"].filter(
              (x) => x.toLowerCase() === va.name.toLowerCase()
            );
            if (xin) {
              attr.push({ name: va.name, value: va.value });
            }
          }
          if (bex) {
            let xen = m["exclude"].filter(
              (x) => x.toLowerCase() === va.name.toLowerCase()
            );
            if (!(xen.length >= 1)) {
              attr.push({ name: va.name, value: va.value });
            } else return;
          }
        }
      }
    } else {
      for (let i = 0; i < v.attributes.length; i++) {
        let va = v.attributes.item(i);
        attr.push({ name: va.name, value: va.value });
      }
    }
    if (attr.length >= 1) {
      obj["attr"] = attr;
    }
  }

  private parse(v: Node, base: any = null) {
    let nodeName = v.nodeName.toLowerCase();
    let obj: any = {};
    obj["node"] = nodeName;

    if (base === null && nodeName !== "#text") {
      this.tmpJson.push(obj);
    }

    if (v.nodeName !== "#text") {
      this.event.emit("override", { detail: { v: v, o: obj } });
    }
    if (v.hasChildNodes()) {
      if (base != null) {
        if (typeof base["childs"] === "undefined") base["childs"] = [];
        base["childs"].push(obj);
      }

      let text = v.childNodes.item(0);
      if (text.nodeName === "#text") {
        obj["text"] = text.textContent;
      }

      if (v.childNodes.length >= 1) {
        obj["childs"] = [];
        v.childNodes.forEach((x) => {
          this.parse(x, obj);
        });
      }
    } else if (v.nodeName === "#text" && base != null) {
      if (base["text"] === v.textContent) {
        delete base["childs"];
      } else {
        obj["text"] = v.textContent;
        this._push(base, obj);
      }
    } else if (base != null) {
      this._push(base, obj);
    } else if (base === null && v.nodeName === "#text") {
      obj["text"] = v.textContent;
      this.tmpJson.push(obj);
    }
  }

  private _push(base: any, obj: any) {
    if (typeof base["childs"] === "undefined") {
      base["childs"] = [];
    }
    base["childs"].push(obj);
  }

  private getElement(n: Node) {
    let map = this.tmpElement.filter((x: any) => x.isSameNode(n));
    return map.length === 0 ? null : map[0];
  }

  getJson(): Object {
    return this.tmpJson;
  }
}
