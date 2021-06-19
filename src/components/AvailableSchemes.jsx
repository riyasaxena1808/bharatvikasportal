import React, { Component } from 'react'
import './css/main-style.css'
import './css/enrolled.css'
import Axios from 'axios'
export default class AvailableSchemes extends Component {
    constructor(props){
        super(props)
        this.state=
        {
            categories:[],
            email:null,
            users:[],
            schemes:[]
        }
        this.handleSearch = this.handleSearch.bind(this)
        Axios.defaults.withCredentials=true

    }
    componentDidMount(){
        Axios.get('http://localhost:3002/api/get/user_cat_comb').then((response) =>
        {
        //   console.log(response.data)
          let newLs = response.data.map((item)=>
            {
                return {
                    email:item.user_email,
                    cat_id:item.user_category_id
                }
            })
            this.setState(
                {
                    categories:newLs
                })
          
        })
        Axios.get('http://localhost:3002/api/get/user').then((response) =>
        {
        //   console.log(response.data)
          let newLs = response.data.map((item)=>
            {
                return {
                    ...item
                }
            })
            this.setState(
                {
                    users:newLs
                })
          
        })
        Axios.get('http://localhost:3002/api/get/centre-schemes').then((response) =>
        {
          console.log("Schemes",response.data)
          let newLs = response.data
            this.setState(
                {
                    schemes: [...newLs]
                })
          
        })
    }
    handleSearch(){
        console.log(this.state.users)
    }
    render() {
        let ls = this.state.schemes.map((item)=>{
            return(
                
                <tr key={item.scheme_id}>
                     <td>{item.scheme_id}</td>
                     <td> {item.title}</td>
                    <td>{item.ministry_id}</td>
                    <td>{item.category}</td>
                    <td>Due Amt.</td>
                     <td>Pay Amt.</td>
                     <td>
                     <button>More details</button>
                     
                     </td>
                     <td>

                     <button>Enroll</button>
                     </td>
                </tr>

            )
        })
        // let u = this.state.users.find((item)=>
        //     item.email==this.state.email
        // )
        // if(u){
        //     let categories = this.state.categories.filter((item)=>
        //         item.email===this.state.email
        //     )
        //     console.log(categories)
        //     let cats = categories.map((item)=>
        //         {return item.cat_id}
        //     )
        //     console.log("List:",cats)
        //     let finalCats = this.state.schemes.filter((item)=>{
        //         [...categories.cat_id].includes(item.category)
    
        //     })
            
        //     console.log("Finalllllllll",finalCats)

        // }
        
        return (
            
    <div>
        <section>
                <h1 class="enrolled-schemes">Available Schemes</h1>
        </section>
        <div class="searchbox2">
            <form>
            <input type="text" placeholder="Search..." name="search" onChange={(e)=>{this.setState({email:e.target.value})}}/>
            <button type="button" onClick={(e)=>{this.handleSearch()}}>Search</button>
            </form>
        </div>
        <main className="MainTable">
            
            <table width="90%">
                <table border="5" width="100%" cellspacing="3">
                    <tr>
                            <th colspan="8">
                                <h3><br/>Enrolled Schemes</h3>
                            </th>
                    </tr>
                    <tr>
                        <th>Scheme_Id</th>
                        <th>Title</th>
                        <th>Ministry_Id</th>
                        <th>category_Id</th>
                        <th>Due Amt.</th>
                        <th>Pay Amt.</th>
                        <th>More Details</th>
                        <th>Enroll</th>
                    </tr>
                        
                    {ls}
                </table>
                
            </table>
                
        </main>
    </div>
        )
    }
}
