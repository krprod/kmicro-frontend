import { useEffect, useMemo, useState } from "react";
import { Package, ShoppingCart, Users, TrendingUp, Activity, RefreshCw } from "lucide-react";
import { useApi } from "@/hooks/useApi";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import type { Product } from "@/core/modals/product";
import type { OrderApi } from "@/core/modals/order";
import type { UserApiType } from "@/core/modals/userT";
import { toast } from "react-toastify";

const MOCK_PRODUCTS: Product[] = [
  { id: 1, name: "Pure Organic Orange", price: 48, description: "Fresh citrus", image: "", reviewCount: 12, inStock: true, category: "Fruits" },
  { id: 2, name: "Fresh Peaches Plus", price: 34, description: "Sweet peaches", image: "", reviewCount: 9, inStock: true, category: "Fruits" },
  { id: 3, name: "Organic Bananas", price: 42, description: "Farm bananas", image: "", reviewCount: 17, inStock: true, category: "Fruits" },
];

const MOCK_USERS: UserApiType[] = [
  {
    id: 101, login_name: "john.admin", email: "john.admin@example.com", avtar: "", latitude: 0, longitude: 0, addresses: [],
    roles: ["ROLE_ADMIN"], loggedIn: true, first_name: "John", last_name: "Carter", contact: "9876543210",
    last_login_time: "2026-04-07T10:20:00Z", is_active: true, is_verified: true,
  },
  {
    id: 102, login_name: "emma.user", email: "emma.user@example.com", avtar: "", latitude: 0, longitude: 0, addresses: [],
    roles: ["ROLE_USER"], loggedIn: true, first_name: "Emma", last_name: "Stone", contact: "9988776655",
    last_login_time: "2026-04-06T08:10:00Z", is_active: true, is_verified: true,
  },
  {
    id: 103, login_name: "noah.viewer", email: "noah.viewer@example.com", avtar: "", latitude: 0, longitude: 0, addresses: [],
    roles: ["ROLE_USER"], loggedIn: false, first_name: "Noah", last_name: "Mills", contact: "9765432109",
    last_login_time: "2026-04-02T07:00:00Z", is_active: false, is_verified: false,
  },
];

const MOCK_ORDERS: OrderApi[] = [
  {
    id: 35624367, user_id: 101, order_date: "2026-04-07T10:00:00Z", order_status: "Order processing", subtotal: 420, total_amount: 440,
    payment_method: "CARD", transaction_id: "TXN-A1", payment_status: "Paid", shipping_fee: 20,
    shipping_address: { name: "Makenna Mango", email: "makenna@example.com", contact: "9988776655", city: "Delhi", state: "Delhi", country: "India", address_id: 1, shipping_address: "West Avenue 21", zip_code: "110001", paymentMode: "CARD" },
    tracking_number: "TRK1001",
    orderItems: [{ id: 1, quantity: 2, price: 220, product_id: 10, item_img: "", item_name: "Orange" }],
  },
  {
    id: 35624368, user_id: 102, order_date: "2026-04-06T08:00:00Z", order_status: "Delivered", subtotal: 390, total_amount: 410,
    payment_method: "UPI", transaction_id: "TXN-A2", payment_status: "Paid", shipping_fee: 20,
    shipping_address: { name: "Phillip Vaccaro", email: "phillip@example.com", contact: "9876543210", city: "Pune", state: "Maharashtra", country: "India", address_id: 2, shipping_address: "Skyline Road 9", zip_code: "411001", paymentMode: "UPI" },
    tracking_number: "TRK1002",
    orderItems: [{ id: 2, quantity: 1, price: 410, product_id: 11, item_img: "", item_name: "Peaches" }],
  },
];

