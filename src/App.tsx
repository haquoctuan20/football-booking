import "./App.css";
import { Routes, Route } from "react-router-dom";
import LoginPage from "./pages/auth/LoginPage";
import MainLayout from "./components/Layouts/MainLayout";
import HomePage from "./pages/home/Home";
import RegisterPage from "./pages/auth/RegisterPage";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<HomePage />} />
          <Route path="login" element={<LoginPage />} />
          <Route path="register" element={<RegisterPage />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
