import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "./Pages/Login";
import Employee from "./Pages/Employee";
import AddEmployee from "./Pages/AddEmployee";
import UpdatePassword from "./Pages/UpdatePassword";
import TimeTracker from "./Pages/WorkCalendar";
import Dashboard from "./Pages/Dashboard";
import SiteSettings from "./Pages/Settings";
import AddNewShift from "./Pages/AddShift";
import LeaveRequests from "./Pages/LeaveRequests";
import ServiceTerms from "./Pages/TermsofService"

import "./components/translations/i18n";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/UpdatePassword" element={<UpdatePassword />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/employees" element={<Employee />} />
        <Route path="/add-employee" element={<AddEmployee />} />
        <Route path="/add-employee/:id" element={<AddEmployee />} />
        <Route path="/WorkCalendar" element={<TimeTracker />} />
        <Route path="/Settings" element={<SiteSettings />} />
        <Route path="/AddShift" element={<AddNewShift />} />
        <Route path="/leave-requests" element={<LeaveRequests />} />
        <Route path="/TermsofService" element={<ServiceTerms />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;