import { Avatar, Backdrop, Button, Container, Typography } from "@mui/material";
import React, { useState } from "react";
import { CryptoState, UserState } from "../CryptoContext";
import DisplayButton from "./DisplayButton"

import "./UserDetails.css";
const UserDetails = ({user,signout}) => {
  const [show, setShow] = useState(false);



  const handleToggle = () => {
    setShow(!show);
  };
  const {watchList}=CryptoState();


  return (
    <>
      <Button onClick={handleToggle}>
        <Avatar
          // alt="Baker"
          sx={{ margin: "0px 1rem" }}
          src={user?.photoURL}
        />
      </Button>
      {show && (
        <div>
          <Backdrop
            sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
            open={show}
            onClick={handleToggle}
          >
            <div className="user_container">
              <Avatar
                className="user_image"
                sx={{height:150,width:150}}
                alt="Cindy Baker"
                src={user?.photoURL}
              />
              <Typography variant="h5" gutterBottom>
                {user?.email}
              </Typography>
              <div className="user_coinsList">
               {
                watchList.length>0?watchList.map((coin,key=coin)=><DisplayButton coinName={coin}></DisplayButton>)
                :<Typography variant="h5" gutterBottom sx={{textAlign:"center",color:"black"}}>
                It's Empty :(
              </Typography>
                
               }
              </div>
              <Button
                variant="contained"
                sx={{
                  color: "white",
                  backgroundColor: "#FFB200",
                  width: "80%",
                  alignItems: "center"
                }}
                onClick={signout}
               
              >
                LOGOUT
              </Button>
            </div>
          </Backdrop>
        </div>
      )}
    </>
  );
};

export default UserDetails;
