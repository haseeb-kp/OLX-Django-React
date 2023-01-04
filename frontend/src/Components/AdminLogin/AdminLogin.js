import React, { useContext, useState } from 'react'
import axios from 'axios';
import { AuthContext } from '../../Context/AuthContext'
import './AdminLogin.css'
import { useNavigate } from 'react-router-dom';


function AdminLogin() {

  
  const navigate = useNavigate()
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const data = {
    username: username,
    password: password,
  }
  const adminLogin = (e) => {
    e.preventDefault();
    console.log(data);
    axios.post('http://localhost:8000/api/admin_login', data,).then((response) => {
      console.log(response);
      if(response.data==='Admin not found'){
        alert(response.data);}
      else if(response.data==='Password incorrect'){
        alert("Password incorrect")
      }
      else{
        localStorage.setItem('user', response.data)
        navigate('/admin-home')
      }
    }).catch((error) => {
        alert(error)
    })
  }
  return (
    <div>
      <div className='card'>
        <form >
          <input type="text" name="username" value={username} onChange={(e)=>{setUsername(e.target.value)}} placeholder="Enter Username" />
          <br/>
          <input type="password" name="password" value={password} onChange={(e)=>{setPassword(e.target.value)}}  placeholder="Enter Password" />
          <br/>
          
          <button onClick={adminLogin}>Login</button>
        </form>
      </div>
      
    </div>
  )

}

export default AdminLogin