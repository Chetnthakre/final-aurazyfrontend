import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';

const CartDrawer: React.FC = () => {
  const { cart, removeFromCart, isCartOpen, setIsCartOpen, cartTotal, cartCount } = useCart();
  const navigate = useNavigate();

  const handleCheckout = () => {
    setIsCartOpen(false);
    navigate('/checkout');
  };

  if (!isCartOpen) return null;

  return (
    <div className={`cart-drawer ${isCartOpen ? 'open' : ''}`} id="cart-drawer">
      <div className="cart-header">
        <h3>SHOPPING CART <span id="cart-count">{cartCount}</span></h3>
        <button id="close-cart" onClick={() => setIsCartOpen(false)}>✕</button>
      </div>
  
      <div className="cart-items" id="cart-items">
        {cart.length === 0 ? (
          <p style={{ padding: '1rem', textAlign: 'center' }}>Your cart is empty.</p>
        ) : (
          cart.map((item, index) => (
            <div className="cart-item" key={`${item.name}-${item.size}-${index}`}>
              {item.image && <img src={item.image} alt={item.name} />}
              <div style={{ flex: 1 }}>
                <h4>{item.name}</h4>
                <p>Size: {item.size}</p>
                <p>Qty: {item.quantity}</p>
                <strong>₹{item.price * item.quantity}</strong>
              </div>
              <button 
                onClick={() => removeFromCart(index)}
                style={{
                  background: 'none',
                  border: 'none',
                  color: 'red',
                  cursor: 'pointer',
                  fontSize: '0.8rem'
                }}
              >
                Remove
              </button>
            </div>
          ))
        )}
      </div>

      <div className="cart-footer">
        <div className="subtotal">
          <span>SUBTOTAL:</span>
          <strong id="cart-total">₹{cartTotal}</strong>
        </div>

        <button 
          className="checkout-btn" 
          onClick={handleCheckout}
          disabled={cart.length === 0}
        >
          CHECKOUT
        </button>
      </div>
    </div>
  );
};

export default CartDrawer;
