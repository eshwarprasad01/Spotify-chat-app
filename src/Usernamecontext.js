import React, { createContext,useState } from "react";
export const Context = createContext();
export default function Usernamecontext({ children }){
    const [Username,setUsername] = useState({});
    const store_username = (data)=>{
        setUsername({Username:data});
    }
    return (
        <Context.Provider value={{Username,store_username}}>
            {children}
        </Context.Provider>
    )
}