export const events = [
  {
    _id: "1",
    title: "Nota jeje",
    start: new Date("2023-02-10 13:00:00"),
    end: new Date("2023-02-10 15:00:00"),
    notes: "asdsadsadsa",
  },
  {
    _id: "2",
    title: "Nota jeje2",
    start: new Date("2023-03-10 13:00:00"),
    end: new Date("2023-03-10 15:00:00"),
    notes: "jeje",
  },
];

export const initalState = {
  isLoading: true,
  events: [],
  activeEvent: null,
};

export const calendarWithEventState = {
  isLoading: true,
  events: [...events],
  activeEvent: null,
};

export const calendarWithActiveEventState = {
  isLoading: true,
  events: [...events],
  activeEvent: { ...events[0] },
};
