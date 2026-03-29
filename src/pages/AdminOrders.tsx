import React, { useEffect, useState } from 'react';
import { fetchAdminOrders, updateOrderStatus } from '../api';
import { useAuth } from '../context/AuthContext';
import { Navigate } from 'react-router-dom';

const AdminOrders: React.FC = () => {
  const { user, loading } = useAuth();
  const [orders, setOrders] = useState<any[]>([]);
  const [fetching, setFetching] = useState(true);

  useEffect(() => {
    if (user?.isAdmin) {
      loadOrders();
    }
  }, [user]);

  const loadOrders = async () => {
    try {
      const { data } = await fetchAdminOrders();
      setOrders(data);
    } catch (error) {
      console.error('Error fetching orders:', error);
    } finally {
      setFetching(false);
    }
  };

  const handleStatusUpdate = async (orderId: string, newStatus: string) => {
    try {
      await updateOrderStatus(orderId, newStatus);
      setOrders(orders.map(order => 
        order._id === orderId ? { ...order, status: newStatus } : order
      ));
    } catch (error) {
      console.error('Error updating status:', error);
      alert('Failed to update status');
    }
  };

  if (loading) return <div className="section__container" style={{ marginTop: '100px' }}>Loading...</div>;
  if (!user?.isAdmin) return <Navigate to="/login" />;

  return (
    <div className="section__container" style={{ marginTop: '100px', minHeight: '80vh' }}>
      <h2 className="section__header">Admin Dashboard - Orders</h2>
      
      {fetching ? (
        <p>Loading orders...</p>
      ) : orders.length === 0 ? (
        <p>No orders found.</p>
      ) : (
        <div style={{ overflowX: 'auto' }}>
          <table className="admin-orders-table" style={{ width: '100%', borderCollapse: 'collapse', marginTop: '20px' }}>
            <thead>
              <tr style={{ borderBottom: '2px solid #eee', textAlign: 'left' }}>
                <th style={{ padding: '12px' }}>Order ID</th>
                <th style={{ padding: '12px' }}>Customer</th>
                <th style={{ padding: '12px' }}>Email</th>
                <th style={{ padding: '12px' }}>Total</th>
                <th style={{ padding: '12px' }}>Status</th>
                <th style={{ padding: '12px' }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <tr key={order._id} style={{ borderBottom: '1px solid #eee' }}>
                  <td style={{ padding: '12px', fontSize: '12px', color: '#666' }}>{order._id}</td>
                  <td style={{ padding: '12px' }}>{order.shippingAddress?.name || 'N/A'}</td>
                  <td style={{ padding: '12px' }}>{order.shippingAddress?.email || 'N/A'}</td>
                  <td style={{ padding: '12px' }}>₹{order.totalPrice}</td>
                  <td style={{ padding: '12px' }}>
                    <span className={`status-badge status-${order.status}`} style={{
                      padding: '4px 8px',
                      borderRadius: '4px',
                      fontSize: '11px',
                      fontWeight: 'bold',
                      textTransform: 'uppercase',
                      backgroundColor: 
                        order.status === 'delivered' ? '#d4edda' : 
                        order.status === 'shipped' ? '#cce5ff' :
                        order.status === 'processing' ? '#fff3cd' : 
                        order.status === 'paid' ? '#e2e3e5' : '#f8d7da',
                      color:
                        order.status === 'delivered' ? '#155724' : 
                        order.status === 'shipped' ? '#004085' :
                        order.status === 'processing' ? '#856404' : 
                        order.status === 'paid' ? '#383d41' : '#721c24'
                    }}>
                      {order.status}
                    </span>
                  </td>
                  <td style={{ padding: '12px' }}>
                    <select 
                      value={order.status} 
                      onChange={(e) => handleStatusUpdate(order._id, e.target.value)}
                      style={{ padding: '4px', borderRadius: '4px', border: '1px solid #ccc', cursor: 'pointer' }}
                    >
                      <option value="pending">Pending</option>
                      <option value="paid">Paid</option>
                      <option value="processing">Processing</option>
                      <option value="shipped">Shipped</option>
                      <option value="delivered">Delivered</option>
                      <option value="failed">Failed</option>
                    </select>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default AdminOrders;