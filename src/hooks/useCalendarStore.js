import { useSelector, useDispatch } from "react-redux";

export const useCalendarStore = () => {
  const dispatch = useDispatch();
  const { events, activeEvent, onSetActiveEvent, onAddNewEvent } = useSelector(
    (state) => state.calendar
  );

  const setActiveEvent = (calendarEvent) => {
    dispatch(onSetActiveEvent(calendarEvent));
  };

  const startSaveEvent = async (calendarEvent) => {
    if (!calendarEvent._id) {
      console.log('calendarEvent')
      dispatch(onAddNewEvent({ ...calendarEvent, _id: new Date().getTime() }));
    }
  };

  return {
    events,
    activeEvent,

    setActiveEvent,
    startSaveEvent
  };
};
