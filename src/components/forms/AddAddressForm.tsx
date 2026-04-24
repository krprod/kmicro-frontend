import { Input } from "../ui/input";
import { FieldGroup, Field, FieldDescription } from "../ui/field";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm, type SubmitHandler } from "react-hook-form";
import * as yup from "yup";
import { Button } from "../ui/button";
import { useApi } from "../../hooks/useApi";
import { useAppDispatch, useAppSelector } from "@/stores/store";
import { closeDailog } from "@/stores/slice/sarkariSlice";
import type { AddressFormType } from "@/core/modals/userT";
import { toast } from "react-toastify";
import { useEffect } from "react";

const schema = yup
  .object({
    country: yup.string().required().min(6).max(30),
    zip_code: yup
      .string()
      .matches(/^\d{4,10}$/, "Zip Code must be 4-10 digits")
      .required(),
    state: yup.string().required().min(6).max(30),
    city: yup.string().required().min(6).max(30),
    address_line1: yup.string().required().min(6).max(60),
    address_line2: yup.string().required().min(6).max(60),
  })
  .required();

const emptyAddress = (): AddressFormType => ({
  country: "",
  zip_code: "",
  state: "",
  city: "",
  address_line1: "",
  address_line2: "",
});

interface AddAddressFormProps {
  initialAddress?: AddressFormType | null;
  onSave: (data: AddressFormType) => void;
}

const AddAddressForm: React.FC<AddAddressFormProps> = ({
  initialAddress,
  onSave,
}) => {
  const isEdit = Boolean(initialAddress?.id);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<AddressFormType>({
    resolver: yupResolver(schema),
    defaultValues: initialAddress ?? emptyAddress(),
  });

  const auth = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();
  const { callApi } = useApi();

  useEffect(() => {
    reset(initialAddress ?? emptyAddress());
  }, [initialAddress, reset]);

  const submission: SubmitHandler<AddressFormType> = async (data) => {
    const payload: AddressFormType & { user_id?: number } = {
      ...data,
      user_id: auth.user?.id,
    };
    if (initialAddress?.id != null) {
      payload.id = initialAddress.id;
    }

    const response = await callApi<AddressFormType>(
      "PUT",
      "/api/users/address/add-update",
      payload
    );

    if (!response.success) {
      toast.error(
        typeof response.error === "string"
          ? response.error
          : "Could not save address"
      );
      return;
    }

    const savedBody = response.data as Partial<AddressFormType> | undefined;
    const merged: AddressFormType = {
      ...data,
      id: savedBody?.id ?? data.id ?? initialAddress?.id,
      user_id: savedBody?.user_id ?? data.user_id ?? auth.user?.id,
    };

    toast.success(isEdit ? "Address updated" : "Address added");
    onSave(merged);
    dispatch(closeDailog());
  };

  return (
    <form onSubmit={handleSubmit(submission)}>
      <FieldGroup>
        <div className="flex flex-col items-center gap-2 text-center">
          <h1 className="text-2xl font-bold">
            {isEdit ? "Edit address" : "Add new address"}
          </h1>
          <p className="text-sm text-balance text-muted-foreground">
            Enter address details below
          </p>
        </div>

        <Field>
          <Input
            type="text"
            placeholder="Country"
            required
            {...register("country", { required: true })}
          />
          {errors.country ? (
            <span className="text-red-700">
              {String(errors.country.message)}
            </span>
          ) : null}
        </Field>

        <Field>
          <Input
            type="text"
            placeholder="State"
            required
            {...register("state", { required: true })}
          />
          {errors.state ? (
            <span className="text-red-700">{String(errors.state.message)}</span>
          ) : null}
        </Field>

        <Field>
          <Input
            type="text"
            placeholder="Zip Code"
            required
            className="col-span-3"
            {...register("zip_code", { required: true })}
          />
          <FieldDescription>
            {errors.zip_code ? (
              <span className="text-red-700">
                {String(errors.zip_code.message)}
              </span>
            ) : null}
          </FieldDescription>
        </Field>

        <Field>
          <Input
            type="text"
            placeholder="City"
            required
            {...register("city", { required: true })}
          />
          <FieldDescription>
            {errors.city ? (
              <span className="text-red-700">
                {String(errors.city.message)}
              </span>
            ) : null}
          </FieldDescription>
        </Field>

        <Field>
          <Input
            type="text"
            placeholder="Address Line 1"
            required
            {...register("address_line1", { required: true })}
          />
          <FieldDescription>
            {errors.address_line1 ? (
              <span className="text-red-700">
                {String(errors.address_line1.message)}
              </span>
            ) : null}
          </FieldDescription>
        </Field>

        <Field>
          <Input
            type="text"
            placeholder="Address Line 2"
            required
            {...register("address_line2", { required: true })}
          />
          <FieldDescription>
            {errors.address_line2 ? (
              <span className="text-red-700">
                {String(errors.address_line2.message)}
              </span>
            ) : null}
          </FieldDescription>
        </Field>

        <Field>
          <Button type="submit">{isEdit ? "Save changes" : "Add address"}</Button>
        </Field>
      </FieldGroup>
    </form>
  );
};

export default AddAddressForm;
