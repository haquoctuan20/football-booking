import { useEffect, useState } from "react";
import { BookingService } from "../../datasource/Booking";
import styled from "styled-components";
import { Button, Col, Row } from "react-bootstrap";
import moment from "moment";
import { formatCurrency } from "../../utils/number";
import PaginationComponent from "../../components/PaginationComponent";
import useNotification from "../../hooks/useNotification";
import SkeletonRow from "../../components/SkeletonRow";
import LoadingComponent from "../../components/LoadingComponent";

const MatchingRequest = () => {
  const { handleMessageError, messageSuccess } = useNotification();

  const [requests, setRequests] = useState([]);
  const [loadingFetchRequest, setLoadingFetchRequest] = useState(false);

  const [loadingMatch, setLoadingMatch] = useState(false);

  const handleGetAllBooking = async () => {
    try {
      setLoadingFetchRequest(true);
      const paramsGetMatchingRequest = {
        hasOpponent: false,
      };
      const { data } = await BookingService.getAllBooking(paramsGetMatchingRequest);
      setRequests(data);
    } catch (error) {
      handleMessageError(error);
    } finally {
      setLoadingFetchRequest(false);
    }
  };

  const handleMatchingRequest = async (bookingId: string) => {
    if (!bookingId) return;

    try {
      setLoadingMatch(true);

      const rs = await BookingService.matchingRequest(bookingId);
      messageSuccess("Bắt đối thành công, chờ đối thủ xác nhận");
      handleGetAllBooking();
      console.log("🚀 -> handleMatchingRequest -> rs:", rs);
    } catch (error) {
      handleMessageError(error);
    } finally {
      setLoadingMatch(false);
    }
  };

  useEffect(() => {
    handleGetAllBooking();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <WrapperMatchingRequest>
      {loadingMatch && <LoadingComponent />}

      <div>filter</div>

      {loadingFetchRequest ? (
        <>
          <SkeletonRow className="my-5" />
          <SkeletonRow className="mb-5" />
          <SkeletonRow className="mb-5" />
          <SkeletonRow className="mb-5" />
        </>
      ) : (
        <div className="mt-4">
          <Row>
            {requests.map((request: any, index: number) => (
              <Col key={index} lg={6}>
                <div className="request-card">
                  <div>
                    <div>
                      <strong>Cơ sở: ...</strong>
                    </div>
                    <div>
                      <strong>Thời gian: </strong>{" "}
                      {`${request?.startAt?.hour}:${
                        request?.startAt?.minute === 0 ? "00" : request?.startAt?.minute
                      } - ${request?.endAt?.hour}:${
                        request?.endAt?.minute === 0 ? "00" : request?.endAt?.minute
                      }, ${moment(request?.date).format("DD-MM-YYYY")}`}
                    </div>
                    <div>
                      <strong>Sân số: </strong>
                      {request?.fieldIndex}
                    </div>
                    <div>
                      <strong>Giá: </strong>
                      {formatCurrency(request?.price)}
                    </div>
                  </div>

                  <div className="mt-2 text-end">
                    <Button
                      className="px-3"
                      variant={request?.opponentId === null ? "success" : "secondary"}
                      disabled={request?.opponentId !== null}
                      onClick={() => handleMatchingRequest(request?.id)}
                    >
                      {request?.opponentId === null ? "Bắt đối" : "Đã có đối"}
                    </Button>
                  </div>
                </div>
              </Col>
            ))}
          </Row>

          <div className="my-5">
            <PaginationComponent activePage={1} total={80} onClick={() => {}} perPage={10} />
          </div>
        </div>
      )}
    </WrapperMatchingRequest>
  );
};

export default MatchingRequest;

const WrapperMatchingRequest = styled.div`
  margin-top: 12px;

  .request-card {
    margin-bottom: 8px;
    padding: 8px;
    border: 1px solid #c3c3c3;
    border-radius: 8px;

    height: 200px;

    display: flex;
    flex-direction: column;
    justify-content: space-between;

    &:hover {
      border: 1px solid #23ce7e;
    }
  }
`;
