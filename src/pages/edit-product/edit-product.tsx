import { useContext, useRef } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { useParams } from "react-router-dom";
import ProductForm from "../../components/product-form/product-form";
import {
  ProductFormData,
  ProductFormResolver,
} from "../../entities/ProductSchema";
import { ProductContext } from "../../providers/products-provider";
import { ProductService } from "../../services/product-service";
import {
  useGetProductQuery,
  useUpdateProductMutation,
} from "../../services/products-api-slice";

const EditProduct = () => {
  const { id } = useParams();
  const { productCategories } = useContext(ProductContext);
  const { data: product } = useGetProductQuery(id);
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

  const [updateProduct] = useUpdateProductMutation();
  const handleEditProduct: SubmitHandler<ProductFormData> = async (data) => {
    if (id) {
      const updatedProduct = ProductService.generateProduct(
        productCategories,
        data
      );

      if (updatedProduct)
        try {
          updatedProduct.id = id;
          await updateProduct(updatedProduct).unwrap();
        } catch (error) {
          alert("Failed to update the product.");
        }
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
