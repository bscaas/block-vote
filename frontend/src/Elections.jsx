import React from 'react'
import { withRouter } from 'react-router-dom';
import GeneralUtil from './util/general-util';

export  class Elections extends React.Component{
    
    constructor(){
        super()
        this.elections = [
            {name: 'Nigerian Election', id: GeneralUtil.uuidv4(), phase: 'Vote'},
            {name: 'South African Election', id: GeneralUtil.uuidv4(), phase: 'Candidate'}, 
            {name: 'Cameroon', id: GeneralUtil.uuidv4(), phase: 'Register'}, 
        ]
    }

    render(){
        return(
            <div className="elections">
                <i className="fas fa-plus-circle" onClick={()=>{this.editElection({name: ''})}}></i>
                {this.elections.map((election)=>{
                    return(
                        <div className="election" onClick={()=>{this.editElection(election)}}>
                            {election.name}
                            <span className="inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-red-100 bg-red-600 rounded-full float-right">{election.phase}</span>
                        </div>
                    )
                })}
            </div>
            
        )
    }

    editElection = (election)=>{
        this.props.history.push('/election-form', {election: election })
    }
} 
export default withRouter(Elections);