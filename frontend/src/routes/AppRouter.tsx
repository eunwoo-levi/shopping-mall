import { Route, Routes } from "react-router-dom";
import Home from "../page/home/Home";
import Login from "../page/login/Login";
import Register from "../page/register/Register";

export default function AppRouter() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/register" element={<Register />} />
      <Route path="/login" element={<Login />} />
    </Routes>
  );
}
