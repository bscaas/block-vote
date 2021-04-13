import React from 'react'
import GeneralUtil from './util/general-util'
import WalletUtil from './util/wallet-util'
import { EncryptedMessage } from './contract/VotingBoothContract'
import { withRouter } from 'react-router-dom'
const uint8ArrayFromString = require('uint8arrays/from-string')

export class ElectionBallot extends React.Component {
    constructor(props){
        super(props)


        let decryptor1 = {
            public_key: 'cQzV150MGQ46Z+KR3KCcHE0NwGFoq6uddA955b9GiEo=',
            blockchain_address: '0xb4875b7EFf02Cc2A9a5697AD4dCE8aDD43e54e90'
        }
        let decryptor2 = {
            public_key: 'cQzV150MGQ46Z+KR3KCcHE0NwGFoq6uddA955b9GiEo=',
            blockchain_address: '0xb4875b7EFf02Cc2A9a5697AD4dCE8aDD43e54e90'
        }

        this.state = {
            candidates: props.location.state.candidates,
            decryptors:[
                decryptor1,
                decryptor2
                
                
            ],
            decryptors2:[
                decryptor2,
                decryptor1
                
            ],
            election_id: 'MyElection'
        }
    }


    render(){
        return (
            <div className="ballot">
                {this.state.candidates.map((candidate)=>{
                    return <div className="ballot-candidate" onClick={()=>this.vote(candidate)}>
                        {candidate.name}
                    </div>
                })}
            </div>
        )       
    }

    toHexString(byteArray) {
        return Array.from(byteArray, function(byte) {
            return ('0' + (byte & 0xFF).toString(16)).slice(-2);
        }).join('')
    }

    vote(candidate){
        let vote = {
            id: GeneralUtil.uuidv4(),
            candidate_key: candidate.key
        }

        let n_decryptors = this.state.decryptors.length
        let candidate_key = candidate.key

        let encrypted_msgs = [] //stores the encrypted message instances that will be stored on the blockchain
        
        let promises = []
        
        let encryptions_1 = []
        
        //Explode voter's candidate key for obfuscation of full vote
        for(let i=0;i<candidate_key.length;i++){


            let decryptor = this.state.decryptors[i%n_decryptors];
            let pubkey = decryptor.public_key
            let fragment = {
                vote_id: vote.id,
                candidate_key_fragment: candidate_key[i],
                candidate_key_fragment_position: i,
                election_id: candidate.election_id

            }
            
            encryptions_1.push(WalletUtil.encrypt(JSON.stringify(fragment), Buffer.from(pubkey)))

            
        }

        let store_encryptions = async ()=>{
            let results = await window.ipfs.add(encryptions_1)
            let encryptions_2 = []
            let i = 0
            for await (const r of results){

                
                let decryptor = this.state.decryptors[i%n_decryptors];

                console.log("shooting file")

                
                let encryption1_cid = r.path
                let msg = {
                    blockchain_address: decryptor.blockchain_address,
                    message: encryption1_cid
                }

                let decryptor2 = this.state.decryptors2[i%n_decryptors];
                let pubkey2 = decryptor2.public_key
                
                encryptions_2.push(WalletUtil.encrypt(JSON.stringify(msg), pubkey2))

                
                    
                

    

                i = i+1
            }    

            let results2 = await window.ipfs.add(encryptions_2)
            i=0
            for await (const r2 of results2){
                let decryptor2 = this.state.decryptors2[i%n_decryptors];

                promises.push(new Promise(async (resolv, reject)=>{             
                    let encrypted2_cid =  r2.path
                    let msg2 = new EncryptedMessage(encrypted2_cid,decryptor2.blockchain_address)
        
                    encrypted_msgs.push(msg2)
                    resolv()    
                }))
                i = i+1
            }

        }

        store_encryptions().then(()=>{

            console.log("Before promises")
            Promise.all(promises).then(()=>{
                window.contract.voting_booth.submitEncryptedMessages(this.state.election_id, encrypted_msgs)
                console.log("after promises")
            })
        })
    
        
        
    }
}

export default withRouter(ElectionBallot);