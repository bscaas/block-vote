import React from 'react'
import { withRouter } from 'react-router-dom'
import { ElectionCandidate } from './contract/ElectionCandidateContract'
export class Candidates extends React.Component{

    constructor(props){
        super()
        this.election_id = props.election_id
        this.can_register = props.can_register
        this.candidates = props.candidates
    }

    render(){
        return(
            <div className="candidates">
                {this.candidates.map((candidate)=>{
                    return(
                        <div className="candidates"  onClick={()=>{this.editCandidate(candidate)}}>
                            {candidate.name}
                        </div>
                    )
                })}


                { this.can_register
                    ? ''
                    : <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full" onClick={()=>{this.editCandidate(new ElectionCandidate('','','',this.election_id,'',''))}}>Register Candidate</button>
                }
                
                
            </div>
            
        )
    }

    editCandidate(candidate){
        this.props.history.push('/candidate-form', {candidate: candidate})
    }
} 
export default withRouter(Candidates);
