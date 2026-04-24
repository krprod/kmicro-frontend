import { useEffect, useMemo, useState } from "react";
import { MoreHorizontal, Search, Mail, Shield, Pencil, RefreshCw, UserRoundX } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useApi } from "@/hooks/useApi";
import { toast } from "react-toastify";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import type { UserApiType } from "@/core/modals/userT";
import MailPopUp from "./MailPopUp";
import { useAppDispatch, useAppSelector } from "@/stores/store";
import { removeUserFromList, setAllUsers } from "@/stores/slice/adminSlice";

type RoleType = "ROLE_USER" | "ROLE_ADMIN";

type UserFormState = {
  email: string;
  role: RoleType;
};

type MailFormState = {
  subject: string;
  message: string;
};

type PaginatedUsersResponse = {
  content: UserApiType[];
  metadata?: {
    page: number;
    size: number;
    totalPages: number;
    totalElements: number;
  };
};

const DEFAULT_AVATAR =
  "https://w7.pngwing.com/pngs/404/51/png-transparent-unknown-user-avatar-profile-person-account-human-general-pack-icon.png";

const MOCK_USERS: UserApiType[] = [
  {
    id: 101,
    login_name: "john.admin",
    email: "john.admin@example.com",
    avtar: DEFAULT_AVATAR,
    latitude: 0,
    longitude: 0,
    addresses: [],
    roles: ["ROLE_ADMIN"],
    loggedIn: true,
    first_name: "John",
    last_name: "Carter",
    contact: "9876543210",
    last_login_time: "2026-04-05T10:20:00Z",
    is_active: true,
    is_verified: true,
  },
  {
    id: 102,
    login_name: "emma.user",
    email: "emma.user@example.com",
    avtar: DEFAULT_AVATAR,
    latitude: 0,
    longitude: 0,
    addresses: [],
    roles: ["ROLE_USER"],
    loggedIn: true,
    first_name: "Emma",
    last_name: "Stone",
    contact: "9988776655",
    last_login_time: "2026-04-06T08:10:00Z",
    is_active: true,
    is_verified: true,
  },
  {
    id: 103,
    login_name: "noah.viewer",
    email: "noah.viewer@example.com",
    avtar: DEFAULT_AVATAR,
    latitude: 0,
    longitude: 0,
    addresses: [],
    roles: ["ROLE_USER"],
    loggedIn: false,
    first_name: "Noah",
    last_name: "Mills",
    contact: "9765432109",
    last_login_time: "2026-04-02T07:00:00Z",
    is_active: false,
    is_verified: false,
  },
  {
    id: 104,
    login_name: "ava.manager",
    email: "ava.manager@example.com",
    avtar: DEFAULT_AVATAR,
    latitude: 0,
    longitude: 0,
    addresses: [],
    roles: ["ROLE_ADMIN"],
    loggedIn: true,
    first_name: "Ava",
    last_name: "Ray",
    contact: "9123456789",
    last_login_time: "2026-04-07T02:33:00Z",
    is_active: true,
    is_verified: true,
  },
  {
    id: 105,
    login_name: "liam.guest",
    email: "liam.guest@example.com",
    avtar: DEFAULT_AVATAR,
    latitude: 0,
    longitude: 0,
    addresses: [],
    roles: ["ROLE_USER"],
    loggedIn: false,
    first_name: "Liam",
    last_name: "Turner",
    contact: "9011122233",
    last_login_time: "2026-03-29T12:45:00Z",
    is_active: false,
    is_verified: true,
  },
];

const normalizeRole = (roles?: string[]): RoleType =>
  roles?.includes("ROLE_ADMIN") ? "ROLE_ADMIN" : "ROLE_USER";

