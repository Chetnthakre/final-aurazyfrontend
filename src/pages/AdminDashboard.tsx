import React, { useEffect, useState } from "react";
import { fetchAnalytics } from "../api";

const AdminDashboard: React.FC = () => {
  const [data, setData] = useState<any>({});

  useEffect(() => {
    const load = async () => {
      const res = await fetchAnalytics();
      setData(res.data);
    };
    load();
  }, []);

  return (
    <div>
      <h1>Admin Dashboard</h1>

      <h2>Total Revenue: ₹{data.totalRevenue}</h2>
      <h2>Total Orders: {data.totalOrders}</h2>
    </div>
  );
};

export default AdminDashboard;