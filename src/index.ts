import { Parser } from './parser';


if(typeof window === "object"){
    (window as any)["DTM"] = new Parser();
} else {
    module.exports =  new Parser();
}