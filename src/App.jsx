import React from "react"
import {BrowserRouter as Router,Route,Routes} from 'react-router-dom';
import Home from "./Home";
import ResultPage from "./ResultPage";
function App() {
  

  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Home />}/>
          <Route path="/result" element={<ResultPage />}/>
        </Routes>
      </Router>
    </>
  )
}

export default App
