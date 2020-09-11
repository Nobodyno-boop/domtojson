type DNodeAttr = { name: string; attr: string[] };

type DNode = { node: string; value: DNodeAttr[] };

type ConfigDefault = {
  Helper: {
    gzip: boolean;
  };
};

class ParserConfig {
  private _include: Record<string, DNodeAttr[]> = {};
  private _exclude: Record<string, DNodeAttr[]> = {};

  constructor(
    public useApi: boolean = false,
    public config: ConfigDefault = { Helper: { gzip: true } }
  ) {}

  in(dn: DNode): ParserConfig {
    this.set(dn, 0);
    return this;
  }

  ex(dn: DNode): ParserConfig {
    this.set(dn, 1);
    return this;
  }

  haveAttribute(node: string) {
    return (
      typeof this._include[node] !== "undefined" ||
      typeof this._exclude[node] !== "undefined"
    );
  }

  getAttribute(node: string): DNodeAttr[] {
    if (this.haveAttribute(node)) {
      let p1 = this._include[node];
      let p2 = this._exclude[node];

      if (typeof p1 !== "undefined") {
        return p1;
      } else if (typeof p2 !== "undefined") {
        return p2;
      }
    } else return [];
  }

  /**
   *
   * @param dn
   * @param is 0 is in 1 is ex
   */
  private set(dn: DNode, is: number) {
    if (is === 0) {
      this._include = {
        ...this._include,
        ...this.frm(dn.node, JSON.stringify(dn.value)),
      };
    } else {
      this._exclude = {
        ...this._exclude,
        ...this.frm(dn.node, JSON.stringify(dn.value)),
      };
    }
  }

  private frm(name: string, attr: string): Record<string, DNodeAttr[]> {
    return JSON.parse(`{\"${name}\:${attr}"}`);
  }
}
