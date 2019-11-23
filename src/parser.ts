import { IParserConfig, ParserConfig } from "./config";
import { ParserAPI } from "./api/config";
import Dom from "./lib/dom";
import { Json } from "./lib/json";

export interface IParser{
    toJson(element:HTMLElement) : Object
    toDom(json:[], element?:HTMLElement): HTMLElement
    newInstance(): IParser
}


export class Parser implements IParser {
    private config:ParserConfig = new ParserConfig();
    constructor(){}

    api(fn: {(api:ParserAPI) : IParserConfig}){
        let napi:ParserAPI = fn(new ParserAPI(new ParserConfig(true))) as ParserAPI;
        // fn((api:IParserConfig) => {
        //     api.set({node:"img", "exclude": ["id"]})
        // })

        this.config = napi.config;
    }


    toJson(element:HTMLElement) : Object {
        let json = new Dom(element, this.config);
        return json.getJson();
    }
    

    toDom(json:[], element?:HTMLElement): HTMLElement {
        let dom = new Json(json);
        let d: HTMLElement;
        if(typeof element === "undefined"){
           d = document.createElement("div");
            dom.getElement().forEach((x:any) => {d.appendChild(x)});
        } else {
            d = element;
            dom.getElement().forEach((x:any) => {d.appendChild(x)});
        }
        return d;
    }

    newInstance(): IParser{
        return new Parser();
    }
}
