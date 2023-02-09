import { addHours } from "date-fns";
import { useCalendarStore, useUIStore } from "../../hooks";

export const FabAddNew = () => {
  const { openDateModal } = useUIStore();
  const { setActiveEvent } = useCalendarStore();

  const onOpenModal = () => {
    setActiveEvent({
      title: "",
      notes: "",
      start: new Date(),
      end: addHours(new Date(), 2),
      bgColor: "#fafafa",
    });
    openDateModal();
  };

  return (
    <button className="btn btn-primary fab" onClick={onOpenModal}>
      <em className="fas fa-plus"></em>
    </button>
  );
};
