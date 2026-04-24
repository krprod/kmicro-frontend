import { useEffect, useMemo, useState } from "react";
import { Plus, Search, RefreshCw, SquarePen, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { useApi } from "@/hooks/useApi";
import type { OrderApi } from "@/core/modals/order";
import { toast } from "react-toastify";
import AdminOrderForm, {
  type OrderFormValues,
  type OrderStatus,
  type PaymentStatus,
} from "@/components/forms/AdminOrderForm";
// import orderData from "@/common/order-data";

type PaginatedOrdersResponse = {
  content: OrderApi[];
  metadata?: {
    page: number;
    size: number;
    totalPages: number;
    totalElements: number;
  };
};

// const TABS = ["All", "Unfulfilled", "Unpaid", "Paid", "Open", "Close"] as const;

const emptyForm: OrderFormValues = {
  user_id: 0,
  total_amount: 0,
  payment_status: "Pending",
  order_status: "Processing",
  tracking_number: "",
};

// const MOCK_ORDERS = orderData;

const normalizeOrderStatus = (status?: string): OrderStatus => {
  const s = (status || "").toLowerCase();
  if (s.toLocaleLowerCase().includes("ship")) return "Shipped";
  if (s.toLocaleLowerCase().includes("deliver")) return "Delivered";
  if (s.toLocaleLowerCase().includes("cancel")) return "Cancelled";
  if (s.toLocaleLowerCase().includes("placed")) return "Placed";
  if (s.toLocaleLowerCase().includes("failed")) return "Failed";
  return "Processing";
};

const normalizePaymentStatus = (status?: string): PaymentStatus => {
  const s = (status || "").toLowerCase();
  if (s.toLocaleLowerCase() === "paid") return "Paid";
  if (s.toLocaleLowerCase() === "unpaid") return "Unpaid";
  if (s.toLocaleLowerCase().includes("failed")) return "Failed";
  return "Pending";
};

export default function AdminOrders() {
  const { callApi } = useApi();
  const [orders, setOrders] = useState<OrderApi[]>([]);
//   const [filteredOrders, setFilteredOrders] = useState<OrderApi[]>([]);
  const [keyword, setKeyword] = useState("");
//   const [activeTab, setActiveTab] = useState<(typeof TABS)[number]>("All");
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [size, setSize] = useState(10);
  const [totalPages, setTotalPages] = useState(1);
  const [totalElements, setTotalElements] = useState(0);

  const [openForm, setOpenForm] = useState(false);
  const [editingOrder, setEditingOrder] = useState<OrderApi | null>(null);
  const [formInitialValues, setFormInitialValues] = useState<OrderFormValues>(emptyForm);
  const [saving, setSaving] = useState(false);

  const [deleteTarget, setDeleteTarget] = useState<OrderApi | null>(null);
  const [deleting, setDeleting] = useState(false);

  const fetchOrders = async () => {
    setLoading(true);
//     const tabFilter =
//       activeTab === "All"
//         ? ""
//         : activeTab === "Unpaid"
//         ? "unpaid"
//         : activeTab === "Paid"
//         ? "paid"
//         : activeTab === "Unfulfilled"
//         ? "processing"
//         : activeTab === "Open"
//         ? "open"
//         : "close";

//     const paginatedUrl = `/api/orders/paginated?page=${page}&size=${size}&keyword=${encodeURIComponent(
//       keyword
//     )}&status=${encodeURIComponent(tabFilter)}`;
    
    const paginatedUrl = `/api/orders/admin/all-orders`;
    
    const res = await callApi<PaginatedOrdersResponse | OrderApi[]>("GET", paginatedUrl);

    if (res.success && res.data) {
      if (Array.isArray(res.data)) {
        setOrders(res.data);
        setTotalElements(res.data.length);
        setTotalPages(1);
      } else {
        setOrders(res.data.content || []);
        setTotalPages(Number(res.data.metadata?.totalPages ?? 1));
        setTotalElements(Number(res.data.metadata?.totalElements ?? res.data.content?.length ?? 0));
      }
      setLoading(false);
      return;
    }

    // Fallback for backends without paginated endpoint.
//     const fallback = await callApi<OrderApi[]>("GET", "/api/orders");
//     setLoading(false);
 /*    if (!fallback.success || !fallback.data) {
      toast.info("Showing demo orders for UI preview");
      const allMock = MOCK_ORDERS;
      const filteredMock = allMock.filter((o) => {
        const text = `${o.id} ${o.transaction_id} ${o.shipping_address?.name || ""}`.toLowerCase();
        const k = keyword.toLowerCase();
        if (k && !text.includes(k)) return false;
        // if (activeTab === "Unpaid") return normalizePaymentStatus(o.payment_status) === "Unpaid";
        // if (activeTab === "Paid") return normalizePaymentStatus(o.payment_status) === "Paid";
        // if (activeTab === "Unfulfilled") return normalizeOrderStatus(o.order_status) === "Order processing";
        // if (activeTab === "Open") return normalizeOrderStatus(o.order_status) !== "Delivered";
        // if (activeTab === "Close") return normalizeOrderStatus(o.order_status) === "Delivered";
        return true;
      });
      setTotalElements(filteredMock.length);
      setTotalPages(Math.max(1, Math.ceil(filteredMock.length / size)));
      const start = (page - 1) * size;
      setOrders(filteredMock.slice(start, start + size));
      return;
    } */

  /*   const all = fallback.data;
    const filtered = all.filter((o) => {
      const text = `${o.id} ${o.transaction_id} ${o.shipping_address?.name || ""}`.toLowerCase();
      const k = keyword.toLowerCase();
      if (k && !text.includes(k)) return false;
//       if (activeTab === "Unpaid") return normalizePaymentStatus(o.payment_status) === "Unpaid";
//       if (activeTab === "Paid") return normalizePaymentStatus(o.payment_status) === "Paid";
//       if (activeTab === "Unfulfilled") return normalizeOrderStatus(o.order_status) === "Order processing";
//       if (activeTab === "Open") return normalizeOrderStatus(o.order_status) !== "Delivered";
//       if (activeTab === "Close") return normalizeOrderStatus(o.order_status) === "Delivered";
      return true;
    }); */
 /*    setTotalElements(filtered.length);
    setTotalPages(Math.max(1, Math.ceil(filtered.length / size)));
    const start = (page - 1) * size;
    setOrders(filtered.slice(start, start + size)); */
  };

  const filteredOrders = useMemo(() => {
    return orders.filter((o) => {
        const text = `${o.id} ${o.transaction_id} ${o.shipping_address?.name || ""}`.toLowerCase();
        const k = keyword.toLowerCase();
        if (k && !text.includes(k)) return false;
        return true;
    })
  }, [orders, keyword]);

  useEffect(() => {
    void fetchOrders();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page, size]);
//   }, [page, size, activeTab]);

  const metrics = useMemo(() => {
    const total = totalElements;
    const paid = orders.filter((o) => normalizePaymentStatus(o.payment_status) === "Paid").length;
    const processing = orders.filter((o) => normalizeOrderStatus(o.order_status) === "Processing").length;
    const delivered = orders.filter((o) => normalizeOrderStatus(o.order_status) === "Delivered").length;
    const returns = orders.filter((o) => normalizeOrderStatus(o.order_status) === "Cancelled").length;
    return { total, paid, processing, delivered, returns };
  }, [orders, totalElements]);

  const openCreate = () => {
    setEditingOrder(null);
    setFormInitialValues(emptyForm);
    setOpenForm(true);
  };

  const openEdit = (order: OrderApi) => {
    setEditingOrder(order);
    setFormInitialValues({
      user_id: Number(order.user_id),
      total_amount: Number(order.total_amount),
      payment_status: normalizePaymentStatus(order.payment_status),
      order_status: normalizeOrderStatus(order.order_status),
      tracking_number: order.tracking_number || "",
    });
    setOpenForm(true);
  };

  const saveOrder = async (form: OrderFormValues) => {
    setSaving(true);
    const payload = {
      orderID: editingOrder?.id,
      userID: form.user_id,
      totalAmount: form.total_amount,
      paymentStatus: form.payment_status,
      orderStatus: form.order_status,
      trackingNumber: form.tracking_number.trim(),
    };

    const isEdit = Boolean(editingOrder?.id);
    const method = isEdit ? "PUT" : "POST";
    const endpoint = isEdit ? `/api/orders/admin/edit-order/${editingOrder?.id}` : "/api/orders/admin/add-order/";
    const res = await callApi<OrderApi>(method, endpoint, payload);
    setSaving(false);

    if (!res.success) {
      toast.error(typeof res.error === "string" ? res.error : "Could not save order");
      return;
    }
    setOpenForm(false);
    await fetchOrders();
    toast.success(isEdit ? "Order updated" : "Order created");
  };

  const removeOrder = async () => {
        toast.error("Order deletion feature disabled");
        setDeleteTarget(null);
        setDeleting(false);
//     if (!deleteTarget) return;
//     setDeleting(true);
//     const res = await callApi("DELETE", `/api/orders/${deleteTarget.id}`);
//     setDeleting(false);
//     if (!res.success) {
//       toast.error(typeof res.error === "string" ? res.error : "Could not delete order");
//       return;
//     }
//     setDeleteTarget(null);
//     await fetchOrders();
//     toast.success("Order deleted");
  };

  const quickUpdateOrderStatus = async (order: OrderApi, status: OrderStatus) => {
        const payload = { orderStatus: status, userID: order.user_id, orderID: order.id };
        const res = await callApi("PUT", `/api/orders/update-status`, payload);
        if (!res.success) {
                toast.error("Failed to update order status");
                console.error("Status update error:", res);
                return;
        // fallback to generic update endpoint
        /* const fallback = await callApi("PUT", `/api/orders/${order.id}`, { ...order, order_status: status });
        if (!fallback.success) {
                toast.error("Failed to update order status");
                return;
        } */
    }
    setOrders((prev) =>
      prev.map((o) => (o.id === order.id ? { ...o, order_status: status } : o))
    );
    toast.success(`Status changed to ${status}`);
  };

  return (
    <div className="space-y-4 rounded-2xl bg-white p-4 shadow-sm">
        {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h2 className="text-3xl font-semibold text-gray-800">Order</h2>
        <div className="flex items-center gap-2">
          {/* <Button variant="outline">Today</Button>
          <Button variant="outline">Export</Button>
          <Button variant="outline">More Action</Button> */}
        <div className="flex items-center gap-2">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
            <Input
              className="w-56 pl-9"
              placeholder="Find order"
              value={keyword}
              onChange={(e) => setKeyword(e.target.value)}
            />
          </div>
        </div>
        <Button variant="outline" onClick={() => void fetchOrders()}><RefreshCw className="h-4 w-4" /></Button>
          <Button className="bg-teal-700 hover:bg-teal-800" onClick={openCreate}>
            <Plus className="mr-2 h-4 w-4" />
            Create order
          </Button>
        </div>
      </div>
        {/* Metrics */}
      <div className="grid grid-cols-1 gap-3 md:grid-cols-5">
        <div className="rounded-xl border p-3"><p className="text-xs text-gray-500">Total Orders</p><p className="text-2xl">{metrics.total}</p></div>
        <div className="rounded-xl border p-3"><p className="text-xs text-gray-500">Ordered items over time</p><p className="text-2xl">{metrics.processing}</p></div>
        <div className="rounded-xl border p-3"><p className="text-xs text-gray-500">Returns</p><p className="text-2xl">{metrics.returns}</p></div>
        <div className="rounded-xl border p-3"><p className="text-xs text-gray-500">Fulfilled orders over time</p><p className="text-2xl">{metrics.paid}</p></div>
        <div className="rounded-xl border p-3"><p className="text-xs text-gray-500">Delivered orders overtime</p><p className="text-2xl">{metrics.delivered}</p></div>
      </div>
        {/* Tabs */}
      {/* <div className="flex flex-wrap gap-4 border-b">
        {TABS.map((tab) => (
          <button
            key={tab}
            type="button"
            onClick={() => {
              setActiveTab(tab);
              setPage(1);
            }}
            className={`border-b-2 px-3 py-2 text-sm ${
              activeTab === tab ? "border-teal-700 text-teal-700" : "border-transparent text-gray-500"
            }`}
          >
            {tab}
          </button>
        ))}
      </div> */}
        {/* Search and filter */}
      <div className="flex flex-wrap items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          {/* <div className="relative">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
            <Input
              className="w-56 pl-9"
              placeholder="Find order"
              value={keyword}
              onChange={(e) => setKeyword(e.target.value)}
            />
          </div> */}
          {/* <Button variant="outline" onClick={() => void fetchOrders()}>
            <Filter className="mr-2 h-4 w-4" />
            Filter
          </Button> */}
        </div>
        <div className="flex items-center gap-2">
          {/* <Button variant="outline"><ArrowUpDown className="mr-2 h-4 w-4" />Sort by</Button> */}
          {/* <div className="relative">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
            <Input
              className="w-56 pl-9"
              placeholder="Find order"
              value={keyword}
              onChange={(e) => setKeyword(e.target.value)}
            />
          </div> */}
          {/* <Button variant="outline" onClick={() => void fetchOrders()}><RefreshCw className="h-4 w-4" /></Button> */}
        </div>
      </div>
        {/* Table */}
      <div className="overflow-x-auto rounded-xl border">
        <table className="min-w-full text-sm">
          <thead className="bg-gray-50 text-left text-gray-500">
            <tr>
              <th className="px-4 py-3">ID Order</th>
              <th className="px-4 py-3">Date</th>
              <th className="px-4 py-3">Customer</th>
              <th className="px-4 py-3">Total</th>
              <th className="px-4 py-3">Payment Status</th>
              <th className="px-4 py-3">Items</th>
              <th className="px-4 py-3 text-center">Order Status</th>
              <th className="px-4 py-3 text-center">Action</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr><td className="px-4 py-8 text-center text-gray-500" colSpan={8}>Loading orders...</td></tr>
            ) : orders.length === 0 ? (
              <tr><td className="px-4 py-8 text-center text-gray-500" colSpan={8}>No orders found</td></tr>
            ) : (
              filteredOrders.map((o) => {
                const pay = normalizePaymentStatus(o.payment_status);
                const stat = normalizeOrderStatus(o.order_status);
                return (
                  <tr key={o.id} className="border-t">
                    <td className="px-4 py-3 font-medium">#{o.id}</td>
                    <td className="px-4 py-3">{new Date(o.order_date).toLocaleDateString()}</td>
                    <td className="px-4 py-3">{o.shipping_address?.name || `User #${o.user_id}`}</td>
                    <td className="px-4 py-3">${Number(o.total_amount || 0).toFixed(2)}</td>
                    <td className="px-4 py-3">
                      <span className={`rounded-full px-3 py-1 text-xs ${pay === "Paid" ? "bg-green-100 text-green-700" : pay === "Unpaid" ? "bg-amber-100 text-amber-700" : "bg-slate-100 text-slate-700"}`}>{pay}</span>
                    </td>
                    <td className="px-4 py-3">{o.orderItems?.length || 0} items</td>
                    <td className="px-4 py-3 text-center">
                      <span className={`rounded-full px-3 py-1 text-xs ${stat === "Delivered" ? "bg-purple-100 text-purple-700" : stat === "Shipped" ? "bg-cyan-100 text-cyan-700" : stat === "Cancelled" || stat === "Failed" ? "bg-red-100 text-red-700" : "bg-blue-100 text-blue-700"}`}>{stat}</span>
                    </td>
                    <td className="px-4 py-3">
                        <div className="flex justify-center gap-4">
                                        <span className="cursor-pointer mr-2" onClick={() => openEdit(o)}>
                                                <SquarePen size={20} />
                                        </span>
                                        <span className="cursor-pointer text-red-600 focus:text-red-700" 
                                                onClick={() => setDeleteTarget(o)}>
                                                <Trash2 size={20} />
                                        </span>
                                        <DropdownMenu>
                                                <DropdownMenuTrigger asChild>
                                                  {/* <Button variant="ghost" size="icon"> */}
                                                        <span className="rounded px-3 mx-2 py-1 text-xs bg-green-100 text-green-700">Move To</span>
                                                        {/* </Button> */}
                                                </DropdownMenuTrigger>
                                                <DropdownMenuContent align="end" className="w-44">
                                                <DropdownMenuItem onClick={() => void quickUpdateOrderStatus(o, "Processing")}>Set Processing</DropdownMenuItem>
                                                <DropdownMenuItem onClick={() => void quickUpdateOrderStatus(o, "Shipped")}>Set Shipped</DropdownMenuItem>
                                                <DropdownMenuItem onClick={() => void quickUpdateOrderStatus(o, "Delivered")}>Set Delivered</DropdownMenuItem>
                                                <DropdownMenuItem onClick={() => void quickUpdateOrderStatus(o, "Cancelled")}>Set Cancelled</DropdownMenuItem>
                                                <DropdownMenuItem onClick={() => void quickUpdateOrderStatus(o, "Placed")}>Set Placed</DropdownMenuItem>
                                                <DropdownMenuItem onClick={() => void quickUpdateOrderStatus(o, "Failed")}>Set Failed</DropdownMenuItem>
                                                </DropdownMenuContent>
                                        </DropdownMenu>
                        </div>
                      {/*  */}
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>
        {/* Pagination */}
      <div className="flex items-center justify-between">
        <p className="text-sm text-gray-500">{totalElements} total orders</p>
        <div className="flex items-center gap-2">
          <select
            value={size}
            className="rounded-md border px-2 py-1 text-sm"
            onChange={(e) => {
              setSize(Number(e.target.value));
              setPage(1);
            }}
          >
            <option value={10}>10 / page</option>
            <option value={20}>20 / page</option>
            <option value={50}>50 / page</option>
          </select>
          <Button variant="outline" disabled={page <= 1} onClick={() => setPage((p) => p - 1)}>
            Prev
          </Button>
          <span className="text-sm text-gray-600">{page} / {Math.max(totalPages, 1)}</span>
          <Button variant="outline" disabled={page >= totalPages} onClick={() => setPage((p) => p + 1)}>
            Next
          </Button>
        </div>
      </div>

      <Dialog open={openForm} onOpenChange={setOpenForm}>
        <DialogContent className="sm:max-w-lg">
          <DialogHeader>
            <DialogTitle>{editingOrder ? "Edit Order" : "Create Order"}</DialogTitle>
          </DialogHeader>
          <AdminOrderForm
            initialValues={formInitialValues}
            submitting={saving}
            submitLabel={editingOrder ? "Save changes" : "Create order"}
            onCancel={() => setOpenForm(false)}
            onSubmit={saveOrder}
          />
        </DialogContent>
      </Dialog>

      <Dialog open={Boolean(deleteTarget)} onOpenChange={() => setDeleteTarget(null)}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Delete Order</DialogTitle>
          </DialogHeader>
          <p className="text-sm text-gray-600">Delete order #{deleteTarget?.id}?</p>
          <div className="flex justify-end gap-2">
            <Button variant="outline" onClick={() => setDeleteTarget(null)}>Cancel</Button>
            <Button variant="destructive" disabled={deleting} onClick={() => void removeOrder()}>
              {deleting ? "Deleting..." : "Delete"}
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
