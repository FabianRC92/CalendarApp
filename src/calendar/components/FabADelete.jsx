import { useCalendarStore } from "../../hooks";

export const FabDelete = () => {
  const { deleteEvent, activeEvent } = useCalendarStore();
  
  const onDeleteEvent = () => {
    deleteEvent();
  };

  return (
    <button
      className="btn btn-danger fab-danger"
      onClick={onDeleteEvent}
      disabled={!!!activeEvent}
    >
      <em className="fas fa-trash-alt"></em>
    </button>
  );
};
