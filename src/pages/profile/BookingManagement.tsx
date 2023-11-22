import moment from "moment";
import { Button, Table } from "react-bootstrap";
import styled from "styled-components";
import { MY_BOOKING } from "../../mock/data";
import { WrapperTable } from "../../styles/table";

import { BsListStars } from "react-icons/bs";
import { FaSearchengin } from "react-icons/fa";
import { ImCancelCircle } from "react-icons/im";
import { TbSearchOff } from "react-icons/tb";

const BookingManagement = () => {
  return (
    <WrapperBookingManagement>
      <WrapperTable>
        <Table bordered responsive="xl">
          <thead>
            <tr>
              <th className="min-width-250">Tên sân</th>
              <th className="min-width-150">Thời gian</th>
              <th className="min-width-250">Địa chỉ</th>
              <th className="min-width-120">Giá</th>
              <th className="min-width-150">Trạng thái</th>
            </tr>
          </thead>
          <tbody>
            {MY_BOOKING.map((booking: any, index: number) => (
              <tr key={index} className="height-120 max-height-120">
                <td className="min-width-250">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Rerum, quasi odio quae nihil nam atque.
                </td>
                <td className="min-width-150">
                  {moment(new Date()).format("HH:mm DD/MM/yyyy")}
                </td>
                <td className="min-width-250">Lorem ipsum dolor</td>
                <td className="min-width-120">10.000.000 d</td>
                <td className="min-width-150 ">
                  <div className="d-flex flex-column">
                    {booking.status === "done" && (
                      <>
                        <div className="text-center mb-1">Sẵn sàng tìm đối</div>
                        <Button size="sm" variant="info" className="fw-bold">
                          <FaSearchengin className="fs-5" /> Tìm đối
                        </Button>
                      </>
                    )}

                    {booking.status === "find_competitor" && (
                      <>
                        <div className="text-center mb-1">Đang tìm đối</div>
                        <Button size="sm" variant="warning" className="fw-bold">
                          <TbSearchOff className="fs-5" /> Hủy tìm đối
                        </Button>
                      </>
                    )}

                    {booking.status === "have_competitor" && (
                      <>
                        <div className="text-center mb-1">Đã có đối</div>
                        <Button size="sm" variant="success" className="fw-bold">
                          <BsListStars className="fs-5" /> Xem đối
                        </Button>
                      </>
                    )}

                    <Button size="sm" variant="danger" className="mt-1">
                      <ImCancelCircle className="fs-5" /> Hủy sân
                    </Button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </WrapperTable>
    </WrapperBookingManagement>
  );
};

export default BookingManagement;

export const WrapperBookingManagement = styled.div``;
