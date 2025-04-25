import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { db, auth } from "../firebase/Config";
import {
  collection,
  addDoc,
  doc,
  getDoc,
  updateDoc,
} from "firebase/firestore";
import {
  createUserWithEmailAndPassword,
} from "firebase/auth";
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
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("guest");

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
          setEmail(data.email || "");
          setRole(data.role || "guest");
        }
      }
    };

    fetchEmployee();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (!id) {
        if (email && password) {
          await createUserWithEmailAndPassword(auth, email, password);
        }

        await addDoc(collection(db, "Employee"), {
          firstName,
          lastName,
          department,
          salary,
          email,
          role,
        });
      } else {
        const docRef = doc(db, "Employee", id);
        await updateDoc(docRef, {
          firstName,
          lastName,
          department,
          salary,
          email,
          role,
        });
      }

      alert(t("employeeSaved") || "Työntekijä tallennettu.");
      navigate("/employees");
    } catch (error) {
      console.error(t("saveEmployeeError"), error);
      alert(t("saveEmployeeError"));
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

        <input
          type="email"
          placeholder={t("email")}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        {!id && (
          <input
            type="password"
            placeholder={t("password")}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        )}
        <select value={role} onChange={(e) => setRole(e.target.value)}>
          <option value="guest">Guest</option>
          <option value="admin">Admin</option>
        </select>

        <button type="submit" className="finish-button">
          {id ? t("saveChanges") : t("finish")}
        </button>
      </form>
    </div>
  );
};

export default AddEmployee;