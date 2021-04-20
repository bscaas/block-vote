import React from 'react'
import { withRouter } from 'react-router-dom'
import { ElectionCandidate } from './contract/ElectionCandidateContract'
import GeneralUtil from './util/general-util'
import { AppUtil } from './App'
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
                {this.can_register 
                ? <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full" onClick={()=>{this.editCandidate(new ElectionCandidate('','',this.election_id, '','',''))}}>Create</button>
                : ''}
                
                {this.candidates.map((candidate)=>{
                    return(

                        <div className=" w-full lg:max-w-full lg:flex"  >
                            <div className="h-32 lg:w-32 flex-none bg-cover border-2 border-green-400 rounded-t lg:rounded-t-none lg:rounded-l text-center overflow-hidden" style={{"background-image": "url('" + AppUtil.ipfsUrl(candidate.profile_image_hash) + "')"}} title="Mountain">
                            </div>
                            <div className="w-full border-r border-b border-l border-gray-400 lg:border-l-0 lg:border-t lg:border-gray-400 bg-white rounded-b lg:rounded-b-none lg:rounded-r p-4 flex flex-col justify-between leading-normal" onClick={()=>{this.editCandidate(candidate)}}>
                                <div className="mb-8">
                                    <p className="text-sm text-gray-600 flex items-center">
                                    </p>
                                    <div className="text-gray-900 font-bold text-xl mb-2">{candidate.name}</div>
                                </div>
                                
                            </div>
                        </div>
                    )
                })}


                
            </div>
            
        )
    }

    editCandidate(candidate){
        this.props.history.push('/candidate-form', {candidate: candidate})
    }
} 
export default withRouter(Candidates);
