import React from 'react'
import GeneralUtil from './util/general-util'
import { withRouter } from 'react-router-dom'
import Candidates from './Candidates'
export class ElectionForm extends React.Component{

    constructor(props){
        super()
        this.candidates = []
        this.election = props.location.state.election;

        if(this.election.id){
            window.contract.election_candidate.list(this.election.id).then((candidates)=>{
                this.candidates.length = 0
                this.candidates.push(...candidates)
                this.setState({}) //Call setstate to re-render UI
                
            })
        }
    }

    render(){

        let button;
        
        if(this.election.id ){
            button = <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full" onClick={this.updateElection}>Update</button>
        }
        else{
            button = <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full" onClick={this.createElection}>Create</button>
        }

        let voteButton = '';

        if(this.election.phase == 'Register'){
            voteButton = <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full" onClick={this.gotoRegistration}>Register to Vote</button>
        }
        else if(this.election.phase == 'Vote')
        {
            voteButton = <div className="">
                            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full" onClick={this.gotoBallot}>Vote</button>
                            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full" onClick={this.gotoDecrypt}>Decrypt</button>
                        </div>
        }   
        

        return(
            <div className="election">
                <label>Name: </label>
                <input type="text" value={this.election.name} onChange={this.handleChangeName}/>
                {button}                
                {voteButton}
                
                
                { this.election.id
                    ? <Candidates election_id={this.election.id} can_register={this.election.phase != 'Candidate'} candidates={this.candidates}></Candidates>
                    : ''
                }
            </div>
            
        )
    }

    createElection = ()=>{
        this.election.id = GeneralUtil.uuidv4()
        window.contract.election.create(this.election).then(()=>{
            alert(this.election.name + ' has been created with id '+ this.election.id)
            this.setState({}) //Call setstate to re-render UI
        })
        
    }
    updateElection = ()=>{
        alert(this.election.name + ' has been updated')
    }

    handleChangeName = (event)=>{
        this.election.name = event.target.value
        this.setState({}) //Call setstate to re-render UI
    }

    gotoBallot = ()=>{
        this.props.history.push('/ballot', {election: this.election, candidates: this.candidates })
    }
    gotoDecrypt = ()=>{
        window.contract.voting_booth.getEncryptedMessages(this.election.id).then((messages)=>{
            this.props.history.push('/decrypt', {messages: messages })
        })
    }

    gotoRegistration = ()=>{
        this.props.history.push('/voter-form', {election: this.election, voter: {} })
    }
} 
export default withRouter(ElectionForm);