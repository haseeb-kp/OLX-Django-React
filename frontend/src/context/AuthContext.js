import { createContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import jwt_decode from "jwt-decode";

export const AuthContext = createContext()


export const AuthProvider=({children})=>{
    
    const navigate = useNavigate()
    const [authTokens,setAuthTokens] = useState(()=>localStorage.getItem('user') ? (localStorage.getItem('user')) : null)
    const [user,setUser] = useState(()=>localStorage.getItem('user') ? localStorage.getItem('user') : null)

    let loginUser = async (e)=>{
        
        console.log(e.target.password.value);
        const response = await fetch('http://127.0.0.1:8000/api/token/',{
            method:'POST',
            headers:{
                'Content-type':'application/json',
            },
            
            body:JSON.stringify({"username":e.target.username.value,"password":e.target.username.value})
        }).catch((error)=>{alert(error)})
        
        let data = await response.json()
        console.log(data);
        if(response.status===200){
            setAuthTokens(data)
            setUser(jwt_decode(data.access))
            localStorage.setItem('authTokens',JSON.stringify(data))
            navigate('/')
        }else{
            // alert(er)
        }

    }
    let logoutUser = ()=>{
        setAuthTokens(null)
        setUser(null)
        localStorage.removeItem('user')
        navigate('/login')
    }
    let contextData = {
        user:user,
        loginUser:loginUser,
        logoutUser:logoutUser
        
    }


    return(
        <AuthContext.Provider value={contextData}>
            {children}
        </AuthContext.Provider>
    )

}