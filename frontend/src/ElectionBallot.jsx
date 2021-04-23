import React from 'react'
import GeneralUtil from './util/general-util'
import WalletUtil from './util/wallet-util'
import { EncryptedMessage } from './contract/VotingBoothContract'
import { withRouter } from 'react-router-dom'
import { AppUtil } from './App'
const uint8ArrayFromString = require('uint8arrays/from-string')

export class ElectionBallot extends React.Component {
    constructor(props){
        super(props)


        this.election = props.location.state.election
        this.state = {
            candidates: props.location.state.candidates,
            decryptors:[],
            decryptors2:[],
        }
    }

    componentDidMount(){
        window.contract.voting_booth.getBatch(this.election.id).then((voter_ids)=>{
            window.contract.voter_registration.getVoters(this.election.id, voter_ids).then((voters)=>{
                this.state.decryptors = GeneralUtil.shuffle(Array.from(voters))
                this.state.decryptors2 = GeneralUtil.shuffle(Array.from(voters))
            });
        })
        
    }


    render(){
        return (
            
            <div className="ballot">
                <h1 className="text-2xl">Ballot</h1>
                {this.state.candidates.map((candidate)=>{
                    return <div className=" w-full lg:max-w-full lg:flex" >
                        <div className="h-48 lg:h-auto lg:w-48 flex-none bg-cover border-2 border-green-400 rounded-t lg:rounded-t-none lg:rounded-l text-center overflow-hidden" style={{"background-image": "url('" + AppUtil.ipfsUrl(candidate.profile_image_hash) + "')"}} title="Mountain">
                        </div>
                        <div className="w-full border-r border-b border-l border-gray-400 lg:border-l-0 lg:border-t lg:border-gray-400 bg-white rounded-b lg:rounded-b-none lg:rounded-r p-4 flex flex-col justify-between leading-normal" onClick={()=>this.vote(candidate)}>
                            <div className="mb-8">
                                <p className="text-sm text-gray-600 flex items-center">
                                </p>
                                <div className="text-gray-900 font-bold text-xl mb-2">{candidate.name}</div>
                            </div>
                            
                        </div>
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
        AppUtil.startLoading()
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
                election_id: this.election.id

            }
            
            encryptions_1.push(WalletUtil.encrypt(JSON.stringify(fragment), Buffer.from(pubkey)))

            
        }

        let store_encryptions = async ()=>{
            let results = await window.ipfs.add(encryptions_1)
            let encryptions_2 = []
            let i = 0
            for await (let r of results){

                
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
                window.contract.voting_booth.submitEncryptedMessages(this.election.id, encrypted_msgs).then(()=>{
                    AppUtil.error("Successfully cast vote")
                    AppUtil.stopLoading()
                }, ()=>{
                    AppUtil.error("Failed to cast vote")
                    AppUtil.stopLoading()
                })
                console.log("after promises")
                
            })

        })
    
        
        
    }

    
}

export default withRouter(ElectionBallot);