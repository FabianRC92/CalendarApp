export const CalendarBox = ({ event }) => {
  const { title, notes } = event;

  return (
    <>
      <strong>{title}</strong>
      <span>- {notes}</span>
    </>
  );
};
