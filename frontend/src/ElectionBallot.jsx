import React from 'react'
import GeneralUtil from './util/general-util'
import WalletUtil from './util/wallet-util'
import { EncryptedMessage } from './contract/VotingBoothContract'
const uint8ArrayFromString = require('uint8arrays/from-string')

export default class ElectionBallot extends React.Component {
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
            candidates: [
                {name:'Tjad', key: GeneralUtil.clashid()},
                {name: 'Martins', key: GeneralUtil.clashid()},
                {name: 'Demmy', key: GeneralUtil.clashid()},
                {name: 'Nurudeen', key: GeneralUtil.clashid()},
                {name: 'Favour', key: GeneralUtil.clashid()},
            ],
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
        
        //Explode voter's candidate key for obfuscation of full vote
        for(let i=0;i<candidate_key.length;i++){

            promises.push(new Promise(async (resolv, reject)=>{

                let decryptor = this.state.decryptors[i%n_decryptors];
                let pubkey = decryptor.public_key
                let fragment = {
                    vote_id: vote.id,
                    candidate_key_fragment: candidate_key[i],
                    candidate_key_fragment_position: i,
                    election_id: candidate.election_id
    
                }
                
                let encrypted_1 = WalletUtil.encrypt(JSON.stringify(fragment), Buffer.from(pubkey))
    
                //store encryption on ipfs as currently too expensive to store encrypted messages directly on the blockchain
                console.log("shooting file")

                console.log(encrypted_1)
                let buffer1 = uint8ArrayFromString(encrypted_1)
                let result = await window.ipfs.add(buffer1)
                let encryption1_cid = result[0].hash
                let msg = {
                    blockchain_address: decryptor.blockchain_address,
                    message: encryption1_cid
                }

                let decryptor2 = this.state.decryptors2[i%n_decryptors];
                let pubkey2 = decryptor2.public_key
                let encrypted_2 = WalletUtil.encrypt(JSON.stringify(msg), pubkey2)


                let result2 = await window.ipfs.add(encrypted_2)
                    
                let encrypted2_cid =  result2[0].hash
                let msg2 = new EncryptedMessage(encrypted2_cid,decryptor2.blockchain_address)

                encrypted_msgs.push(msg2)
                resolv()
            }))
        }

        console.log("Before promises")
        Promise.all(promises).then(()=>{
            window.contract.voting_booth.submitEncryptedMessages(this.state.election_id, encrypted_msgs.slice(50))
            console.log("after promises")
        })
        
    }
}