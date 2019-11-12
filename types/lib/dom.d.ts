import { ParserConfig } from "../config";
export default class Dom {
    private el;
    protected config: ParserConfig;
    private tmpElement;
    private tmpJson;
    constructor(el: HTMLElement, config: ParserConfig);
    init(): void;
    pre(h: HTMLCollection, base?: boolean): void;
    private override;
    private parse;
    private getElement;
    getJson(): Object;
}
