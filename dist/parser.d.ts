import { IParserConfig } from "./config";
import { ParserAPI } from "./api/config";
export interface IParser {
    toJson(element: HTMLElement): Object;
    toDom(json: [], element?: HTMLElement): HTMLElement;
    newInstance(): IParser;
}
export declare class Parser implements IParser {
    isDebug: boolean;
    private config;
    constructor(isDebug?: boolean);
    api(fn: {
        (api: ParserAPI): IParserConfig;
    }): void;
    toJson(element: HTMLElement): Object;
    toDom(json: [], element?: HTMLElement): HTMLElement;
    newInstance(): IParser;
}