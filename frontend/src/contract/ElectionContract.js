export default class ElectionContract{
    constructor(){

    }
}

export class Election{
    constructor(id, name){
        this.id = id
        this.name = name
        this.phase = "Candidate"
    }
}
