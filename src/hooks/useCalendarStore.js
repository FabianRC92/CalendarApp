import { useSelector, useDispatch } from "react-redux";
import Swal from "sweetalert2";
import calendarAPI from "../api/calendarAPI";
import { convertEventToDate } from "../helpers";
import {
  onAddNewEvent,
  onDeleteEvent,
  onEditEvent,
  onSetActiveEvent,
  onStartLoadingEvent,
} from "../store";

export const useCalendarStore = () => {
  const dispatch = useDispatch();
  const { events, activeEvent } = useSelector((state) => state.calendar);
  const { user } = useSelector((state) => state.auth);

  const setActiveEvent = (calendarEvent) => {
    dispatch(onSetActiveEvent(calendarEvent));
  };

  const startSaveEvent = async (calendarEvent) => {
    try {
      if (!calendarEvent.id) {
        const { data } = await calendarAPI.post("/events", calendarEvent);
        dispatch(onAddNewEvent({ ...calendarEvent, id: data.evento.id, user }));
      } else {
        await calendarAPI.put("/events/" + calendarEvent.id, calendarEvent);
        dispatch(onEditEvent({ ...calendarEvent, user }));
      }
    } catch (error) {
      console.log(error);
      Swal.fire("Error al guardar", error.response.data?.msg, "error");
    }
  };

  const deleteEvent = async () => {
    try {
      if (activeEvent) {
        await calendarAPI.delete(`/events/${activeEvent.id}`);

        dispatch(onDeleteEvent());
      }
    } catch (error) {
      console.log(error);
      Swal.fire("Error al eliminar", error.response.data?.msg, "error");
    }
  };

  const startLoadingEvents = async () => {
    try {
      const { data } = await calendarAPI.get("/events");
      const events = convertEventToDate(data.eventos);
      dispatch(onStartLoadingEvent(events));
    } catch (error) {
      console.log(error);
    }
  };

  return {
    events,
    activeEvent,

    setActiveEvent,
    startSaveEvent,
    deleteEvent,
    startLoadingEvents,
  };
};
