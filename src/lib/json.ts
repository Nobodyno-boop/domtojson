import { Version } from "../conversion/version";

export class Json {
    private tmp: any = []
    private version: Version;
    constructor(private json: any) {
        let config = json[0];
        this.version = new Version(Number(config['version']));        

        for(let i=1; i <Object.keys(json).length;i++){
            this.parse(json[i], null)
            
        }
    }


    private getT(s:string) :string{
        let a = this.version.fixDom(s)
        console.log(a);
        
        return s;
    }

    parse(obj: any, base: any = null) {
        if(obj['version']){
            console.log("find", obj);
            
        }else {
            let node = obj["node"];
            let d: any = null;
            if (node === "#text") {
                d = document.createTextNode(this.getT(obj["text"]));
            } else {
                d = document.createElement(node);
                if (obj["text"] !== undefined) {
                    d.textContent = obj["text"]
                }
            }

            if (obj["attr"] !== undefined) {
                obj["attr"].forEach((x: any) => { d.setAttribute(x["name"], x["value"]) })
            }

            if (obj['childs'] !== undefined) {
                obj["childs"].forEach((x: any) => { this.parse(x, d) })
            }

            if (base !== null) {
                base.appendChild(d);
            } else {
                this.tmp.push(d);
            }
        }

    }

    getElement() {
        return this.tmp;
    }
}