import React from 'react'
import GeneralUtil from './util/general-util'
import { withRouter } from 'react-router-dom'
import Candidates from './Candidates'
import { AppUtil } from './App'
import WalletUtil from './util/wallet-util'
export class VoterForm extends React.Component{

    constructor(props){
        super()
        this.voter = props.location.state.voter;
        this.election_id = props.location.state.election.id
    }

    render(){

        

        return(
            <div className="voter mb-10 mt-10">
                <label>National Identity Number: </label>
                <input type="text" value={this.voter.name} onChange={this.handleChangeNIN}/>
                <button className="float-right bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full" onClick={this.registerVoter}>Register</button>             
                { this.voter.id
                    ? <Candidates can_register={this.voter.phase != 'Candidate'} candidates={this.candidates}></Candidates>
                    : ''
                }
            </div>
            
        )
    }

    registerVoter = ()=>{
        AppUtil.startLoading()

        this.voter.id = 0
        this.voter.blockchain_address = window.ethereum.selectedAddress
        this.voter.public_key = WalletUtil.getPublicKey().then((public_key)=>{
            this.voter.public_key = public_key
            window.contract.voter.register(this.election_id, this.voter).then(()=>{
                this.setState({}) //Call setstate to re-render UI
                AppUtil.info(this.voter.nin + ' has been registered with id '+ this.voter.id)
                AppUtil.stopLoading()
            }, ()=>{
                AppUtil.error("Failed to register to vote.")
                AppUtil.stopLoading()
            })
        })
        
        
    }

    handleChangeNIN = (event)=>{
        this.voter.nin = event.target.value
        this.setState({}) //Call setstate to re-render UI
    }

} 
export default withRouter(VoterForm);