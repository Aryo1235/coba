import { Navigate, Outlet } from "react-router-dom";

export default function ProtectedRoute() {
  const isAuthenticated = localStorage.getItem("token"); // Cek status autentikasi dari localStorage
  // ngecek level, status, role dari usernya. akan membuat sebuah hoook/function untuk cek auth
  return isAuthenticated ? <Outlet /> : <Navigate to="/login" />;
}
