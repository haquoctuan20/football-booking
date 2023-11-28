import { Table } from "react-bootstrap";
import { Link } from "react-router-dom";
import { faker } from "@faker-js/faker";

const FakeData: any = [];

for (let i = 0; i <= 10; i++) {
  FakeData.push({
    name: faker.music.songName(),
    address: faker.location.streetAddress(),
  });
}
console.log("🚀 - FakeData: ", FakeData);

const FacilityManagement = () => {
  return (
    <div>
      <div>
        <Link
          to="/administrator/facility/create"
          className="btn btn-success  btn-sm"
        >
          Tạo sân mới
        </Link>
        ----
        <Link
          to="/administrator/facility/edit/123123123"
          className="btn btn-success btn-sm"
        >
          Chỉnh sửa
        </Link>
      </div>

      <div>Tổng số sân: 12</div>

      <Table bordered hover size="sm" className="mt-3 w-100">
        <thead>
          <tr>
            <th className="min-width-250">Tên sân</th>
            <th className="min-width-250">Địa chỉ</th>
          </tr>
        </thead>
        <tbody>
          {FakeData.map((data: any, index: number) => (
            <tr key={index}>
              <td className="min-width-250">{data?.name}</td>
              <td className="min-width-250">{data?.address}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default FacilityManagement;
