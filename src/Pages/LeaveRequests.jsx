import React, { useEffect, useState } from "react";
import { collection, getDocs, updateDoc, doc, addDoc } from "firebase/firestore";
import { db } from "../firebase/Config";
import "../styles/LeaveRequests.css";

const LeaveRequestPage = () => {
  const [requests, setRequests] = useState([]);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    leaveType: "",
    startDate: "",
    endDate: "",
    comment: "",
  });

  useEffect(() => {
    const fetchRequests = async () => {
      const snapshot = await getDocs(collection(db, "LeaveRequests"));
      const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setRequests(data);
    };

    fetchRequests();
  }, []);

  const updateRequestStatus = async (id, newStatus) => {
    const ref = doc(db, "LeaveRequests", id);
    await updateDoc(ref, { status: newStatus });

    setRequests(prev =>
      prev.map(req => (req.id === id ? { ...req, status: newStatus } : req))
    );
  };

  const handleChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await addDoc(collection(db, "LeaveRequests"), {
      ...formData,
      status: "käsittelemättä",
    });

    setFormData({
      firstName: "",
      lastName: "",
      leaveType: "",
      startDate: "",
      endDate: "",
      comment: "",
    });

    const snapshot = await getDocs(collection(db, "LeaveRequests"));
    const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    setRequests(data);
  };

  return (
    <div className="leave-request-container">
      <h2>Lomapyyntöjen hallinta</h2>

      <form className="leave-form" onSubmit={handleSubmit}>
        <input name="firstName" type="text" placeholder="Etunimi" value={formData.firstName} onChange={handleChange} required />
        <input name="lastName" type="text" placeholder="Sukunimi" value={formData.lastName} onChange={handleChange} required />
        <select name="leaveType" value={formData.leaveType} onChange={handleChange} required>
          <option value="">Valitse loman tyyppi</option>
          <option value="Vuosiloma">Vuosiloma</option>
          <option value="Sairasloma">Sairasloma</option>
          <option value="Opintovapaa">Opintovapaa</option>
        </select>
        <input name="startDate" type="date" value={formData.startDate} onChange={handleChange} required />
        <input name="endDate" type="date" value={formData.endDate} onChange={handleChange} required />
        <textarea name="comment" placeholder="Kommentti" value={formData.comment} onChange={handleChange}></textarea>
        <button type="submit">Lähetä pyyntö</button>
      </form>

      <div className="request-list">
        <h3>Vastaanotetut pyynnöt</h3>
        {requests.filter(req => req.status === "käsittelemättä").length === 0 ? (
          <p>Ei käsittelemättömiä lomapyyntöjä.</p>
        ) : (
          requests
            .filter(req => req.status === "käsittelemättä")
            .map((req) => (
              <div key={req.id} className="request-item">
                <p><strong>{req.firstName} {req.lastName}</strong> pyytää lomaa ajalle <strong>{req.startDate} – {req.endDate}</strong> ({req.leaveType})</p>
                <p>Status: <strong>{req.status}</strong></p>
                <button onClick={() => updateRequestStatus(req.id, "hyväksytty")}>Hyväksy</button>
                <button onClick={() => updateRequestStatus(req.id, "hylätty")}>Hylkää</button>
              </div>
            ))
        )}
      </div>
    </div>
  );
};

export default LeaveRequestPage;
