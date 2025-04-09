import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { db } from "../firebase/Config"; 
import { collection, addDoc } from "firebase/firestore";

const AddEmployee = () => {
  const navigate = useNavigate();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [department, setDepartment] = useState("");
  const [salary, setSalary] = useState("");
  const [image, setImage] = useState(null); 

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await addDoc(collection(db, "Employee"), {
        firstName,
        lastName,
        department,
        salary,
      });
      navigate("/dashboard");
    } catch (error) {
      console.error("Error adding employee:", error);
    }
  };

  return (
    <div className="add-employee-container">
      <h2>Add new employee</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="First name"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Last name"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
          required
        />
        <select value={department} onChange={(e) => setDepartment(e.target.value)} required>
          <option value="">Select department</option>
          <option value="Human Resource">Human Resource</option>
          <option value="Operations management">Operations management</option>
          <option value="Marketing">Marketing</option>
          <option value="IT department">IT department</option>
        </select>
        <input
          type="number"
          placeholder="Salary (€)"
          value={salary}
          onChange={(e) => setSalary(e.target.value)}
          required
        />
        <input
          type="file"
          onChange={(e) => setImage(e.target.files[0])}
        />
        <button type="submit" className="finish-button">Finish</button>
      </form>
    </div>
  );
};

export default AddEmployee;
