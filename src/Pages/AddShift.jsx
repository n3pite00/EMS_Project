import React, { useState } from "react";
import { addDoc, collection } from "firebase/firestore";
import { db, SHIFTS_REF } from '../firebase/Config';
import { useNavigate } from "react-router-dom";
import "../styles/Login.css";
import { useTranslation } from "react-i18next";

export function AddNewShift() {
  const [title, setTitle] = useState('');
  const [assignedTo, setAssignedTo] = useState('');
  const [start, setStart] = useState('');
  const [end, setEnd] = useState('');
  const navigate = useNavigate();
  const { t } = useTranslation();

  const ShiftCollection = collection(db, SHIFTS_REF);

  const save = async () => {
    try {
      await addDoc(ShiftCollection, {
        title: title,
        assignedTo: assignedTo,
        start: new Date(start),
        end: new Date(end)
      });

      alert(t("shiftSaved"));
      navigate("/WorkCalendar");
    } catch (err) {
      alert(t("shiftSaveError"));
    }
  };

  return (
    <div className="Login-page">
      <div className="Login-form">
        <h1>{t("addNewShift")}</h1>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder={t("shiftName")}
        />
        <input
          type="text"
          value={assignedTo}
          onChange={(e) => setAssignedTo(e.target.value)}
          placeholder={t("assignedTo")}
        />
        <input
          type="datetime-local"
          value={start}
          onChange={(e) => setStart(e.target.value)}
          placeholder={t("startTime")}
        />
        <input
          type="datetime-local"
          value={end}
          onChange={(e) => setEnd(e.target.value)}
          placeholder={t("endTime")}
        />
        <button onClick={save}>{t("saveShift")}</button>
      </div>
    </div>
  );
}

export default AddNewShift;
