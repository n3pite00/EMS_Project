import React, { useState, useEffect } from 'react';
import FullCalendar from '@fullcalendar/react';
import { doc, deleteDoc, query, collection, onSnapshot } from "firebase/firestore";
import { db, SHIFTS_REF, auth } from '../firebase/Config';
import timeGridPlugin from '@fullcalendar/timegrid';
import dayGridPlugin from '@fullcalendar/daygrid';
import { useNavigate } from "react-router-dom";
import "../styles/Calendar.css";
import fiLocale from '@fullcalendar/core/locales/fi';
import enLocale from '@fullcalendar/core/locales/en-gb';
import { useTranslation } from "react-i18next";
import useUserRole from '../components/useUserRole';

export function CalendarApp() {
  const navigate = useNavigate();
  const [events, setEvents] = useState([]);
  const { t, i18n } = useTranslation();
  const userRole = useUserRole();

  const handleAddShift = () => {
    navigate('/AddShift');
  };

  const localeMap = {
    fi: fiLocale,
    en: enLocale
  };

  useEffect(() => {
    const user = auth.currentUser;
    if (!user) return;

    const ShiftCollection = query(collection(db, SHIFTS_REF));

    const getEventsList = onSnapshot(ShiftCollection, querySnapshot => {
      const userEmail = user.email;

      const ShiftList = querySnapshot.docs
        .map(doc => {
          const data = doc.data();
          if (data.assignedTo === userEmail || data.assignedTo === "all") {
            return {
              id: doc.id,
              title: t(data.title),
              start: data.start?.toDate(),
              end: data.end?.toDate(),
            };
          }
          return null;
        })
        .filter(event => event !== null && event.start && event.end);

      setEvents(ShiftList);
    }, err => {
      console.error("Error fetching events:", err);
      alert(t("Virhe tapahtumien latauksessa"));
    });

    return () => getEventsList();
  }, [t]);

  const handleEventClick = async(clickInfo) => {
    const confirmation = window.confirm(t("Haluatko varmasti poistaa tämän tapahtuman?"))

    if (confirmation) {
      try {
        await deleteDoc(doc(db, SHIFTS_REF, clickInfo.event.id))
        alert(t("Tapahtuma poistettu."))
      } catch (err) {
        alert(t("Tapahtuman poistossa tapahtui virhe."))
      }
    }
  }


  return (
    <div className="CalendarView">
      <h1>{t("Työajankirjaus")}</h1>
      {userRole !== 'guest' && (
        <button onClick={handleAddShift}>{t("Lisää tapahtuma")}</button>
      )}

      <FullCalendar
        plugins={[dayGridPlugin, timeGridPlugin]}
        headerToolbar={{
          left: 'prev,next today',
          center: 'title',
          right: 'timeGridWeek,timeGridDay'
        }}
        initialView='timeGridWeek'
        weekends={true}
        events={events}
        eventContent={renderEventContent}
        firstDay={1}
        contentHeight="50vh"
        windowResize={true}
        scrollTime="07:00:00"
        eventTimeFormat={{
          hour: '2-digit', minute: '2-digit'
        }}
        locale={localeMap[i18n.language]} 
        eventClick={handleEventClick}
      />
      <p>Tämä projekti käyttää <a href="https://fullcalendar.io/">FullCalendar</a> kirjastoa <a href="https://fullcalendar.io/license">MIT Lisenssin</a> mukaan.</p>
    </div>
  );
}

function renderEventContent(eventInfo) {
  return (
    <>
      <b>{eventInfo.timeText}</b>
      <p>{eventInfo.event.title}</p>
    </>
  );
}

export default CalendarApp;