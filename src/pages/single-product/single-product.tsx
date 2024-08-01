import { useContext, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { FALLBACK_IMAGE, PRODUCTS_ENDPOINT } from "../../constants";
import { CartContextObject } from "../../entities/CartContextObject";
import { CustomerRoles } from "../../entities/CustomerRoles";
import { useAuth } from "../../hooks/use-auth";
import useProduct from "../../hooks/use-product";
import { CartContext } from "../../providers/cart-provider";
import { ProductContext } from "../../providers/products-provider";
import APIClient from "../../services/api-client";
import CartService from "../../services/cart-service";

const SingleProduct = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const { data: product, error, isLoading } = useProduct(id!);
  const [quantity, setQuantity] = useState(1);
  const { cart, setCart } = useContext<CartContextObject>(CartContext);
  const { contextProducts, refetchProducts } = useContext(ProductContext);

  const { user, accessToken } = useAuth();

  const handleQuantityChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newQuantity = parseInt(event.target.value);
    setQuantity(newQuantity);
  };

  const handleDelete = async () => {
    if (confirm(`Are you sure you want to delete ${product?.name}?`)) {
      await new APIClient(PRODUCTS_ENDPOINT, accessToken).remove(id);
      navigate("/products");
      const newProducts = contextProducts.filter((item) => item.id !== id);
      refetchProducts(newProducts);
      const cartItem = cart.find((item) => item.product.id === id);
      cartItem && setCart(CartService.removeFromCart(cartItem, cart));
    }
  };

  return (
    <>
      {isLoading && <div className="loader">Loading product...</div>}
      {product ? (
        <div className="single-product">
          <div className="columns column-1">
            <img decoding="auto" src={product.imageUrl || FALLBACK_IMAGE} />
          </div>
          <div className="columns column-2">
            <div className="sticky-section">
              <div className="top-side">
                <div className="actions-wrapper">
                  <h1 className="product-title">{product.name}</h1>
                  <div>
                    <button
                      className="edit-btn btn"
                      onClick={() => navigate("./edit")}
                      disabled={user?.role !== CustomerRoles.ADMIN}
                    >
                      Edit
                    </button>
                    <button
                      className="delete-btn btn"
                      onClick={handleDelete}
                      disabled={user?.role !== CustomerRoles.ADMIN}
                    >
                      Delete
                    </button>
                  </div>
                </div>
                <span className="product-description">
                  {product.description}
                </span>
                <span className="product-category">
                  Category: {product.category.name}
                </span>
                <span className="product-price">Price: ${product.price}</span>
                <span className="product-weight">
                  Weight: {product.weight} kg
                </span>
              </div>
              <div className="bottom-side">
                <input
                  type="number"
                  className="product-quantity"
                  min="1"
                  value={quantity}
                  onChange={handleQuantityChange}
                />
                <button
                  className="atc-btn btn"
                  onClick={() => {
                    setCart(CartService.addToCart({ product, quantity }, cart));
                    navigate("/cart");
                  }}
                >
                  Add to cart
                </button>
              </div>
            </div>
          </div>
        </div>
      ) : (
        error && <div className="error">{error}</div>
      )}
    </>
  );
};

export default SingleProduct;
