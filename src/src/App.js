import React, { useState } from 'react';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import LoadingBar from 'react-top-loading-bar';
import './App.css';
import NavBar from './Components/NavBar';
import News from './Components/News';


const App = () => {
  const [progress, setProgress] = useState(0)
 
 const pageSize=5;
  const apiKey = process.env.REACT_APP_NEWS_APP
    return (
      <Router>
        <div>
          <NavBar/>
          <LoadingBar height={4}
        color='#f11956'
        progress={progress}
        // onLoaderFinished={() => setProgress(0)}
      />
          <Routes>
            <Route exact path="/" element={<News setProgress={setProgress} apiKey={apiKey}  key="sports" pageSize={pageSize} country="us" category="sports"/>} />
            <Route exact path="/business" element={<News setProgress={setProgress} apiKey={apiKey}  key="business" pageSize={pageSize} country="us" category="business"/>} />
            <Route exact path="/entertainment" element={<News setProgress={setProgress} apiKey={apiKey}  key="entertainment" pageSize={pageSize} country="us" category="entertainment"/>} />
            <Route exact path="/general" element={<News setProgress={setProgress} apiKey={apiKey}  key="entertainment" pageSize={pageSize} country="us" category="general"/>} />
            <Route exact path="/health" element={<News setProgress={setProgress} apiKey={apiKey}  key="health" pageSize={pageSize} country="us" category="health"/>} />
            <Route exact path="/science" element={<News setProgress={setProgress} apiKey={apiKey}  key="science" pageSize={pageSize} country="us" category="science"/>} />
            <Route exact path="/sports" element={<News setProgress={setProgress} apiKey={apiKey}  key="sports" pageSize={pageSize} country="us" category="sports"/>} />
            <Route exact path="/technology" element={<News setProgress={setProgress} apiKey={apiKey}  key="technology" pageSize={pageSize} country="us" category="technology"/>} />
          </Routes>
        </div>
      </Router>
    )
  
}
export default App