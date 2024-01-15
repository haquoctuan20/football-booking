import { useEffect, useState } from "react";
import { Button, Table } from "react-bootstrap";
import { Link } from "react-router-dom";
import SkeletonRow from "../../components/SkeletonRow";
import { IFacility } from "../../constants/facility";
import { FacilityService } from "../../datasource/Factility";
import { useAccountStore } from "../../store/useAccountStore";
import useNotification from "../../hooks/useNotification";
import useStatusAccount from "../../hooks/useStatusAccount";

const FacilityManagement = () => {
  const { account } = useAccountStore();
  const { handleMessageError } = useNotification();
  const { isConnectPayment } = useStatusAccount();

  const [facilities, setFacilities] = useState<IFacility[]>([]);
  const [loadingFetch, setLoadingFetch] = useState(false);

  const handleGetFacilityByUsername = async () => {
    try {
      setLoadingFetch(true);
      const { data } = await FacilityService.getFacilityByUsername(account.username);
      setFacilities(data);
    } catch (error) {
      handleMessageError(error);
    } finally {
      setLoadingFetch(false);
    }
  };

  useEffect(() => {
    handleGetFacilityByUsername();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div>
      <div>
        {isConnectPayment ? (
          <div>
            <Link to="/administrator/facility/create" className="btn btn-success  btn-sm">
              Thêm cơ sở mới
            </Link>
          </div>
        ) : (
          <div className="d-flex align-items-center">
            <Button variant="secondary" size="sm">
              Thêm cơ sở mới
            </Button>

            <div className="ps-2 ">
              » <span className="form-error">Bạn chưa cài đặt phương thức thanh toán</span> »{" "}
              <span>
                Đi tới
                <Link to="/administrator/setting"> Phương thức thanh toán</Link>
              </span>
            </div>
          </div>
        )}
      </div>

      {loadingFetch ? (
        <SkeletonRow className="mt-3" />
      ) : (
        <Table bordered hover size="sm" className="mt-3 w-100">
          <thead>
            <tr>
              <th className="min-width-250">Tên cơ sở</th>
              <th className="min-width-250">Địa chỉ</th>
              <th className="min-width-80">Số sân</th>
              <th className=""></th>
            </tr>
          </thead>
          <tbody>
            {facilities.map((data: IFacility, index: number) => (
              <tr key={index}>
                <td className="min-width-250">{data.name}</td>
                <td className="min-width-250">
                  {data.address.number}, {data.address.street}, {data.address.ward},{" "}
                  {data.address.city}
                </td>
                <td className="min-width-80">{data.numOfFields}</td>
                <td className="">
                  <Link
                    to={`/administrator/facility-price/${data.id}`}
                    className="btn btn-primary btn-sm"
                  >
                    Bảng giá
                  </Link>

                  <Link
                    to={`/administrator/facility-booking/${data.id}`}
                    className="btn btn-secondary btn-sm ms-2"
                  >
                    Lịch đặt sân
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </div>
  );
};

export default FacilityManagement;
