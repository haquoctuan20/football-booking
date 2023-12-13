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
import { Link } from "react-router-dom";

const MatchingRequest = () => {
  const { handleMessageError, messageSuccess } = useNotification();

  const [requests, setRequests] = useState([]);
  const [loadingFetchRequest, setLoadingFetchRequest] = useState(false);

  const [loadingMatch, setLoadingMatch] = useState(false);

  const [limit] = useState(10);
  const [page, setPage] = useState(0);
  const [total, setTotal] = useState(0);

  const handleGetAllBooking = async () => {
    try {
      setLoadingFetchRequest(true);
      const paramsGetMatchingRequest = {
        hasOpponent: true,
        limit: limit,
        skip: page * limit,
      };

      const {
        data: { data, total },
      } = await BookingService.getAllBooking(paramsGetMatchingRequest);
      setRequests(data);
      setTotal(total);
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
  }, [page]);

  return (
    <WrapperMatchingRequest>
      {loadingMatch && <LoadingComponent />}

      {/* <div>filter</div> */}

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
                    <div className="info-owner pb-2">
                      <div className="avt-owner d-flex flex-column align-items-center">
                        <img src="./san-bong.png" alt="avt" className="pb-1" />
                        <strong>
                          <Link to={`/profile/${request?.userId}`}>Tên người cầm đối</Link>
                        </strong>
                      </div>

                      <div>
                        <strong>Tuổi: </strong>
                        <span>23</span>
                        ... các thông tin khác
                      </div>
                    </div>

                    {/* facility */}
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
            <PaginationComponent
              activePage={page + 1}
              total={total}
              perPage={limit}
              onClick={(page: number) => {
                setPage(page - 1);
              }}
            />
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
    margin-bottom: 12px;
    padding: 8px;
    border: 1px solid #c3c3c3;
    border-radius: 8px;

    min-height: 200px;

    display: flex;
    flex-direction: column;
    justify-content: space-between;

    &:hover {
      border: 1px solid #23ce7e;
    }

    .info-owner {
      border-bottom: 1px solid #ccc;
      margin-bottom: 4px;

      .avt-owner {
        img {
          width: 100px;
          height: 100px;
          object-fit: fill;
          border-radius: 8px;
        }
      }
    }
  }
`;
