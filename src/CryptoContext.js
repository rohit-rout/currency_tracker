// eslint-disable-next-line
import React, { useEffect } from 'react'
import {createContext,useContext,useState} from "react"
import { doc, onSnapshot } from "firebase/firestore";
import { auth, db } from './Firebase';
import { onAuthStateChanged } from 'firebase/auth';
const context= createContext();
const userContext=createContext();
const CryptoContext = ({children}) => {
    
    const [currency,setCurrency]=useState("INR");
    const [symbol,setSymbol]=useState("₹");
    const [watchList, setWatchList]=useState([]);
    const [user, setUser]=useState();

    useEffect(()=>{
        if(user){
            const unsub = onSnapshot(doc(db, "watchList", user.uid), (doc) => {
                // console.log("Current data: ", doc.data());
                if(doc.exists()){
                console.log(doc.data());
                setWatchList(doc.data().coins);
                }
                
            });
            return  ()=>{
                unsub();
           }
            
        }
       
    },[user])
    useEffect(() => {
        onAuthStateChanged(auth, (user) => {
          if (user) setUser(user);
          else setUser(null);
        });
      }, []);

    useEffect(()=>{
        if(currency==="INR")setSymbol("₹");
        else
        setSymbol("$");
    },[currency]);
  return (
   <context.Provider value={{currency,symbol,setCurrency,watchList}}>
    <userContext.Provider value={{user,setUser}}>
    {children}
    </userContext.Provider>
   </context.Provider>
  )
}

export default CryptoContext;
export const CryptoState=()=>{
    return useContext(context);
}
export const UserState=()=>{
    return useContext(userContext);
}
