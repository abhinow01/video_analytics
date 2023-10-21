import React, { useState } from "react";
import { Modal, Typography, TextField, Button, Box } from "@mui/material";

function CallModal ({open,handleClose,handleRequestCallback}){
const [name,setName] = useState("");
const [email,setEmail] = useState("");

const handleSubmit = (e) => {
    // e.preventDefault();
    handleRequestCallback({ name, email });
     handleClose();
  };

return (
    <>
<Modal open={open} onClose={handleClose}>
    <center>
<Box
        sx={{
          position: "absolute",
          width: 400,
          background: "#101010",
          border: "1px solid white",
          boxShadow: 24,
          p: 2,
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
        }}
      >
        <Typography variant="h6" component="div" gutterBottom style={{
            color: "white"
        }}>
          Request a Callback
        </Typography>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSubmit({ name, email });
          }}
        >
            
          <TextField
            fullWidth
            placeholder="Name"
            variant="outlined"
            margin="normal"
            required
            inputProps={{ style: { color: 'white' } }}
            value={name}
            onChange={(e) => setName(e.target.value)}
            style={{
                border: "1px solid white"
            }}
          />
          
          <TextField
            fullWidth
             placeholder="Email"
            variant="outlined"
            margin="normal"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            inputProps={{ style: { color: 'white' } }}
            style={{
                border: "1px solid white"
            }}
          />
          
          <Button variant="outlined" type="submit" style={{
   background: "white",
   borderRadius: 20,
   color:"black"
          }}>
             Request a callback 
          </Button>
        </form>
      </Box>
      </center>
</Modal>


    </>
);


};
export default CallModal;