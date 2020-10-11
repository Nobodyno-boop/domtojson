import { Event } from "utils/Event";
import { ParserConfig } from "~api/config";
import L from "~utils/L";

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
    try {
      this.event.on("override", (x: any) => {
        let el = this.getElement(x["detail"]["v"]);
        if (el === null) {
          throw new Error("Cannot catch a HTLMELEMENT ATTRIBUTE");
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
        if (this.el.childNodes.length === 0)
          throw new Error("You're htmlelement have no children !");
        if (this.el.childNodes[0]["nodeName"] === "#text") {
          this.parse(this.el.childNodes[0]);
        }
      }
    } catch (error) {
      L.error(error["message"]);
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
    if (this.config.useApi) {
      let cht = this.config.getAttribute(v.nodeName.toLowerCase());
      if (v.attributes.length >= 1) {
        for (let index = 0; index < v.attributes.length; index++) {
          let element = v.attributes.item(index);
          let fi = cht.filter((x) => x.name === element.name);
          if (fi.length >= 1) {
            let els = element.nodeValue.split(" ");
            let rt = fi.map((x) => {
              if (typeof x.attr != "undefined") {
                let t = "";
                let p = x.attr
                  .map((x) => els.filter((o) => o === x))
                  .filter((x) => x.length)
                  .map((x) => (t = t + x + " "));

                attr.push({ name: element.name, value: p[p.length - 1] });
              } else attr.push({ name: element.name, value: element.value });
            });
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
