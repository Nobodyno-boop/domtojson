const Event = () => {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  // eslint-disable-next-line
  const listeners : { [key:string]: (...args) => any } = [];

  return {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    // eslint-disable-next-line fp/no-rest-parameters,@typescript-eslint/no-explicit-any
    on(eventName: string, callback: (...args) => any) {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      // eslint-disable-next-line fp/no-mutation
      listeners[eventName] = listeners[eventName] || [];
      // eslint-disable-next-line fp/no-mutating-methods,fp/no-mutation
      listeners[eventName] = callback;
    },
    // eslint-disable-next-line fp/no-rest-parameters
    emit(eventName: string, ...args: any) {
      return listeners[eventName]?.call(null, ...args);
    },
  };
};
export const events = Event();

// class Ev {
//   private _listeners: { [key: string]: [Function] };
//
//   emit(name: string, ...args: any) {
//     if (typeof this._listeners[name] !== undefined) {
//       this._listeners[name].forEach((x) => { return x.call(null, ...args); });
//     }
//   }
//
//   on(name: string, call: { (args: any[]): void }) {
//     if (this._listeners === undefined) {
//       this._listeners = {};
//     }
//
//     if (typeof this._listeners[name] === 'undefined') {
//       this._listeners[name] = [call];
//     } else this._listeners[name].push(call);
//   }
// }
