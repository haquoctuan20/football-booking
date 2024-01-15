import { Link, useParams } from "react-router-dom";
import { BookingService } from "../../datasource/Booking";
import { useEffect, useState } from "react";
import useNotification from "../../hooks/useNotification";
import LoadingComponent from "../../components/LoadingComponent";
import PaginationComponent from "../../components/PaginationComponent";
import { WrapperTable } from "../../styles/table";
import { Table } from "react-bootstrap";
import moment from "moment";

const BookingManagement = () => {
  const { id } = useParams();
  const { handleMessageError } = useNotification();

  const [booking, setBooking] = useState<any>([]);
  const [loadingFetch, setLoadingFetch] = useState(false);

  const [limit] = useState(10);
  const [page, setPage] = useState(0);
  const [total, setTotal] = useState(0);

  const handleGetBookingOfFacility = async (facilityId: string) => {
    try {
      setLoadingFetch(true);

      const params = {
        limit: limit,
        skip: page * limit,
        facilityId: facilityId,
      };

      const {
        data: { data, total },
      } = await BookingService.getBookingOfFacility(params);

      setBooking(data);
      setTotal(total);
    } catch (error) {
      handleMessageError(error);
    } finally {
      setLoadingFetch(false);
    }
  };

  useEffect(() => {
    if (!id) return;

    handleGetBookingOfFacility(id);
  }, [id, page]);

  return (
    <div>
      {loadingFetch && <LoadingComponent />}

      <WrapperTable>
        <Table bordered responsive="xl" hover>
          <thead>
            <tr>
              <th className="min-width-180">Người đặt</th>
              <th className="min-width-150 text-center">Thời gian</th>
              <th className="min-width-150">Chi tiết</th>
            </tr>
          </thead>

          <tbody>
            {booking.map((b: any, index: number) => (
              <tr key={index}>
                <td>
                  <Link target="_blank" to={`/profile/${b?.userId}?tab=team`}>
                    {b?.userName}
                  </Link>
                </td>

                <td>
                  {`${b?.startAt?.hour}:${b?.startAt?.minute === 0 ? "00" : b?.startAt?.minute} - ${
                    b?.endAt?.hour
                  }:${b?.endAt?.minute === 0 ? "00" : b?.endAt?.minute}, ${moment(
                    booking?.date
                  ).format("DD-MM-YYYY")}`}
                </td>

                <td>
                  <Link target="_blank" to={`/match-detail/${b?.id}`}>
                    Chi tiết trận đấu
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </WrapperTable>

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
    </div>
  );
};

export default BookingManagement;
