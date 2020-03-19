
export class Json {
    private tmp:any = []

    constructor(private json:[]){
        for(let j in this.json){
            this.parse(j, null)
        }
    }


    parse(obj:any, base:any = null){
        let node = obj["node"];
        let d:any = null;
        if(node === "#text"){
            d = document.createTextNode(obj["text"]);
        } else {
            d = document.createElement(node);
            if(obj["text"]!== undefined){
                d.textContent = obj["text"]
            } 
        }

        if(obj["attr"] !== undefined){
            obj["attr"].forEach((x:any) => {d.setAttribute(x["name"], x["value"])})
        }
        
        if(obj['childs'] !== undefined){
            obj["childs"].forEach((x:any) => {this.parse(x, d)})
        }

        if(base !== null){
            base.appendChild(d);
        } else {
            this.tmp.push(d);
        }
    }

    getElement(){
        return this.tmp;
    }
}