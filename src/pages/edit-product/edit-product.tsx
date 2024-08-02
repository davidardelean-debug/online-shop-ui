import { useContext, useRef } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { useParams } from "react-router-dom";
import ProductForm from "../../components/product-form/product-form";
import { PRODUCTS_ENDPOINT } from "../../constants";
import {
  ProductFormData,
  ProductFormResolver,
} from "../../entities/ProductSchema";
import { useAuth } from "../../hooks/use-auth";
import { ProductContext } from "../../providers/products-provider";
import APIClient from "../../services/api-client";
import { ProductService } from "../../services/product-service";

const EditProduct = () => {
  const { id } = useParams();
  const {
    contextProducts: products,
    productCategories,
    refetchProducts,
  } = useContext(ProductContext);
  const product = products.find((product) => product.id === id);
  const formRef = useRef<HTMLFormElement>(null);
  const formDefaultValues = {
    name: product?.name || "",
    category: product?.category.id || "",
    supplier: product?.supplier || "",
    weight: product?.weight || undefined,
    imageUrl: product?.imageUrl || "",
    price: product?.price || 0,
    description: product?.description || "",
  };
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting, isSubmitSuccessful },
    reset,
  } = useForm<ProductFormData>({
    resolver: ProductFormResolver,
    defaultValues: formDefaultValues,
  });
  const { accessToken } = useAuth();

  const apiCLient = new APIClient(PRODUCTS_ENDPOINT, accessToken);
  const handleEditProduct: SubmitHandler<ProductFormData> = async (data) => {
    if (id) {
      const updatedProduct = ProductService.generateProduct(
        productCategories,
        data
      );
      updatedProduct &&
        apiCLient
          .update(id, updatedProduct)
          .then((res) => res.json())
          .then((res) => {
            const updatedProducts = products.map((product) =>
              res.id === product.id ? res : product
            );
            refetchProducts(updatedProducts);
          });
    }
  };

  return (
    product &&
    productCategories && (
      <div className="manage-product edit-product">
        <h1>Edit Product: {product.name}</h1>
        <div className="manage-product-content edit-product-content">
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
            <img src={product.imageUrl} alt={product.name} />
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
              <button
                className="btn cancel-btn"
                onClick={() => reset(formDefaultValues)}
              >
                Cancel
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

export default EditProduct;
