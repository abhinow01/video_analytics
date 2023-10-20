import React from "react";
import ResultCard from "./ResultCard";
import { useLocation } from "react-router-dom";

function ResultPage() {
  const location = useLocation();
  const videoData = location.state.videoData;
  const earnings = location.state.earnings;

  return (
    <div>
      <ResultCard videoData={videoData} earnings={earnings} />
    </div>
  );
}

export default ResultPage;