import { IParserConfig, ParserConfig } from "./../config";
export declare class ParserAPI implements IParserConfig {
    config: ParserConfig;
    constructor(config: ParserConfig);
    set(obj: {
        node: string;
        exclude?: string[];
        include?: string[];
    }): IParserConfig;
    excludeNode(...node: string[]): IParserConfig;
}
