import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { useParams } from "react-router-dom";
import { z } from "zod";
import ProductForm from "../../components/product-form/product-form";
import useProduct from "../../hooks/use-product";

const ProductSchema = z.object({
  name: z.string(),
  category: z.string().uuid(),
  supplier: z.string(),
  weight: z.number(),
  imageUrl: z.string(),
  price: z.coerce.number().positive(),
  description: z.string().min(10).max(200),
});

export type ProductFormData = z.infer<typeof ProductSchema>;
const ProductFormResolver = zodResolver(ProductSchema);
const EditProduct = () => {
  const { id } = useParams();
  const { data: product } = useProduct(id!);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ProductFormData>({ resolver: ProductFormResolver });

  const handleEditProduct: SubmitHandler<ProductFormData> = async (data) => {
    console.log(data);
    console.log("PRODUCT EDITED");
  };

  return (
    product && (
      <div>
        <ProductForm
          register={register}
          handleSubmit={handleSubmit(handleEditProduct)}
          errors={errors}
          isSubmitting={isSubmitting}
        />
      </div>
    )
  );
};

export default EditProduct;
