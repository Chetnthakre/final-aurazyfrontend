import React, { useEffect, useState } from "react";
import { fetchAnalytics } from "../api";
import {
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  AreaChart,
  Area,
  BarChart,
  Bar,
} from "recharts";

const AdminDashboard: React.FC = () => {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  const BASE_URL = import.meta.env.VITE_API_URL?.replace('/api', '') || "http://localhost:5000";

  useEffect(() => {
    const load = async () => {
      try {
        const res = await fetchAnalytics();
        setData(res.data);
      } catch (error) {
        console.error("Failed to fetch analytics", error);
      } finally {
        setLoading(false);
      }
    };

    load();
  }, []);

  const getMonthName = (month: number) => {
    const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    return months[month - 1];
  };

  const chartData = data?.monthlySales?.map((item: any) => ({
    name: getMonthName(item._id.month),
    revenue: item.totalRevenue,
    orders: item.orderCount,
  })) || [];

  if (loading) return <div style={{ padding: '20px' }}>Loading analytics dashboard...</div>;
  if (!data) return <div style={{ padding: '20px' }}>Failed to load data.</div>;

  return (
    <>
      <div className="head-title">
        <div className="left">
          <h1>Analytics Dashboard</h1>
          <ul className="breadcrumb">
            <li><a href="#">Admin</a></li>
            <li><i className="bx bx-chevron-right"></i></li>
            <li><a className="active" href="#">Dashboard</a></li>
          </ul>
        </div>
        <button className="btn-download" onClick={() => window.print()}>
          <i className="bx bxs-cloud-download"></i>
          <span className="text">Download Report</span>
        </button>
      </div>

      <ul className="box-info">
        <li>
          <i className="bx bxs-calendar-check"></i>
          <span className="text">
            <h3>{data.totalOrders}</h3>
            <p>Total Orders</p>
          </span>
        </li>
        <li>
          <i className="bx bxs-group"></i>
          <span className="text">
            <h3>{data.totalUsers}</h3>
            <p>Total Customers</p>
          </span>
        </li>
        <li>
          <i className="bx bxs-dollar-circle"></i>
          <span className="text">
            <h3>₹{data.totalRevenue.toLocaleString()}</h3>
            <p>Total Revenue</p>
          </span>
        </li>
      </ul>

      <div className="table-data">
        <div className="order">
          <div className="head">
            <h3>Revenue Trends (Last 6 Months)</h3>
          </div>
          <div style={{ width: '100%', height: 300 }}>
            <ResponsiveContainer>
              <AreaChart data={chartData}>
                <defs>
                  <linearGradient id="colorRev" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#3C91E6" stopOpacity={0.8}/>
                    <stop offset="95%" stopColor="#3C91E6" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#eee" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} />
                <YAxis axisLine={false} tickLine={false} />
                <Tooltip />
                <Area type="monotone" dataKey="revenue" stroke="#3C91E6" fillOpacity={1} fill="url(#colorRev)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="todo">
          <div className="head">
            <h3>Best Selling Products</h3>
          </div>
          <ul className="best-sellers-list" style={{ padding: 0 }}>
            {data.bestSellers.map((product: any, idx: number) => (
              <li key={idx} style={{ 
                display: 'flex', 
                alignItems: 'center', 
                gap: '15px', 
                marginBottom: '15px',
                background: 'var(--grey)',
                padding: '10px',
                borderRadius: '10px'
              }}>
                <img src={product.image.startsWith('http') ? product.image : `${BASE_URL}${product.image}`} 
                     alt={product.name} 
                     style={{ width: '40px', height: '40px', borderRadius: '5px', objectFit: 'cover' }} 
                />
                <div style={{ flex: 1 }}>
                  <p style={{ fontWeight: '600', fontSize: '14px' }}>{product.name}</p>
                  <p style={{ fontSize: '12px', color: 'var(--dark-grey)' }}>{product.totalSold} sold</p>
                </div>
                <div style={{ fontWeight: 'bold', color: 'var(--blue)' }}>₹{product.revenue}</div>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="table-data" style={{ marginTop: '24px' }}>
        <div className="order">
          <div className="head">
            <h3>Recent Activity</h3>
            <i className="bx bx-filter"></i>
          </div>
          <table>
            <thead>
              <tr>
                <th>Customer</th>
                <th>Date</th>
                <th>Amount</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {data.recentOrders.map((order: any, idx: number) => (
                <tr key={idx}>
                  <td>
                    <p style={{ fontWeight: '600' }}>{order.shippingAddress.name}</p>
                  </td>
                  <td>{new Date(order.createdAt).toLocaleDateString()}</td>
                  <td>₹{order.totalPrice}</td>
                  <td>
                    <span className={`status ${
                      order.status === "delivered" ? "completed" : 
                      order.status === "processing" || order.status === "paid" ? "process" : "pending"
                    }`}>
                      {order.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="todo">
           <div className="head">
            <h3>Orders by Month</h3>
          </div>
          <div style={{ width: '100%', height: 300 }}>
            <ResponsiveContainer>
              <BarChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#eee" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} />
                <YAxis axisLine={false} tickLine={false} />
                <Tooltip />
                <Bar dataKey="orders" fill="#FD7238" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </>
  );
};

export default AdminDashboard;
