// eslint-disable-next-line
import React, { useEffect } from 'react'
import {createContext,useContext,useState} from "react"
const context= createContext();
const CryptoContext = ({children}) => {
    
    const [currency,setCurrency]=useState("INR");
    const [symbol,setSymbol]=useState("₹");
    useEffect(()=>{
        if(currency==="INR")setSymbol("₹");
        else
        setSymbol("$");
    },[currency]);
  return (
   <context.Provider value={{currency,symbol,setCurrency}}>
    {children}
   </context.Provider>
  )
}

export default CryptoContext;
export const CryptoState=()=>{
    return useContext(context);
}
