export interface RouteTitleAttribute {
  title: string;
  path: string;
  parent: string;
  isMenu: boolean;
}

export const RouteTitle: RouteTitleAttribute[] = [
  // facility
  {
    title: "Quản lý cơ sở",
    path: "/administrator/facility",
    parent: "/administrator/facility",
    isMenu: true,
  },
  {
    title: "Chỉnh sửa thông tin sân",
    path: "/administrator/facility/edit/:id",
    parent: "/administrator/facility",
    isMenu: false,
  },
  {
    title: "Thêm cơ sở mới",
    path: "/administrator/facility/create",
    parent: "/administrator/facility",
    isMenu: false,
  },
  {
    title: "Bảng giá cơ sở",
    path: "/administrator/facility-price/:id",
    parent: "/administrator/facility",
    isMenu: false,
  },
  //
  {
    title: "Home",
    path: "/administrator/home",
    parent: "/administrator/home",
    isMenu: true,
  },
  //
  {
    title: "About",
    path: "/administrator/about",
    parent: "/administrator/about",
    isMenu: true,
  },
];
