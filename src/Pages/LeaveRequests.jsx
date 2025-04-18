import React, { useEffect, useState } from "react";
import { collection, getDocs, updateDoc, doc, addDoc } from "firebase/firestore";
import { db } from "../firebase/Config";
import "../styles/LeaveRequests.css";
import { useTranslation } from "react-i18next";

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

  const { t } = useTranslation();

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
      <h2>{t("leaveRequestsTitle")}</h2>

      <form className="leave-form" onSubmit={handleSubmit}>
        <input name="firstName" type="text" placeholder={t("firstName")} value={formData.firstName} onChange={handleChange} required />
        <input name="lastName" type="text" placeholder={t("lastName")} value={formData.lastName} onChange={handleChange} required />
        <select name="leaveType" value={formData.leaveType} onChange={handleChange} required>
          <option value="">{t("selectLeaveType")}</option>
          <option value="Vuosiloma">{t("annualLeave")}</option>
          <option value="Sairasloma">{t("sickLeave")}</option>
          <option value="Opintovapaa">{t("studyLeave")}</option>
        </select>
        <input name="startDate" type="date" value={formData.startDate} onChange={handleChange} required />
        <input name="endDate" type="date" value={formData.endDate} onChange={handleChange} required />
        <textarea name="comment" placeholder={t("comment")} value={formData.comment} onChange={handleChange}></textarea>
        <button type="submit">{t("sendRequest")}</button>
      </form>

      <div className="request-list">
        <h3>{t("receivedRequests")}</h3>
        {requests.filter(req => req.status === "käsittelemättä").length === 0 ? (
          <p>{t("noPendingRequests")}</p>
        ) : (
          requests
            .filter(req => req.status === "käsittelemättä")
            .map((req) => (
              <div key={req.id} className="request-item">
                <p>
                  <strong>{req.firstName} {req.lastName}</strong> {t("requestsLeave")} <strong>{req.startDate} – {req.endDate}</strong> ({req.leaveType})
                </p>
                <p>{t("status")}: <strong>{req.status}</strong></p>
                <button onClick={() => updateRequestStatus(req.id, "hyväksytty")}>{t("approve")}</button>
                <button onClick={() => updateRequestStatus(req.id, "hylätty")}>{t("reject")}</button>
              </div>
            ))
        )}
      </div>
    </div>
  );
};

export default LeaveRequestPage;
