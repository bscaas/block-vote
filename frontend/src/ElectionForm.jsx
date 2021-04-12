import React from 'react'
import { Election } from './contract/ElectionContract'
import GeneralUtil from './util/general-util'
import { withRouter } from 'react-router-dom'
export class ElectionForm extends React.Component{

    constructor(props){
        super()
        this.election = props.location.state.election;
    }

    render(){

        let button;
        
        if(this.election.id ){
            button = <button onClick={this.updateElection}>Update</button>
        }
        else{
            button = <button onClick={this.createElection}>Create</button>
        }

        return(
            <div className="election">
                <label>Name: </label>
                <input type="text" value={this.election.name} onChange={this.handleChangeName}/>
                {button}                
            </div>
            
        )
    }

    createElection = ()=>{
        this.election.id = GeneralUtil.uuidv4()
        alert(this.election.name + ' has been created with id '+ this.election.id)
    }
    updateElection = ()=>{
        alert(this.election.name + ' has been updated')
    }

    handleChangeName = (event)=>{
        this.election.name = event.target.value
        this.setState({}) //Call setstate to re-render UI
    }
} 
export default withRouter(ElectionForm);