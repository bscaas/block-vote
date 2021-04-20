import React from 'react'
import './Status.css'
import { AppUtil } from './App'
export default class Status extends React.Component{
    constructor(){
        super()

        this.messages = []

        AppUtil.statusBox = this

    }

    render(){
        return(<div className="status-box absolute w-full max-w-5xl">
                {this.messages.map((msg)=>{
                    setTimeout(()=>{
                        this.close(msg)
                    }, 2000)

                    return <div className={msg.class + " h-10"}>
                        {msg.message}
                        <i className="fas fa-window-close float-right mr-2 mt-2" onClick={()=>{this.close(msg)}}></i>
                    </div>
                })}
            </div>)
    }

    close(msg){
        let idx = this.messages.findIndex((m)=>msg==m)
        

        if(idx > -1){
            this.messages.splice(idx,1)
            this.setState({})
        }
    }

    addMessage(msg){
        this.messages.push(msg)
        this.setState({})
    }

}
