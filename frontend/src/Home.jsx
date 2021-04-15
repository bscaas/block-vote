import React from 'react'
export default class Home extends React.Component{

    constructor(){
        super()
    }

    render(){
        return(
            <div>
                <div>
                <h2 class="uppercase tracking-wide text-lg text-green-600 font-bold">Welcome to Block Vote</h2>
                <p class="mt-1 text-gray-500">Where Your Votes actually Counts!</p>
                </div>
            </div>
        )
    }
} 