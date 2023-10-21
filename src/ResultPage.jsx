import React, { useState } from "react";
import ResultCard from "./ResultCard";
import { useLocation } from "react-router-dom";
import { Button } from "@mui/material";
import CallModal from "./CallModal";
import axios from 'axios';
import './index.css'
function ResultPage() {
  const location = useLocation();
  const videoData = location.state.videoData;
  const earnings = location.state.earnings;

  const [modalOpen , setModalOpen] = useState(false);

 function handleModalOpen(){
  setModalOpen(true);
 }
  function handleModalClose(){
    setModalOpen(false);
  }

  const handleRequestCallback = ({ name, email }) => {
    // Handle callback request submission here
    axios.post('http://localhost:3000/send-email', {name,email}).then(response =>{
      alert(response.data);
      handleModalClose();
    }).catch(error => {
      alert('Error sending email: ' + error.message);
    });
    
  };

  return (
    <div style={{
      background: '#101010',
      minHeight:'100vh'
    }}>
      <div style={{
        display: "flex",
        justifyContent: "space-between",
        top: 0
      }}>
<div style={{
  margin: 10
}}>
  <img src="/assets/anchorlogo.png" />
</div>

<div>
  <Button variant="outlined" style={{
    border: "1px solid white",
    borderRadius: 10,
    color:"white",
    margin: 10,
  }}  
  onClick={handleModalOpen}
  >request call back </Button>
</div>
      </div>
      <center>
      <ResultCard videoData={videoData} earnings={earnings} />
      </center>
      { modalOpen && (
    <CallModal open={modalOpen} handleClose={handleModalClose} handleRequestCallback={handleRequestCallback} /> 
      )}
    </div>
  );
}

export default ResultPage;