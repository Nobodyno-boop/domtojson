export class Json {
  private tmp: any = [];

  constructor(private json: []) {
    for (let i = 0; i < Object.keys(this.json).length; i++) {
      this.parse(this.json[i], null);
    }
  }

  parse(obj: any, base: any = null) {
    let node = obj["node"];
    let d: any = null;
    if (node === "#text") {
      d = document.createTextNode(obj["text"]);
    } else {
      d = document.createElement(node);
      if (obj["text"] !== undefined) {
        d.textContent = obj["text"];
      }
    }
    if (base === null) {
      this.tmp.push(d);
    }
    if (obj["attr"] !== undefined) {
      obj["attr"].forEach((x: any) => {
        d.setAttribute(x["name"], x["value"]);
      });
    }

    if (obj["childs"] !== undefined) {
      obj["childs"].forEach((x: any) => {
        this.parse(x, d);
      });
    }

    if (base !== null) {
      base.appendChild(d);
    }
  }

  getElement() {
    return this.tmp;
  }
}
