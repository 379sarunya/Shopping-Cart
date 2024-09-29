import React, { useState, useRef } from 'react';
import ProductList from './components/ProductList';
import ShoppingCart from './components/ShoppingCart';
import { products } from './data';
import { calculateTotal } from './utils';
import './App.css'; 

const App = () => {
  const [cart, setCart] = useState([]);
  const [coupon, setCoupon] = useState('');
  const [discount, setDiscount] = useState(0);
  const shippingCost = 100;
  const cartRef = useRef(null);

  const addToCart = (product) => {
    const existingItem = cart.find(item => item.id === product.id);
    if (existingItem) {
      setCart(cart.map(item => 
        item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
      ));
    } else {
      setCart([...cart, { ...product, quantity: 1 }]);
    }
    cartRef.current.scrollIntoView({ behavior: 'smooth' }); 
  };

  const removeFromCart = (id) => {
    setCart(cart.filter(item => item.id !== id));
  };

  const updateQuantity = (id, quantity) => {
    if (quantity <= 0) {
      removeFromCart(id);
    } else {
      setCart(cart.map(item => item.id === id ? { ...item, quantity } : item));
    }
  };

  const applyCoupon = () => {
    if (coupon === 'DISCOUNT10') {
      setDiscount(10);
    } else if (coupon === 'DISCOUNT20') {
      setDiscount(20);
    } else {
      setDiscount(0);
    }
  };

  const totalBeforeDiscount = calculateTotal(cart);
  const totalAfterDiscount = totalBeforeDiscount - (totalBeforeDiscount * discount / 100);
  const totalWithShipping = totalAfterDiscount + shippingCost;

  return (
    <div className="app-container">
      <h1 className="app-title">Cases</h1>
      <ProductList onAdd={addToCart} />
      
      <div className="discount-info">
        <h3>กรุณากรอกคูปองเพื่อรับส่วนลด</h3>
        <p>DISCOUNT10</p>
        <p>DISCOUNT20</p>
      </div>

      <div className="coupon-section">
        <input 
          type="text" 
          value={coupon} 
          onChange={(e) => setCoupon(e.target.value)} 
          placeholder="กรอกโค้ดส่วนลด"
        />
        <button onClick={applyCoupon}>ใช้คูปองส่วนลด</button>
      </div>
      
      <div ref={cartRef}> {}
        <ShoppingCart 
          cartItems={cart} 
          onRemove={removeFromCart} 
          onUpdateQuantity={updateQuantity}
          shippingCost={shippingCost}
          discount={discount}
        />
      </div>
    </div>
  );
};

export default App;
