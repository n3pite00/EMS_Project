import { useState, useEffect } from "react"
import { db } from "./firebase/Config"
import { getDocs, collection } from 'firebase/firestore'

function App() {
  const [EmployeeList, setEmployeeList] = useState([]);

  const EmployeeCollection = collection(db, "Employee");

  useEffect(() => {
    const getEmployeeList = async () => {
      try {
        const querySnapshot = await getDocs(EmployeeCollection);
        const employees = querySnapshot.docs.map(doc => doc.data());
        setEmployeeList(employees);
      } catch (err) {
        console.error("Error fetching employee data: ", err);
      }
    };

    getEmployeeList();
  }, []);

  return (
    <>
       <div>
      <h1>Employee List</h1>
      <ul>
        {EmployeeList.map((employee, index) => (
          <li key={index}>{employee.name}</li> // assuming "name" is a field in the Employee document
        ))}
      </ul>
    </div>
    </>
  )
}

export default App
