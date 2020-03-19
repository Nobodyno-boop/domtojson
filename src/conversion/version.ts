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
    "resolve": {(resolve:string) : string},
    "version": number,
    "to"?: number
}


class Version {
    private patchs:patch[];
    
    constructor(){
        // this.patchs = [
        //     {
        //         ""
        //     }
        // ]
    }
}