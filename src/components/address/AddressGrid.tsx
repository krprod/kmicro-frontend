import {
      type UserT,
} from "@/core/modals/userT";
import { type AddressGridType, type AddressFormType, castAddressFormApiToAddressGripType } from "@/core/modals/addressT";
import AddressCard from "./AddressCard";
import { useAppDispatch } from "@/stores/store";
import { openDailog } from "@/stores/slice/sarkariSlice";
import { useApi } from "@/hooks/useApi";
import { useCallback, useEffect, useState } from "react";
import { toast } from "react-toastify";
import TheDailogBox from "../dailogComp/TheDailogBox";
import AddAddressForm from "../forms/AddAddressForm";
import CustomAlertBox from "../alerts/CustomAlertBox";

const MAX_ADDRESSES = 5;

interface AddressGridProps {
      user: UserT;
}

function AddressGrid({ user }: AddressGridProps) {
      const dispatch = useAppDispatch();
      const { callApi } = useApi();
      const [addresses, setAddresses] = useState<AddressGridType[]>([]);
      const [listLoading, setListLoading] = useState(true);
      const [editing, setEditing] = useState<AddressFormType | null>(null);
      const [pendingId, setPendingId] = useState<number | null>(null);

      const toRow = useCallback(
            (data: AddressFormType): AddressGridType =>
                  castAddressFormApiToAddressGripType(
                        data,
                        user.name || user.email || "",
                        user.contact
                  ),
            [user.name, user.email, user.contact]
      );

      const fetchAddresses = useCallback(async () => {
            setListLoading(true);
            const res = await callApi<AddressFormType[]>(
                  "GET",
                  `/api/users/address/${user.id}`
            );
            if (!res.success) {
                  const msg =
                        typeof res.error === "string" ? res.error : "Could not load addresses";
                  toast.error(msg);
                  setAddresses([]);
            } else {
                  const list = Array.isArray(res.data) ? res.data : [];
                  setAddresses(list.map((a) => toRow(a)));
            }
            setListLoading(false);
      }, [callApi, user.id, toRow]);

      useEffect(() => {
        const fetchData = async () => {  await fetchAddresses(); };
        fetchData();
        //     void fetchAddresses();
      }, [fetchAddresses]);

      const openAdd = () => {
            setEditing(null);
            dispatch(openDailog());
      };

      const openEdit = (row: AddressGridType) => {
            setEditing(row.realAdd);
            dispatch(openDailog());
      };

      const handleSaved = (data: AddressFormType) => {
            const row = toRow(data);
            setAddresses((prev) => {
                  if (data.id != null && prev.some((x) => x.id === data.id)) {
                        return prev.map((x) => (x.id === data.id ? row : x));
                  }
                  return [...prev, row];
            });
      };

      const handleDelete = async (id: number, data: AddressFormType) => {
            setPendingId(id);
            const res = await callApi("PUT", `/api/users/address/${id}`, data);
            setPendingId(null);
            if (!res.success) {
                  const msg =
                        typeof res.error === "string" ? res.error : "Could not delete address";
                  toast.error(msg);
                  return;
            }
            setAddresses((prev) => prev.filter((a) => a.id !== id));
        //     toast.success("Address removed");            
            toast(<CustomAlertBox />);            
      };

      return (
            <div className="min-h-screen p-8">
                  <div className="mx-auto grid max-w-5xl grid-cols-1 gap-8 md:grid-cols-2">
                        {listLoading ? (
                              <p className="col-span-full text-center text-muted-foreground">
                                    Loading addresses…
                              </p>
                        ) : (
                              addresses.map((addr) => (
                                    <AddressCard
                                          key={addr.id ?? addr.address}
                                          variant="item"
                                          name={String(addr.id)}
                                          address={addr.address}
                                          phone={addr.phone}
                                          isMain={addr.isMain}
                                          disabled={pendingId === addr.id}
                                          onEdit={() => openEdit(addr)}
                                          onDelete={() => {
                                                if (addr.id == null) return;
                                                void handleDelete(addr.id, addr.realAdd);
                                          }}
                                    />
                              ))
                        )}
                        {!listLoading && addresses.length < MAX_ADDRESSES ? (
                              <AddressCard variant="add" onClick={openAdd} />
                        ) : null}
                  </div>

                  <TheDailogBox>
                        <AddAddressForm
                              key={editing?.id ?? "new"}
                              initialAddress={editing}
                              onSave={handleSaved}
                        />
                  </TheDailogBox>
            </div>
      );
}

export default AddressGrid;
