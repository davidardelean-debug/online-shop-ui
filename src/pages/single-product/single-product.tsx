import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { FALLBACK_IMAGE } from "../../constants";
import { CustomerRoles } from "../../entities/CustomerRoles";
import { useAuth } from "../../hooks/use-auth";
import { useCart } from "../../hooks/use-cart";
import CartService from "../../services/cart-service";
import {
  useDeleteProductMutation,
  useGetProductQuery,
} from "../../services/products-api-slice";

const SingleProduct = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const { data: product, error, isLoading } = useGetProductQuery(id);
  const [quantity, setQuantity] = useState(1);
  const { cart, setCart } = useCart();
  // const { contextProducts, refetchProducts } = useContext(ProductContext);

  const { user } = useAuth();

  const handleQuantityChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newQuantity = parseInt(event.target.value);
    setQuantity(newQuantity);
  };

  const [deleteProduct] = useDeleteProductMutation();
  const handleDelete = async () => {
    if (confirm(`Are you sure you want to delete ${product?.name}?`)) {
      // await new APIClient(PRODUCTS_ENDPOINT, accessToken).remove(id);
      try {
        await deleteProduct(id!).unwrap();
      } catch (error) {
        alert("Failed to delete the product.");
      }
      navigate("/products");
      // const newProducts = contextProducts.filter((item) => item.id !== id);
      // refetchProducts(newProducts);
      const cartItem = cart.find((item) => item.product.id === id);
      cartItem && setCart(CartService.removeFromCart(cartItem, cart));
    }
  };

  const notAdmin = user?.role !== CustomerRoles.ADMIN;
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
                      disabled={notAdmin}
                    >
                      Edit
                    </button>
                    <button
                      className="delete-btn btn"
                      onClick={handleDelete}
                      disabled={notAdmin}
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
        error && <div className="error">An error occured</div>
      )}
    </>
  );
};

export default SingleProduct;
