import "./Navbar.css";
import { useContext } from "react";
import { CartContext } from "../context/CartContext";
import { Link } from "react-router-dom";
import { supabase } from "../supabase";

function Navbar({ openCart, user }) {

  const { cart } = useContext(CartContext);

  const totalItems = cart.reduce(
    (total, item) => total + item.quantity,
    0
  );

  async function logout() {
    await supabase.auth.signOut();
  }

  return (

    <nav className="navbar">

      <div className="logo">
        🛒 ShopHub
      </div>

      <ul className="nav-links">
        <li>Home</li>
        <li>Products</li>
        <li>Categories</li>
        <li>Contact</li>
      </ul>

      <div className="nav-buttons">

        {user ? (
          <>
            <span
  style={{
    color: "white",
    marginRight: "15px",
    maxWidth: "130px",
    overflow: "hidden",
    textOverflow: "ellipsis",
    whiteSpace: "nowrap",
    display: "inline-block",
    verticalAlign: "middle",
  }}
>
  👋 {user.email.split("@")[0]}
</span>
            <button className="login-btn" onClick={logout}>
              Logout
            </button>
          </>
        ) : (
          <Link to="/login">
            <button className="login-btn">
              Login
            </button>
          </Link>
        )}

        <button
          className="cart-btn"
          onClick={openCart}
        >
          🛒 Cart ({totalItems})
        </button>

      </div>

    </nav>

  );
}

export default Navbar;