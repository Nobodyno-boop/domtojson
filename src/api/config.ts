export type DNodeAttr = { name: string; attr?: string[] };

export type DNode = { node: string; value: DNodeAttr[] };

export type ConfigDefault = {
  Helper: {
    gzip: boolean;
  };
  logger: boolean;
};

export class ParserConfig {
  private _include: Record<string, DNodeAttr[]> = {};
  constructor(
    public useApi: boolean = false,
    public config: ConfigDefault = { Helper: { gzip: true }, logger: true }
  ) {}

  in(dn: DNode): ParserConfig {
    this.set(dn, 0);
    return this;
  }

  haveAttribute(node: string) {
    return typeof this._include[node] !== "undefined";
  }

  getAttribute(node: string): DNodeAttr[] {
    if (this.haveAttribute(node)) {
      let p1 = this._include[node];
      return p1;
    } else {
      return [] as DNodeAttr[];
    }
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
    }
  }

  private frm(name: string, attr: string): Record<string, DNodeAttr[]> {
    return JSON.parse(`{"${name}":${attr}}`);
  }
}
