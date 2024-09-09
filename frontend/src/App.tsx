import { Route, Routes } from "react-router-dom";
import Home from "./page/home/Home";
import Register from "./page/register/Register";
import Login from "./page/login/Login";

export default function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </>
  );
}
