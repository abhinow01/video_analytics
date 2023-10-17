import React from "react";
import { Button, Typography } from "@mui/material";
import ResultCard from "./ResultCard";

function ResultPage({videoData,earnings}) {
    if (!videoData) {
        return null; // Render nothing if videoData is not available
      }
  return (
    <div style={{ 
     background: '#101010', 
      minHeight: '100vh', 
      display: 'flex', 
      flexDirection: 'column', 
      alignItems: 'center', 
      justifyContent: 'center',
      position: 'relative'
    }}>
      <div style={{ position: 'absolute', top: '20px', left: '20px', zIndex: '9999' }}>
        <img src='/assets/anchorlogo.png' alt="Logo" />
      </div>
      {videoData && (
        <ResultCard videoData={videoData} earnings={earnings} />
      )}
      <Button variant="outlined" style={{ border: '1px solid white', background: 'transparent', color: 'white', position: 'absolute', top: '20px', right: '20px' }}>
        <Typography variant="caption" style={{ fontWeight: 300 }}>
          Request a call back
        </Typography>
      </Button>
    </div>
  )
}

export default ResultPage;
