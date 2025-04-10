import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./Pages/Login";
import Dashboard from "./Pages/Dashboard"; 
import Employee from "./Pages/Employee";
import AddEmployee from "./Pages/AddEmployee"; 
import UpdatePassword from "./Pages/UpdatePassword";
import TimeTracker from "./Pages/WorkCalendar";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/employees" element={<Employee />} /> 
        <Route path="/add-employee" element={<AddEmployee />} /> 
        <Route path="/WorkCalendar" element={<TimeTracker />} /> 
        <Route path="/UpdatePassword" element={<UpdatePassword />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
