import React from "react";
import {
  FieldErrors,
  UseFormRegister
} from "react-hook-form";
import { ProductFormData } from "../../pages/edit-product/edit-product";

interface ProductFormProps {
  register: UseFormRegister<ProductFormData>;
  handleSubmit: (e?: React.BaseSyntheticEvent) => Promise<void>;
  errors: FieldErrors<ProductFormData>;
  isSubmitting: boolean;
}

const ProductForm = ({
  register,
  handleSubmit,
  errors,
  isSubmitting,
}: ProductFormProps) => {
  console.log("ERRORS:", errors);
  return (
    <form className="product-form" onSubmit={handleSubmit}>
      <label htmlFor="name">
        Name: 
        <input
          {...register("name")}
          placeholder=""
        />
      </label>
      <label htmlFor="category">
        Category: 
        <input
          {...register("category")}
          placeholder=""
        />
      </label>
      <label htmlFor="supplier">
        Supplier: 
        <input
          {...register("supplier")}
          placeholder=""
        />
      </label>
      <label htmlFor="image-url">
        Image url: 
        <input
          {...register("imageUrl")}
          placeholder=""
        />
      </label>
      <label htmlFor="weight">
        Weight: 
        <input
          {...register("weight")}
          placeholder=""
        />
      </label>
      <label htmlFor="price">
        Price: 
        <input
          {...register("price")}
          placeholder=""
        />
      </label>
      <label htmlFor="description">
        Description: 
        <textarea
          {...register("description")}
          placeholder=""
        />
      </label>
      <input type="submit" value="Submit"/>
      {isSubmitting && "Loading"}
    </form>

  );
};

export default ProductForm;
