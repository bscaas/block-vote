import React from 'react'
import './About.css'

export default class About extends React.Component{

    constructor(){
        super()
    }

    render(){
        return(
            <div class="mt-4 md:mt-0 md:ml-6">
                <section id="about1" className="h-screen bg-opacity-50 flex items-center justify-center mb-0  bg-auto bg-no-repeat bg-center" style={{background: "url('" + process.env.PUBLIC_URL + "/assets/images/multiethnic-group-hands-raised.jpg"}}>

                </section>
                <div>
                    <h2 class="block mt-1 text-lg leading-tight font-semibold text-gray-900 hover:underline">BlockVote | Everything You Need To Know!</h2>
                    <p>
                    This Application is for election & polling at any scale.
                    Fortified with encrytion obfusication in order to obscure the voters from thier vote making it nearly imposible to see which candidate a voter voted.</p>
                    <p>These application has an inbuilt reward system to incentivise the voters. 
                    Electorial processes can be overwhelming most of the time and as sign of good fate its only natural to want to support the people for thier cooperation.</p>
                    <p>The more processes you complete the more you earn, this way everyone will be willing to participate. Everyone must pre-register to vote prior to election.</p>
                    <p>Though the infomation on the block chain is public, the identities of the voters cannot be easily figured out.</p>
                </div>
                <div>
                    <p></p>
                    <h2 class="block mt-1 text-lg leading-tight font-semibold text-gray-900 hover:underline">How To Vote</h2>
                    <p>Every voter must go to the registration portal and register to vote.</p>
                </div>
            </div>
        )
    }
} 