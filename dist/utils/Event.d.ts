export declare class Event {
    private _listeners;
    emit(name: string, ...args: any): void;
    on(name: string, call: {
        (args: any[]): void;
    }): void;
}
