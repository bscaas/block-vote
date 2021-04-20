import React from 'react'
import { withRouter } from 'react-router-dom';
import GeneralUtil from './util/general-util';
import { Election } from './contract/ElectionContract';
import { AppUtil } from './App';

export  class Elections extends React.Component{
    
    constructor(){
        super()
        this.elections = []
        AppUtil.startLoading()
        window.contract.election.list().then((elections)=>{
            this.elections = elections.map((a)=>new Election(...a))
            this.setState({}) //Call setstate to re-render UI
            for(let e of this.elections){
                window.contract.voter.getTurnout(e.id).then((c)=>{
                    e.voter_count = c
                    this.setState({}) //Call setstate to re-render UI

                })
            }

            AppUtil.stopLoading()
        })
    }

    render(){
        return(
            <div className="elections">
                <h1 className="mt-5 text-2xl">Elections<i className="fas fa-plus-circle float-right" onClick={()=>{this.editElection(new Election('',''))}}></i></h1>
                {this.elections.map((election)=>{
                    return(
                        <div className=" w-full lg:max-w-full lg:flex">
                            <div className="h-48 lg:h-auto lg:w-48 flex-none bg-cover border-2 border-green-400 rounded-t lg:rounded-t-none lg:rounded-l text-center overflow-hidden" style={{background_image: "url('/mountain.jpg')"}} title="Mountain">
                            </div>
                            <div className="w-full border-r border-b border-l border-gray-400 lg:border-l-0 lg:border-t lg:border-gray-400 bg-white rounded-b lg:rounded-b-none lg:rounded-r p-4 flex flex-col justify-between leading-normal" onClick={()=>{this.editElection(election)}}>
                                <div className="mb-8">
                                    <p className="text-sm text-gray-600 flex items-center">
                                        <svg className="fill-current text-gray-500 w-3 h-3 mr-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                                        <path d="M4 8V6a6 6 0 1 1 12 0v2h1a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2v-8c0-1.1.9-2 2-2h1zm5 6.73V17h2v-2.27a2 2 0 1 0-2 0zM7 6v2h6V6a3 3 0 0 0-6 0z" />
                                        </svg>
                                        Registrants only
                                    </p>
                                <div className="text-gray-900 font-bold text-xl mb-2">{election.name}</div>
                                    <p className="text-gray-700 text-base">{election.voter_count} Registered Voters</p>
                                </div>
                                <div className="flex items-center">
                                    <span className="inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-red-100 bg-red-600 rounded-full">Phase: {election.phase}</span>
                                    
                                    <span className="ml-auto order-2">
                                        {   election.phase == 'Candidate'
                                            ? <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full" onClick={(e)=>this.endCandidate(election.id, e)}>End Candidate Registration</button>
                                            : (election.phase == 'Registration'
                                            ? <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full" onClick={(e)=>this.endRegistration(election.id, e)}>End Voter Registration</button>
                                            : (election.phase == 'Voting'
                                                ? <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full right-0" onClick={(e)=>this.endVoting(election.id, e)}>End Voting</button>
                                                : (election.phase == 'Tally'
                                                    ? <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full" onClick={(e)=>this.endTally(election.id, e)}>End Tally</button>
                                                    : <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full" onClick={(e)=>this.electionResults(election, e)}>Election Results</button>)
                                                
                                                )
                                            
                                            )
                                        
                                        }
                                    </span>
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
        AppUtil.startLoading()
        window.contract.election.endCandidate(election_id).finally(()=>{
            this.elections.find((election)=>election.id == election_id).phase = 'Registration'
            this.setState({}) //Call setstate to re-render UI
            AppUtil.stopLoading()
        })
        return false
    }
    endRegistration(election_id, e){
        e.stopPropagation();
        AppUtil.startLoading()
        window.contract.election.endRegistration(election_id).finally(()=>{
            this.elections.find((election)=>election.id == election_id).phase = 'Voting'
            this.setState({}) //Call setstate to re-render UI
            AppUtil.stopLoading()
        })
        return false
    }
    endVoting(election_id, e){
        e.stopPropagation();
        AppUtil.startLoading()
        window.contract.election.endVoting(election_id).finally(()=>{
            this.elections.find((election)=>election.id == election_id).phase = 'Tally'
            this.setState({}) //Call setstate to re-render UI
            AppUtil.stopLoading()
        })
        return false
    }
    endTally(election_id, e){
        e.stopPropagation();
        AppUtil.startLoading()
        window.contract.election.endTally(election_id).finally(()=>{
            this.elections.find((election)=>election.id == election_id).phase = 'Ended'
            this.setState({}) //Call setstate to re-render UI
            AppUtil.stopLoading()
        })
        return false
    }
    electionResults = (election, e)=>{
        e.stopPropagation();
        this.props.history.push('/election-tally', {election: election })
        return false
    }
} 
export default withRouter(Elections);