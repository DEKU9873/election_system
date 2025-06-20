import React from 'react'
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';
import UserTablePage from './pages/auth/UserTablePage';
import CoordinatorTablePage from './pages/auth/CoordinatorTablePage';
import MonitorsTablePage from './pages/auth/MonitorsTablePage';
import ElectedTablePage from './pages/auth/ElectedTablePage';
import GovernoratePage from './pages/Places/GovernoratePage';
import DistrictsPage from './pages/Places/DistrictsPage';
import SubdistrictPage from './pages/Places/SubdistrictPage';
import CenterManagers from './pages/auth/CenterManagers';


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
          <Route path="/governorate" element={<GovernoratePage />} />
          <Route path="/districts" element={<DistrictsPage />} />
          <Route path="/subdistricts" element={<SubdistrictPage />} />
          <Route path="/centerManagers" element={<CenterManagers />} />
        </Routes>
      </BrowserRouter>
      
    </div>
  )
}

export default App
