import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import UserTablePage from "./pages/auth/UserTablePage";
import CoordinatorTablePage from "./pages/auth/CoordinatorTablePage";
import MonitorsTablePage from "./pages/auth/MonitorsTablePage";
import ElectedTablePage from "./pages/auth/ElectedTablePage";
import GovernoratePage from "./pages/Places/GovernoratePage";
import DistrictsPage from "./pages/Places/DistrictsPage";
import SubdistrictPage from "./pages/Places/SubdistrictPage";
import CenterManagers from "./pages/auth/CenterManagers";
import DistrictsManagers from "./pages/auth/DistrictsManagers";
import ElectoralStrips from "./pages/Electoral Strips/ElectoralStrips";
import UserDetailsPage from "./pages/auth/UserDetailsPage";
import SelfRegister from "./pages/auth/SelfRegister";
import CenterPage from "./pages/Places/CenterPage";
import StationPage from "./pages/Places/StationPage";
import ElectoralStripsDetails from "./pages/Electoral Strips/ElectoralStripsDetails";
import CoordinatorRegister from "./pages/auth/CoordinatorRegisterPage";
import DistrictManagerRegister from "./pages/DistrictManagerRegisterPage";

const App = () => {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/selfRegister" element={<SelfRegister />} />
          <Route
            path="/coordinatorRegister"
            element={<CoordinatorRegister />}
          />
          <Route
            path="/districtManagerRegister"
            element={<DistrictManagerRegister />}
          />
          <Route path="/elected" element={<ElectedTablePage />} />
          <Route path="/monitors" element={<MonitorsTablePage />} />
          <Route path="/coordinators" element={<CoordinatorTablePage />} />
          <Route path="/users" element={<UserTablePage />} />
          <Route path="/governorate" element={<GovernoratePage />} />
          <Route path="/districts" element={<DistrictsPage />} />
          <Route path="/subdistricts" element={<SubdistrictPage />} />
          <Route path="/centerManagers" element={<CenterManagers />} />
          <Route path="/districtsManagers" element={<DistrictsManagers />} />
          <Route path="/electoralStrips" element={<ElectoralStrips />} />
          <Route
            path="/electoralStrips/:id"
            element={<ElectoralStripsDetails />}
          />
          <Route path="/userDetails/:id" element={<UserDetailsPage />} />
          <Route path="/centers/" element={<CenterPage />} />
          <Route path="/stations/:id/" element={<StationPage />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
