import { IParserConfig } from "./config";
import { ParserAPI } from "./api/config";
export interface IParser {
    toJson(element: HTMLElement): Object;
    toDom(json: [], nodeName: string): HTMLElement;
    newInstance(): IParser;
}
export declare class Parser implements IParser {
    private config;
    constructor();
    api(fn: {
        (api: ParserAPI): IParserConfig;
    }): void;
    toJson(element: HTMLElement): Object;
    toDom(json: [], nodeName?: string): HTMLElement;
    newInstance(): IParser;
}
