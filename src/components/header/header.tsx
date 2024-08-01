import { useContext } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../hooks/use-auth";
import { CartContext } from "../../providers/cart-provider";

const Header = () => {
  const { cart } = useContext(CartContext);
  const {user,  logout} = useAuth();
  return (
    <div className="header">
      <div className="header-content">
        <Link to="/products">
          <h3 className="site-title">Online shop</h3>
        </Link>
        <div className="action-panel">
          <Link className="cart-widget-icon" to="/cart">
            <span className="cart-item-number">{cart.length}</span>
            <img src="src/assets/cart.png" width="20" height="20"></img>
          </Link>
          {user?.username ? (
            <div className="user-profile">
              <span>Hello, {user.firstName}</span>
              <Link className="btn logout-btn" to={"/login"} onClick={()=>logout()} replace>
                Log out
              </Link>
            </div>
          ) : (
            <Link className="btn login-btn" to={"/login"}>
              Log in
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default Header;
