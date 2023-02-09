import { createSlice } from "@reduxjs/toolkit";

export const calendarSlice = createSlice({
  name: "calendar",
  initialState: {
    isLoading: true,
    events: [],
    activeEvent: null,
  },
  reducers: {
    onSetActiveEvent: (state, { payload }) => {
      state.activeEvent = payload;
    },
    onAddNewEvent: (state, { payload }) => {
      state.events.push(payload);
      state.activeEvent = null;
    },
    onEditEvent: (state, { payload }) => {
      state.events = state.events.map((e) => {
        if (e.id === payload.id) {
          return payload;
        }
        return e;
      });
      state.activeEvent = null;
    },
    onDeleteEvent: (state) => {
      state.events = state.events.filter((e) => e.id !== state.activeEvent.id);
      state.activeEvent = null;
    },
    onStartLoadingEvent: (state, { payload = [] }) => {
      state.isLoading = false;
      payload.forEach((element) => {
        const exist = state.events.some((db) => db.id === element.id);
        if (!exist) {
          state.events.push(element);
        }
      });
    },
    onLogoutCalendar: (state) => {
      state.isLoading = false;
      state.events = [];
      state.activeEvent = null;
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  onSetActiveEvent,
  onAddNewEvent,
  onEditEvent,
  onDeleteEvent,
  onStartLoadingEvent,
  onLogoutCalendar,
} = calendarSlice.actions;
