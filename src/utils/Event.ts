export class Event {
  private _listeners: { [key: string]: [Function] };

  emit(name: string, ...args: any) {
    if (typeof this._listeners[name] != undefined) {
      this._listeners[name].forEach((x) => x.call(null, ...args));
    }
  }

  on(name: string, call: { (args: any[]): void }) {
    if (this._listeners === undefined) {
      this._listeners = {};
    }

    if (typeof this._listeners[name] == "undefined") {
      this._listeners[name] = [call];
    } else this._listeners[name].push(call);
  }
}
