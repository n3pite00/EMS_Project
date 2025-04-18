import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { db } from "../firebase/Config";
import { collection, addDoc, doc, getDoc, updateDoc } from "firebase/firestore";
import "../styles/AddEmployee.css";
import { useTranslation } from "react-i18next";

const AddEmployee = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { t } = useTranslation();

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [department, setDepartment] = useState("");
  const [salary, setSalary] = useState("");

  useEffect(() => {
    const fetchEmployee = async () => {
      if (id) {
        const docRef = doc(db, "Employee", id);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          const data = docSnap.data();
          setFirstName(data.firstName);
          setLastName(data.lastName);
          setDepartment(data.department);
          setSalary(data.salary);
        }
      }
    };

    fetchEmployee();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (id) {
        const docRef = doc(db, "Employee", id);
        await updateDoc(docRef, {
          firstName,
          lastName,
          department,
          salary,
        });
      } else {
        await addDoc(collection(db, "Employee"), {
          firstName,
          lastName,
          department,
          salary,
        });
      }

      navigate("/employees");
    } catch (error) {
      console.error(t("saveEmployeeError"), error);
    }
  };

  return (
    <div className="add-employee-container">
      <h2>{id ? t("editEmployeeTitle") : t("addEmployeeTitle")}</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder={t("firstName")}
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder={t("lastName")}
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
          required
        />
        <select value={department} onChange={(e) => setDepartment(e.target.value)} required>
          <option value="">{t("selectDepartment")}</option>
          <option value="Human Resource">{t("humanResource")}</option>
          <option value="Operations management">{t("operationsManagement")}</option>
          <option value="Marketing">{t("marketing")}</option>
          <option value="IT department">{t("itDepartment")}</option>
        </select>
        <input
          type="number"
          placeholder={t("salary")}
          value={salary}
          onChange={(e) => setSalary(e.target.value)}
          required
        />
        <button type="submit" className="finish-button">
          {id ? t("saveChanges") : t("finish")}
        </button>
      </form>
    </div>
  );
};

export default AddEmployee;
