export const calculateTotal = (cart) => {
  return cart.reduce((total, item) => {
    const itemPrice = parseFloat(item.price) || 0;  
    const itemQuantity = parseInt(item.quantity, 10) || 0;  
    return total + (itemPrice * itemQuantity);
  }, 0);
};
