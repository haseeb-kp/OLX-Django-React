import React, { useContext } from 'react'
import {Link} from 'react-router-dom'
import { AuthContext } from '../../Context/AuthContext'
import './Head.css'

function Head() {
    const {user,logoutUser} = useContext(AuthContext)
    console.log(user);
  return (
    <div>
      <div className="navbar">
        <div className='links'>
        <Link to='/'> Home </Link>
        
        <span> | </span>
        <Link to='/admin'>Admin</Link>
        <span> | </span>
        {user? (<><Link to ='/profile'>Profile</Link><span> | </span><button className='logoutAdmin' onClick={logoutUser}>Logout</button> </>):(<><Link to='/login'> Login </Link> <span> | </span> <Link to='/register'> Register </Link></>)}
        {/* {user && <p>Hello {user.username}</p>} */}
        </div>
      </div>
    </div>
  )
}

export default Head