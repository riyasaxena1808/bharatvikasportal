import { waitFor } from '@testing-library/react'
import React, { Component } from 'react'
import {Form} from 'react-bootstrap'
import "./css/signUp.css"
import Axios from 'axios'






export default class signup extends Component  {
    constructor(props) {
        super(props)
        this.state = 
        {
            allCategories:[],
            allRegions:[],
            lastName: null,
            firstName: null,
            email: null,
            phone: null,
            aadhar: null,
            password: null,
            gender: null,
            age:null,
            selectedCategories: [],
            region:null
        }
        // This binding is necessary to make `this` work in the callback    
        this.handleAxios = this.handleAxios.bind(this);        
        this.handleSubmit = this.handleSubmit.bind(this);        
        this.handleCategories = this.handleCategories.bind(this);
        Axios.defaults.withCredentials=true

    }
    handleCategories(e){
        
        if(this.state.selectedCategories.includes(e))
        {
            let newList = this.state.selectedCategories.filter((cat)=>cat!==e)
            this.setState({selectedCategories:newList})
            // console.log("remover")
        }
        else{
            let newList = [...this.state.selectedCategories,e]
            this.setState(
                {selectedCategories:newList}
            )
            // console.log("adder")
        }
        // console.log(this.state.selectedCategories)

    }
   
    handleSubmit(){
        // console.log(this.state)
        Axios.post('http://localhost:3002/api/insert/user',{
            lastName:this.state.lastName,
            firstName:this.state.firstName,
            email:this.state.email,
            phone:this.state.phone,
            aadhar:this.state.aadhar,
            password:this.state.password,
            gender:this.state.gender,
            age:this.state.age,
            selectedCategories:this.state.selectedCategories,
            region:this.state.region
        }).then(function(){
            // window.location.reload()
        }
        )

    }
    handleAxios(){
        Axios.get('http://localhost:3002/api/get/category').then((response) =>
        {
        //   console.log(response.data)
          let newLs = response.data.map((item)=>
            {
                return {
                    category_id:item.category_id,
                    title: item.title
                }
            })
            this.setState(
                {
                    allCategories:newLs
                })
          
        })
        Axios.get('http://localhost:3002/api/get/regions').then((response) =>
        {
        //   console.log(response.data)
          let regGetList = response.data.map((item)=>
            {
                return {
                    region_id:item.region_id,
                    region_name: item.region_name
                }
            })
            this.setState(
                {
                    allRegions:regGetList
                })
          
        })
        
    }
    componentDidMount() {  
        this.handleAxios()
        }  
    componentDidUpdate() {    
        // this.handleAxios()
        }
    
    render()
    {

        let catList = this.state.allCategories.map((item)=>
            {
                
                return(
                        <div className="form-check span-3" key={item.category_id}>
                        <input className="form-check-input" name={item.category_id} type="checkbox" onChange={(e)=>{this.handleCategories(e.target.value)}} value={item.category_id}/>
                        <label className="form-check-label" >
                           {item.title}
                        </label>
                        </div>
                    )
            }
            
        )
        let regList = this.state.allRegions.map((item)=>
            {
                if(item.region_id!=="R000")
                {
                    return (
                        <option key={item.region_id} name={item.region_id} value={item.region_id}>{item.region_name}</option>
                    )
                }
                
                
            })

        return (
            <div className="signUpMainDiv">

            




            <h1 className="signup">Sign Up</h1>
                <form className="signUpForm">
                    

                    <legend className="col-form-label">First Name and Last Name</legend>


                    {/* FIRST NAME and LAST NAME */}
                    <div className="form-row form-group">
                        <div className="col">
                        <input type="text" className="form-control"name="firstName" required placeholder="First name" 
                            onChange={(e)=>{this.setState({firstName:e.target.value})}}/>
                        </div>
                        <div className="col">
                        <input type="text" className="form-control"name="lastName" required placeholder="Last name"
                            onChange={(e)=>{this.setState({lastName:e.target.value})}}/>
                        </div>
                    </div>

                    {/* EMAIL */}
                    <div className="form-group">
                        <label >Email address</label>
                        <input type="email" className="form-control" id="exampleInpuEmail1" aria-describedby="emailHelp" name="email" required placeholder="Enter email"
                            onChange={(e)=>{this.setState({email:e.target.value})}}
                        />
                        <small id="emailHelp" className="form-text text-muted">Your Email Id will be your username for the website</small>
                    </div>

                    {/* Phone Number */}
                    <div className="form-group">
                        <label >Phone Number</label>
                        {/* <input  id="phone"  pattern="[[0-9]{9}"> */}
                        <input type="tel" name="phone" className="form-control" id="phone" pattern="[1-9]{1}[0-9]{9}" aria-describedby="phoneHelp" placeholder=""
                            onChange={(e)=>{this.setState({phone:e.target.value})}}/>
                    </div>
                    {/* Age */}
                    <div className="form-group">
                        <label >Age</label>
                        {/* <input  id="phone"  pattern="[[0-9]{9}"> */}
                        <input type="number" name="age" className="form-control" id="age" placeholder="0"
                            onChange={(e)=>{this.setState({age:e.target.value})}}/>
                    </div>

                    {/* Aadhar Number */}
                    <div className="form-group">
                        <label >Aadhar Number</label>
                        <input type="text" className="form-control" id="aadhar" name="aadhar" aria-describedby="aadharHelp" placeholder="Ex: 80484087xx84"
                            onChange={(e)=>{this.setState({aadhar:e.target.value})}}
                        />
                    </div>

                    
                    {/* PASSWORD */}
                    <div className="form-group">
                        <label >Password</label>
                        <input type="password" className="form-control" name="password" required id="exampleInputPassword1" placeholder="Password"
                            onChange={(e)=>{this.setState({password:e.target.value})}}
                        />
                    </div>
                    {/* GENDER */}
                    <div className="form-group">
                        <label >Gender</label>
                        <select className="form-control" defaultValue="Default" id="exampleFormControlSelect1" name="gender" required
                            onChange={(e)=>{
                                this.setState({gender:e.target.value})
                                // console.log(this.state.gender)
                            
                            }}
                        >
                            <option disabled value="Default"> Select your gender</option>
                            <option value="Male">Male</option>
                            <option value="Female">Female</option>
                            <option value="Other">Other</option>
                        </select>
                    </div>

                    {/* CATEGORIES */}
                    <hr/>
                    <legend className="col-form-label">Categories</legend>
                    <div className="cat-container">
                        {catList}
                    </div>
                    <hr/>
                    {/* Regions */}
                    <div className="form-group">
                        <label >Select the Region you live in</label>
                        <select className="form-control" defaultValue="Default" id="exampleFormControlSelect2" 
                            onChange={(e)=>{
                                this.setState({region:e.target.value})
                                // console.log(this.state.gender)
                            
                            }}
                        >
                            <option disabled value="Default">Select the region you live in</option>
                            {regList}
                        </select>
                    </div>
                    <button type="button" className="btn btn-primary"onClick={()=>{this.handleSubmit()}}>Submit</button>
                </form>


            </div>
        )
    }



}