declare class L {
    private config;
    info(...args: any): void;
    debug(...args: any): void;
    warn(...args: any): void;
    error(...args: any): void;
    group(label: string, f: {
        (l: L): void;
    }): void;
    private out;
}
declare const _default: L;
export default _default;
