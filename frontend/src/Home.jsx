import React from 'react'
export default class Home extends React.Component{

    constructor(){
        super()
    }

    render(){
        return(
            <div>

                <section className="h-screen flex items-center justify-center border-b-2 border-green-400">
                    <div className="absolute opacity-50 h-full w-full" style={{background: "no-repeat center top url('" + process.env.PUBLIC_URL + "/assets/images/fist.jpg"}}>

                    </div>
                    <h2 className="uppercase tracking-wide text-3xl text-green-600 font-bold">Election voting on the blockchain</h2>
                    <p className="mt-1 text-gray-500">A solution that works!</p>
                </section>

                <section className="h-screen bg-opacity-50 flex items-center justify-center border-b-2 border-green-400">
                    <img className="rounded-lg md:w-56" 
                    src={`${process.env.PUBLIC_URL}/assets/images/puzzle.png`} 
                    alt="Missing piece"/>
                    <h2 class="uppercase tracking-wide text-lg text-green-600 font-bold">The stumbling Block</h2>
                    <p class="mt-1 text-gray-500">The African electoral systems are plagued with malpractise, violence and general apathy on the part of citizens.Not only that, there is also the issue of huge costs required to fund the process. The concept of democracy has therefore not been able to fulfill its purpose. </p>
                </section>

                <section className="h-screen bg-opacity-50 flex items-center justify-center border-b-2 border-green-400">
                    <h2 class="uppercase tracking-wide text-lg text-green-600 font-bold">Our solution</h2>
                    <p class="mt-1 text-gray-500">A full on-chain voting system using "Cascade Encrypted Obfuscation" (CEO) technique that inherits the decentralized and auditable features of the blockchain. Voting would become digital immutable and transparent.</p>

                    <img className="rounded-lg md:w-56" 
                    src={`${process.env.PUBLIC_URL}/assets/images/blockchain.png`} 
                    alt="Blockchain"/>
                </section>
                <section className="h-screen bg-opacity-50 flex items-center justify-center mb-0">
                    <img className="rounded-lg md:w-56" 
                    src={`${process.env.PUBLIC_URL}/assets/images/earn_rewards.png`} 
                    alt="logo"/>
                    <h2 class="uppercase tracking-wide text-lg text-green-600 font-bold">Earn Rewards</h2>
                    <p class="mt-1 text-gray-500">Get rewarded for being an active citizen! Earn our Liberty Token (LBT) as you complete the registration cycle and vote for your desired candidate. Participation in government has never been better!</p>
                </section>
            </div>
        )
    }
} 