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


            let promises = []

            for(let e of this.elections){
                promises.push(
                    window.contract.reward_bearer.totalFunds(e.id).then((amount)=>{
                        e.funding = amount
                    }))

                promises.push(
                        window.contract.reward_bearer.fundsRewarded(e.id).then((amount)=>{
                    e.funds_rewarded = amount
                }))


                promises.push(
                window.contract.voter.getTurnout(e.id).then((c)=>{
                    e.voter_count = c

                }))
            }

            Promise.all(promises).then(()=>{ //only process after all sub requests
                this.setState({}) //Call setstate to re-render UI
            })

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
                            <div className="h-48 lg:h-auto lg:w-48 flex-none bg-cover border-2 border-green-400 rounded-t lg:rounded-t-none lg:rounded-l text-center overflow-hidden" style={{"background-image": "url('" + AppUtil.ipfsUrl(election.image_cid) + "')"}} title="Mountain">
                            </div>
                            <div className="w-full border-r border-b border-l border-gray-400 lg:border-l-0 lg:border-t lg:border-gray-400 bg-white rounded-b lg:rounded-b-none lg:rounded-r p-4 flex flex-col justify-between leading-normal" onClick={()=>{this.editElection(election)}}>
                                <div className="mb-8">
                                    <p className="text-sm text-gray-600 flex items-center">
                                    <img className="w-6" src={`${process.env.PUBLIC_URL}/assets/images/liberty.png`} />
                                        {election.funding/10000} LBTY FUNDED
                                    <img className="ml-4 w-6" src={`${process.env.PUBLIC_URL}/assets/images/liberty.png`} />
                                        {election.funds_rewarded/10000} LBTY REWARDED
                                    </p>
                                    
                                <div className="text-gray-900 font-bold text-xl mb-2">{election.name}</div>
                                    <p className="text-gray-700 text-base">{election.voter_count} Registered Voters</p>
                                    <p className="text-gray-700 text-base">{election.candidate_count || 0} Registered Candidates</p>
                                </div>
                                <div className="flex items-center">
                                    <span className="inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-red-100 bg-red-600 rounded-full">Phase: {election.phase}</span>
                                    
                                    <span className="ml-auto order-2">
                                        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full mr-2" onClick={(e)=>this.fund(election, e)}>Fund</button>
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

    fund = (election, e)=>{
        e.stopPropagation();

        AppUtil.startLoading()

        window.contract.liberty_token.fund(election.id, 50000000).then(()=>{
            AppUtil.info("Thank you for funding the election")
            AppUtil.stopLoading()
        })

    }

    endCandidate(election_id, e){
        e.stopPropagation();
        AppUtil.startLoading()
        window.contract.election.endCandidate(election_id).finally(()=>{
            this.elections.find((election)=>election.id == election_id).phase = 'Registration'
            this.setState({}) //Call setstate to re-render UI

            AppUtil.info("Candidate Registration ended. Now in Voter Registration.")
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
            AppUtil.info("Voter Registration ended. Now in Voting.")
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
            AppUtil.info("Voting ended. Now in Tallying.")
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
            AppUtil.info("Tallying ended. The election has ended")
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
