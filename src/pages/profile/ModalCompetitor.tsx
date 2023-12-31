import moment from "moment";
import { useEffect, useState } from "react";
import { Button, Modal } from "react-bootstrap";
import { BsListStars } from "react-icons/bs";
import { Link } from "react-router-dom";
import styled from "styled-components";
import SkeletonRow from "../../components/SkeletonRow";
import { BookingService } from "../../datasource/Booking";
import useNotification from "../../hooks/useNotification";

interface ModalCompetitorProps {
  handleCallback?: () => void;
  bookingId: string;
}

const ModalCompetitor = (props: ModalCompetitorProps) => {
  const { handleMessageError, messageSuccess } = useNotification();

  const [show, setShow] = useState(false);

  const [loadingFetching, setLoadingFetching] = useState(false);
  const [requests, setRequests] = useState<any>([]);

  const [loadingAction, setLoadingAction] = useState(false);

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

  const handleAccepted = async (id: string) => {
    try {
      setLoadingAction(true);
      await BookingService.responseMatchingRequest(id, "ACCEPTED");
      handleGetRequests();
      messageSuccess("Nhận đối thành công");

      if (props.handleCallback) {
        props.handleCallback();
      }
    } catch (error) {
      handleMessageError(error);
    } finally {
      setLoadingAction(false);
    }
  };

  const handleDenied = async (id: string) => {
    try {
      setLoadingAction(true);
      await BookingService.responseMatchingRequest(id, "DENIED");
      handleGetRequests();
      messageSuccess("Từ chối thành công");
    } catch (error) {
      handleMessageError(error);
    } finally {
      setLoadingAction(false);
    }
  };

  useEffect(() => {
    if (!show) return;
    handleGetRequests();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [show]);

  return (
    <>
      <Button size="sm" variant="success" className="fw-bold" onClick={handleShow}>
        <BsListStars className="fs-5" /> Xem lời mời
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
                    re?.status !== "PENDING" ? "match-request__denied" : ""
                  }`}
                >
                  <div className="d-flex">
                    <div className="pe-1">
                      <img src={re?.requestorImage} alt="avt" className="requestor-avt" />
                    </div>

                    <div>
                      <div>
                        <Link to={`/profile/${re?.requestorId}`}>
                          <strong>{re?.requestorName}</strong>
                        </Link>
                      </div>

                      <div className="requestor-date">{moment(re?.date).format("DD-MM-YYYY")}</div>
                    </div>
                  </div>

                  <div className="d-flex flex-column ">
                    <Button
                      size="sm"
                      variant="success"
                      className="mb-2"
                      onClick={() => handleAccepted(re.id)}
                      disabled={loadingAction || re?.status !== "PENDING"}
                    >
                      Nhận đối
                    </Button>

                    <Button
                      size="sm"
                      variant="warning"
                      disabled={loadingAction || re?.status !== "PENDING"}
                      onClick={() => handleDenied(re.id)}
                    >
                      Từ chối
                    </Button>
                  </div>
                </div>
              ))}
            </BodyModalCompetitor>
          )}
        </Modal.Body>

        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose} disabled={loadingAction}>
            Đóng
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default ModalCompetitor;

const BodyModalCompetitor = styled.div`
  max-height: 500px;
  overflow: auto;

  .match-request {
    width: 100%;
    height: 100px;
    border: 1px solid #c3c3c3;
    border-radius: 8px;
    padding: 5px;
    margin-bottom: 5px;
    display: flex;
    align-items: center;
    justify-content: space-between;

    &:hover {
      border: 1px solid #198754;
    }

    &__denied {
      background: #e5e5e5;
    }
  }

  .requestor-avt {
    width: 70px;
    height: 70px;
    border-radius: 8px;
    object-fit: fill;
  }

  .requestor-date {
    font-size: 14px;
    opacity: 0.8;
  }
`;
