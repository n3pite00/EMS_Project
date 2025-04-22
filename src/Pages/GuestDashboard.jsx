import React, { useState, useEffect } from "react";
import { db, auth } from "../firebase/Config";
import {
  collection,
  getDocs,
  addDoc,
  query,
  where,
  orderBy,
} from "firebase/firestore";
import { signOut } from "firebase/auth";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import "../styles/GuestDashboard.css";

const GuestDashboard = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [shifts, setShifts] = useState([]);
  const [leaveReason, setLeaveReason] = useState("");
  const [loading, setLoading] = useState(false);
  const [userEmail, setUserEmail] = useState("");

  useEffect(() => {
    const fetchShifts = async () => {
      try {
        const user = auth.currentUser;
        if (!user) return;

        setUserEmail(user.email);

        const q = query(
          collection(db, "Shifts"),
          where("email", "==", user.email),
          orderBy("date", "desc")
        );
        const querySnapshot = await getDocs(q);
        const shiftList = querySnapshot.docs.map((doc) => doc.data());
        setShifts(shiftList);
      } catch (err) {
        console.error("Error fetching shifts:", err);
      }
    };

    fetchShifts();
  }, []);

  const handleLeaveRequest = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const user = auth.currentUser;
      if (!user) return;

      await addDoc(collection(db, "LeaveRequests"), {
        email: user.email,
        reason: leaveReason,
        createdAt: new Date(),
      });
      setLeaveReason("");
      alert(t("leaveRequestSent"));
    } catch (err) {
      console.error("Error submitting leave request:", err);
      alert(t("leaveRequestError"));
    }
    setLoading(false);
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      localStorage.removeItem("userRole");
      navigate("/");
    } catch (err) {
      console.error("Error during logout:", err);
    }
  };

  return (
    <div className="guest-dashboard">
      <header>
        <h2>{t("dashboardTitle")}</h2>
        <button onClick={handleLogout}>{t("logout")}</button>
      </header>

      <section>
        <h3>{t("yourShifts")}</h3>
        {shifts.length === 0 ? (
          <p>{t("noShifts")}</p>
        ) : (
          <ul>
            {shifts.map((shift, idx) => (
              <li key={idx}>
                {shift.date} – {shift.startTime}–{shift.endTime}
              </li>
            ))}
          </ul>
        )}
      </section>

      <section>
        <h3>{t("submitLeaveRequest")}</h3>
        <form onSubmit={handleLeaveRequest}>
          <textarea
            value={leaveReason}
            onChange={(e) => setLeaveReason(e.target.value)}
            placeholder={t("leaveReason")}
            required
          />
          <button type="submit" disabled={loading}>
            {t("sendRequest")}
          </button>
        </form>
      </section>

      <section>
        <h3>{t("userInfo")}</h3>
        <p>{t("email")}: {userEmail}</p>
        <p>{t("role")}: Guest</p>
      </section>
    </div>
  );
};

export default GuestDashboard;
