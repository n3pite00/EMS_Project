import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./Pages/Login";
import Employee from "./Pages/Employee";
import AddEmployee from "./Pages/AddEmployee"; 
import UpdatePassword from "./Pages/UpdatePassword";
import TimeTracker from "./Pages/WorkCalendar";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/UpdatePassword" element={<UpdatePassword />} />
        <Route path="/dashboard" element={<Employee />} />
        <Route path="/add-employee" element={<AddEmployee />} /> 
        <Route path="/WorkCalendar" element={<TimeTracker />} /> 
      </Routes>
    </BrowserRouter>
  );
}

export default App;
