import React from 'react'
import GeneralUtil from './util/general-util'
import { withRouter } from 'react-router-dom'
export class CandidateForm extends React.Component{

    constructor(props){
        super()
        
        this.candidate = props.location.state.candidate;
    }

    render(){

        let button;
        
        if(this.candidate.id ){
            button = <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full" onClick={this.updateCandidate}>Update</button>
        }
        else{
            button = <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full" onClick={this.createCandidate}>Create</button>
        }

        return(
            <div className="candidate">
                <label>Name: </label>
                <input type="text" value={this.candidate.name} onChange={this.handleChangeName}/>
                {button}                

            </div>
            
        )
    }

    createCandidate = ()=>{
        this.candidate.id = GeneralUtil.uuidv4()
        alert(this.candidate.name + ' has been created with id '+ this.candidate.id)
        this.setState({}) //Call setstate to re-render UI
    }
    updateCandidate = ()=>{
        alert(this.candidate.name + ' has been updated')
    }

    handleChangeName = (event)=>{
        this.candidate.name = event.target.value
        this.setState({}) //Call setstate to re-render UI
    }
} 

export default withRouter(CandidateForm);