//based on https://gist.github.com/rsms/3744301784eb3af8ed80bc746bef5eeb

export class Emitter<T, k = keyof  T|symbol>{
    private events:Map<k, Function[]> = new Map();

    on(event: k, listener :(...args:any[]) => void ) {
        if(this.events.has(event)) {
            this.events.get(event).push(listener)
        } else {
            this.events.set(event, [listener])
        }
    }

    emit(event: k, ...args:any[]) {
        if(this.events.has(event)){
            this.events.get(event).forEach(x => x.call(null, ...args))
        }
    }
}