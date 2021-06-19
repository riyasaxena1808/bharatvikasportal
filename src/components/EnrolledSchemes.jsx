import React, { Component } from 'react'
import './css/main-style.css'
import './css/enrolled.css'
import Axios from 'axios'
export default class EnrolledSchemes extends Component {
    constructor(props){
        super(props)
        this.state=
        {
            email:null,
            users:[]
        }
        this.handleSearch = this.handleSearch.bind(this)
        Axios.defaults.withCredentials=true

    }
    componentDidMount(){
        Axios.get('http://localhost:3002/api/get/user').then((response) =>
        {
        //   console.log(response.data)
          let newLs = response.data.map((item)=>
            {
                return {
                    item
                }
            })
            this.setState(
                {
                    users:newLs
                })
          
        })
    }
    handleSearch(){
        console.log(this.state.users)
    }
    render() {

        return (
            // let itmList=
    <div>
        <section>
                <h1 class="enrolled-schemes">Enrolled Schemes</h1>
        </section>
        <div class="searchbox2">
            <form>
            <input type="text" placeholder="Search..." name="search"/>
            <button type="button" onClick={(e)=>{this.handleSearch()}}>Search</button>
            </form>
        </div>
        <main className="MainTable">
            
            <table width="90%">
                <table border="5" width="100%" cellspacing="3">
                    <tr>
                            <th colspan="7">
                                <h3><br/>Enrolled Schemes</h3>
                            </th>
                    </tr>
                    <tr>
                        <th>S No.</th>
                        <th>Name</th>
                        <th>Start Date</th>
                        <th>End Date</th>
                        <th>Due Amt.</th>
                        <th>Pay Amt.</th>
                        <th>More Details</th>
                    </tr>
                        
                    <tr>
                        <td>1.</td>
                        <td> Scheme 1</td>
                        <td>DDMMYY</td>
                        <td>DDMMYY</td>
                        <td>Due Amt.</td>
                        <td>Pay Amt.</td>
                        <td>
                            <button>More details</button>
                        </td>
                    </tr>
                    <tr>
                        <td>2.</td>
                        <td> Scheme 2</td>
                        <td>DDMMYY</td>
                        <td>DDMMYY</td>
                        <td>Due Amt.</td>
                        <td>Pay Amt.</td>
                        <td>
                        <button>More details</button>
                        </td>
                    </tr>
                    <tr>
                        <td>3.</td>
                        <td> Scheme 3</td>
                        <td>DDMMYY</td>
                        <td>DDMMYY</td>
                        <td>Due Amt.</td>
                        <td>Pay Amt.</td>
                        <td>
                            <button>More details</button>
                        </td>
                        
                    </tr>
                </table>
                
            </table>
                
        </main>
    </div>
        )
    }
}
