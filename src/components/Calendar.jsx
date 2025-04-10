import FullCalendar from '@fullcalendar/react'
import timeGridPlugin from '@fullcalendar/timegrid'
import dayGridPlugin from '@fullcalendar/daygrid'
import "../styles/Calendar.css"

const events = [
  { title: 'Meeting', start: '2025-04-10T08:30:00', end: '2025-04-10T10:00:00' }
]

export function CalendarApp() {
  return (
    <div className="CalendarView">
        <h1>Työajankirjaus</h1>
        <button>Lisää tapahtuma</button>
        
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