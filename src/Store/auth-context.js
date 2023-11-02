import React from "react";
import { useState } from "react";
const AuthContext=React.createContext({
    token:'',
    isLoggedin:false,
    login:(token)=>{},
    logout:()=>{},
})

export const AuthContextProvider=(props)=>{
    const [token,setToken]=useState(null);
    const userisLoggedin=!!token;
    const loginHandler=(token)=>{
        setToken(token);
    }
    const logoutHandler=()=>{
        setToken(null)
    }
    const [inbox,setInbox]=useState([])
    const inboxdata = (newTO, newSUB, newDESCRIPTION) => {
        setInbox((newinboxdata) => {
          return[...newinboxdata,
          { TO:newTO,
            SUB:newSUB,DESCRIPTION:newDESCRIPTION}]
        })
      }
  const contextValue={
    token:token,
    isLoggedin:userisLoggedin,
    login:loginHandler,
    logout:logoutHandler,
    inboxdata,inbox
}
return(
    <AuthContext.Provider value={contextValue}>
    {props.children}
</AuthContext.Provider>
)
}
export default AuthContext;
