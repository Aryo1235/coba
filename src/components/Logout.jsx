import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Logout = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Hapus data user dari localStorage
    localStorage.removeItem("token");
    localStorage.removeItem("userId");
    localStorage.removeItem("username");

    // Arahkan kembali ke halaman login
    navigate("/login");
  }, [navigate]);

  return (
    <div className="flex items-center justify-center h-screen">
      <p>Logging out...</p>
    </div>
  );
};

export default Logout;
