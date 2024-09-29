import React from 'react';
import { products } from '../data';

const ProductList = ({ onAdd }) => {
  return (
    <div className="product-list">
      {products.map(product => (
        <div key={product.id} className="product-item">
          <img src={product.imageSrc} alt={product.imageAlt} className="product-image" />
          <h2 className="product-name">{product.name}</h2>
          <p className="product-price">ราคา: {parseFloat(product.price).toFixed()} บาท</p>
          <button className="add-to-cart-button" onClick={() => onAdd(product)}>เพิ่มไปยังตะกร้า</button>
        </div>
      ))}
    </div>
  );
};

export default ProductList;
