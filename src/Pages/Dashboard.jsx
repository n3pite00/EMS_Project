import React, { useEffect, useState } from "react";
import Header from "../components/header";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../firebase/Config";
import "../styles/Dashboard.css";

const Dashboard = () => {
  const [employeeCount, setEmployeeCount] = useState(0);
  const [averageSalary, setAverageSalary] = useState(0);
  const [todayHours, setTodayHours] = useState(0);
  const [lastAddedEmployee, setLastAddedEmployee] = useState(null);
  const [mostPopularDepartment, setMostPopularDepartment] = useState("");
  const [departmentCount, setDepartmentCount] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      const employeeSnapshot = await getDocs(collection(db, "Employee"));
      const employees = employeeSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setEmployeeCount(employees.length);

      const totalSalary = employees.reduce((sum, emp) => sum + Number(emp.salary || 0), 0);
      const avg = employees.length ? totalSalary / employees.length : 0;
      setAverageSalary(avg.toFixed(2));

      if (employees.length > 0) {
        const last = employees[employees.length - 1];
        setLastAddedEmployee(`${last.firstName} ${last.lastName}`);
      }

      const deptCount = {};
      employees.forEach(emp => {
        const dept = emp.department || "Tuntematon";
        deptCount[dept] = (deptCount[dept] || 0) + 1;
      });
      const mostPopular = Object.entries(deptCount).sort((a, b) => b[1] - a[1])[0];
      setMostPopularDepartment(mostPopular?.[0] || "Ei dataa");

      const departments = new Set(employees.map(emp => emp.department));
      setDepartmentCount(departments.size);
    };

    const fetchHours = async () => {
      const today = new Date();
      const todayStr = today.toISOString().slice(0, 10);

      const qToday = query(collection(db, "WorkHours"), where("date", "==", todayStr));
      const snapshotToday = await getDocs(qToday);
      const totalToday = snapshotToday.docs.reduce((sum, doc) => sum + Number(doc.data().hours || 0), 0);
      setTodayHours(totalToday);
    };

    fetchData();
    fetchHours();
  }, []);

  return (
    <div className="dashboard-container">
      <Header />
      <div className="dashboard-cards">
        <div className="card">
          <h3>Työntekijöitä</h3>
          <p>{employeeCount}</p>
        </div>
        <div className="card">
          <h3>Tänään raportoidut työtunnit</h3>
          <p>{todayHours} h</p>
        </div>
        <div className="card">
          <h3>Keskimääräinen palkka</h3>
          <p>{averageSalary} €</p>
        </div>
        <div className="card">
          <h3>Osastoja yhteensä</h3>
          <p>{departmentCount}</p>
        </div>
        <div className="card">
          <h3>Viimeisin työntekijä</h3>
          <p>{lastAddedEmployee || "Ei tietoa"}</p>
        </div>
        <div className="card">
          <h3>Suosituin osasto</h3>
          <p>{mostPopularDepartment}</p>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
