/**
 * This class is here for formating and versioning the text. 
 * For auto format the texte with the rule or fixe.
 * 
 * 
 *
 */
// TODO: finish it 
interface patch{
    "rule":RegExp,
    "resolve": {(resolve:string, patch:patch) : string},
    "version": number,
    "to": number,
    "word": string
}

export class Version {
    private json:patch[];
    private dom:patch[];
    public static actual:number = 2.0
    
    constructor(private localVersion: number = 2.0){
        //toJson
        this.json = [
            {
                "rule": /(\s{5,}|\t{2,})/g,
                "version": 2.0,
                "to": 2.0,
                "resolve": (s, rule) => this.fixJ(s, rule),
                word: "⛏($)" // &#9935;
            }
        ]


        this.dom = [
            {
                rule: /⛏\(([0-9]+)\)/g,
                version: 2.0,
                to: 2.0,
                "resolve": (s, rule) => this.fixD(s, rule),
                word: "\xa0" // \xa0
            }
        ]
    }


    private matchAll(s:string, regex:RegExp) {
        let m;
        let p=[];
        while ((m = regex.exec(s)) !== null) {
            // This is necessary to avoid infinite loops with zero-width matches
            if (m.index === regex.lastIndex) {
                regex.lastIndex++;
            }
            
       
            p.push(m);
        }
        return p;
    }

    private generateSpace(patch:patch, i:number):string{
        let s = "";
        for(let o=0; 0 <i;o++){
            s += patch.word
        }
        console.log(s);
        
        return s
    }

    // https://stackoverflow.com/questions/1431094/how-do-i-replace-a-character-at-a-particular-index-in-javascript?rq=1
    private replaceAt(string: string, obj:any, replace:string){
        return string.substr(0, obj['index']) + string.substr(obj['index'], obj['0'].length).replace(obj['0'], replace);
    }

    private fixD(s:string, path:patch):string{
        let p = this.matchAll(s, path.rule);
        console.log(p);
        p.forEach(x => {
            console.log(x[1]);
            let sp = this.generateSpace(path,Number(x[1]))
        })
        // p.forEach(x => {
        //     s = this.replaceAt(s, x, path.word.replace('$', String(x[0].length)));
        // })

        return s;
    }
    private fixJ(s:string, path:patch):string{
        let p = this.matchAll(s, path.rule);
        p.forEach(x => {
            s = this.replaceAt(s, x, path.word.replace('$', String(x[0].length)));
        })

        return s;
    }

    fixjson(s:string): string{
        this.json.forEach(x => {
            if(x.version === this.localVersion || (x.to !== 0 || x.to <= this.localVersion) ){
                s = x.resolve(s, x)
            }
        })

        return s;
    }

    fixDom(s:string): string {
        this.dom.forEach(x => {
            if(x.version === this.localVersion || (x.to !== 0 || x.to <= this.localVersion) ){
                s = x.resolve(s, x)
            }
        })

        return s;
    }
}


