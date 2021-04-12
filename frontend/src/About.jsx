import React from 'react'
export default class About extends React.Component{

    constructor(){
        super()
    }

    render(){
        return(
            <div class="block mt-1 text-lg leading-tight font-semibold text-gray-900 hover:underline">
                <h2>BlockVote | Everything You Need To Know!</h2>
                <p class="mt-2 text-gray-600">
                    This Application is for election & polling at any scale.
                </p>
            </div>
        )
    }
} 