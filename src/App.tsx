import "react-datepicker/dist/react-datepicker.css";
import { Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";
import AuthLayout from "./components/Layouts/AuthLayout";
import MainLayout from "./components/Layouts/MainLayout";
import PageLayout from "./components/Layouts/PageLayout";
import Booking from "./pages/Booking/Booking";
import FacilityDetail from "./pages/FacilityDetail/FacilityDetail";
import FacilityList from "./pages/FacilityList/FacilityList";
import ConfirmRegister from "./pages/auth/ConfirmRegister";
import LoginPage from "./pages/auth/LoginPage";
import RegisterPage from "./pages/auth/RegisterPage";
import HomePage from "./pages/home/Home";
import Profile from "./pages/profile/Profile";
import "./styles/index.scss";
import AdministratorLayout from "./components/Layouts/AdministratorLayout";
import FacilityManagement from "./pages/Administrator/FacilityManagement";
import FacilityPage from "./pages/Administrator/FacilityPage";
import FacilityPrice from "./pages/Administrator/FacilityPrice";
import MatchingRequest from "./pages/MatchingRequest/MatchingRequest";
import WsNotification from "./websocket/WsNotification";
import Notifications from "./pages/Notifications/Notifications";

function App() {
  return (
    <>
      <WsNotification />
      <ToastContainer
        position="top-right"
        autoClose={8000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      <Routes>
        <Route path="/" element={<MainLayout />}>
          {/* public */}
          <Route index element={<HomePage />} />

          <Route
            path="profile/:id"
            element={
              <PageLayout title="Trang cá nhân">
                <Profile />
              </PageLayout>
            }
          />

          <Route
            path="facilities-list"
            element={
              <PageLayout title="Tìm sân">
                <FacilityList />
              </PageLayout>
            }
          />

          <Route
            path="matching-request"
            element={
              <PageLayout title="Tìm đối">
                <MatchingRequest />
              </PageLayout>
            }
          />

          <Route
            path="notifications"
            element={
              <PageLayout title="Thông báo">
                <Notifications />
              </PageLayout>
            }
          />

          <Route
            path="booking/:id"
            element={
              <PageLayout title="Đặt sân">
                <Booking />
              </PageLayout>
            }
          />

          {/* <Route
            path="facility-detail/:id"
            element={
              <PageLayout title="Thông tin sân bóng">
                <FacilityDetail />
              </PageLayout>
            }
          /> */}

          {/* auth */}
          <Route
            path="login"
            element={
              <AuthLayout>
                <LoginPage />
              </AuthLayout>
            }
          />
          <Route
            path="register"
            element={
              <AuthLayout>
                <RegisterPage />
              </AuthLayout>
            }
          />

          <Route
            path="confirm-register"
            element={
              <AuthLayout>
                <ConfirmRegister />
              </AuthLayout>
            }
          />
        </Route>

        {/* administrator */}
        <Route path="/administrator/" element={<AdministratorLayout />}>
          <Route path="facility" element={<FacilityManagement />} />
          <Route path="facility/edit/:id" element={<>detail - edit</>} />
          <Route path="facility/create" element={<FacilityPage />} />
          <Route path="facility-price/:id" element={<FacilityPrice />} />
          <Route path="home" element={<>home</>} />
          <Route path="about" element={<>about</>} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
