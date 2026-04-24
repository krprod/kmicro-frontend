
import type { Notification } from "@/core/modals/notification"
import { useApi } from "@/hooks/useApi"
import { MoreHorizontal, RefreshCw} from "lucide-react"
import { useEffect, useMemo, useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import NotificationDetailCard from "./NotificationDetailCard"
// import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
/* const format = {
  timeZone: "Asia/Kolkata",
  day: "2-digit",
  month: "2-digit",
  year: undefined,
  hour: "2-digit",
  minute: "2-digit",
  second: "2-digit",
  hour12: true,
}; */

const formatter = new Intl.DateTimeFormat("en-IN", {
  timeZone: "Asia/Kolkata",
  dateStyle: "medium",
  timeStyle: "medium",
})
function Notifications() {

  const [loading, setLoading] = useState(false);
   const [openForm, setOpenForm] = useState(false);
     const [editingOrder, setEditingOrder] = useState<Notification | null>(null);
  const [filteredNotifications, setFilteredNotifications] = useState<Notification[]>([])
  // const [notifications, setNotifications] = useState<Notification[]>([]);
  const { callApi } = useApi()
  const fetchOrders = async () => {
    setLoading(true)

    const paginatedUrl = `/api/notifications/all` // Adjust page and size as needed

    const res = await callApi<Notification[]>("GET", paginatedUrl)

    if (res.success && res.data) {
      if (Array.isArray(res.data)) {
        setFilteredNotifications(res.data)
        // setOrders(res.data);
        // setTotalElements(res.data.length);
        // setTotalPages(1);
      } else {
        // setFilteredNotifications(res.data.content || []);
        // setOrders(res.data.content || []);
        // setTotalPages(Number(res.data.metadata?.totalPages ?? 1));
        // setTotalElements(Number(res.data.metadata?.totalElements ?? res.data.content?.length ?? 0));
      }
      console.log(res.data)
      setLoading(false)
      return
    }
  }

  const sortedData = useMemo(() => {
    // Always spread into a new array [...data] because .sort() mutates the original
    return [...filteredNotifications].sort((a, b) => {
      const dateA = new Date(a.createdAt).getTime()
      const dateB = new Date(b.createdAt).getTime()

      return dateB - dateA // Subtract A from B for Descending (Newest first)
    })
  }, [filteredNotifications])

  useEffect(() => {
    void fetchOrders()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

    const openEdit = (notification: Notification) => {
      setEditingOrder(notification);
//       setFormInitialValues({
//         user_id: Number(order.user_id),
//         total_amount: Number(order.total_amount),
//         payment_status: normalizePaymentStatus(order.payment_status),
//         order_status: normalizeOrderStatus(order.order_status),
//         tracking_number: order.tracking_number || "",
//       });
      setOpenForm(true);
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
                    {/* <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" /> */}
                    {/* <Input
                      className="w-56 pl-9"
                      placeholder="Find order"
                      value={keyword}
                      onChange={(e) => setKeyword(e.target.value)}
                    /> */}
                  </div>
                </div>
                <Button variant="outline" onClick={() => void fetchOrders()}><RefreshCw className="h-4 w-4" /></Button>
                  {/* <Button className="bg-teal-700 hover:bg-teal-800" onClick={() => {fetchOrders(); setEditingOrder(null); setOpenForm(true)}}>
                    <Plus className="mr-2 h-4 w-4" />
                    Create order
                  </Button> */}
                </div>
              </div>
      <div className="overflow-x-auto rounded-xl border">
        <table className="min-w-full text-sm">
          <thead className="bg-gray-50 text-left text-gray-500">
            <tr>
              <th className="px-4 py-3">#ID</th>
              <th className="px-4 py-3">Send To</th>
              <th className="px-4 py-3">Subject</th>
              <th className="px-4 py-3">Status</th>
              {/* <th className="px-4 py-3">Fragment</th> */}
              <th className="px-4 py-3 text-center">Created At</th>
              <th className="px-4 py-3 text-center">Updated At</th>
              <th className="px-4 py-3">Failure Reason</th>
              <th className="px-4 py-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td className="px-4 py-8 text-center text-gray-500" colSpan={8}>
                  Loading orders...
                </td>
              </tr>
            ) : filteredNotifications.length === 0 ? (
              <tr>
                <td className="px-4 py-8 text-center text-gray-500" colSpan={8}>
                  No orders found
                </td>
              </tr>
            ) : (
              sortedData.map((notification) => {
                return (
                  <tr key={notification.id} className="border-t">
                    <td className="px-4 py-3 font-medium">
                      #{notification.id}
                    </td>
                    <td className="px-4 py-3">{notification.sendTo}</td>
                    <td className="px-4 py-3">{notification.subject}</td>
                    <td className="px-4 py-3 text-center">
                      <span
                        className={`rounded-full px-3 py-1 text-xs ${notification.status === "Delivered" ? "bg-purple-100 text-purple-700" : notification.status === "Shipped" ? "bg-cyan-100 text-cyan-700" : notification.status === "Cancelled" || notification.status === "Failed" ? "bg-red-100 text-red-700" : "bg-blue-100 text-blue-700"}`}
                      >
                        {notification.status}
                      </span>
                    </td>
                    {/* <td className="px-4 py-3">{notification.fragment}</td> */}
                    <td className="px-4 py-3 text-center">
                      {formatter.format(new Date(notification.createdAt))}
                    </td>
                    <td className="px-4 py-3 text-center">
                      {formatter.format(new Date(notification.updatedAt))}{" "}
                    </td>
                    <td className="px-4 py-3">{notification.failureReason}</td>
                    <td>
                      <div className="flex justify-center gap-4">
                        <span className="mr-2 cursor-pointer" onClick={() => openEdit(notification)} >
                          <MoreHorizontal size={20} />
                        </span>
                      </div>
                    </td>
                  </tr>
                )
              })
            )}
          </tbody>
        </table>
      </div>
        {/* <NotificationDetailCard data={editingOrder as Notification}/> */}
        
            <Dialog open={openForm} onOpenChange={setOpenForm}>
              {/* <DialogContent className="sm:max-w-lg"> */}
              <DialogContent    className="max-w-full md:max-w-2xl lg:max-w-3xl">
                <DialogHeader>
                  {/* <DialogTitle>{editingOrder ? "Edit Notification" : "Notification Details"}</DialogTitle> */}
                  <DialogTitle>{"Notification Details"}</DialogTitle>
                </DialogHeader>
               <NotificationDetailCard data={editingOrder as Notification}/>
              </DialogContent>
            </Dialog>
    </div>
  )
}

export default Notifications
