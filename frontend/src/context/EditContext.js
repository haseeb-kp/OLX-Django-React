import axios from "axios";
import { createContext, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";

export const EditContext = createContext()
export const EditProvider = ({children})=>{
const navigate = useNavigate()
const [editData,setEditData]=useState()

    let EditUser = (id)=>{
        
        axios.get(`http://localhost:8000/api/user/${id}/`)
        .then((response) => {
            console.log(response.data);
            
            if(response.status===200){
                console.log(response.status);
                setEditData(response.data)
                navigate('/edit')
            }
        })
    }

    let EditData = {
        EditUser : EditUser,
        editData: editData
    }

    return(
        <EditContext.Provider value={EditData}>
            {children}
        </EditContext.Provider>
    )
}

