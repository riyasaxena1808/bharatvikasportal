import React, {useState, useEffect}  from 'react'
import {Redirect} from 'react-router-dom'
import './css/main-style.css'
import Axios from 'axios'
import Dashboard from './dashboard'


export default function Login() {
    const [email,setemail] = useState('')
    const [password,setpassword] = useState('')
    const [allUsers,setallUsers] = useState([])
    const [allUsersEmails,setallUsersEmails] = useState([])
    const [loginStatus,setLoginStatus] = useState(false)
    Axios.defaults.withCredentials=true

    useEffect(()=>
    {
    
        // header("Access-Control-Allow-Origin: *");
        Axios.get('http://localhost:3002/api/get/user').then((response) =>
        {
            
        let ls = response.data.map((item)=>{
            return (item.email)})
        setallUsersEmails(ls)
        })
        Axios.get('http://localhost:3002/api/login').then((response)=>
        {
            console.log("Axios Response",response)
            if(response.data.loggedIn=true){
                setLoginStatus(true)
            }
            else{
                setLoginStatus(false)

            }
        }
        )
    }
    
,[])
  const submitReview = () => {

    console.log(email,password)

    Axios.post('http://localhost:3002/api/login',{
        email:email,
        password:password,
    }).then((response)=>{
        console.log("Session Response: ",response)
    })


    // if(allUsersEmails.includes(email))
    // {
    //     console.log("Email Detected")
    //     var b = allUsers.find((user)=>user.email ===email)
    //     if(b.password === password){
    //         console.log("Verified")
    //     }
    //     else {
    //         console.log("Not Verified")
    //     }
    // }
    // else{
    //     console.log("Please enter Correct Email")
    // }
  }

//   if(loginStatus===true){
//     return (<Redirect to={Dashboard}/>)
//   }

    return (
        

        
        <section className="loginSection">
            <h1 className="h-primary center">Log In</h1>
            <div id="contact-box">
                <form className="loginForm">
                    <div class="form-group">
                        <label for="User Id">User Id:</label>
                        <input type="email" name="name" id="email"
                            placeholder="Enter your email"
                            onClick={(e)=>{setemail(e.target.value)}}
                            />
                        
                    </div>
                    <div className="form-group">
                        <label for="Password">Password:</label>
                        <input type="text" name="name" id="password"
                            placeholder="Enter Password"
                            onClick={(e)=>{
                                setpassword(e.target.value)
                                //    console.log(password)
                                }}
                            />
                    </div>

                </form>
            </div>
        <div class="logsub">
        <button type="button" id="btn" className="btn btn-primary" onClick={()=>{submitReview()}}>Submit</button>
         </div>
    </section>
        
    
    )
  

    
}
