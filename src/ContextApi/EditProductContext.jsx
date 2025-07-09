import { createContext, useState } from "react";

export const EditProductContext=createContext()

export const EditProductProvider=({children})=>
{
    const [editId,setEditId]=useState()

    return(
        <EditProductContext.Provider value={{setEditId,editId}}>
            {children}
        </EditProductContext.Provider>
    )
}