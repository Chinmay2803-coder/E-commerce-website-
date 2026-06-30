import { useContext } from "react";
import { CartContext } from "../context/CartContext";
import "./Cart.css";

function Cart({ isOpen, onClose }) {

  const {
    cart,
    increase,
    decrease,
    removeFromCart,
    totalPrice,
  } = useContext(CartContext);

  return (
    <div className={`cart-sidebar ${isOpen ? "open" : ""}`}>

      <div className="cart-header">

        <h2>🛒 My Cart</h2>

        <button onClick={onClose}>✖</button>

      </div>

      {cart.length === 0 ? (
        <p className="empty">Cart is Empty</p>
      ) : (

        cart.map((item) => (

          <div className="cart-item" key={item.id}>

            <img src={item.image} alt={item.name} />

            <div>

              <h4>{item.name}</h4>

              <p>₹{item.price}</p>

              <div className="qty">

                <button onClick={() => decrease(item.id)}>
                  -
                </button>

                <span>{item.quantity}</span>

                <button onClick={() => increase(item.id)}>
                  +
                </button>

              </div>

            </div>

            <button
              className="remove"
              onClick={() => removeFromCart(item.id)}
            >
              🗑
            </button>

          </div>

        ))

      )}

      <div className="cart-footer">

        <h3>Total : ₹{totalPrice}</h3>

      </div>

    </div>
  );
}

export default Cart;