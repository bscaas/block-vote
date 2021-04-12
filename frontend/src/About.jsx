import React from 'react'
export default class About extends React.Component{

    constructor(){
        super()
    }

    render(){
        return(
            <div class="block mt-1 text-lg leading-tight font-semibold text-gray-900 hover:underline">
                <h2>BlockVote | Everything You Need To Know!</h2>
                <p class="mt-2 text-gray-500">
                    This Application is for election & polling at any scale.
                <p class="mt-2 text-gray-500">Fortified with encrytion obfusication in order to obscure the voters from thier vote making it nearly imposible to see which candidate a voter voted.</p>
                <p class="mt-2 text-gray-500">These application has an inbuilt reward system to incentivise the voters. </p>

                </p>
            </div>
        )
    }
} 