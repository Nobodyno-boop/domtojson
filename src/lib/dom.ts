import { Parser } from './../parser';
import { ParserConfig } from "../config";
import Emitter from '../utils';
import { Version } from '../conversion/version';


interface IOveride {
    "overide": string
}

class Event extends Emitter<IOveride> {

}


export default class Dom {
    private tmpElement: any[];
    private tmpJson: any[];
    private event = new Event();
    private version = new Version();
    constructor(private el:HTMLElement, protected config:ParserConfig){
        this.tmpElement = [];
        this.tmpJson = [{version: this.version.actual}];
        this.init()

    }

    init(){
        this.event.on("overide", (x) => {
            let el = this.getElement(x["detail"]["v"]);
            if(el === null){
                console.error("[!Error!] Cannot catch HTMLELEMENT ! ")
            }
            this.overide(x["detail"]["o"], el);
        });

        var am = this.el.children;
        var bm = Array.from(this.el.children);
        console.log(am);
        console.log(bm);
        
        //TODO: chekc if has children
        if(this.el.children.length >=1){
            this.pre(this.el.children)
            this.el.childNodes.forEach(x => {this.parse(x)})
        } else {
            throw new Error("[DTM] The element have no children"+ this.el)
        }
    }


    pre(h:HTMLCollection, base:boolean = false){
        for (let index = 0; index < h.length; index++) {
            let element = h[index];
            this.tmpElement.push(element);
            if(element.children.length > 0){
                this.pre(element.children,  true)
            }
        }
    }

    private overide(obj:any, v:Element){
        let attr = [];
        if(this.config.isApi()){
            let co = this.config.getObj().filter(x => x.node.toLowerCase() === v.nodeName.toLowerCase());
            if(co.length===1){
                let m = co[0];
                let bin = typeof m["include"] !== "undefined";
                let bex = typeof m["exclude"] !== "undefined";

                for(let i =0; i<v.attributes.length; i++){
                    let va = v.attributes.item(i);
                    if(bin && bex){
                        let xin = m["include"].filter((x) => x.toLowerCase() === va.name.toLowerCase())
                        let xen = m["exclude"].filter((x) => x.toLowerCase() === va.name.toLowerCase())                    
                        if(xin.length >1 && xen.length>=1) {
                            throw new Error("[DomToJson] "+ va.name+ "is on exclude and include !");
                        }
                        if(xin.length >=1){
                            attr.push({name:va.name, value:va.value})
                        }
                        if(xen.length>=1){
                            attr.push({name:va.name, value:va.value})
                        }
                    }

                    if(bin){
                        let xin = m["include"].filter((x) => x.toLowerCase() === va.name.toLowerCase())
                        if(xin){
                            attr.push({name:va.name, value:va.value})
                        }
                    }
                    if(bex){
                        let xen = m["exclude"].filter((x) => x.toLowerCase() === va.name.toLowerCase());
                        if(!(xen.length >=1)){
                            attr.push({name:va.name, value:va.value})
                        } else return;
                    }                 
                }
            }
        } else {
            for(let i = 0; i < v.attributes.length; i++){
                let va = v.attributes.item(i);
                attr.push({name:va.name, value: va.value})
            }
        }
        if(attr.length >=1){
            obj["attr"] = attr;
        }

    }

    private parse(v:Node, base:any = null) {
        let nodeName = v.nodeName.toLowerCase();
        let obj:any = {};
        obj['version'];
        obj['node'] = nodeName;
        if(base === null && nodeName !== "#text"){
            this.tmpJson.push(obj)
        }
    
        if(v.nodeName !== "#text"){
            this.event.emit("overide", {"detail": {"v": v, "o": obj}})
        }
        if(v.hasChildNodes()){
    
          if(base != null){
            if(typeof base["childs"] === "undefined") base["childs"] = [];
            base["childs"].push(obj)
          }
          
          let text = v.childNodes.item(0);
          if(text.nodeName === "#text"){
                            
            obj["text"] = this.version.fixjson(text.textContent);
          }
    
          if(v.childNodes.length >= 1){
            obj["childs"] = [];
            v.childNodes.forEach(x => {this.parse(x, obj)})
          }
        } else if(v.nodeName === "#text" && base != null) {
          if(base["text"] === v.textContent){
            delete base["childs"];
          } else {
            obj["text"] = this.version.fixjson(v.textContent);
            base["childs"].push(obj) 
          }
    
        } else if(base != null) {
            base["childs"].push(obj)
        }
    

    }
    


    private getElement(n:Node) {
        let map = this.tmpElement.filter((x:any) => x.isSameNode(n))
        return map.length === 0 ? null : map[0]
    }

    getJson() : Object {
        return {...this.tmpJson};
    }
}