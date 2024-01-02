import { useEffect, useState } from "react";
import { Badge, Button, Table } from "react-bootstrap";
import { Link, useSearchParams } from "react-router-dom";
import LoadingComponent from "../../components/LoadingComponent";
import PopoverConfirm from "../../components/PopoverConfirm";
import SkeletonRow from "../../components/SkeletonRow";
import { BookingService } from "../../datasource/Booking";
import useNotification from "../../hooks/useNotification";
import { useAccountStore } from "../../store/useAccountStore";
import { TabsProfileManage } from "./Profile";
import moment from "moment";
import { formatCurrency } from "../../utils/number";
import styled from "styled-components";

const MatchingRequestManagement = () => {
  const { account } = useAccountStore();
  const { handleMessageError, messageSuccess } = useNotification();
  const [searchParams] = useSearchParams();

  const [loadingFetching, setLoadingFetching] = useState(false);
  const [requests, setRequests] = useState<any>([]);

  const [loadingCancel, setLoadingCancel] = useState(false);

  const handleGetMatchingRequest = async () => {
    try {
      setLoadingFetching(true);
      const params = {
        requestorId: account.id,
      };

      const { data } = await BookingService.getMatchingRequest(params);
      setRequests(data);
    } catch (error) {
      handleMessageError(error);
    } finally {
      setLoadingFetching(false);
    }
  };

  const handleCancelRequest = async (id: string) => {
    try {
      setLoadingCancel(true);

      await BookingService.cancelRequest(id);
      messageSuccess("Hủy thành công");
      handleGetMatchingRequest();
    } catch (error) {
      handleMessageError(error);
    } finally {
      setLoadingCancel(false);
    }
  };

  useEffect(() => {
    const tabQuery = searchParams.get("tab");

    if (tabQuery === TabsProfileManage[1].eventKey) {
      handleGetMatchingRequest();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchParams]);

  return (
    <WrapperMatchingRequestManagement>
      {loadingCancel && <LoadingComponent />}

      {loadingFetching ? (
        <SkeletonRow />
      ) : (
        <>
          <Table bordered responsive="xl" hover>
            <thead>
              <tr>
                <th className="min-width-250">Thông tin trận bóng</th>
                <th className="min-width-200">Đối thủ</th>
                <th className="min-width-150 text-center">Trạng thái</th>
                <th className="min-width-100"></th>
              </tr>
            </thead>

            <tbody>
              {requests.map((re: any, index: number) => (
                <tr key={index}>
                  <td className="min-width-250">
                    {/* facility */}
                    <div>
                      <strong>Cơ sở: </strong>
                      <span>{re?.facilityName}</span>
                    </div>

                    {/* time */}
                    <div>
                      <strong>Thời gian: </strong>
                      <span>
                        {`${re?.startAt?.hour}:${
                          re?.startAt?.minute === 0 ? "00" : re?.startAt?.minute
                        } - ${re?.endAt?.hour}:${
                          re?.endAt?.minute === 0 ? "00" : re?.endAt?.minute
                        }, ${moment(re?.date).format("DD-MM-YYYY")}`}
                      </span>
                    </div>

                    {/* price */}
                    <div>
                      <strong>Giá: </strong>
                      <span>{formatCurrency(re?.price)}</span>
                    </div>

                    {/* detail */}
                    <div>
                      {/* <Link to={`/match-detail/${re?.bookingId}`}>Chi tiết trận đấu</Link> */}
                    </div>
                  </td>

                  <td>
                    <div className="d-flex flex-column align-items-center">
                      <img src={re?.hostUserImage} alt="avt" className="requestor-avt" />
                      <Link to={`/profile/${re?.hostUserId}?tab=team`}>{re?.hostUserName}</Link>
                    </div>
                  </td>

                  <td className="text-center ">
                    <div className="min-height-100 d-flex flex-column align-items-center justify-content-center">
                      <div>
                        {re?.status === "ACCEPTED" && <Badge bg="success">Đã được chấp nhận</Badge>}
                        {re?.status === "PENDING" && <Badge bg="info">Đang chờ</Badge>}
                      </div>
                    </div>
                  </td>

                  <td className="text-center">
                    <div className="min-height-100 d-flex flex-column align-items-center justify-content-center">
                      {re?.status === "PENDING" && (
                        <PopoverConfirm
                          content="Bạn chắc chắn muốn hủy yêu cầu này?"
                          callbackConfirm={() => {
                            handleCancelRequest(re?.id);
                          }}
                        >
                          <Button variant="danger" size="sm">
                            Hủy
                          </Button>
                        </PopoverConfirm>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </>
      )}
    </WrapperMatchingRequestManagement>
  );
};

export default MatchingRequestManagement;

const WrapperMatchingRequestManagement = styled.div`
  .requestor-avt {
    width: 70px;
    height: 70px;
    border-radius: 8px;
    object-fit: fill;
  }
`;
