import { ParserConfig } from "./api/config";
export declare class Parser {
    isDebug: boolean;
    private config;
    constructor(isDebug?: boolean, useGzip?: boolean);
    api(fn: {
        (api: ParserConfig): ParserConfig;
    }): void;
    toJson(element: HTMLElement): Promise<[] | String>;
    toDom(json: [] | string, element?: HTMLElement): Promise<HTMLElement>;
    newInstance(): Parser;
}
