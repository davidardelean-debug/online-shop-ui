import React, { forwardRef } from "react";
import { FieldErrors, UseFormRegister } from "react-hook-form";
import ProductCategory from "../../entities/ProductCategory";
import { ProductFormData } from "../../pages/edit-product/edit-product";

export interface ProductFormProps {
  register: UseFormRegister<ProductFormData>;
  handleSubmit: (e?: React.BaseSyntheticEvent) => Promise<void>;
  errors: FieldErrors<ProductFormData>;
  isSubmitting: boolean;
  categories: ProductCategory[];
}

const ProductForm = forwardRef<HTMLFormElement, ProductFormProps>(
  (
    {
      register,
      handleSubmit,
      errors,
      isSubmitting,
      categories,
    }: ProductFormProps,
    ref
  ) => {
    return (
      <form className="product-form" onSubmit={handleSubmit} ref={ref}>
        <label>
          Name:
          <input {...register("name")} placeholder="" />
          {errors.name && <p className="field-error">{errors.name.message}</p>}
        </label>
        <label>
          Category:
          <select {...register("category")}>
            {categories.map((category) => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
          </select>
          {errors.category && (
            <p className="field-error">{errors.category.message}</p>
          )}
        </label>
        <label>
          Supplier:
          <input {...register("supplier")} placeholder="" />
          {errors.supplier && (
            <p className="field-error">{errors.supplier.message}</p>
          )}
        </label>
        <label>
          Image url:
          <input {...register("imageUrl")} placeholder="" />
          {errors.imageUrl && (
            <p className="field-error">{errors.imageUrl.message}</p>
          )}
        </label>
        <label>
          Weight:
          <input {...register("weight")} placeholder="" type="number" min="0" step="0.01"/>
          {errors.weight && (
            <p className="field-error">{errors.weight.message}</p>
          )}
        </label>
        <label>
          Price:
          <input {...register("price")} placeholder="" type="number" min='0' step='0.01' />
          {errors.price && (
            <p className="field-error">{errors.price.message}</p>
          )}
        </label>
        <label>
          Description:
          <textarea {...register("description")} placeholder="" />
          {errors.description && (
            <p className="field-error">{errors.description.message}</p>
          )}
        </label>

        {isSubmitting && "Loading"}
      </form>
    );
  }
);

export default ProductForm;
