import React from 'react'
import ElectedTablePage from './pages/ElectedTablePage'
import { BrowserRouter, Route, Routes } from "react-router-dom";
import MonitorsTablePage from './pages/MonitorsTablePage';


const App = () => {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/elected" element={<ElectedTablePage />} />
          <Route path="/monitors" element={<MonitorsTablePage />} />
        </Routes>
      </BrowserRouter>
      
    </div>
  )
}

export default App
