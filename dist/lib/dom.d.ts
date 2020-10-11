import { ParserConfig } from "../api/config";
export default class Dom {
    private el;
    protected config: ParserConfig;
    private tmpElement;
    private tmpJson;
    private event;
    constructor(el: HTMLElement, config: ParserConfig);
    init(): void;
    pre(h: HTMLCollection, base?: boolean): void;
    private override;
    private parse;
    private _push;
    private getElement;
    getJson(): Object;
}
