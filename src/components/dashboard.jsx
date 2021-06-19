import React, { Component } from 'react'
import './css/main-style.css'
import Axios from 'axios'
import './css/dashboard.css'
export default class dashboard extends Component {
    constructor(props){

        

        super(props)
        this.state = {
            loggedIn: false,
            user:null

        }
    }

    componentDidMount()        
    {
        Axios.get('http://localhost:3002/api/login').then((response)=>
        {
            // console.log("Axios Response",response)
            try {
                if(response.data.loggedIn=true){
                    this.setState(
                        {
                            loggedIn:response.data.loggedIn,
                            user:response.data.user[0],
                        }
                    )
                }
                
            } catch (error) {
                console.log(error)
            }
            
            
            
            // if(response.data.loggedIn=true){
            //     setLoginStatus(true)
            // }
            // else{
            //     setLoginStatus(false)

            // }
        }
        )
        
    }
    render() {
        return (

            <div className="dashboard">
                <div className="headerDiv">
                    <h1 className="h-primary" id="NameId">You must login first</h1>
                    <input type="text" ></input>
                </div>
                <div className="buttonContainer">
                    <div className="left">
                    <a className="bttn" href="http://localhost:3000/available">Enrolled Schemes</a>
                    </div>
                    <div className="right">
                        <a className="bttn" href="http://localhost:3000/available">Available Schemes</a>
                    </div>
                </div>
            
                
            </div>
        )
    }
}
