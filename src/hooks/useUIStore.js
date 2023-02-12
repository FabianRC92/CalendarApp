import { onOpenDateModal, onCloseDateModal } from "../store";
import { useDispatch, useSelector } from "react-redux";

export const useUIStore = () => {
  const dispatch = useDispatch();
  const { isDateModalOpen } = useSelector((state) => state.ui);

  const openDateModal = () => {
    dispatch(onOpenDateModal());
  };

  const closeDateModal = () => {
    dispatch(onCloseDateModal());
  };

  const toggleModal = () => {
    isDateModalOpen ? closeDateModal() : openDateModal();
  };

  return {
    isDateModalOpen,
    openDateModal,
    closeDateModal,
    toggleModal,
  };
};
