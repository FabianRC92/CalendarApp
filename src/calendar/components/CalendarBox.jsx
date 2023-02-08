export const CalendarBox = ({ event }) => {
  const { title, description     } = event;

  return (
    <>
      <strong>{title}</strong>
      <span>- {description}</span>
    </>
  );
};
