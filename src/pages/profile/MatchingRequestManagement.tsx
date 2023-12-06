import { useEffect, useState } from "react";
import { BookingService } from "../../datasource/Booking";
import { useAccountStore } from "../../store/useAccountStore";
import useNotification from "../../hooks/useNotification";
import SkeletonRow from "../../components/SkeletonRow";
import { Badge, Table } from "react-bootstrap";

const MatchingRequestManagement = () => {
  const { account } = useAccountStore();
  const { handleMessageError } = useNotification();

  const [loadingFetching, setLoadingFetching] = useState(false);
  const [requests, setRequests] = useState<any>([]);

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

  useEffect(() => {
    handleGetMatchingRequest();
  }, []);

  return (
    <div>
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
