import React, { useState } from "react";
import { addDoc, collection } from "firebase/firestore";
import { db, SHIFTS_REF } from '../firebase/Config';
import { useNavigate } from "react-router-dom"
import "../styles/Login.css"

export function AddNewShift() {
  const [title, setTitle] = useState('')
  const [assignedTo, setAssignedTo] = useState('')
  const [start, setStart] = useState('')
  const [end, setEnd] = useState('')
  const navigate = useNavigate()

  const ShiftCollection = collection(db, SHIFTS_REF)

  const save = async () => {
    try {
      await addDoc(ShiftCollection, {
        title: title,
        assignedTo: assignedTo,
        start: new Date(start),
        end: new Date(end)
      })

      alert("Vuoro tallennettu")
      navigate("/WorkCalendar")
    } catch (err) {
      alert("Virhe vuoron tallennuksessa.")
    }
  }

  return (
    <div className="Login-page">
      <div className="Login-form">
        <h1>Lisää uusi vuoro</h1>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Vuoron nimi"
        />
        <input
          type="text"
          value={assignedTo}
          onChange={(e) => setAssignedTo(e.target.value)}
          placeholder="Vuoro osoitettu"
        />
        <input
          type="datetime-local"
          value={start}
          onChange={(e) => setStart(e.target.value)}
          placeholder="Alkamisaika"
        />
        <input
          type="datetime-local"
          value={end}
          onChange={(e) => setEnd(e.target.value)}
          placeholder="Päättymisaika"
        />
        <button onClick={save}>Tallenna vuoro</button>
      </div>
    </div>
  );
}

export default AddNewShift;
