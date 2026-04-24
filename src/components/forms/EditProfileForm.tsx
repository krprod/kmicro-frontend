import { Input } from "../ui/input";
import { FieldGroup, Field, FieldDescription } from "../ui/field";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm, type SubmitHandler } from "react-hook-form";
import * as yup from "yup";
import { Button } from "../ui/button";
import { useApi } from "@/hooks/useApi";
import { useAppDispatch } from "@/stores/store";
import { closeDailog } from "@/stores/slice/sarkariSlice";
import { updateUser } from "@/stores/slice/authSlice";
import type { UserApiType, UserT } from "@/core/modals/userT";
import { toast } from "react-toastify";
import { useEffect } from "react";

/** Aligns with `UserT` and login mapping (`first_name` → `name`). */
export type ProfileFormValues = {
  name: string;
  contact: string;
  imageUrl?: string;
};

const schema: yup.ObjectSchema<ProfileFormValues> = yup
  .object({
    name: yup.string().required("Name is required").min(2).max(80),
    contact: yup
      .string()
      .matches(/^\d{9,13}$/, "Contact number must be 9-13 digits")
      .required(),
    imageUrl: yup
      .string()
      .trim()
      .optional()
      .test(
        "url-or-empty",
        "Enter a valid URL",
        (v) => !v || /^https?:\/\/.+/i.test(v)
      ),
  })
  .required();

const userToFormValues = (user: UserT): ProfileFormValues => ({
  name: user.name ?? "",
  contact: user.contact ?? "",
  imageUrl: user.imageUrl ?? "",
});

function mapApiToUserT(api: UserApiType): UserT {
  return {
    id: api.id,
    name: api.first_name || api.login_name || "",
    email: api.email,
    contact: api.contact,
    imageUrl: api.avtar,
  };
}

interface EditProfileFormProps {
  user: UserT;
  /** When set, skip global `closeDailog` and call this after a successful save (e.g. local `Dialog`). */
  onDismiss?: () => void;
}

const EditProfileForm: React.FC<EditProfileFormProps> = ({ user, onDismiss }) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ProfileFormValues>({
    resolver: yupResolver(schema),
    defaultValues: userToFormValues(user),
  });

  const dispatch = useAppDispatch();
  const { callApi } = useApi();

  useEffect(() => {
    reset(userToFormValues(user));
  }, [user, reset]);

  const submission: SubmitHandler<ProfileFormValues> = async (data) => {
    const payload = {
      id: user.id,
      firstname: data.name.trim(),
      lastname: "",
//       email: data.email.trim(),
      contact: data.contact?.trim() ?? "",
      avtar: data.imageUrl?.trim() ?? "",
    };

    const response = await callApi<UserApiType | { user: UserApiType }>(
      "PUT",
      `/api/users/${user.id}`,
      payload
    );

    if (!response.success) {
      toast.error(
        typeof response.error === "string"
          ? response.error
          : "Could not update profile"
      );
      return;
    }

    let nextUser: UserT | null = null;
    const body = response.data;
    if (body && typeof body === "object") {
      if ("user" in body && body.user) {
        nextUser = mapApiToUserT(body.user);
      } else if ("id" in body && "email" in body) {
        nextUser = mapApiToUserT(body as UserApiType);
      }
    }

    if (!nextUser) {
      nextUser = {
        ...user,
        contact: data.contact?.trim() || undefined,
        imageUrl: data.imageUrl?.trim() || undefined,
      };
    }

    dispatch(updateUser(nextUser));
    toast.success("Profile updated");
    if (onDismiss) {
      onDismiss();
    } else {
      dispatch(closeDailog());
    }
  };

  return (
    <form onSubmit={handleSubmit(submission)}>
      <FieldGroup>
        <div className="flex flex-col items-center gap-2 text-center">
          <h1 className="text-2xl font-bold">Edit profile</h1>
          <p className="text-sm text-balance text-muted-foreground">
            Update your name, email, contact, and photo URL
          </p>
        </div>

        <Field>
          <Input
            type="text"
            placeholder="Full name"
            autoComplete="name"
            {...register("name")}
          />
          {errors.name ? (
            <span className="text-red-700">{String(errors.name.message)}</span>
          ) : null}
        </Field>

       {/*  <Field>
          <Input
            type="email"
            placeholder="Email"
            autoComplete="email"
            {...register("email")}
          />
          {errors.email ? (
            <span className="text-red-700">
              {String(errors.email.message)}
            </span>
          ) : null}
        </Field>  */}

        <Field>
          <Input
            type="tel"
            placeholder="Contact / phone"
            autoComplete="tel"
            {...register("contact")}
          />
          <FieldDescription>
            {errors.contact ? (
              <span className="text-red-700">
                {String(errors.contact.message)}
              </span>
            ) : null}
          </FieldDescription>
        </Field>

        <Field>
          <Input
            type="url"
            placeholder="Profile image URL (https://i.pravatar.cc/500?u=dfsf)"
            {...register("imageUrl")}
          />
          <FieldDescription>
            <span className="text-muted-foreground">Get Temp Img: https://i.pravatar.cc/500?u=dfsF</span>
            {errors.imageUrl ? (
              <span className="text-red-700">
                {String(errors.imageUrl.message)}
              </span>
            ) : null}
          </FieldDescription>
        </Field>

        <Field>
          <Button type="submit">Save profile</Button>
        </Field>
      </FieldGroup>
    </form>
  );
};

export default EditProfileForm;
