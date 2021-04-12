import React from 'react'
import { useHistory } from "react-router-dom";
import { withRouter } from 'react-router-dom';

export  class Elections extends React.Component{
    
    constructor(){
        super()
        this.elections = [
            {name: 'Nigerian Election'},
            {name: 'South African Election'}, 
        ]
    }

    render(){
        return(
            <div className="elections">
                <i className="fas fa-plus-circle" onClick={this.createElection}></i>
                {this.elections.map((election)=>{
                    return(
                        <div className="election">
                            {election.name}
                        </div>
                    )
                })}
            </div>
            
        )
    }

    createElection = ()=>{
        this.props.history.push('/election-form')
    }
} 
export default withRouter(Elections);