export default function AdminUsers() {
  const { callApi } = useApi();
  const [users, setUsers] = useState<UserApiType[]>([]);
  const [loading, setLoading] = useState(false);
  const [keyword, setKeyword] = useState("");
  const [page, setPage] = useState(1);
  const [size, setSize] = useState(10);
  const [totalPages, setTotalPages] = useState(1);
  const [totalElements, setTotalElements] = useState(0);
  const dispatch = useAppDispatch();
  const getAllUser = useAppSelector((state) => state.admin.users);

  const [editTarget, setEditTarget] = useState<UserApiType | null>(null);
  const [editForm, setEditForm] = useState<UserFormState>({ email: "", role: "ROLE_USER" });
  const [savingEdit, setSavingEdit] = useState(false);

  const [mailTarget, setMailTarget] = useState<UserApiType | null>(null);
  const [mailForm, setMailForm] = useState<MailFormState>({ subject: "", message: "" });
//   const [sendingMail, setSendingMail] = useState(false);

  const activeCount = useMemo(() => users.filter((u) => u.is_active).length, [users]);
  const verifiedCount = useMemo(() => users.filter((u) => u.is_verified).length, [users]);

  const fetchUsers = async () => {
    setLoading(true);
  /*   const paginated = await callApi<PaginatedUsersResponse | UserApiType[]>(
      "GET",
      `/api/users/admin/get-all-users/paginated?page=${page}&size=${size}&keyword=${encodeURIComponent(keyword)}`
    ); */
     const paginated = await callApi<PaginatedUsersResponse | UserApiType[]>("GET",`/api/users/admin/get-all-users/`);
    setLoading(false);

    if (paginated.success && paginated.data) {
      if (Array.isArray(paginated.data)) {
        const sortedDatat = [...paginated.data].sort((a, b) => b.id - a.id);
        dispatch(setAllUsers(sortedDatat));
        setUsers(sortedDatat);
        setTotalElements(paginated.data.length);
        setTotalPages(1);
      } else {
        setUsers(paginated.data.content || []);
        setTotalPages(Number(paginated.data.metadata?.totalPages ?? 1));
        setTotalElements(Number(paginated.data.metadata?.totalElements ?? 0));
      }
      return;
    }

    const fallback = await callApi<UserApiType[]>("GET", "/api/users");
    if (!fallback.success || !fallback.data) {
      toast.info("Showing demo users for UI preview");
      const filteredMock = MOCK_USERS.filter((u) => {
        const fullName = `${u.first_name || ""} ${u.last_name || ""}`.toLowerCase();
        const text = `${u.id} ${u.email} ${u.login_name || ""} ${fullName}`.toLowerCase();
        return !keyword.trim() || text.includes(keyword.toLowerCase());
      });
      dispatch(setAllUsers(filteredMock));
      setTotalElements(filteredMock.length);
      setTotalPages(Math.max(1, Math.ceil(filteredMock.length / size)));
      const start = (page - 1) * size;
      setUsers(filteredMock.slice(start, start + size));
      return;
    }
    const all = fallback.data;

    const filtered = all.filter((u) => {
      const fullName = `${u.first_name || ""} ${u.last_name || ""}`.toLowerCase();
      const text = `${u.id} ${u.email} ${u.login_name || ""} ${fullName}`.toLowerCase();
      return !keyword.trim() || text.includes(keyword.toLowerCase());
    });
    setTotalElements(filtered.length);
    setTotalPages(Math.max(1, Math.ceil(filtered.length / size)));
    const start = (page - 1) * size;
    setUsers(filtered.slice(start, start + size));

  };

  const seacrhUser = (search: string) =>{
      const filtered = getAllUser.filter((u) => {
      const fullName = `${u.first_name || ""} ${u.last_name || ""}`.toLowerCase();
      const text = `${u.id} ${u.email} ${u.login_name || ""} ${fullName}`.toLowerCase();
      return !search.trim() || text.includes(search.toLowerCase());
    });
     setUsers(filtered);
     setKeyword(search);
  }

  const deactivateUser = async (u: UserApiType) => {
        const res = await callApi("DELETE", `/api/users/admin/user/${u.id}`);
        if (!res.success) {
          toast.error(typeof res.error === "string" ? res.error : "Could not deactivate user");
          return;
        }
        dispatch(removeUserFromList(u.id));
        toast.success("User deactivated");
  }

  useEffect(() => {
    void fetchUsers();
//     eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page, size]);

  const openEdit = (u: UserApiType) => {
    setEditTarget(u);
    setEditForm({ email: u.email, role: normalizeRole(u.roles) });
  };

  const saveUserChanges = async () => {
        // TODO: add feature to edit email, name and roles in backend
    if (!editTarget) return;
    if (!editForm.email.trim()) {
      toast.error("Email is required");
      return;
    }
    setSavingEdit(true);
//     const payload = {
//       email: editForm.email.trim(),
//       roles: [editForm.role],
//     };
//     const res = await callApi("PUT", `/api/users/${editTarget.id}`, payload);
    setSavingEdit(false);
//     if (!res.success) {
//       toast.error(typeof res.error === "string" ? res.error : "Could not update user");
//       return;
//     }
//     setUsers((prev) =>
//       prev.map((u) =>
//         u.id === editTarget.id ? { ...u, email: payload.email, roles: payload.roles } : u
//       )
//     );
    setEditTarget(null);
//     toast.success("User updated");
        toast.error("As of now, this feature is disabled");
  };

  const sendVerificationMail = async (u: UserApiType) => {
    const res = await callApi("POST", `/api/auth/resend-verification/${u.id}`);
    if (!res.success) {
      // fallback endpoint shape used in codebase
      const fallback = await callApi("POST", "/api/auth/resend-verify-user", {
        email: u.email,
      });
      if (!fallback.success) {
        toast.error("Failed to send verification email");
        return;
      }
    }
    toast.success("Verification email sent");
  };

  return (
    <section className="rounded-2xl bg-white p-4 shadow-sm">
      <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
        <div>
          <h2 className="text-2xl font-semibold text-gray-800">Users</h2>
          <p className="text-sm text-gray-500">
            {totalElements} users | {activeCount} active | {verifiedCount} verified
          </p>
        </div>
        <div className="flex items-center gap-2">
          <div className="relative">
            <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
            <Input
              className="w-64 pl-9"
              placeholder="Search by id, name or email"
              value={keyword}
              onChange={(e) => seacrhUser(e.target.value)}
            />
          </div>
          <Button variant="outline" onClick={() => void fetchUsers()}>
            <RefreshCw className="mr-2 h-4 w-4" />
            Refresh
          </Button>
        </div>
      </div>

      <div className="overflow-x-auto rounded-xl border">
        <table className="min-w-full text-sm">
          <thead className="bg-gray-50 text-left text-gray-500">
            <tr>
              <th className="px-4 py-3 font-medium">User</th>
              <th className="px-4 py-3 font-medium">ID</th>
              <th className="px-4 py-3 font-medium">Email</th>
              <th className="px-4 py-3 font-medium">Last Login</th>
              <th className="px-4 py-3 font-medium">Active</th>
              <th className="px-4 py-3 font-medium">Role</th>
              <th className="px-4 py-3 font-medium text-right">Action</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td className="px-4 py-8 text-center text-gray-500" colSpan={7}>
                  Loading users...
                </td>
              </tr>
            ) : users.length === 0 ? (
              <tr>
                <td className="px-4 py-8 text-center text-gray-500" colSpan={7}>
                  No users found
                </td>
              </tr>
            ) : (
              users.map((u) => {
                const fullName = `${u.first_name || ""} ${u.last_name || ""}`.trim() || u.login_name;
                const role = normalizeRole(u.roles);
                return (
                  <tr key={u.id} className="border-t">
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-3">
                        <img
                          src={u.avtar || DEFAULT_AVATAR}
                          alt={fullName || "User"}
                          className="h-10 w-10 rounded-full object-cover"
                        />
                        <div>
                          <p className="font-medium text-gray-800">{fullName || `User #${u.id}`}</p>
                          <p className="text-xs text-gray-500">@{u.login_name || "user"}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-3">#{u.id}</td>
                    <td className="px-4 py-3">{u.email}</td>
                    <td className="px-4 py-3">
                      {u.last_login_time ? new Date(u.last_login_time).toLocaleString() : "—"}
                    </td>
                    <td className="px-4 py-3">
                      <span
                        className={`rounded-full px-3 py-1 text-xs font-medium ${
                          u.is_active ? "bg-emerald-100 text-emerald-700" : "bg-gray-100 text-gray-600"
                        }`}
                      >
                        {u.is_active ? "Active" : "Inactive"}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <span
                        className={`rounded-full px-3 py-1 text-xs font-medium ${
                          role === "ROLE_ADMIN"
                            ? "bg-indigo-100 text-indigo-700"
                            : "bg-slate-100 text-slate-700"
                        }`}
                      >
                        {role === "ROLE_ADMIN" ? "Admin" : "User"}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon" aria-label="User actions">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className="w-52">
                          <DropdownMenuItem onClick={() => openEdit(u)}>
                            <Pencil className="mr-2 h-4 w-4" />
                            Edit email and role
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => void sendVerificationMail(u)}>
                            <Shield className="mr-2 h-4 w-4" />
                            Send verification mail
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            onClick={() => {
                              setMailTarget(u);
                              setMailForm({ subject: "", message: "" });
                            }}
                          >
                            <Mail className="mr-2 h-4 w-4" />
                            Send personal mail
                          </DropdownMenuItem>
                         <DropdownMenuItem
                          className="text-red-700"
                            onClick={() => { deactivateUser(u) }}
                          >
                            <UserRoundX className="mr-2 h-4 w-4" />
                            Deactivate User
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>

      <div className="mt-4 flex items-center justify-between">
        <p className="text-sm text-gray-500">{totalElements} total users</p>
        <div className="flex items-center gap-2">
          <select
            className="rounded-md border px-2 py-1 text-sm"
            value={size}
            onChange={(e) => {
              setPage(1);
              setSize(Number(e.target.value));
            }}
          >
            <option value={10}>10 / page</option>
            <option value={20}>20 / page</option>
            <option value={50}>50 / page</option>
          </select>
          <Button variant="outline" disabled={page <= 1} onClick={() => setPage((p) => p - 1)}>
            Prev
          </Button>
          <span className="text-sm text-gray-600">
            {page} / {Math.max(totalPages, 1)}
          </span>
          <Button
            variant="outline"
            disabled={page >= totalPages}
            onClick={() => setPage((p) => p + 1)}
          >
            Next
          </Button>
        </div>
      </div>

      <Dialog open={Boolean(editTarget)} onOpenChange={() => setEditTarget(null)}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Edit User</DialogTitle>
          </DialogHeader>
          <div className="space-y-3">
            <Input
              type="email"
              placeholder="Email"
              value={editForm.email}
              onChange={(e) => setEditForm((prev) => ({ ...prev, email: e.target.value }))}
            />
            <select
              className="w-full rounded-md border px-3 py-2 text-sm"
              value={editForm.role}
              onChange={(e) => setEditForm((prev) => ({ ...prev, role: e.target.value as RoleType }))}
            >
              <option value="ROLE_USER">User</option>
              <option value="ROLE_ADMIN">Admin</option>
            </select>
            <div className="flex justify-end gap-2">
              <Button variant="outline" onClick={() => setEditTarget(null)}>
                Cancel
              </Button>
              <Button onClick={() => void saveUserChanges()} disabled={savingEdit}>
                {savingEdit ? "Saving..." : "Save"}
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
        
        <MailPopUp
          target={mailTarget}
          form={mailForm}
          setForm={setMailForm}
          onClose={() => setMailTarget(null)}
          setTarget={setMailTarget}
        />
    </section>
  );
}
