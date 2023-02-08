import { addHours, differenceInSeconds } from "date-fns";
import { useEffect, useMemo, useState } from "react";
import ReactModal from "react-modal";

import Swal from "sweetalert2";
import "sweetalert2/dist/sweetalert2.min.css";

import DatePicker, { registerLocale } from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import es from "date-fns/locale/es";
import { useUIStore, useCalendarStore } from "../../hooks";

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
  },
};

ReactModal.setAppElement("#root");

export const CalendarModal = () => {
  const { activeEvent, startSaveEvent } = useCalendarStore();
  const { isDateModalOpen, closeDateModal } = useUIStore();
  const [formSubmitted, setFormSubmitted] = useState(false);

  const [formValue, setFormValue] = useState({
    title: "",
    description: "",
    start: new Date(),
    end: addHours(new Date(), 2),
  });

  const onCloseModal = () => {
    closeDateModal();
  };

  const classTitle = useMemo(() => {
    if (!formSubmitted) return "";

    return formValue.title.length ? "" : "is-invalid";
  }, [formValue.title, formSubmitted]);

  useEffect(() => {
    if (activeEvent) {
      setFormValue({ ...activeEvent });
    }
  }, [activeEvent]);

  const onInputChange = ({ target }) => {
    setFormValue({
      ...formValue,
      [target.name]: target.value,
    });
  };

  const onDateChange = (event, changing) => {
    setFormValue({
      ...formValue,
      [changing]: event,
    });
  };

  registerLocale("es", es);

  const onSubmit = async (event) => {
    event.preventDefault();

    setFormSubmitted(true);

    const difference = differenceInSeconds(formValue.end, formValue.start);

    if (isNaN(difference) || difference < 0) {
      Swal.fire("Fechas incorrectas", "Revise las fechas ingresadas", "error");
      return;
    }

    if (formValue.title.length <= 0) return;

    await startSaveEvent(formValue);
    closeDateModal();
  };

  return (
    <ReactModal
      isOpen={isDateModalOpen}
      onRequestClose={onCloseModal}
      style={customStyles}
      contentLabel="Example Modal"
      className="modal"
      overlayClassName="modal-fondo"
      closeTimeoutMS={200}
    >
      <h1> Nuevo evento </h1>
      <hr />
      <form className="container" onSubmit={onSubmit}>
        <div className="form-group mb-2">
          <label>Fecha y hora inicio</label>
          <DatePicker
            selected={formValue.start}
            className="form-control"
            onChange={(event) => onDateChange(event, "start")}
            dateFormat="Pp"
            showTimeSelect
            locale="es"
            timeCaption="Hora"
          />
        </div>

        <div className="form-group mb-2">
          <label>Fecha y hora fin</label>
          <DatePicker
            minDate={formValue.start}
            selected={formValue.end}
            className="form-control"
            onChange={(event) => onDateChange(event, "end")}
            dateFormat="Pp"
            showTimeSelect
            locale="es"
            timeCaption="Hora"
          />
        </div>

        <hr />
        <div className="form-group mb-2">
          <label>Titulo y notas</label>
          <input
            type="text"
            className={`form-control ${classTitle}`}
            placeholder="Título del evento"
            name="title"
            autoComplete="off"
            value={formValue.title}
            onChange={onInputChange}
          />
          <small id="emailHelp" className="form-text text-muted">
            Una descripción corta
          </small>
        </div>

        <div className="form-group mb-2">
          <textarea
            type="text"
            className="form-control"
            placeholder="Notas"
            rows="5"
            name="description"
            style={{ resize: "none" }}
            value={formValue.description}
            onChange={onInputChange}
          ></textarea>
          <small id="emailHelp" className="form-text text-muted">
            Información adicional
          </small>
        </div>

        <button type="submit" className="btn btn-outline-primary btn-block">
          <i className="far fa-save"></i>
          <span> Guardar</span>
        </button>
      </form>
    </ReactModal>
  );
};
