export declare type DNodeAttr = {
    name: string;
    attr?: string[];
};
export declare type DNode = {
    node: string;
    value: DNodeAttr[];
};
export declare type ConfigDefault = {
    Helper: {
        gzip: boolean;
    };
    logger: boolean;
};
export declare class ParserConfig {
    useApi: boolean;
    config: ConfigDefault;
    private _include;
    constructor(useApi?: boolean, config?: ConfigDefault);
    in(dn: DNode): ParserConfig;
    haveAttribute(node: string): boolean;
    getAttribute(node: string): DNodeAttr[];
    private set;
    private frm;
}
