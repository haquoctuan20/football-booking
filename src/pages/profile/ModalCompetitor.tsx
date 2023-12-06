import { useEffect, useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import { BsListStars } from "react-icons/bs";
import useNotification from "../../hooks/useNotification";
import { BookingService } from "../../datasource/Booking";
import styled from "styled-components";
import SkeletonRow from "../../components/SkeletonRow";

interface ModalCompetitorProps {
  handleCallback?: () => void;
  bookingId: string;
}

const ModalCompetitor = (props: ModalCompetitorProps) => {
  const { handleMessageError } = useNotification();

  const [show, setShow] = useState(false);

  const [loadingFetching, setLoadingFetching] = useState(false);
  const [requests, setRequests] = useState<any>([]);
  const [requestSelect, setRequestSelect] = useState<any>(null);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleGetRequests = async () => {
    try {
      setLoadingFetching(true);
      const params = {
        bookingId: props.bookingId,
      };
      const { data } = await BookingService.getMatchingRequest(params);
      setRequests(data);
    } catch (error) {
      handleMessageError(error);
    } finally {
      setLoadingFetching(false);
    }
  };

  const handleClickRequest = (req: any) => {
    setRequestSelect(req);
  };

  useEffect(() => {
    if (!show) return;
    handleGetRequests();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [show]);

  return (
    <>
      <Button size="sm" variant="success" className="fw-bold" onClick={handleShow}>
        <BsListStars className="fs-5" /> Xem đối
      </Button>

      <Modal show={show} onHide={handleClose} backdrop="static" keyboard={false} fullscreen="md">
        <Modal.Header closeButton>
          <Modal.Title>Danh sách muốn bắt đối</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          {loadingFetching ? (
            <>
              <SkeletonRow />
            </>
          ) : (
            <BodyModalCompetitor>
              {requests.map((re: any, index: number) => (
                <div
                  key={index}
                  className={`match-request ${
                    re?.id === requestSelect?.id ? "match-request__active" : ""
                  }`}
                  onClick={() => handleClickRequest(re)}
                >
                  <div className="px-2">
                    <Form.Check // prettier-ignore
                      type="checkbox"
                      id={re?.id}
                      checked={re?.id === requestSelect?.id}
                    />
                  </div>
                  <div>
                    <div>{re?.id}</div>
                    <div>{re?.id}</div>
                  </div>
                </div>
              ))}
            </BodyModalCompetitor>
          )}
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

const BodyModalCompetitor = styled.div`
  .match-request {
    width: 100%;
    height: 90px;
    border: 1px solid #c3c3c3;
    border-radius: 8px;
    padding: 5px;
    margin-bottom: 5px;
    cursor: pointer;
    display: flex;
    align-items: center;

    &:hover {
      border: 1px solid #198754;
    }

    &__active {
      border: 1px solid #198754;
    }
  }
`;
