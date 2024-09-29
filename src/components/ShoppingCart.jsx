import React from 'react';

const ShoppingCart = ({ cartItems, onRemove, onUpdateQuantity, shippingCost, discount }) => {
  
  const calculateTotalBeforeDiscount = () => {
    return cartItems.reduce((total, item) => total + (parseFloat(item.price) * item.quantity), 0);
  };

  const totalBeforeDiscount = calculateTotalBeforeDiscount();
  const discountAmount = (totalBeforeDiscount * discount) / 100;
  const totalAfterDiscount = totalBeforeDiscount - discountAmount;
  const totalWithShipping = totalAfterDiscount + shippingCost;

  const handleCheckout = () => {
    alert('คุณกำลังไปยังหน้าชำระเงิน');
  };

  return (
    <div className="shopping-cart">
      <h2>ตะกร้าสินค้าของคุณ</h2>
      {cartItems.length === 0 ? (
        <p>ไม่มีสินค้าในตะกร้า</p>
      ) : (
        <ul>
          {cartItems.map((item) => (
            <li key={item.id}>
              <div className="cart-item">
                <div>
                  <h4>{item.name}</h4>
                </div>
                <div>
                  <p>ราคา: {parseFloat(item.price).toFixed(2)} บาท</p>
                </div>
                <div>
                  <p>
                    จำนวน: 
                    <input
                      type="number"
                      value={item.quantity}
                      onChange={(e) => onUpdateQuantity(item.id, parseInt(e.target.value))}
                      style={{ width: '50px', marginLeft: '10px' }}
                    />
                  </p>
                </div>
                <button className="remove-button" onClick={() => onRemove(item.id)}>ลบสินค้า</button>
              </div>
            </li>
          ))}
        </ul>
      )}
      <div className="total">
        <h3>ยอดรวมก่อนส่วนลด: {totalBeforeDiscount.toFixed(2)} บาท</h3>
        <h3>ส่วนลด: {discount}%</h3>
        <h3>ยอดรวมหลังส่วนลด: {totalAfterDiscount.toFixed(2)} บาท</h3>
        <h3>ค่าจัดส่ง: {shippingCost} บาท</h3>
        <h2>ยอดรวมทั้งหมด: {totalWithShipping.toFixed(2)} บาท</h2>
      </div>
      
      <button className="checkout-button" onClick={handleCheckout}>
        ชำระเงิน
      </button>
    </div>
  );
};

export default ShoppingCart;
