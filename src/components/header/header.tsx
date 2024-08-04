import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { clearCredentials } from "../../slices/auth-slice";
import { setCart } from "../../slices/cart-slice";
import { RootState, store } from "../../store";

const Header = () => {
  const cart = useSelector((state: RootState) => state.cart);
  const user = useSelector((state: RootState) => state.auth.user);
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
              <Link
                className="btn logout-btn"
                to={"/login"}
                onClick={() => {
                  // logout();
                  store.dispatch(clearCredentials());
                  store.dispatch(setCart([]));
                }}
                replace
              >
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
