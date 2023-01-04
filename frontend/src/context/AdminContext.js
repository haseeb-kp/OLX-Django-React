import React, { createContext } from 'react'

export const AdminContext = createContext()


export const AdminProvider = ({children}) => {
    return (
        <AdminContext.Provider value={{}}>
        {children}
        </AdminContext.Provider>
    )
    }