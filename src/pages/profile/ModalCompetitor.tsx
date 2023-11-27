import { useState } from "react";
import { Button, Modal } from "react-bootstrap";
import { BsListStars } from "react-icons/bs";

interface ModalCompetitorProps {
  handleCallback?: () => void;
}

const ModalCompetitor = (props: ModalCompetitorProps) => {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <Button
        size="sm"
        variant="success"
        className="fw-bold"
        onClick={handleShow}
      >
        <BsListStars className="fs-5" /> Xem đối
      </Button>

      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
        fullscreen="md"
      >
        <Modal.Header closeButton>
          <Modal.Title>Danh sách muốn bắt đối</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          Hiển thị danh sách đối
          <br />
          Chọn đối
          <br />
          Bám xác nhận để ghép đối
        </Modal.Body>

        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Đóng
          </Button>
          <Button variant="primary" onClick={handleClose}>
            Xác nhận
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default ModalCompetitor;
