import { Avatar, Button } from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";
import { CryptoState, UserState } from "../CryptoContext";
import "./Header.css";

import {  signInWithPopup, GoogleAuthProvider,signOut } from "firebase/auth";

import {auth} from "../Firebase";
import UserDetails from "./UserDetails";


const Header = (props) => {
  const {user, setUser} = UserState();
  const { currency, setCurrency} = CryptoState();
  
  console.log(user);
  
  const signItOut=()=>{
    
    signOut(auth).then(() => {
        // Sign-out successful.
        console.log("signOut successful");
        setUser(null);
        
      }).catch((error) => {
        // An error happened.
        console.log(error);
      });
  }
  const getUser=()=>{
    // const auth = getAuth();
    const provider = new GoogleAuthProvider();

    signInWithPopup(auth, provider)
      .then((result) => {
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;
        const user = result.user;
        setUser(user);

      }).catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        const email = error.customData.email;
        const credential = GoogleAuthProvider.credentialFromError(error);
        console.log(errorCode, errorMessage, email, credential);
   
      }); 
  }
  
  return (    
      <div className="main">
      <Link to="/" className="title">
        <h2>Crypt-o-Hunt</h2>
      </Link>
      <div className="choose_currency">
        <label htmlFor="currency"> </label>
        <select
          name="currency"
          id="currency"
          value={currency}
          onChange={(e) => setCurrency(e.target.value)}
        >
          <option value="USD" >&#160;USD </option>
          <option value="INR">&#160;INR </option>
        </select>
        {!user? <Button variant="outlined" sx={{margin:"0px 1rem" ,color: "gold" ,borderColor:"gold"}} onClick={getUser}>LOGIN</Button>
        :  <UserDetails user={user} signout={signItOut}/>}
         
       

      </div>
    </div>
  
  )
};

export default Header;
