import { Link } from "react-router-dom"

const Header = () => {
  return (
    
    <div className="header">
      <div className="header-content">
        <Link to="/products"><h3 className="site-title">Online shop</h3></Link>
        <a className="login-btn" href="">Log in</a>
      </div>
    </div>
  )
}

export default Header