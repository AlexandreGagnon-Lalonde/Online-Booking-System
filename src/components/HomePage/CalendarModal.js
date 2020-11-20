import React from "react";
import Modal from "react-bootstrap/Modal";
import ModalMembers from "./ModalMembers";
import ModalSubmit from "./ModalSubmit";
import { COLORS } from "../../constant";

const CalendarModal = ({ show, setShow }) => {
  const handleClose = () => {
    setShow({ info: "", modal: false, members: [], classSchedule: null });
  };

  return (
    <Modal show={show.modal} onHide={handleClose} style={{ boxShadow: "none" }}>
      <Modal.Header
        closeButton
        style={{ backgroundColor: `${COLORS.beige}`, border: "none" }}
      >
        <Modal.Title
          style={{ color: `${COLORS.mediumGray}`, fontWeight: "bold" }}
        >
          Members
        </Modal.Title>
      </Modal.Header>
      <Modal.Body
        style={{ backgroundColor: `${COLORS.beige}`, border: "none" }}
      >
        <ModalMembers show={show} setShow={setShow} />
      </Modal.Body>
      <Modal.Footer
        style={{ backgroundColor: `${COLORS.beige}`, border: "none" }}
      >
        <ModalSubmit show={show} setShow={setShow} />
      </Modal.Footer>
    </Modal>
  );
};

export default CalendarModal;
