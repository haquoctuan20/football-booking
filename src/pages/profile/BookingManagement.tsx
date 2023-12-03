import moment from "moment";
import { Button, Form, Table } from "react-bootstrap";
import styled from "styled-components";
import { MY_BOOKING } from "../../mock/data";
import { WrapperTable } from "../../styles/table";

import { FaSearchengin } from "react-icons/fa";
import { ImCancelCircle } from "react-icons/im";
import { TbSearchOff } from "react-icons/tb";
import SkeletonRow from "../../components/SkeletonRow";
import ModalCompetitor from "./ModalCompetitor";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { TabsProfile } from "./Profile";
import PopoverConfirm from "../../components/PopoverConfirm";
import LoadingComponent from "../../components/LoadingComponent";
import { useAccountStore } from "../../store/useAccountStore";
import { BookingService } from "../../datasource/Booking";
import useNotification from "../../hooks/useNotification";
import { formatCurrency } from "../../utils/number";

const BookingManagement = () => {
  const { account } = useAccountStore();
  const { handleMessageError, messageSuccess } = useNotification();

  const [loadingFetchBooking, setLoadingFetchBooking] = useState(false);
  const [myBooking, setMyBooking] = useState([]);

  const [loading, setLoading] = useState(false);

  const [searchParams] = useSearchParams();

  const handleFetchBooking = async () => {
    try {
      setLoadingFetchBooking(true);

      const { data } = await BookingService.getMyBooking(account.id);
      setMyBooking(data);
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

    if (tabQuery === TabsProfile[1].eventKey) {
      handleFetchBooking();
    }
  }, [searchParams]);

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
                  <th className="min-width-80">Số sân</th>
                  <th className="min-width-120">Giá</th>
                  <th className="min-width-150">Trạng thái tìm đối</th>
                  <th className="min-width-150">Trạng thái</th>
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
                      <div className="d-flex flex-column align-items-center">
                        <div className="text-center mb-1">
                          {booking?.hasOpponent ? "Đang tìm đối" : "Sẵn sàng tìm đối"}{" "}
                        </div>
                        <Form.Check
                          type="switch"
                          id="hasOpponent-switch"
                          checked={booking?.hasOpponent}
                          label={booking?.hasOpponent ? "Tắt tìm đối" : "Bật tìm đối"}
                          onChange={() => {
                            handleStartFindingCompetitor(booking?.id);
                          }}
                        />
                      </div>
                    </td>

                    <td className="min-width-150 ">
                      <div className="d-flex flex-column">
                        {/* {booking.status === "done" && (
                          <>
                            <div className="text-center mb-1">Sẵn sàng tìm đối</div>
                            <Button
                              size="sm"
                              variant="info"
                              className="fw-bold"
                              onClick={handleStartFindingCompetitor}
                            >
                              <FaSearchengin className="fs-5" /> Tìm đối
                            </Button>
                          </>
                        )} */}

                        {/* {booking.status === "find_competitor" && (
                          <>
                            <div className="text-center mb-1">Đang tìm đối</div>

                            <PopoverConfirm
                              content="Bạn có chắc chắn muốn hủy tìm đối?"
                              heading="Hủy tìm đối"
                              callbackConfirm={handleCancelFindingCompetitor}
                            >
                              <Button size="sm" variant="warning" className="fw-bold">
                                <TbSearchOff className="fs-5" /> Hủy tìm đối
                              </Button>
                            </PopoverConfirm>
                          </>
                        )} */}

                        {booking.status === "have_competitor" && (
                          <>
                            <div className="text-center mb-1">Đã có đối</div>
                            {/* <Button size="sm" variant="success" className="fw-bold">
                          <BsListStars className="fs-5" /> Xem đối
                        </Button> */}

                            <ModalCompetitor />
                          </>
                        )}

                        {/* <PopoverConfirm
                          content="Bạn có chắc chắn muốn hủy sân?"
                          heading="Hủy đặt sân"
                          callbackConfirm={handleCancelBooking}
                        >
                          <Button size="sm" variant="danger" className="mt-1">
                            <ImCancelCircle className="fs-5" /> Hủy sân
                          </Button>
                        </PopoverConfirm> */}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </WrapperTable>
        </>
      )}
    </WrapperBookingManagement>
  );
};

export default BookingManagement;

export const WrapperBookingManagement = styled.div``;
