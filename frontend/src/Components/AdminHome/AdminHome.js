import axios from 'axios'
import React, { useContext, useEffect, useState } from 'react'
import { EditContext } from '../../Context/EditContext'
import './AdminHome.css'

function AdminHome()  {
    const {EditUser} = useContext(EditContext)
    const [datas,setDatas] = useState([])
    useEffect(()=>{
        axios.get("http://localhost:8000/api/user/")
    .then((response) => {
        setDatas(response.data)
    }) 
    },[datas])
      
    function deleteUser (id){
        console.log(id);
        axios.delete(`http://localhost:8000/api/user/${id}/`)
        .then((response) => {
            console.log(response);
            if(response.status===204){
                <AdminHome/>
            }
        })
    }
    // function editUser (id){
    //     console.log(id);
    //     axios.put(`http://localhost:8000/api/user/${id}/`)
    //     .then((response) => {
    //         console.log(response);
    //         if(response.status===204){
    //             <AdminHome/>

    //         }
    //     })
    // }   
    
    
  return (
    <div>
        <div className="detailsCard">
            <div className="heading">
                <h1>User details</h1>
            </div>
            <div className="table">
                <table>
                    <thead>
                    <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>E-mail</th>
                        <th>Phone</th>
                        <th>Username</th>
                        {/* <th>Edit</th> */}
                        <th>Delete</th>
                    </tr>
                    </thead>
                    <tbody>
                    {datas.map((item)=>{

                        
                            {if (item.is_superuser===false) {
                                return(
                                <tr>
                                <td>{item.id}</td>
                                <td>{item.name}</td>
                                <td>{item.email}</td>
                                <td>{item.phone}</td>
                                <td>{item.username}</td>
                                {/* <td><button onClick={()=>EditUser(item.id)}>Edit</button></td> */}
                                <td><button onClick={()=>deleteUser(item.id)}>Delete</button></td>
                                </tr>)
                            }}
                            
                        
                    })}
                        
                        
                           
                            
                            
                        
                    </tbody>
                </table>
            </div>
            
        </div>
    </div>
  )
}

export default AdminHome