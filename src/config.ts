export interface IParserConfig {
    set(obj: {node:string, exclude?:string[], include?:string[]}) : IParserConfig
    excludeNode(...node:string[]): IParserConfig
}

export class ParserConfig implements IParserConfig {
    private obj: any = [];
    private exc: any=[];

    constructor(private api:boolean = false){}

    set(obj: {node:string, exclude?:string[], include?:string[]}) : IParserConfig{
        this._set(obj)
        return this;
    }

    private _set(obj: {node:string, exclude?:string[], include?:string[]}) {
        if(this.obj)
        this.obj.push(obj);
    }

    private _excludeNode(...node:string[]){
        this.exc.push(...node)
    }

    getObj() : [{node:string, exclude?:string[], include?:string[]}] {
        return this.obj;
    }

    isApi() :boolean {
        return this.api;
    }

    isExclude(node:string) :boolean {
        return this.exc.includes(node); 
    }
 
    excludeNode(...node:string[]) : IParserConfig {
        this._excludeNode(...node);
        return this;
    }
}