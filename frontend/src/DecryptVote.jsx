import React from 'react'
import WalletUtil from './util/wallet-util'
import { withRouter } from 'react-router-dom'
import { AppUtil } from './App'


export  class DecryptVote extends React.Component {
    constructor(props){
        super(props)
        this.messages = []
        if(props.location.state){
            this.election_id = props.location.state.election_id
            this.already_decrypted_messages = JSON.parse(localStorage.getItem('decrypt'+this.election_id)) || []

            for(let m of props.location.state.messages){
                if(!this.already_decrypted_messages.includes(window.web3.utils.keccak256(m).toString())){
                    this.messages.push(m)
                }
                
            }
        }
        
    }

    componentDidMount(){
       
    }

    render(){
        return(
            // <div>
            //     {this.state.messages.map((m)=>{
            //             return <p>{m.blockchain_address}</p>
            //         })}        
            // </div>
            <div>
                {this.messages.length} messages to decrypt.
                <br></br>
                <button onClick={()=>this.decrypt()}>Decrypt</button>
            </div>
        )
    }

    decrypt(){
        let decrypted_messages = []
        let decrypted_votes = []
        
        //Decrypt all encrypted messages
        Promise.all(this.messages.map((message)=>{
            return new Promise((resolv)=>{
                fetch("https://ipfs.infura.io/ipfs/"+message).then((response)=>{
                    response.text().then((text)=>{
                        WalletUtil.decrypt(text).then((decrypted)=>{
                            let decrypted_json = JSON.parse(decrypted)
                            if(decrypted_json.vote_id){
                                decrypted_votes.push(decrypted_json)
                            }
                            else{
                                decrypted_messages.push(decrypted_json)
                            }
                            resolv()
                        })
                    })
                })
                
            })
        })).then(()=>{ //Submit decryptions to relevant contracts
            Promise.all([
                window.contract.voting_booth.submitEncryptedMessages(this.election_id, decrypted_messages),
                window.contract.election_tally.submitVoteFragments(this.election_id, decrypted_votes)
            ]).then(()=>{
                this.already_decrypted_messages = this.already_decrypted_messages.concat(this.messages.map((m)=>window.web3.utils.keccak256(m).toString()))
                localStorage.setItem('decrypt'+this.election_id, JSON.stringify(this.already_decrypted_messages))
                AppUtil.info("Successfully decrypted " + this.messages.length + " messages.")
            })
            
        })

        
        
    }   
    
}

export default withRouter(DecryptVote);
