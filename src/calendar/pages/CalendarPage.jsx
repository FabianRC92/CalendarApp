import { Calendar } from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";

import { CalendarBox, CalendarModal, FabAddNew, NavBar, FabDelete } from "../";
import { localizer, getMessages } from "../../helpers";
import { useEffect, useState } from "react";
import { useUIStore, useCalendarStore, useAuthStore } from "../../hooks";

export const CalendarPage = () => {
  const { openDateModal } = useUIStore();
  const { user } = useAuthStore();
  const { events, setActiveEvent, startLoadingEvents } = useCalendarStore();

  const [lastView, setLastView] = useState(
    localStorage.getItem("lastView") || "month"
  );

  const [myEvent, setMyEvent] = useState(true);

  const eventStyleGetter = (event, start, end, isSelected) => {
    const isMyEvent =
      user.uid === event.user._id || user.uid === event.user._id;

    // setMyEvent(isMyEvent)
    const style = {
      backgroundColor: isMyEvent ? "#347cf7" : "#465660",
      opacity: 0.8,
      color: "white",
      borderRadius: "0px",
    };
    return { style };
  };

  const onDoubleClick = () => {
    if (myEvent) openDateModal();
  };

  const onSelect = (event) => {
    setActiveEvent(event);
  };

  const onViewChange = (event) => {
    localStorage.setItem("lastView", event);
    setLastView(event);
  };

  useEffect(() => {
    startLoadingEvents();
  }, []);

  return (
    <>
      <NavBar />

      <Calendar
        localizer={localizer}
        events={events}
        defaultView={lastView}
        startAccessor="start"
        endAccessor="end"
        style={{ height: "calc( 100vh - 80px )" }}
        culture="es"
        messages={getMessages()}
        eventPropGetter={eventStyleGetter}
        components={{
          event: CalendarBox,
        }}
        onDoubleClickEvent={onDoubleClick}
        onSelectEvent={onSelect}
        onView={onViewChange}
      />

      <CalendarModal />

      <FabAddNew />
      <FabDelete />
    </>
  );
};
