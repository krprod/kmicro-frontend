import AddressGrid from "@/components/address/AddressGrid";
import EditProfileForm from "@/components/forms/EditProfileForm";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";
import { useAppSelector } from "@/stores/store";
import { Pencil } from "lucide-react";
import { Navigate } from "react-router";
import { useState } from "react";

const DEFAULT_AVATAR =
  "https://w7.pngwing.com/pngs/404/51/png-transparent-unknown-user-avatar-profile-person-account-human-general-pack-icon.png";

function Profile() {
  const [editProfileOpen, setEditProfileOpen] = useState(false);
  const { token, user } = useAppSelector((state) => state.auth);

  if (!user || !token) {
    return <Navigate to="/signin" replace />;
  }

  return (
    <div className="mx-auto max-w-300 py-6">
      <div className="mb-6">
        <div className="mb-2 text-2xl font-bold">My Profile</div>
        <div className="m-auto grid w-full max-w-xl grid-cols-1 place-items-center gap-6 rounded-md border-2 border-gray-200 p-6 sm:grid-cols-2 sm:place-items-start">
          <div className="flex justify-center sm:justify-start">
            <Avatar className="size-48 border-2 border-border">
              <AvatarImage
                src={user.imageUrl || DEFAULT_AVATAR}
                alt={user.name}
              />
              <AvatarFallback className="text-2xl">
                {user.name?.charAt(0).toUpperCase() || "?"}
              </AvatarFallback>
            </Avatar>
          </div>
          <div className="flex w-full flex-col gap-1 text-center sm:text-left">
            <p className="text-xl text-gray-700">{user.name}</p>
            <p className="text-lg text-gray-500">{user.email}</p>
            <p className="text-lg text-gray-500">
              {user.contact?.trim() ? user.contact : "—"}
            </p>
            <Button
              type="button"
              className="mt-4 w-full sm:w-auto"
              onClick={() => setEditProfileOpen(true)}
            >
              <Pencil className="mr-2 h-4 w-4" />
              Edit profile
            </Button>
          </div>
        </div>
      </div>

      <Separator />

      <div className="mt-6">
        <div className="mb-4 text-2xl font-bold">My Addresses</div>
        <AddressGrid user={user} />
      </div>

      <Dialog open={editProfileOpen} onOpenChange={setEditProfileOpen}>
        <DialogContent className="max-h-[90vh] overflow-hidden sm:max-w-lg">
          <div className="-mx-4 max-h-[70vh] overflow-y-auto px-4 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
            <EditProfileForm
              user={user}
              onDismiss={() => setEditProfileOpen(false)}
            />
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default Profile;
