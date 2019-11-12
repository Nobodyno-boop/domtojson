export interface IParserConfig {
    set(obj: {
        node: string;
        exclude?: string[];
        include?: string[];
    }): IParserConfig;
    excludeNode(...node: string[]): IParserConfig;
}
export declare class ParserConfig implements IParserConfig {
    private api;
    private obj;
    private exc;
    constructor(api?: boolean);
    set(obj: {
        node: string;
        exclude?: string[];
        include?: string[];
    }): IParserConfig;
    private _set;
    private _excludeNode;
    getObj(): [{
        node: string;
        exclude?: string[];
        include?: string[];
    }];
    isApi(): boolean;
    isExclude(node: string): boolean;
    excludeNode(...node: string[]): IParserConfig;
}
