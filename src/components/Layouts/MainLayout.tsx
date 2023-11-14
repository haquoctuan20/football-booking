import { Outlet } from "react-router-dom";

const MainLayout = () => {
  return (
    <>
      <h2 className="px-2">navigation</h2>

      <hr />

      <Outlet />
    </>
  );
};

export default MainLayout;
