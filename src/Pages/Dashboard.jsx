import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase/Config";
import "./Dashboard.css";

const Dashboard = () => {
  const navigate = useNavigate();
  const [employees, setEmployees] = useState([]);

  useEffect(() => {
    const fetchEmployees = async () => {
      const querySnapshot = await getDocs(collection(db, "Employee"));
      const employeeList = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setEmployees(employeeList);
    };

    fetchEmployees();
  }, []);

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
          {employees.map((emp) => (
            <tr key={emp.id}>
              <td>{emp.firstName} {emp.lastName}</td>
              <td>{emp.department}</td>
              <td>{emp.salary} €</td>
              <td><button className="edit-button">Edit</button></td>
              <td><button className="delete-button">Delete</button></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Dashboard;
