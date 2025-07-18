import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./pages/auth/Login";
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
import FinancialStatistics from "./pages/Statistics/FinancialStatistics";
import NotificationsPage from "./pages/Notifications/NotificationsPage";
import DashboardPage from "./pages/Dashboard/DashboardPage";
import PrivateRoute from "./Components/PrivateRoute";
import MainLayout from "./Components/Layout/MainLayout";
import ExpensePage from "./pages/finance/ExpensePage";
import FinanceCapitalsPage from "./pages/finance/FinanceCapitalsPage";
import LogPage from "./pages/log/LogPage";
import MonitorUserMap from "./pages/Monitor User/MonitorUserMap";
import ProfilePage from "./pages/auth/ProfilePage";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route element={<MainLayout />}>
          <Route path="/selfRegister" element={<SelfRegister />} />
          <Route
            element={
              <PrivateRoute allowedRoles={["system_admin", "voter", "owner"]} />
            }
          >
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
            <Route
              path="/financial-statistics"
              element={<FinancialStatistics />}
            />
            <Route path="/notifications" element={<NotificationsPage />} />
            <Route path="/dashboard" element={<DashboardPage />} />
            <Route path="/" element={<DashboardPage />} />
            <Route path="/expense" element={<ExpensePage />} />
            <Route path="/financeCapitals" element={<FinanceCapitalsPage />} />
            <Route path="/log" element={<LogPage />} />
            <Route path="/usersMap" element={<MonitorUserMap />} />
            <Route path="/profile" element={<ProfilePage />} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
