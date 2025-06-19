import React from 'react'
import ElectedTablePage from './pages/ElectedTablePage'
import { BrowserRouter, Route, Routes } from "react-router-dom";
import MonitorsTablePage from './pages/MonitorsTablePage';
import CoordinatorTablePage from './pages/CoordinatorTablePage';
import UserTablePage from './pages/UserTablePage';
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';


const App = () => {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/elected" element={<ElectedTablePage />} />
          <Route path="/monitors" element={<MonitorsTablePage />} />
          <Route path="/coordinators" element={<CoordinatorTablePage />} />
          <Route path="/users" element={<UserTablePage />} />
        </Routes>
      </BrowserRouter>
      
    </div>
  )
}

export default App
