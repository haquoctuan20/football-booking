import { useEffect, useState } from "react";
import { BookingService } from "../../datasource/Booking";
import { useAccountStore } from "../../store/useAccountStore";
import useNotification from "../../hooks/useNotification";
import SkeletonRow from "../../components/SkeletonRow";
import { Badge, Button, Table } from "react-bootstrap";
import { useSearchParams } from "react-router-dom";
import { TabsProfileManage } from "./Profile";
import PopoverConfirm from "../../components/PopoverConfirm";
import LoadingComponent from "../../components/LoadingComponent";

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

      const rs = await BookingService.cancelRequest(id);
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
  }, [searchParams]);

  return (
    <div>
      {loadingCancel && <LoadingComponent />}

      {loadingFetching ? (
        <SkeletonRow />
      ) : (
        <>
          <Table bordered responsive="xl" hover>
            <thead>
              <tr>
                <th className="min-width-250">some thing</th>
                <th className="min-width-80">bookingId</th>
                <th className="min-width-150 text-center">Trạng thái</th>
                <th className="min-width-100"></th>
              </tr>
            </thead>

            <tbody>
              {requests.map((re: any, index: number) => (
                <tr key={index}>
                  <td>something</td>
                  <td>{re?.bookingId}</td>
                  <td className="text-center">
                    {re?.status === "ACCEPTED" && <Badge bg="success">Đã được chấp nhận</Badge>}
                    {re?.status === "PENDING" && <Badge bg="info">Đang chờ</Badge>}
                  </td>
                  <td className="text-center">
                    {re?.status === "PENDING" && (
                      <PopoverConfirm
                        content="Bạn chắc chắn muốn hủy yêu cầu này?"
                        callbackConfirm={() => {
                          handleCancelRequest(re?.bookingId);
                        }}
                      >
                        <Button variant="danger" size="sm">
                          Hủy
                        </Button>
                      </PopoverConfirm>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </>
      )}
    </div>
  );
};

export default MatchingRequestManagement;
