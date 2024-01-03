import moment from "moment";
import { useEffect, useMemo, useState } from "react";
import { Button, Col, Form, Row } from "react-bootstrap";
import { Link, useParams } from "react-router-dom";
import styled from "styled-components";
import LoadingComponent from "../../components/LoadingComponent";
import SkeletonRow from "../../components/SkeletonRow";
import { BookingService } from "../../datasource/Booking";
import useNotification from "../../hooks/useNotification";
import { formatCurrency } from "../../utils/number";
import FacilityCard from "./FacilityCard";
import { UserService } from "../../datasource/User";
import PopoverConfirm from "../../components/PopoverConfirm";
import { useAccountStore } from "../../store/useAccountStore";

interface MasterData {
  facilityId: null | string;
}

const initMasterData: MasterData = {
  facilityId: null,
};

const DetailMatch = () => {
  const { id } = useParams();
  const { handleMessageError, messageSuccess } = useNotification();
  const { account } = useAccountStore();

  const [loadingFetchBooking, setLoadingFetchBooking] = useState(false);

  const [loadingFetchRequest, setLoadingFetchRequest] = useState(false);
  const [requests, setRequests] = useState<any>([]);

  const [loadingFetOpponent, setLoadingFetOpponent] = useState(false);
  const [infoOpponent, setInfoOpponent] = useState<any>();

  const [loadingAction, setLoadingAction] = useState(false);

  const [loading, setLoading] = useState(false);
  const [masterData, setMasterData] = useState<MasterData>(initMasterData);
  const [detailBooking, setDetailBooking] = useState<any>();

  const isOwnerBooking = useMemo(() => {
    if (!detailBooking) return false;

    if (account.id === detailBooking?.userId) return true;

    return false;
  }, [account.id, detailBooking]);

  const handleFetchBooking = async () => {
    try {
      setLoadingFetchBooking(true);

      const params = {
        id,
      };

      const {
        data: { data },
      } = await BookingService.getMyBooking(params);

      const resMasterData: MasterData = {
        facilityId: data[0]?.facilityId ? data[0]?.facilityId : null,
      };

      setMasterData(resMasterData);
      setDetailBooking(data[0]);
    } catch (error) {
      handleMessageError(error);
    } finally {
      setLoadingFetchBooking(false);
    }
  };

  const handleStartFindingCompetitor = async (bookingId: string) => {
    try {
      setLoading(true);

      await BookingService.switchStatusBooking(bookingId);
      messageSuccess("Thay đổi trạng thái tìm đối thành công");
      handleFetchBooking();
    } catch (error) {
      handleMessageError(error);
    } finally {
      setTimeout(() => {
        setLoading(false);
      }, 1000);
    }
  };

  const handleGetRequests = async (id: string) => {
    try {
      setLoadingFetchRequest(true);
      const params = {
        bookingId: id,
      };
      const { data } = await BookingService.getMatchingRequest(params);
      setRequests(data);
    } catch (error) {
      handleMessageError(error);
    } finally {
      setLoadingFetchRequest(false);
    }
  };

  const handleDenied = async (id: string) => {
    try {
      setLoadingAction(true);
      await BookingService.responseMatchingRequest(id, "DENIED");
      handleGetRequests(detailBooking?.id);
      messageSuccess("Từ chối thành công");
    } catch (error) {
      handleMessageError(error);
    } finally {
      setLoadingAction(false);
    }
  };

  const handleAccepted = async (id: string) => {
    try {
      setLoadingAction(true);
      await BookingService.responseMatchingRequest(id, "ACCEPTED");
      messageSuccess("Nhận đối thành công");

      handleFetchBooking();
    } catch (error) {
      handleMessageError(error);
    } finally {
      setLoadingAction(false);
    }
  };

  const handleGetOpponent = async (id: string) => {
    try {
      setLoadingFetOpponent(true);
      const { data } = await UserService.getInfoUserById(id);
      setInfoOpponent(data);
    } catch (error) {
      handleMessageError(error);
    } finally {
      setLoadingFetOpponent(false);
    }
  };

  const handleCancelBooking = async (id: string) => {
    try {
      setLoading(true);

      await BookingService.cancelRequest(id);
      messageSuccess("Hủy thành công");
    } catch (error) {
      handleMessageError(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!id) {
      return;
    }

    handleFetchBooking();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  useEffect(() => {
    if (!detailBooking) {
      return;
    }

    if (!detailBooking?.id) {
      return;
    }

    if (detailBooking?.opponentId) {
      handleGetOpponent(detailBooking?.opponentId);
    } else {
      handleGetRequests(detailBooking?.id);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [detailBooking]);

  if (loadingFetchBooking || loading) {
    return <LoadingComponent />;
  }

  return (
    <WrapperDetailMatch className="mt-3">
      <Row className="">
        <Col md={5}>
          <div>
            <FacilityCard facilityId={masterData.facilityId} />

            <div className="mt-2 border rounded p-2">
              <h5 className="text-center">
                <strong>Trận đấu</strong>
              </h5>

              {detailBooking && (
                <>
                  <div className="d-flex flex-column align-items-center">
                    <img src={detailBooking?.userImage} alt="userImage" className="user-image" />
                    <Link to={`/profile/${detailBooking?.userId}?tab=team`}>
                      <strong>{detailBooking?.userName}</strong>
                    </Link>
                  </div>

                  <hr />

                  <div>
                    <strong>Thời gian: </strong>
                    <span>
                      {`${detailBooking?.startAt?.hour}:${
                        detailBooking?.startAt?.minute === 0 ? "00" : detailBooking?.startAt?.minute
                      } - ${detailBooking?.endAt?.hour}:${
                        detailBooking?.endAt?.minute === 0 ? "00" : detailBooking?.endAt?.minute
                      }, ${moment(detailBooking?.date).format("DD-MM-YYYY")}`}
                    </span>
                  </div>

                  <div>
                    <strong>Giá: </strong>
                    <span>{formatCurrency(detailBooking?.price)}</span>
                  </div>
                </>
              )}
            </div>

            {isOwnerBooking && (
              <div>
                <PopoverConfirm
                  content="Bạn chắc chắn muốn hủy trận đấu này?"
                  callbackConfirm={() => {
                    handleCancelBooking(detailBooking?.id);
                  }}
                >
                  <Button variant="danger" size="sm" className="mt-1">
                    Hủy trận
                  </Button>
                </PopoverConfirm>
              </div>
            )}
          </div>
        </Col>

        <Col md={7}>
          <div className="border rounded p-2">
            <h5 className="text-center">
              <strong>Trạng thái tìm đối</strong>
            </h5>

            {detailBooking && (
              <>
                <div>
                  {detailBooking?.opponentId === null && (
                    <div className="d-flex flex-column align-items-center">
                      <div className="text-center mb-1">
                        {detailBooking?.hasOpponent ? "Đang tìm đối" : "Sẵn sàng tìm đối"}
                      </div>

                      {isOwnerBooking && (
                        <Form.Check
                          type="switch"
                          id={`hasOpponent-switch-${detailBooking?.id}`}
                          checked={detailBooking?.hasOpponent}
                          label={detailBooking?.hasOpponent ? "Tắt tìm đối" : "Bật tìm đối"}
                          onChange={() => {
                            handleStartFindingCompetitor(detailBooking?.id);
                          }}
                        />
                      )}
                    </div>
                  )}

                  {/* has opponent */}
                  {detailBooking.opponentId !== null && (
                    <div className="d-flex flex-column align-items-center">
                      <div className="text-center mb-1">Đã nhận đối</div>
                    </div>
                  )}
                </div>

                <hr />

                {detailBooking.hasOpponent === true && detailBooking.opponentId === null && (
                  <>
                    <div className="text-center mb-3">Danh sách muốn bắt đối</div>

                    {loadingFetchRequest ? (
                      <>
                        <SkeletonRow />
                        <SkeletonRow className="mt-5" />
                        <SkeletonRow className="mt-5" />
                      </>
                    ) : (
                      <>
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
                                  <img
                                    src={re?.requestorImage}
                                    alt="avt"
                                    className="requestor-avt"
                                  />
                                </div>

                                <div>
                                  <div>
                                    <Link to={`/profile/${re?.requestorId}`}>
                                      <strong>{re?.requestorName}</strong>
                                    </Link>
                                  </div>

                                  <div className="requestor-date">
                                    {moment(re?.date).format("DD-MM-YYYY")}
                                  </div>
                                </div>
                              </div>

                              {isOwnerBooking && (
                                <div className="d-flex flex-column ">
                                  {re?.status !== "PENDING" ? (
                                    <>
                                      <div>Đã từ chối</div>
                                    </>
                                  ) : (
                                    <>
                                      <Button
                                        size="sm"
                                        variant="success"
                                        className="mb-2"
                                        onClick={() => handleAccepted(re.id)}
                                        disabled={loadingAction}
                                      >
                                        Nhận đối
                                      </Button>

                                      <Button
                                        size="sm"
                                        variant="warning"
                                        disabled={loadingAction}
                                        onClick={() => handleDenied(re.id)}
                                      >
                                        Từ chối
                                      </Button>
                                    </>
                                  )}
                                </div>
                              )}
                            </div>
                          ))}
                        </BodyModalCompetitor>
                      </>
                    )}
                  </>
                )}

                {/* has opponent */}
                {loadingFetOpponent ? (
                  <>
                    <SkeletonRow />
                    <SkeletonRow className="mt-5" />
                  </>
                ) : (
                  <>
                    {detailBooking.opponentId !== null && (
                      <div className="d-flex flex-column align-items-center">
                        <img src={infoOpponent?.image} alt="userImage" className="user-image" />
                        <Link to={`/profile/${detailBooking.opponentId}?tab=team`}>
                          <strong>{infoOpponent?.name}</strong>
                        </Link>
                      </div>
                    )}
                  </>
                )}
              </>
            )}
          </div>
        </Col>
      </Row>
    </WrapperDetailMatch>
  );
};

export default DetailMatch;

const WrapperDetailMatch = styled.div`
  .user-image {
    width: 100px;
    height: 100px;
    padding: 4px;
    border: 1px solid #ccc;
    border-radius: 50px;
  }
`;

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
