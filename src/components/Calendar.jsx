import React, { useState, useEffect } from 'react'
import FullCalendar from '@fullcalendar/react'
import { query, collection, onSnapshot } from "firebase/firestore";
import { db, SHIFTS_REF, auth } from '../firebase/Config';
import timeGridPlugin from '@fullcalendar/timegrid'
import dayGridPlugin from '@fullcalendar/daygrid'
import { useNavigate } from "react-router-dom"
import "../styles/Calendar.css"
import { useTranslation } from "react-i18next";

export function CalendarApp() {
  const navigate = useNavigate()
  const [events, setEvents] = useState([])
  const { t } = useTranslation();

  const handleAddShift = () => {
    navigate('/AddShift')
  }

  useEffect(() => {
    const user = auth.currentUser
    if (!user) return

   
    const ShiftCollection = query(collection(db, SHIFTS_REF));

    const getEventsList = onSnapshot(ShiftCollection, querySnapshot => {
      const userEmail = user.email;

      const ShiftList = querySnapshot.docs
        .map(doc => {
          const data = doc.data();
          if (data.assignedTo === userEmail) {
            return {
              id: doc.id,
              title: data.title,
              start: data.start.toDate(),
              end: data.end.toDate(),
            }
          }
          return null;
        })
        .filter(event => event !== null);

      setEvents(ShiftList);
    }, err => {
      console.error("Error fetching events:", err);
      alert(t("Virhe tapahtumien latauksessa"));
    });

    return () => getEventsList();
  }, []);
    
  return (
    <div className="CalendarView">
        <h1>{t("Työajankirjaus")}</h1>
        <button onClick={handleAddShift}>{t("Lisää tapahtuma")}</button>
        
        <FullCalendar
            plugins={[dayGridPlugin, timeGridPlugin]}
            headerToolbar={{
                left: 'prev,next today',
                center: 'title',
                right: 'dayGridMonth,timeGridWeek,timeGridDay'
              }}

            initialView='dayGridWeek'
            weekends={true}
            events={events}
            eventContent={renderEventContent}
            firstDay={1} 
            contentHeight="50vh"
            windowResize={true}
            eventTimeFormat={{
                hour: '2-digit', minute: '2-digit'
            }}
        />
    </div>
  )
}

function renderEventContent(eventInfo) {
  return (
    <>
      <b>{eventInfo.timeText}</b>
      <i>{eventInfo.event.title}</i>
    </>
  )
}

export default CalendarApp
