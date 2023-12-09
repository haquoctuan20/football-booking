import moment from "moment";
import { Form, Table } from "react-bootstrap";
import styled from "styled-components";
import { WrapperTable } from "../../styles/table";

import { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import LoadingComponent from "../../components/LoadingComponent";
import SkeletonRow from "../../components/SkeletonRow";
import { BookingService } from "../../datasource/Booking";
import useNotification from "../../hooks/useNotification";
import { useAccountStore } from "../../store/useAccountStore";
import { formatCurrency } from "../../utils/number";
import ModalCompetitor from "./ModalCompetitor";
import { TabsProfileManage } from "./Profile";
import PaginationComponent from "../../components/PaginationComponent";

const BookingManagement = () => {
  const { account } = useAccountStore();
  const { handleMessageError, messageSuccess } = useNotification();

  const [loadingFetchBooking, setLoadingFetchBooking] = useState(false);
  const [myBooking, setMyBooking] = useState([]);

  const [loading, setLoading] = useState(false);

  const [searchParams] = useSearchParams();

  const [limit] = useState(10);
  const [page, setPage] = useState(0);
  const [total, setTotal] = useState(0);

  const handleFetchBooking = async () => {
    try {
      setLoadingFetchBooking(true);

      const params = {
        limit: limit,
        skip: page * limit,
        userId: account.id,
      };

      const {
        data: { data, total },
      } = await BookingService.getMyBooking(params);
      setMyBooking(data);
      setTotal(total);
    } catch (error) {
      handleMessageError(error);
    } finally {
      setLoadingFetchBooking(false);
    }
  };

  const handleCancelBooking = () => {
    try {
      setLoading(true);

      console.log("Fetching...");
    } catch (error) {
      console.log("🚀 - handleFetchBooking - error: ", error);
    } finally {
      setTimeout(() => {
        setLoading(false);
      }, 1000);
    }
  };

  const handleCancelFindingCompetitor = () => {
    try {
      setLoading(true);

      console.log("Fetching...");
    } catch (error) {
      console.log("🚀 - handleFetchBooking - error: ", error);
    } finally {
      setTimeout(() => {
        setLoading(false);
      }, 1000);
    }
  };

  const handleStartFindingCompetitor = async (bookingId: string) => {
    try {
      setLoading(true);

      await BookingService.switchStatusBooking(bookingId);
      messageSuccess("Thay đổi trạng thái tìm đối thành công");
      handleFetchBooking();
    } catch (error) {
      console.log("🚀 - handleFetchBooking - error: ", error);
    } finally {
      setTimeout(() => {
        setLoading(false);
      }, 1000);
    }
  };

  useEffect(() => {
    const tabQuery = searchParams.get("tab");

    if (tabQuery === TabsProfileManage[0].eventKey) {
      handleFetchBooking();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchParams, page]);

  return (
    <WrapperBookingManagement>
      {loading && <LoadingComponent />}

      {loadingFetchBooking ? (
        <SkeletonRow />
      ) : (
        <>
          <WrapperTable>
            <Table bordered responsive="xl" hover>
              <thead>
                <tr>
                  <th className="min-width-250">Thời gian</th>
                  <th className="min-width-80">Số</th>
                  <th className="min-width-120">Giá</th>
                  <th className="min-width-150 text-center">Trạng thái tìm đối</th>
                  <th className="min-width-150"></th>
                </tr>
              </thead>
              <tbody>
                {myBooking.map((booking: any, index: number) => (
                  <tr key={index} className="height-80 max-height-120">
                    <td className="min-width-250">
                      {`${booking?.startAt?.hour}:${
                        booking?.startAt?.minute === 0 ? "00" : booking?.startAt?.minute
                      } - ${booking?.endAt?.hour}:${
                        booking?.endAt?.minute === 0 ? "00" : booking?.endAt?.minute
                      }, ${moment(booking?.date).format("DD-MM-YYYY")}`}
                    </td>

                    <td className="min-width-80">{booking?.fieldIndex}</td>

                    <td className="min-width-120">{formatCurrency(booking?.price)}</td>

                    <td className="min-width-150">
                      {booking.opponentId === null && (
                        <div className="d-flex flex-column align-items-center">
                          <div className="text-center mb-1">
                            {booking?.hasOpponent ? "Đang tìm đối" : "Sẵn sàng tìm đối"}
                          </div>
                          <Form.Check
                            type="switch"
                            id={`hasOpponent-switch-${booking?.id}`}
                            checked={booking?.hasOpponent}
                            label={booking?.hasOpponent ? "Tắt tìm đối" : "Bật tìm đối"}
                            onChange={() => {
                              handleStartFindingCompetitor(booking?.id);
                            }}
                          />
                        </div>
                      )}

                      {booking.opponentId !== null && (
                        <div className="d-flex flex-column align-items-center">
                          <div className="text-center mb-1">Đã nhận đối</div>
                          <Link to={`/profile/${booking.opponentId}?tab=team`}>Xem đối thủ</Link>
                        </div>
                      )}
                    </td>

                    <td className="min-width-150">
                      <div className="d-flex flex-column">
                        {booking.hasOpponent === true && booking.opponentId === null && (
                          <>
                            <ModalCompetitor
                              bookingId={booking.id}
                              handleCallback={() => {
                                handleFetchBooking();
                              }}
                            />
                          </>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </WrapperTable>
        </>
      )}

      <div className="mt-2 mb-5">
        <PaginationComponent
          activePage={page + 1}
          total={total}
          perPage={limit}
          onClick={(page: number) => {
            setPage(page - 1);
          }}
        />
      </div>
    </WrapperBookingManagement>
  );
};

export default BookingManagement;

export const WrapperBookingManagement = styled.div``;
