import { Button, Table } from "react-bootstrap";
import moment from "moment";
import { WrapperTable } from "../../styles/table";
import styled from "styled-components";

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
              <th className="min-width-100">Trạng thái</th>
              <th className="min-width-100">Đối</th>
              <th className="min-width-100"></th>
            </tr>
          </thead>
          <tbody>
            <tr className="height-120">
              <td className="min-width-250">
                Lorem ipsum dolor sit amet consectetur, adipisicing elit.
                Officiis cupiditate molestiae vero.
              </td>
              <td className="min-width-150">
                {moment(new Date()).format("HH:mm DD/MM/yyyy")}
              </td>
              <td className="min-width-250">
                Lorem ipsum dolor sit amet consectetur, adipisicing elit.
                Officiis cupiditate molestiae vero.
              </td>
              <td className="min-width-120">10.000.000 d</td>
              <td className="min-width-100">ok</td>
              <td className="min-width-100">ok</td>
              <td className="min-width-100 d-flex flex-column align-items-center">
                <Button size="sm">Huy san</Button>
                <Button size="sm">Huy san</Button>
                <Button size="sm">Huy san</Button>
              </td>
            </tr>
          </tbody>
        </Table>
      </WrapperTable>
    </WrapperBookingManagement>
  );
};

export default BookingManagement;

export const WrapperBookingManagement = styled.div``;
