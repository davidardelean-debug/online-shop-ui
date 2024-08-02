import { useContext, useRef } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import ProductForm from "../../components/product-form/product-form";
import {
  ProductFormData,
  ProductFormResolver,
} from "../../entities/ProductSchema";
import { ProductContext } from "../../providers/products-provider";
import { ProductService } from "../../services/product-service";
import { useAddProductMutation } from "../../services/products-api-slice";

const AddProduct = () => {
  const { productCategories } = useContext(ProductContext);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting, isSubmitSuccessful },
  } = useForm<ProductFormData>({
    resolver: ProductFormResolver,
  });
  const formRef = useRef<HTMLFormElement>(null);
  const navigate = useNavigate();

  const [addProduct] = useAddProductMutation();
  const handleEditProduct: SubmitHandler<ProductFormData> = async (data) => {
    const addedProduct = ProductService.generateProduct(
      productCategories,
      data
    );

    if (addedProduct) {
      try {
        await addProduct(addedProduct).unwrap();
      } catch (error) {
        alert("Failed to add the product.");
      }
    }
  };

  return (
    productCategories && (
      <div className="manage-product add-product">
        <h1>Add new Product</h1>
        <div className="manage-product-content add-product-content">
          <div className="columns column-1">
            <ProductForm
              register={register}
              handleSubmit={handleSubmit(handleEditProduct)}
              errors={errors}
              isSubmitting={isSubmitting}
              categories={productCategories}
              ref={formRef}
            />
          </div>
          <div className="columns column-2">
            <div className="buttons">
              <button
                disabled={isSubmitSuccessful}
                className="btn save-btn"
                onClick={() => {
                  formRef.current?.requestSubmit();
                }}
              >
                Save
              </button>
              <button className="btn cancel-btn" onClick={() => navigate(-1)}>
                Go back
              </button>
              {isSubmitSuccessful && (
                <p className="success-message">Product successfully updated!</p>
              )}
            </div>
          </div>
        </div>
      </div>
    )
  );
};

export default AddProduct;
