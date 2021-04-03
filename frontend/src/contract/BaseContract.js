export default class BaseContract{
    config = null;
    constructor(){
        this.config = require('../config.json')
    }
}