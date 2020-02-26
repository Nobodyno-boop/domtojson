import { Emitter } from "./utils";

// import { Parser } from './parser';


// if(typeof window === "object"){
//     (window as any)["DTM"] = new Parser();
// } else {
//     module.exports =  new Parser();
// }


interface Try{
    "try": String
}

class Foo extends Emitter<Try> {

}


let f = new Foo();
f.on("try", (msg, a, b) => console.log(msg, b));
f.emit('try', "Ma bite", " est", " un volcan")