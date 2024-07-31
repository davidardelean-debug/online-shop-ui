import { zodResolver } from "@hookform/resolvers/zod";
import { useContext, useRef } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { useParams } from "react-router-dom";
import { z } from "zod";
import ProductForm from "../../components/product-form/product-form";
import { PRODUCTS_ENDPOINT } from "../../constants";
import useProductCategories from "../../hooks/use-product-categories";
import { ProductContext } from "../../providers/products-provider";
import APIClient from "../../services/api-client";

const ProductSchema = z.object({
  name: z
    .string()
    .min(3, { message: "Name must be at least 3 characters long." })
    .max(50, { message: "Name must be at most 50 characters long." }),
  category: z.string().uuid({ message: "Category must be a valid UUID." }),
  supplier: z
    .string()
    .min(3, { message: "Supplier must be at least 3 characters long." })
    .max(20, { message: "Supplier must be at most 20 characters long." }),
  weight: z.coerce
    .number()
    .positive({ message: "Weight must be a positive number." }),
  imageUrl: z.coerce
    .string()
    .url({ message: "Image URL must be a valid URL." }),
  price: z.coerce
    .number()
    .positive({ message: "Price must be a positive number." }),
  description: z
    .string()
    .min(10, { message: "Description must be at least 10 characters long." })
    .max(200, { message: "Description must be at most 200 characters long." }),
});

export type ProductFormData = z.infer<typeof ProductSchema>;
const ProductFormResolver = zodResolver(ProductSchema);
const EditProduct = () => {
  const { id } = useParams();
  const { data: productCategories } = useProductCategories();
  const { contextProducts: products } = useContext(ProductContext);
  const product = products.find((product) => product.id === id);
  const formRef = useRef<HTMLFormElement>(null);
  console.log("PRODUCT:", product);
  const formDefaultValues = {
    name: product?.name || "",
    category: product?.category?.id || "",
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

  const apiCLient = new APIClient(PRODUCTS_ENDPOINT);
  const handleEditProduct: SubmitHandler<ProductFormData> = async (data) => {
    console.log(data);
    id && apiCLient.update(id, data);

  };
  formRef && console.log("REF", formRef);

  return (
    product &&
    productCategories && (
      <div className="edit-product">
        <h1>Edit Product: {product.name}</h1>
        <div className="edit-product-content">
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
                  console.log("BUTTON CLICKED!");
                  console.log("FORM REF", formRef.current);
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
              {isSubmitSuccessful && <p className="success-message">Product successfully updated!</p>}
            </div>
          </div>
        </div>
      </div>
    )
  );
};

export default EditProduct;
