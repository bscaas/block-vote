import React from 'react'
import { withRouter } from 'react-router-dom'
export class Candidates extends React.Component{

    constructor(props){
        super()
        this.can_register = props.can_register
        this.candidates = props.candidates
    }

    render(){
        return(
            <div className="candidates">
                {this.candidates.map((candidate)=>{
                    return(
                        <div className="candidate"  onClick={()=>{this.editCandidate(candidate)}}>
                            {candidate.name}
                        </div>
                    )
                })}


                { this.can_register
                    ? ''
                    : <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full" onClick={()=>{this.editCandidate({name: ''})}}>Register Candidate</button>
                }
                
                
            </div>
            
        )
    }

    editCandidate(candidate){
        this.props.history.push('/candidate-form', {candidate: candidate})
    }
} 
export default withRouter(Candidates);
