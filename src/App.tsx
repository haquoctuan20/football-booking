import { Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "./App.css";
import MainLayout from "./components/Layouts/MainLayout";
import LoginPage from "./pages/auth/LoginPage";
import RegisterPage from "./pages/auth/RegisterPage";
import HomePage from "./pages/home/Home";
import "react-toastify/dist/ReactToastify.css";
import AuthLayout from "./components/Layouts/AuthLayout";
import ConfirmRegister from "./pages/auth/ConfirmRegister";

function App() {
  return (
    <>
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
          <Route index element={<HomePage />} />

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
            path="confirm-register/:mail"
            element={
              <AuthLayout>
                <ConfirmRegister />
              </AuthLayout>
            }
          />
        </Route>
      </Routes>
    </>
  );
}

export default App;
