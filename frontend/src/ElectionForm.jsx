import React from 'react'
import { Election } from './contract/ElectionContract'
import GeneralUtil from './util/general-util'
export default class ElectionForm extends React.Component{

    constructor(props){
        super()
        this.election = new Election(GeneralUtil.uuidv4(),props.name);
    }

    render(){
        return(
            <div className="election">
                <label>Name: </label>
                <input type="text"/>
            </div>
            
        )
    }
} 