import { Button } from "@mui/material";
import { useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { FALLBACK_IMAGE } from "../../constants";
import { CustomerRoles } from "../../entities/CustomerRoles";
import CartService from "../../services/cart-service";
import {
  useDeleteProductMutation,
  useGetProductQuery,
} from "../../services/products-api";
import { setCart } from "../../slices/cart-slice";
import { RootState, store } from "../../store";

const SingleProduct = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const { data: product, error, isLoading } = useGetProductQuery(id);
  const [quantity, setQuantity] = useState(1);
  const cart = useSelector((state: RootState) => state.cart);

  const user = useSelector((state: RootState) => state.auth.user);

  const handleQuantityChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newQuantity = parseInt(event.target.value);
    setQuantity(newQuantity);
  };

  const [deleteProduct] = useDeleteProductMutation();
  const handleDelete = async () => {
    if (confirm(`Are you sure you want to delete ${product?.name}?`)) {
      try {
        await deleteProduct(id!).unwrap();
      } catch (error) {
        alert("Failed to delete the product.");
      }
      navigate("/products");
      const cartItem = cart.find((item) => item.product.id === id);
      cartItem &&
        store.dispatch(setCart(CartService.removeFromCart(cartItem, cart)));
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
                    <Button
                      variant="contained"
                      className="edit-btn btn"
                      onClick={() => navigate("./edit")}
                      disabled={notAdmin}
                    >
                      Edit
                    </Button>
                    <Button
                      variant="contained"
                      className="delete-btn btn"
                      onClick={handleDelete}
                      disabled={notAdmin}
                    >
                      Delete
                    </Button>
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
                    store.dispatch(
                      setCart(
                        CartService.addToCart({ product, quantity }, cart)
                      )
                    );
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
