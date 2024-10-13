import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { removeItem, updateQuantity } from './CartSlice';
import './CartItem.css';

const CartItem = ({ onContinueShopping }) => {
  const cart = useSelector(state => state.cart.items);
  const dispatch = useDispatch();

  // Calculate total amount for all products in the cart
  const calculateTotalAmount = (cartItems) => {
    // Usamos la función reduce para sumar el coste total
    const totalAmount = cartItems.reduce((total, item) => {
        
        return total + item.quantity * parseFloat(item.cost.replace('$', ''));
    }, 0); // El total inicial se establece en 0
    return totalAmount;
  };

  const handleContinueShopping = (e) => {
  e.preventDefault();
  onContinueShopping(); // Llama a la función pasada desde el componente padre

};
  const handleIncrement = (item) => {
    dispatch(updateQuantity({ ...item, quantity: item.quantity + 1 }));
  };

  const handleDecrement = (item) => {
    if (item.quantity > 1) {
      dispatch(updateQuantity({ ...item, quantity: item.quantity - 1 }));
    } else {
      dispatch(removeItem(item.name)); // Remove the item if quantity reaches 0
    }
  };

  const handleRemove = (item) => {
    dispatch(removeItem(item.name)); // Remove the item from the cart using its name
  };

  // Calculate total cost based on quantity for an item
  const calculateTotalCost = (item) => {
    return  parseFloat(item.cost.replace('$', '')) * item.quantity;
  };

  return (
    <div className="cart-container">
      <h2 style={{ color: 'black' }}>Total Cart Amount: ${calculateTotalAmount(cart)}</h2>
      <div>
        {cart.map(item => (
          <div className="cart-item" key={item.name}>
            <img className="cart-item-image" src={item.image} alt={item.name} />
            <div className="cart-item-details">
              <div className="cart-item-name">{item.name}</div>
              <div className="cart-item-cost">Price: ${item.cost}</div>
              <div className="cart-item-quantity">
                <button
                  className="cart-item-button cart-item-button-dec"
                  onClick={() => handleDecrement(item)}
                >
                  -
                </button>
                <span className="cart-item-quantity-value">{item.quantity}</span>
                <button
                  className="cart-item-button cart-item-button-inc"
                  onClick={() => handleIncrement(item)}
                >
                  +
                </button>
              </div>
              <div className="cart-item-total">Subtotal: ${calculateTotalCost(item)}</div>
              <button className="cart-item-delete" onClick={() => handleRemove(item)}>
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
      <div style={{ marginTop: '20px', color: 'black' }} className='total_cart_amount'></div>
      <div className="continue_shopping_btn">
        <button className="get-started-button" onClick={() => handleContinueShopping()}>
          Continue Shopping
        </button>
        <br />
        <button className="get-started-button1" onClick={() => alert('Functionality to be added for future reference')}>
          Checkout
        </button>
      </div>
    </div>
  );
};

export default CartItem;



