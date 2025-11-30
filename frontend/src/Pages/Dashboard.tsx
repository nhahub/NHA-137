import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import AdminDashboard from "../Components/AdminDashboard/AdminDashboard";
import UserDashboard from "../Components/UserDashboard/UserDashboard";

const Dashboard: React.FC = () => {
  const navigate = useNavigate();
  const [role, setRole] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const userJson = localStorage.getItem("user");
    const token = localStorage.getItem("token");

    if (!userJson || !token) {
      navigate("/login");
      return;
    }

    try {
      const user = JSON.parse(userJson);
      setRole(user.role);
    } catch (error) {
      console.error("Error parsing user data", error);
      localStorage.clear();
      navigate("/login");
    } finally {
      setLoading(false);
    }
  }, [navigate]);

  if (loading) {
    return (
      <div className="flex justify-center items-center py-20">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-yellow-500"></div>
      </div>
    );
  }

  // The Logic Switch
  if (role === "admin") {
    return <AdminDashboard />;
  } else {
    // Users and Technicians go here
    return <UserDashboard />;
  }
};

export default Dashboard;
