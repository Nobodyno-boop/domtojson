import { IParserConfig, ParserConfig } from "./../config";

// Maybe make other custom function.
export class ParserAPI implements IParserConfig {
  constructor(public config: ParserConfig) {}

  set(obj: {
    node: string;
    exclude?: string[];
    include?: string[];
  }): IParserConfig {
    this.config.set(obj);
    return this;
  }

  excludeNode(...node: string[]): IParserConfig {
    this.config.excludeNode(...node);
    return this;
  }
}
