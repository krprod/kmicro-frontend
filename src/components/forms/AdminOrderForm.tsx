import { useEffect } from "react";
import { useForm, type SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export type OrderStatus = "Processing" | "Shipped" | "Delivered" | "Cancelled" | "Placed" | "Failed";
export type PaymentStatus = "Paid" | "Unpaid" | "Pending" | "Failed";

export type OrderFormValues = {
  user_id: number;
  total_amount: number;
  payment_status: PaymentStatus;
  order_status: OrderStatus;
  tracking_number: string;
};

const schema: yup.ObjectSchema<OrderFormValues> = yup
  .object({
    user_id: yup
      .number()
      .typeError("User ID must be a number")
      .required("User ID is required")
      .integer("User ID must be an integer")
      .min(1, "User ID must be greater than 0"),
    total_amount: yup
      .number()
      .typeError("Total amount must be a number")
      .required("Total amount is required")
      .min(0, "Total amount cannot be negative"),
    payment_status: yup
      .mixed<PaymentStatus>()
      .oneOf(["Paid", "Unpaid", "Pending", "Failed"])
      .required("Payment status is required"),
    order_status: yup
      .mixed<OrderStatus>()
      .oneOf(["Processing", "Shipped", "Delivered", "Cancelled", "Placed", "Failed"])
      .required("Order status is required"),
    tracking_number: yup.string().trim().required("Tracking number is required").min(3).max(50),
  })
  .required();

interface AdminOrderFormProps {
  initialValues: OrderFormValues;
  submitting?: boolean;
  submitLabel?: string;
  onCancel: () => void;
  onSubmit: (data: OrderFormValues) => Promise<void> | void;
}

const AdminOrderForm: React.FC<AdminOrderFormProps> = ({
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
    formState: { errors },
  } = useForm<OrderFormValues>({
    resolver: yupResolver(schema),
    defaultValues: initialValues,
  });

  useEffect(() => {
    reset(initialValues);
  }, [initialValues, reset]);

  const submitHandler: SubmitHandler<OrderFormValues> = async (data) => {
    await onSubmit(data);
  };

  return (
    <form className="space-y-3" onSubmit={handleSubmit(submitHandler)}>
      <div>
        <span className="font-semibold">User ID</span>
        <Input type="number" placeholder="User ID" {...register("user_id")}  />
        {errors.user_id ? (
          <span className="text-xs text-red-600">{String(errors.user_id.message)}</span>
        ) : null}
      </div>
      <div>
        <span className="font-semibold">Total Amount</span>
        <Input type="number" placeholder="Total amount" step="0.01" min={0} {...register("total_amount")} />
        {errors.total_amount ? (
          <span className="text-xs text-red-600">{String(errors.total_amount.message)}</span>
        ) : null}
      </div>
      <div>
        <span className="font-semibold">Tracking Number</span>
        <Input placeholder="Tracking number" {...register("tracking_number")} />
        {errors.tracking_number ? (
          <span className="text-xs text-red-600">{String(errors.tracking_number.message)}</span>
        ) : null}
      </div>
      <div className="grid grid-cols-2 gap-3">
        <div>
          <span className="font-semibold">Payment Status</span>
          <select className="w-full rounded-md border px-3 py-2 text-sm" {...register("payment_status")}>
            <option value="Pending">Pending</option>
            <option value="Paid">Paid</option>
            <option value="Unpaid">Unpaid</option>
                <option value="Failed">Failed</option>
          </select>
          {errors.payment_status ? (
            <span className="text-xs text-red-600">{String(errors.payment_status.message)}</span>
          ) : null}
        </div>
        <div>
                <span className="font-semibold">Order Status</span>
          <select className="w-full rounded-md border px-3 py-2 text-sm" {...register("order_status")}>
                             <option value="Placed">Placed</option>
            <option value="Processing">Processing</option>
            <option value="Shipped">Shipped</option>
            <option value="Delivered">Delivered</option>
            <option value="Cancelled">Cancelled</option>
                <option value="Failed">Failed</option>

          </select>
          {errors.order_status ? (
            <span className="text-xs text-red-600">{String(errors.order_status.message)}</span>
          ) : null}
        </div>
      </div>
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

export default AdminOrderForm;
