export default class GeneralUtil {
    
    /**
     * UUID version 4
     * Implementation from  https://stackoverflow.com/a/2117523/1441011
     */
    static uuidv4() { 
        return ([1e7]+-1e3+-4e3+-8e3+-1e11).replace(/[018]/g, c =>
            (c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> c / 4).toString(16)
        );
    }

    /**
     * Built to have sparse collisions
     * @param {*} length 
     * @param {*} charset 
     */
    static clashid(length=10, charset=['1','2','3']){
        let x  = []
        for(let i=0;i<length;i++)x.push(charset[parseInt(Math.random()*3)])
        return x.join('')
    }
    /*
        fischer-yates shuffle
    */
    static shuffle(array) {
        var currentIndex = array.length, temporaryValue, randomIndex;
    
        // While there remain elements to shuffle...
        while (0 !== currentIndex) {
        
            // Pick a remaining element...
            randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex -= 1;
        
            // And swap it with the current element.
            temporaryValue = array[currentIndex];
            array[currentIndex] = array[randomIndex];
            array[randomIndex] = temporaryValue;
        }
  
        return array;
    }
      
}