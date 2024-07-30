import { Link } from "react-router-dom"

const EmptyCart = () => {
  return (
    <div className="empty-cart">
        <h1>Your cart is empty</h1>
        <Link to='/products' className="btn">Get back to shopping</Link>
    </div>
  )
}

export default EmptyCart