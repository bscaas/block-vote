import React from 'react'
import { withRouter } from 'react-router-dom';
import GeneralUtil from './util/general-util';
import { Election } from './contract/ElectionContract';

export  class Elections extends React.Component{
    
    constructor(){
        super()
        this.elections = []
        window.contract.election.list().then((e)=>{
            this.elections = e.map((a)=>new Election(...a))
            this.setState({}) //Call setstate to re-render UI
        })
    }

    render(){
        return(
            <div className="elections">
                <i className="fas fa-plus-circle" onClick={()=>{this.editElection(new Election('',''))}}></i>
                {this.elections.map((election)=>{
                    return(
                        <div className=" w-full lg:max-w-full lg:flex">
                            <div className="h-48 lg:h-auto lg:w-48 flex-none bg-cover border-2 border-green-400 rounded-t lg:rounded-t-none lg:rounded-l text-center overflow-hidden" style={{background_image: "url('/mountain.jpg')"}} title="Mountain">
                            </div>
                            <div className="border-r border-b border-l border-gray-400 lg:border-l-0 lg:border-t lg:border-gray-400 bg-white rounded-b lg:rounded-b-none lg:rounded-r p-4 flex flex-col justify-between leading-normal" onClick={()=>{this.editElection(election)}}>
                                <div className="mb-8">
                                    <p className="text-sm text-gray-600 flex items-center">
                                        <svg className="fill-current text-gray-500 w-3 h-3 mr-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                                        <path d="M4 8V6a6 6 0 1 1 12 0v2h1a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2v-8c0-1.1.9-2 2-2h1zm5 6.73V17h2v-2.27a2 2 0 1 0-2 0zM7 6v2h6V6a3 3 0 0 0-6 0z" />
                                        </svg>
                                        Registrants only
                                    </p>
                                <div className="text-gray-900 font-bold text-xl mb-2">{election.name}</div>
                                    <p className="text-gray-700 text-base">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptatibus quia, nulla! Maiores et perferendis eaque, exercitationem praesentium nihil.</p>
                                </div>
                                <div className="flex items-center">
                                    <span className="inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-red-100 bg-red-600 rounded-full float-right">{election.phase}</span>
                                    {   election.phase == 'Candidate'
                                        ? <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full" onClick={(e)=>this.endCandidate(election.id, e)}>End Candidate Registration</button>
                                        : (election.phase == 'Registration'
                                           ? <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full" onClick={(e)=>this.endRegistration(election.id, e)}>End Voter Registration</button>
                                           : (election.phase == 'Voting'
                                              ? <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full" onClick={(e)=>this.endVoting(election.id, e)}>End Voting</button>
                                              : (election.phase == 'Tally'
                                                ? <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full" onClick={(e)=>this.endTally(election.id, e)}>End Tally</button>
                                                : '')
                                              
                                              )
                                        
                                        )
                                    
                                    }
                                </div>
                            </div>
                        </div>

                    )
                })}
            </div>
            
        )
    }

    editElection = (election)=>{
        this.props.history.push('/election-form', {election: election })
    }

    endCandidate(election_id, e){
        e.stopPropagation();
        window.contract.election.endCandidate(election_id)
        return false
    }
    endCandidate(election_id, e){
        e.stopPropagation();
        window.contract.election.endRegistration(election_id)
        return false
    }
    endVoting(election_id, e){
        e.stopPropagation();
        window.contract.election.endVoting(election_id)
        return false
    }
    endTally(election_id, e){
        e.stopPropagation();
        window.contract.election.endTally(election_id)
        return false
    }
} 
export default withRouter(Elections);