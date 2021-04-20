import React from 'react'
import { AppUtil } from './App';

export default class IPFSUpload extends React.Component{
    constructor(){
        super()
    }

    handleChange = (event)=>{
        // Update the state
        this.selected_file = event.target.files[0]
        this.setState({});
    }

    upload = async ()=>{
        AppUtil.startLoading()
        if(this.selected_file){
            let bytes = await this.selected_file.arrayBuffer()
            let results = await window.ipfs.add(bytes)

            for await (const result of results){
                this.cid = result.path            
            }
        }
        else{
            
        }

        AppUtil.stopLoading()
    }

    render(){
        return(
            <span>
                <input type="file" onChange={this.handleChange} />
                <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full" onClick={this.upload}>Upload</button>
            </span>
        
        )
    }
}