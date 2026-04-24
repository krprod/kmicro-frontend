import { useEffect } from "react";
import { useForm, type SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
export type ProductFormValues = {
  name: string;
  price: number;
  quantity: number;
  category: string;
  image: string;
  description: string;
  inStock: boolean;
};

const schema: yup.ObjectSchema<ProductFormValues> = yup
  .object({
    name: yup.string().trim().required("Product name is required").min(2).max(120),
    price: yup
      .number()
      .typeError("Price must be a number")
      .required("Price is required")
      .min(0, "Price cannot be negative"),
    quantity: yup
      .number()
      .typeError("Quantity must be a number")
      .required("Quantity is required")
      .min(0, "Quantity cannot be negative"),
    category: yup.string().trim().required("Category is required"),
    image: yup
      .string()
      .trim()
      .required("Image URL is required")
      .test("valid-url", "Enter a valid URL", (value) => {
        if (!value) return false;
        return /^https?:\/\/.+/i.test(value);
      }),
    description: yup.string().trim().required("Description is required").min(10).max(500),
    inStock: yup.boolean().required(),
  })
  .required();

interface AdminProductFormProps {
  initialValues: ProductFormValues;
  submitting?: boolean;
  submitLabel?: string;
  onCancel: () => void;
  onSubmit: (data: ProductFormValues) => Promise<void> | void;
}

const categories = [
  { "label": "Electronics", "value": "electronics" },
  { "label": "Home & Office", "value": "home & office" },
  { "label": "Fitness", "value": "fitness" },
  { "label": "Kitchen", "value": "kitchen" },
  { "label": "Personal Care", "value": "personal care" },
  { "label": "Home & Kitchen", "value": "home & kitchen" },
  { "label": "Office", "value": "office" },
  { "label": "Footwear", "value": "footwear" },
  { "label": "Home Decor", "value": "home decor" }
]

const AdminProductForm: React.FC<AdminProductFormProps> = ({
  initialValues,
  submitting,
  submitLabel = "Save",
  onCancel,
  onSubmit,
}) => {
  const {
    register,
    handleSubmit,
    reset,
//     control,
    formState: { errors },
  } = useForm<ProductFormValues>({
    resolver: yupResolver(schema),
    defaultValues: initialValues,
  });
  useEffect(() => {
    reset(initialValues);
//     fetachCategories();
  }, [initialValues, reset]);

  const submitHandler: SubmitHandler<ProductFormValues> = async (data) => {
    await onSubmit(data);
  };

  return (
    <form className="grid grid-cols-1 gap-3" onSubmit={handleSubmit(submitHandler)}>
      <div>
       <span className="font-semibold ml-2"> Product Name</span>
        <Input placeholder="Product name" {...register("name")} />
        {errors.name ? <span className="text-xs text-red-600">{String(errors.name.message)}</span> : null}
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div>
                 <span className="font-semibold ml-2"> Price</span>
          <Input type="number" min={0} step="0.01" placeholder="Price" {...register("price")} />
          {errors.price ? <span className="text-xs text-red-600">{String(errors.price.message)}</span> : null}
        </div>
        <div>
                 <span className="font-semibold ml-2"> Quantity</span>
          <Input type="number" min={0} step="1" placeholder="Quantity" {...register("quantity")} />
          {errors.quantity ? (
            <span className="text-xs text-red-600">{String(errors.quantity.message)}</span>
          ) : null}
        </div>
      </div>

      <div >
         <span className="font-semibold ml-2"> Category</span>
         
        <Input placeholder="Category"  {...register("category")}/>
        <span className="text-xs text-gray-500">
                {
                        categories.map((c) => c.label).join(", ")
                }
        </span>

        {errors.category ? (
          <span className="text-xs text-red-600">{String(errors.category.message)}</span>
        ) : null}
      </div>

      <div> <span className="font-semibold ml-2"> Image</span>
        <Input placeholder="Image URL" {...register("image")} />
        {errors.image ? <span className="text-xs text-red-600">{String(errors.image.message)}</span> : null}
      </div>

      <div>
         <span className="font-semibold ml-2"> Description</span>
        <textarea
          className="min-h-24 w-full rounded-md border px-3 py-2 text-sm outline-none focus-visible:ring-2"
          placeholder="Description"
          {...register("description")}
        />
        {errors.description ? (
          <span className="text-xs text-red-600">{String(errors.description.message)}</span>
        ) : null}
      </div>

      <label className="flex items-center gap-2 text-sm text-gray-700">
        <input type="checkbox" {...register("inStock")} />
        In stock
      </label>

      <div className="flex justify-end gap-2">
        <Button type="button" variant="outline" onClick={onCancel}>
          Cancel
        </Button>
        <Button type="submit" disabled={submitting}>
          {submitting ? "Saving..." : submitLabel}
        </Button>
      </div>
    </form>
  );
};

export default AdminProductForm;
