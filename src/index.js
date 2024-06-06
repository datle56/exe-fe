import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";

import "assets/plugins/nucleo/css/nucleo.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "assets/scss/argon-dashboard-react.scss";

import AdminLayout from "layouts/Admin.js";
import AuthLayout from "layouts/Auth.js";
import UserLayout from "layouts/User.js";
import TutorLayout from "layouts/Tutor.js";
import Login from "components/login.js";
import Register from "components/register";
import Homepage from "components/Homepage/Homepage.jsx";
import App from "components/test voice/App.js";
import Pay from "components/Pay/Pay.jsx";

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <BrowserRouter>
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/" element={<Homepage />} />

      <Route path="/test" element={<App />} />

      <Route path="/payments/:packageId" element={<Pay />} />

      <Route path="/admin/*" element={<AdminLayout />} />
      <Route path="/auth/*" element={<AuthLayout />} />
      <Route path="/user/*" element={<UserLayout />} />
      <Route path="/tutor/*" element={<TutorLayout />} />

      {/* Đảm bảo không có chuyển hướng mặc định tới /admin/index */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  </BrowserRouter>
);
