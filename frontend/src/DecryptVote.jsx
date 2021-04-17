import React from 'react'
import WalletUtil from './util/wallet-util'
import { withRouter } from 'react-router-dom'


export  class DecryptVote extends React.Component {
    constructor(props){
        super(props)
        this.messages = []
        if(props.location.state){
            this.messages = props.location.state.messages
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
        let decrypted_messages = this.state.messages.map(async (message)=>WalletUtil.decrypt(message))
        
        alert(decrypted_messages.length+" messages decrypted");
    }   
    
}

export default withRouter(DecryptVote);
