import React from 'react'
import GeneralUtil from './util/general-util'
import { withRouter } from 'react-router-dom'
import { AppUtil } from './App';
import IPFSUpload from './ipfs-upload';
export class CandidateForm extends React.Component{

    constructor(props){
        super()
        
        this.candidate = props.location.state.candidate;
        this.ipfs_upload = React.createRef()
    }

    render(){

        let button;
        
        if(this.candidate.id ){
            button = <button className="float-right bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full" onClick={this.updateCandidate}>Update</button>
        }
        else{
            button = <button className="float-right bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full" onClick={this.createCandidate}>Create</button>
        }

        return(
            <div className="candidate mt-10 mb-10">
                <h2 className="text-2xl">Candidate</h2>
                <label>Name: </label>
                <input type="text" value={this.candidate.name} onChange={this.handleChangeName}/>
                <br/>
                <IPFSUpload ref={this.ipfs_upload}></IPFSUpload>
                {button}                

            </div>
            
        )
    }

    createCandidate = ()=>{
        AppUtil.startLoading()
        this.candidate.id = GeneralUtil.uuidv4()
        this.candidate.key = GeneralUtil.clashid()
        this.candidate.profile_image_hash = this.ipfs_upload.current.cid

        window.contract.election_candidate.createCandidate(this.candidate.election_id, this.candidate).then(()=>{
            this.setState({}) //Call setstate to re-render UI, ()=>{
            AppUtil.info("Successfully created candidate.")
            AppUtil.stopLoading()
            
        }, ()=>{
            AppUtil.info("Failed to create candidate.")

            AppUtil.stopLoading()
        })
        
    }
    updateCandidate = ()=>{
        AppUtil.info(this.candidate.name + ' has been updated (Coming soon!)')
    }

    handleChangeName = (event)=>{
        this.candidate.name = event.target.value
        this.setState({}) //Call setstate to re-render UI
    }
} 

export default withRouter(CandidateForm);