import React from 'react'
export default class Candidates extends React.Component{

    constructor(){
        super()
        this.candidates = [
            {name: 'Martins'}, 
            {name: 'Demmy'}, 
            {name: 'Emmanuel'}, 
        ]
    }

    render(){
        return(
            <div className="candidates">
                {this.candidates.map((candidate)=>{
                    return(
                        <div className="candidate">
                            {candidate.name}
                        </div>
                    )
                })}
            </div>
            
        )
    }
} 