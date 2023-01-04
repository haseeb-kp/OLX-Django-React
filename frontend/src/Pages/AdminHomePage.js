import React from 'react'
import {useNavigate} from 'react-router-dom';
import AdminHome from '../Components/AdminHome/AdminHome'
import Head from '../Components/Head/Head'

function AdminHomePage() {
  const navigate=useNavigate()
  function logoutAdmin(){
    console.log("aaa");
    localStorage.removeItem('user')
    navigate('/admin')
  }
  return (
    <div>
        <button onClick={logoutAdmin}>Logout</button>
        <AdminHome></AdminHome></div>
  )
}

export default AdminHomePage