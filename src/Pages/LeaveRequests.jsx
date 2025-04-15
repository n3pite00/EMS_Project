import React, { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase/Config";
import "../styles/LeaveRequests.css";

const LeaveRequestPage = () => {
  const [requests, setRequests] = useState([]);

  useEffect(() => {
    const fetchRequests = async () => {
      const snapshot = await getDocs(collection(db, "LeaveRequests"));
      const list = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setRequests(list);
    };

    fetchRequests();
  }, []);

  return (
    <div className="leave-request-container">
      <h2>Lomapyyntöjen hallinta</h2>
      {requests.length === 0 ? (
        <p>Ei lomapyyntöjä löytynyt.</p>
      ) : (
        <table className="leave-request-table">
          <thead>
            <tr>
              <th>Työntekijä</th>
              <th>Alkupäivä</th>
              <th>Loppupäivä</th>
              <th>Loman tyyppi</th>
              <th>Tila</th>
              <th>Syy</th>
            </tr>
          </thead>
          <tbody>
            {requests.map(req => (
              <tr key={req.id}>
                <td>{req.employeeName}</td>
                <td>{req.startDate}</td>
                <td>{req.endDate}</td>
                <td>{req.leaveType}</td>
                <td>{req.status}</td>
                <td>{req.reason}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default LeaveRequestPage;
