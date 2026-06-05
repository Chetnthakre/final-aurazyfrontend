import React, { useEffect, useState } from 'react';
import { fetchAdminOrders, updateOrderStatus } from '../api';

interface OrderItem {
  productId: string;
  name: string;
  quantity: number;
  price: number;
  image: string;
}

interface Order {
  _id: string;
  items: OrderItem[];
  shippingAddress: {
    name: string;
    email: string;
    phone: string;
    address: string;
    city: string;
    pincode: string;
  };
  totalPrice: number;
  status: string;
  createdAt: string;
}

const AdminOrders: React.FC = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [fetching, setFetching] = useState(true);
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    loadOrders();
  }, []);

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
      if (selectedOrder && selectedOrder._id === orderId) {
        setSelectedOrder({ ...selectedOrder, status: newStatus });
      }
    } catch (error) {
      console.error('Error updating status:', error);
      alert('Failed to update status');
    }
  };

  const viewOrderDetails = (order: Order) => {
    setSelectedOrder(order);
    setShowModal(true);
  };

  if (fetching) return <div style={{ padding: '20px' }}>Loading orders...</div>;

  return (
    <>
      <div className="head-title">
        <div className="left">
          <h1>Orders Management</h1>
          <ul className="breadcrumb">
            <li><a href="#">Dashboard</a></li>
            <li><i className="bx bx-chevron-right"></i></li>
            <li><a className="active" href="#">Orders</a></li>
          </ul>
        </div>
      </div>

      <div className="table-data">
        <div className="order">
          <div className="head">
            <h3>Recent Orders</h3>
            <i className="bx bx-search"></i>
            <i className="bx bx-filter"></i>
          </div>
          <table>
            <thead>
              <tr>
                <th>Order ID</th>
                <th>Customer</th>
                <th>Date</th>
                <th>Total</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {orders.length > 0 ? (
                orders.map((order) => (
                  <tr key={order._id}>
                    <td>
                      <span 
                        style={{ fontSize: '12px', color: 'var(--blue)', cursor: 'pointer', fontWeight: 'bold' }}
                        onClick={() => viewOrderDetails(order)}
                      >
                        #{order._id.substring(order._id.length - 8).toUpperCase()}
                      </span>
                    </td>
                    <td>
                      <div style={{ display: 'flex', flexDirection: 'column' }}>
                        <span style={{ fontWeight: '500' }}>{order.shippingAddress?.name || 'Guest'}</span>
                        <span style={{ fontSize: '11px', color: 'var(--dark-grey)' }}>{order.shippingAddress?.email}</span>
                      </div>
                    </td>
                    <td>{new Date(order.createdAt).toLocaleDateString()}</td>
                    <td>₹{order.totalPrice}</td>
                    <td>
                      <span className={`status ${
                        order.status === 'delivered' ? 'completed' : 
                        order.status === 'shipped' ? 'completed' : 
                        order.status === 'processing' || order.status === 'paid' ? 'process' : 'pending'
                      }`}>
                        {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                      </span>
                    </td>
                    <td>
                      <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                        <select 
                          value={order.status} 
                          onChange={(e) => handleStatusUpdate(order._id, e.target.value)}
                          style={{ 
                            padding: '6px', 
                            borderRadius: '6px', 
                            border: '1px solid var(--dark-grey)',
                            background: 'var(--light)',
                            color: 'var(--dark)',
                            fontSize: '12px'
                          }}
                        >
                          <option value="pending">Pending</option>
                          <option value="paid">Paid</option>
                          <option value="processing">Processing</option>
                          <option value="shipped">Shipped</option>
                          <option value="delivered">Delivered</option>
                          <option value="failed">Failed</option>
                        </select>
                        <i 
                          className="bx bx-show" 
                          style={{ cursor: 'pointer', color: 'var(--blue)', fontSize: '20px' }}
                          onClick={() => viewOrderDetails(order)}
                        ></i>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr><td colSpan={6} style={{ textAlign: 'center', padding: '20px' }}>No orders found</td></tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {showModal && selectedOrder && (
        <div className="modal-overlay">
          <div className="modal-content" style={{ width: '700px' }}>
            <div className="head">
              <h3>Order Details #{selectedOrder._id.substring(selectedOrder._id.length - 8).toUpperCase()}</h3>
              <i className="bx bx-x" onClick={() => setShowModal(false)} style={{ cursor: 'pointer', fontSize: '24px' }}></i>
            </div>
            
            <div className="order-details-grid">
              <div className="section">
                <h4>Customer Info</h4>
                <p><strong>Name:</strong> {selectedOrder.shippingAddress.name}</p>
                <p><strong>Email:</strong> {selectedOrder.shippingAddress.email}</p>
                <p><strong>Phone:</strong> {selectedOrder.shippingAddress.phone}</p>
              </div>
              <div className="section">
                <h4>Shipping Address</h4>
                <p>{selectedOrder.shippingAddress.address}</p>
                <p>{selectedOrder.shippingAddress.city}, {selectedOrder.shippingAddress.pincode}</p>
              </div>
            </div>

            <div className="order-items" style={{ marginTop: '20px' }}>
              <h4>Items</h4>
              <table style={{ width: '100%', marginTop: '10px', borderCollapse: 'collapse' }}>
                <thead>
                  <tr style={{ background: 'var(--grey)', textAlign: 'left' }}>
                    <th style={{ padding: '10px' }}>Product</th>
                    <th style={{ padding: '10px' }}>Qty</th>
                    <th style={{ padding: '10px' }}>Price</th>
                    <th style={{ padding: '10px' }}>Total</th>
                  </tr>
                </thead>
                <tbody>
                  {selectedOrder.items.map((item, idx) => (
                    <tr key={idx} style={{ borderBottom: '1px solid var(--grey)' }}>
                      <td style={{ padding: '10px', display: 'flex', alignItems: 'center', gap: '10px' }}>
                        <img src={item.image} alt={item.name} style={{ width: '40px', height: '40px', objectFit: 'cover', borderRadius: '4px' }} />
                        {item.name}
                      </td>
                      <td style={{ padding: '10px' }}>{item.quantity}</td>
                      <td style={{ padding: '10px' }}>₹{item.price}</td>
                      <td style={{ padding: '10px' }}>₹{item.price * item.quantity}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <div style={{ textAlign: 'right', marginTop: '15px' }}>
                <h3>Grand Total: ₹{selectedOrder.totalPrice}</h3>
              </div>
            </div>

            <div style={{ marginTop: '20px', display: 'flex', justifyContent: 'flex-end' }}>
              <button className="btn-download" onClick={() => setShowModal(false)} style={{ border: 'none', cursor: 'pointer' }}>
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      <style>{`
        .modal-overlay {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: rgba(0,0,0,0.5);
          display: flex;
          justify-content: center;
          align-items: center;
          z-index: 3000;
        }
        .modal-content {
          background: var(--light);
          padding: 30px;
          border-radius: 20px;
          max-width: 90%;
          max-height: 90vh;
          overflow-y: auto;
          color: var(--dark);
        }
        .modal-content .head {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 20px;
          border-bottom: 1px solid var(--grey);
          padding-bottom: 10px;
        }
        .order-details-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 20px;
        }
        .section h4 {
          margin-bottom: 10px;
          color: var(--blue);
          border-bottom: 1px solid var(--grey);
          padding-bottom: 5px;
        }
        .section p {
          margin-bottom: 5px;
          font-size: 14px;
        }
        .order-items h4 {
           color: var(--blue);
           margin-bottom: 10px;
        }
      `}</style>
    </>
  );
};

export default AdminOrders;
