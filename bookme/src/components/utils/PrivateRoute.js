import { Navigate } from "react-router-dom";

export const PrivateAdminRoute = ({ children }) => {
  const userInfo = JSON.parse(localStorage.getItem("userInfo"));
  const token = localStorage.getItem("token");

  if (!token || !userInfo) {
    return <Navigate to="/login" />;
  }

  if (userInfo.role !== "Admin") {
    return <Navigate to="/" />;
  }

  return children;
};
