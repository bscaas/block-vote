import React from 'react'
export default class Elections extends React.Component{

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
} 