const AdminDashboard = () => {
  const { callApi } = useApi();
  const [products, setProducts] = useState<Product[]>([]);
  const [orders, setOrders] = useState<OrderApi[]>([]);
  const [users, setUsers] = useState<UserApiType[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchDashboard = async () => {
    setLoading(true);
    const [pRes, oRes, uRes] = await Promise.all([
      callApi<{ content: Product[] } | Product[]>("GET", "/api/products/paginated?page=1&size=50"),
      callApi<{ content: OrderApi[] } | OrderApi[]>("GET", "/api/orders/admin/all-orders"),
      callApi<{ content: UserApiType[] } | UserApiType[]>("GET", "/api/users/admin/get-all-users/"),
    ]);

    const productsData = pRes.success
      ? Array.isArray(pRes.data)
        ? pRes.data
        : pRes.data?.content ?? []
      : [];
    const ordersData = oRes.success
      ? Array.isArray(oRes.data)
        ? oRes.data
        : oRes.data?.content ?? []
      : [];
    const usersData = uRes.success
      ? Array.isArray(uRes.data)
        ? uRes.data
        : uRes.data?.content ?? []
      : [];

    const hasRealData = productsData.length || ordersData.length || usersData.length;
    if (!hasRealData) {
      toast.info("Showing demo dashboard data");
      setProducts(MOCK_PRODUCTS);
      setOrders(MOCK_ORDERS);
      setUsers(MOCK_USERS);
    } else {
      setProducts(productsData.length ? productsData : MOCK_PRODUCTS);
      setOrders(ordersData.length ? ordersData : MOCK_ORDERS);
      setUsers(usersData.length ? usersData : MOCK_USERS);
    }
    setLoading(false);
  };

  useEffect(() => {
    void fetchDashboard();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const stats = useMemo(() => {
    const revenue = orders.reduce((sum, o) => sum + Number(o.total_amount || 0), 0);
    const activeUsers = users.filter((u) => u.is_active).length;
    const inStock = products.filter((p) => p.inStock).length;
    return { revenue, activeUsers, inStock };
  }, [orders, users, products]);

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-semibold">Overview</h2>
          <p className="text-sm text-muted-foreground">Snapshot of products, orders and users</p>
        </div>
        <Button variant="outline" onClick={() => void fetchDashboard()} disabled={loading}>
          <RefreshCw className="mr-2 h-4 w-4" />
          {loading ? "Refreshing..." : "Refresh"}
        </Button>
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">
        <Card>
          <CardHeader>
            <CardDescription>Total Products</CardDescription>
            <CardTitle className="text-2xl">{products.length}</CardTitle>
          </CardHeader>
          <CardContent className="flex items-center gap-2 text-muted-foreground">
            <Package className="h-4 w-4" /> {stats.inStock} in stock
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardDescription>Total Orders</CardDescription>
            <CardTitle className="text-2xl">{orders.length}</CardTitle>
          </CardHeader>
          <CardContent className="flex items-center gap-2 text-muted-foreground">
            <ShoppingCart className="h-4 w-4" /> recent activity
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardDescription>Total Users</CardDescription>
            <CardTitle className="text-2xl">{users.length}</CardTitle>
          </CardHeader>
          <CardContent className="flex items-center gap-2 text-muted-foreground">
            <Users className="h-4 w-4" /> {stats.activeUsers} active
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardDescription>Total Revenue</CardDescription>
            <CardTitle className="text-2xl">${stats.revenue.toFixed(2)}</CardTitle>
          </CardHeader>
          <CardContent className="flex items-center gap-2 text-muted-foreground">
            <TrendingUp className="h-4 w-4" /> gross from shown orders
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 gap-4 xl:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Activity className="h-4 w-4" />
              Recent Orders
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {orders.slice(0, 5).map((o) => (
                <div key={o.id} className="flex items-center justify-between rounded-md border p-3">
                  <div>
                    <p className="font-medium">#{o.id} - {o.shipping_address?.name || `User ${o.user_id}`}</p>
                    <p className="text-xs text-muted-foreground">{new Date(o.order_date).toLocaleString()}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge variant={o.payment_status?.toLowerCase().includes("paid") ? "secondary" : "outline"}>
                      {o.payment_status}
                    </Badge>
                    <span className="font-medium">${Number(o.total_amount || 0).toFixed(2)}</span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users className="h-4 w-4" />
              Recently Active Users
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {users.slice(0, 5).map((u) => (
                <div key={u.id} className="flex items-center justify-between rounded-md border p-3">
                  <div className="flex items-center gap-3">
                    <img
                      src={u.avtar || "https://placehold.co/40x40?text=U"}
                      alt={u.email}
                      className="h-10 w-10 rounded-full object-cover"
                    />
                    <div>
                      <p className="font-medium">{`${u.first_name || ""} ${u.last_name || ""}`.trim() || u.login_name}</p>
                      <p className="text-xs text-muted-foreground">{u.email}</p>
                    </div>
                  </div>
                  <Badge variant={u.is_active ? "secondary" : "outline"}>
                    {u.is_active ? "Active" : "Inactive"}
                  </Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AdminDashboard;