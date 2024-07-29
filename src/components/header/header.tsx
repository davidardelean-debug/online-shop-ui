import { useContext } from "react";
import { Link } from "react-router-dom";
import { CartContext } from "../../providers/cart-provider";

const Header = () => {
  const {cart} = useContext(CartContext);
  return (
    <div className="header">
      <div className="header-content">
        <Link to="/products">
          <h3 className="site-title">Online shop</h3>
        </Link>
        <div className="action-panel">
          <Link className="cart-widget-icon" to='/cart'>
            <span className="cart-item-number">{cart.length}</span>
            <img src="src/assets/cart.png" width="20" height="20"></img>
          </Link>
          <button className="btn login-btn">
            Log in
          </button>
        </div>
      </div>
    </div>
  );
};

export default Header;
