import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const AddEmployee = () => {
  const navigate = useNavigate();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [department, setDepartment] = useState("");
  const [salary, setSalary] = useState("");
  const [image, setImage] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log({ firstName, lastName, department, salary, image });
    navigate("/dashboard"); 
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
        />
        <input
          type="text"
          placeholder="Last name"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
        />
        <select value={department} onChange={(e) => setDepartment(e.target.value)}>
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
