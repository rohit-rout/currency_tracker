import React from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import { db } from "../Firebase";
import { doc, setDoc } from "firebase/firestore";
import { CryptoState, UserState } from "../CryptoContext";
import { Typography } from "@mui/material";

const DisplayButton = ({coinName}) => {
    const {watchList} = CryptoState();
    const {user} = UserState()

    const removeFromWatchList = async() => {
        const ref = doc(db, 'watchList', user.uid);
        await  setDoc(ref, { coins:watchList.filter((coin)=>coin!==coinName)}, { merge: true });
        
      };
    
  return (
    <>
      <div className="display_button">
        <Typography variant="h5" gutterBottom sx={{textTransform:"capitalize",fontSize:"medium"}}>
          {coinName}
        </Typography>
        <DeleteIcon  sx={{marginRight:"1rem" ,cursor:"pointer"}} onClick={removeFromWatchList}></DeleteIcon>
      </div>
    </>
  );
};

export default DisplayButton;
