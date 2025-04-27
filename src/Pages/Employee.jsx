import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { collection, getDocs, doc, deleteDoc, getDoc } from "firebase/firestore";
import { db } from "../firebase/Config";
import "../styles/Employee.css";
import Header from "../components/header";
import DeleteEmployee from "../components/DeleteEmployee";
import { useTranslation } from 'react-i18next';

const Employee = () => {
  const navigate = useNavigate();
  const [employees, setEmployees] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedEmployeeId, setSelectedEmployeeId] = useState(null);
  const { t } = useTranslation();

  const fetchEmployees = async () => {
    const querySnapshot = await getDocs(collection(db, "Employee"));
    const employeeList = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    setEmployees(employeeList);
  };

  useEffect(() => {
    fetchEmployees();
  }, []);

  const handleDeleteClick = (id) => {
    setSelectedEmployeeId(id);
    setShowModal(true);
  };

  const handleDeleteConfirm = async () => {
    if (selectedEmployeeId) {
      try {
        const empRef = doc(db, "Employee", selectedEmployeeId);
        const empSnap = await getDoc(empRef);

        if (empSnap.exists()) {
          const data = empSnap.data();
          const email = data.email || "ei määritelty";
          const uid = data.uid || "ei määritelty";

          await deleteDoc(empRef);
        }

        setShowModal(false);
        setSelectedEmployeeId(null);
        fetchEmployees();
      } catch (error) {
        console.error("Poistaminen epäonnistui:", error);
      }
    }
  };

  const translateDepartment = (department) => {
    switch (department) {
      case "Human Resource":
        return t("humanResource");
      case "Operations management":
        return t("operationsManagement");
      case "Marketing":
        return t("marketing");
      case "IT department":
        return t("itDepartment");
      default:
        return department; 
    }
  };

  return (
    <div className="employee-container">
      <Header />
      <header className="header">
        <h1>{t("employeeManagement")}</h1>
        <button className="add-button" onClick={() => navigate("/add-employee")}>
          + {t("addNew")}
        </button>
      </header>
      <table className="employee-table">
        <thead>
          <tr>
            <th>{t("employee")}</th>
            <th>{t("department")}</th>
            <th>{t("salary")}</th>
            <th>{t("email")}</th>
            <th>{t("edit")}</th>
            <th>{t("delete")}</th>
          </tr>
        </thead>
        <tbody>
          {employees.map((emp) => (
            <tr key={emp.id}>
              <td>{emp.firstName} {emp.lastName}</td>
              <td>{translateDepartment(emp.department)}</td> 
              <td>{emp.salary} €</td>
              <td>{emp.email}</td>
              <td>
                <button
                  className="edit-button"
                  onClick={() => navigate(`/add-employee/${emp.id}`)}
                >
                  {t("edit")}
                </button>
              </td>
              <td>
                <button
                  className="delete-button"
                  onClick={() => handleDeleteClick(emp.id)}
                >
                  {t("delete")}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {showModal && (
        <DeleteEmployee
          onClose={() => setShowModal(false)}
          onConfirm={handleDeleteConfirm}
        />
      )}
    </div>
  );
};

export default Employee;