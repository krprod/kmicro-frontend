import AddressGrid from "@/components/address/AddressGrid";
import { useAppSelector } from "@/stores/store";

function Address() {
  const user = useAppSelector((s) => s.auth.user);
  if (!user) {
    return (
      <p className="p-8 text-center text-muted-foreground">
        Sign in to manage addresses.
      </p>
    );
  }
  return <AddressGrid user={user} />;
}

export default Address