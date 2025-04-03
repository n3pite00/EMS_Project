import React from "react";
import { useNavigate } from "react-router-dom"; 
import "./Dashboard.css"; 

const Dashboard = () => {
  const navigate = useNavigate(); 

  return (
    <div className="dashboard-container">
      <header className="header">
        <h1>Employee Management System</h1>
        <button 
          className="add-button" 
          onClick={() => navigate("/add-employee")} 
        >
          + Add new
        </button>
      </header>
      <table className="employee-table">
        <thead>
          <tr>
            <th>Employee</th>
            <th>Department</th>
            <th>Salary</th>
            <th>Edit</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Employee 1</td>
            <td>IT department</td>
            <td>1500 €</td>
            <td><button className="edit-button">Edit</button></td>
            <td><button className="delete-button">Delete</button></td>
          </tr>
          <tr>
            <td>Employee 2</td>
            <td>Marketing</td>
            <td>1750 €</td>
            <td><button className="edit-button">Edit</button></td>
            <td><button className="delete-button">Delete</button></td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default Dashboard;
