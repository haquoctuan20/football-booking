import "./App.css";
import { Routes, Route } from "react-router-dom";
import LoginPage from "./pages/auth/Login";
import MainLayout from "./components/Layouts/MainLayout";
import HomePage from "./pages/home/Home";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<HomePage />} />
          <Route path="login" element={<LoginPage />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
