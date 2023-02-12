import {
  calendarSlice,
  onAddNewEvent,
  onDeleteEvent,
  onEditEvent,
  onLogoutCalendar,
  onSetActiveEvent,
  onStartLoadingEvent,
} from "../../../src/store/calendar/calendarSlice";
import {
  calendarWithActiveEventState,
  calendarWithEventState,
  events,
  initalState,
} from "../../fixtures/calendar-state";

describe("Prueba calendarSlice", () => {
  test("should regresar el estado por defecto", () => {
    expect(calendarSlice.getInitialState()).toEqual(initalState);
  });

  test("should onSetActiveEvent", () => {
    const state = calendarSlice.reducer(
      calendarWithEventState,
      onSetActiveEvent(events[0])
    );

    expect(state.activeEvent).toEqual(events[0]);
  });

  test("should onAddNewEvent", () => {
    const newEvent = {
      _id: "3",
      title: "Nota jeje2",
      start: new Date("2023-03-10 13:00:00"),
      end: new Date("2023-03-10 15:00:00"),
      notes: "jeje",
    };

    const state = calendarSlice.reducer(
      calendarWithEventState,
      onAddNewEvent(newEvent)
    );

    expect(state.events).toEqual([...events, newEvent]);
  });

  test("should onEditEvent", () => {
    const editEvent = {
      _id: "2",
      title: "Nota jeje2",
      start: new Date("2023-03-10 13:00:00"),
      end: new Date("2023-03-10 15:00:00"),
      notes: "jeje",
    };

    const state = calendarSlice.reducer(
      calendarWithEventState,
      onEditEvent(editEvent)
    );

    expect(state.events).toContain(editEvent);
  });

  test("should onDeleteEvent", () => {
    const state = calendarSlice.reducer(
      calendarWithActiveEventState,
      onDeleteEvent()
    );

    expect(state.activeEvent).toBeNull();
    expect(state.events).not.toContain(events[0]);
  });

  test("should onStartLoadingEvent", () => {
    const state = calendarSlice.reducer(
      calendarWithActiveEventState,
      onStartLoadingEvent(events)
    );
    expect(state.isLoading).toBeFalsy();
    expect(state.events).toEqual(events);
  });

  test("should onLogoutCalendar", () => {
    const state = calendarSlice.reducer(
      calendarWithActiveEventState,
      onLogoutCalendar()
    );

    expect(state).toEqual({ ...initalState, isLoading: false });
  });
});
