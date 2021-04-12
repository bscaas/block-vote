import React from 'react'
import { withRouter } from 'react-router-dom';
import GeneralUtil from './util/general-util';

export  class Elections extends React.Component{
    
    constructor(){
        super()
        this.elections = [
            {name: 'Nigerian Election', id: GeneralUtil.uuidv4()},
            {name: 'South African Election', id: GeneralUtil.uuidv4()}, 
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