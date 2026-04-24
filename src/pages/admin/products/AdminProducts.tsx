import { useEffect, useMemo, useState, type FC } from "react";
import { Search, Plus, Pencil, Trash2, ChevronLeft, ChevronRight, Circle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { useApi } from "@/hooks/useApi";
import { toast } from "react-toastify";
import type { AdminProductApiResponse, ProductDTO } from "@/core/modals/product";
import AdminProductForm, { type ProductFormValues } from "@/components/forms/AdminProductForm";

type ProductApiResponse = ProductDTO | { data: ProductDTO } | { product: ProductDTO };

const emptyForm: ProductFormValues = {
  name: "",
  price: 0,
  quantity: 0,
  category: "",
  image: "",
  description: "",
  inStock: true,
};

const mapProductToForm = (p: ProductDTO): ProductFormValues => ({
  name: p.name ?? "",
  price: Number(p.price ?? 0),
  quantity: Number(p.quantity ?? 0),
  category: p.category ?? "",
  image: p.image ?? "",
  description: p.description ?? "",
  inStock: p.inStock ?? true,
});

const parseSavedProduct = (body: ProductApiResponse | undefined): ProductDTO | null => {
  if (!body) return null;
  if ("product" in body && body.product) return body.product;
  if ("data" in body && body.data) return body.data;
  if ("id" in body && "name" in body) return body as ProductDTO;
  return null;
};

export const AdminProductListing: FC = () => {
  const { callApi } = useApi();
  const [products, setProducts] = useState<ProductDTO[]>([]);
//   const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [loadingList, setLoadingList] = useState(false);
  const [keyword, setKeyword] = useState("");
//   const [category, setCategory] = useState("");
  const [page, setPage] = useState(1);
  const [size, setSize] = useState(50);
  const [totalPages, setTotalPages] = useState(1);
  const [totalElements, setTotalElements] = useState(0);

  const [openForm, setOpenForm] = useState(false);
  const [editingProduct, setEditingProduct] = useState<ProductDTO | null>(null);
  const [formInitialValues, setFormInitialValues] = useState<ProductFormValues>(emptyForm);
  const [saving, setSaving] = useState(false);

  const [deleteTarget, setDeleteTarget] = useState<ProductDTO | null>(null);
  const [deleting, setDeleting] = useState(false);

  const pageInfo = useMemo(() => `${page} / ${Math.max(totalPages, 1)}`, [page, totalPages]);

  const fetchProducts = async () => {
    setLoadingList(true);

//     const url = `/api/products/paginated?page=${page}&size=${size}&category=${encodeURIComponent(
//       category
//     )}&keyword=${encodeURIComponent(keyword)}`;

    const url = `/api/products/paginated?page=${page}&size=${size}`;

    const res = await callApi<AdminProductApiResponse>("GET", url);
    setLoadingList(false);

    if (!res.success || !res.data) {
      toast.error(typeof res.error === "string" ? res.error : "Failed to fetch products");
      return;
    }

    const nextProducts = Array.isArray(res.data.content) ? res.data.content : [];
    setProducts(nextProducts);
//     setFilteredProducts(nextProducts);
    setTotalPages(Number(res.data.metadata?.totalPages ?? 1));
    setTotalElements(Number(res.data.metadata?.totalElements ?? nextProducts.length));
  };

//   const debouncedSearch = useCallback(
//     debounce((searchQuery: string) => {
//       const filtered = products.filter((u) => {
//         return !searchQuery.trim() || u.name.toLowerCase().includes(searchQuery.toLowerCase());
//       });
//       setFilteredProducts(filtered);
//     }, 300), // 300ms delay
//     [products, setFilteredProducts] 
//   );

const filteredProducts = useMemo(() => {
  const cleanSearch = keyword.trim().toLowerCase();
  if (!cleanSearch) return products;
  return products.filter(p => p.name.toLowerCase().includes(cleanSearch));
}, [keyword, products]);

//     const seacrhProduct = (search: string) =>{
//         // console.log(search);
//         // const filtered = products.filter((u) => {
//         //         return !search.trim() || u.name.toLowerCase().includes(search.toLowerCase());
//         //         });
//         debounce((searchQuery: string) => {
//                 const filtered = products.filter((u) => {
//                 return !searchQuery.trim() || u.name.toLowerCase().includes(searchQuery.toLowerCase());
//                 });
//                 setFilteredProducts(filtered);
//         },300);
    
//         // debouncedSearch(search);
//         // setFilteredProducts(filtered);
//         setKeyword(search);
//   }

  useEffect(() => {
    void fetchProducts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page, size]);

//   const onApplyFilters = async () => {
//     setPage(1);
//     await fetchProducts();
//   };

  const onOpenAdd = () => {
    setEditingProduct(null);
    setFormInitialValues(emptyForm);
    setOpenForm(true);
  };

  const onOpenEdit = (p: ProductDTO) => {
    setEditingProduct(p);
    setFormInitialValues(mapProductToForm(p));
    setOpenForm(true);
  };

  const onSaveProduct = async (form: ProductFormValues) => {
    setSaving(true);
    const payload = [{
        id: editingProduct?.id,
        name: form.name.trim(),
        price: form.price,
        quantity: form.quantity,
        category: form.category.trim(),
        image: form.image.trim(),
        description: form.description.trim(),
        inStock: form.inStock,
        isActive: true,
      }];

    const isEdit = Boolean(editingProduct?.id);
    const endpoint = isEdit ? `/api/products/update` : "/api/products/add";
    const method = isEdit ? "PUT" : "POST";
    const res = await callApi<ProductApiResponse>(method, endpoint, payload);
    setSaving(false);

    if (!res.success) {
      toast.error(typeof res.error === "string" ? res.error : "Failed to save product");
      return;
    }

    const savedProduct = parseSavedProduct(res.data);

    if (savedProduct) {
      setProducts((prev) => {
        if (!isEdit) return [savedProduct, ...prev];
        return prev.map((p) => (p.id === savedProduct.id ? savedProduct : p));
      });
    } else {
      await fetchProducts();
    }

    setOpenForm(false);
    toast.success(isEdit ? "Product updated" : "Product created");
  };

  const onDeleteProduct = async () => {
    if (!deleteTarget) return;
    setDeleting(true);
    const res = await callApi("DELETE", `/api/products/delete/${deleteTarget.id}`);
    setDeleting(false);

    if (!res.success) {
      toast.error(typeof res.error === "string" ? res.error : "Failed to delete product");
      return;
    }

    setProducts((prev) => prev.filter((p) => p.id !== deleteTarget.id));
    setDeleteTarget(null);
    toast.success("Product deleted");
  };

  return (
    <section className="rounded-2xl bg-white p-4 shadow-sm">
      <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
        <h2 className="text-2xl font-semibold text-gray-800">Product Lists</h2>
        <div className="flex flex-wrap items-center gap-2">
          <div className="relative">
            <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
            <Input
              value={keyword}
              onChange={(e) => setKeyword(e.target.value)}
              placeholder="Type product name..."
              className="w-64 pl-9"
            />
          </div>
          {/* <Input
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            placeholder="Category"
            className="w-40"
          /> */}
          {/* <Button type="button" variant="outline" onClick={onApplyFilters}>
            <Filter className="mr-2 h-4 w-4" />
            Filter
          </Button> */}
          <Button type="button" onClick={onOpenAdd} className="bg-emerald-500 hover:bg-emerald-600">
            <Plus className="mr-2 h-4 w-4" />
            Add Products
          </Button>
        </div>
      </div>

      <div className="overflow-x-auto rounded-xl border border-gray-100">
        <table className="min-w-full text-sm">
          <thead className="bg-gray-50 text-left text-gray-500">
            <tr>
              <th className="px-4 py-3 font-medium">Product Name</th>
              <th className="px-4 py-3 font-medium">Price</th>
              <th className="px-4 py-3 font-medium">Quantity</th>
              <th className="px-4 py-3 font-medium">Category</th>
              <th className="px-4 py-3 font-medium">Status</th>
              <th className="px-4 py-3 font-medium">Stock?</th>
              <th className="px-4 py-3 font-medium text-right">Action</th>
            </tr>
          </thead>
          <tbody>
            {loadingList ? (
              <tr>
                <td colSpan={6} className="px-4 py-8 text-center text-gray-500">
                  Loading products...
                </td>
              </tr>
            ) : products.length === 0 ? (
              <tr>
                <td colSpan={6} className="px-4 py-8 text-center text-gray-500">
                  No products found
                </td>
              </tr>
            ) : (
              filteredProducts.map((p) => (
                <tr key={p.id} className="border-t border-gray-100">
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-3">
                      <img
                        src={p.image || "https://placehold.co/48x48?text=P"}
                        alt={p.name}
                        className="h-10 w-10 rounded-md object-cover"
                      />
                      <div>
                        <p className="font-medium text-gray-800">{p.name}</p>
                        <p className="text-xs text-gray-500">Txn ID: #{p.id}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-gray-700">${Number(p.price ?? 0).toFixed(2)}</td>
                  <td className="px-4 py-3 text-gray-700">{p.quantity ?? 0}</td>
                  <td className="px-4 py-3 text-gray-700">{p.category}</td>
                  <td className="px-4 py-3">
                    <span
                      className={`rounded-full px-3 py-1 text-xs font-medium ${
                        p.isActive ? "bg-emerald-100 text-emerald-700" : "bg-red-100 text-red-700"
                      }`}
                    >
                      {p.isActive ? "Active" : "Inactive"}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-gray-700">
                        <span
                      className={`  ${
                        p.inStock ? "bg-emerald-100 text-emerald-700" : "bg-red-100 text-red-700"
                      }`}
                    >
                      <Circle fill="currentColor"  size={16} className="ml-2"/>
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex justify-end gap-2">
                      <Button type="button" size="icon" variant="outline" onClick={() => onOpenEdit(p)}>
                        <Pencil className="h-4 w-4" />
                      </Button>
                      <Button
                        type="button"
                        size="icon"
                        variant="destructive"
                        onClick={() => setDeleteTarget(p)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
        <p className="text-sm text-gray-500">{totalElements} total items</p>
        <div className="flex items-center gap-2">
          <select
            className="rounded-md border px-2 py-1 text-sm"
            value={size}
            onChange={(e) => {
              setPage(1);
              setSize(Number(e.target.value));
            }}
          >
            <option value={5}>5 / page</option>
            <option value={10}>10 / page</option>
            <option value={20}>20 / page</option>
          </select>
          <Button
            type="button"
            variant="outline"
            size="icon"
            disabled={page <= 1}
            onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <span className="min-w-16 text-center text-sm text-gray-600">{pageInfo}</span>
          <Button
            type="button"
            variant="outline"
            size="icon"
            disabled={page >= totalPages}
            onClick={() => setPage((prev) => Math.min(prev + 1, totalPages))}
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <Dialog open={openForm} onOpenChange={setOpenForm}>
        <DialogContent className="sm:max-w-lg">
          <DialogHeader>
            <DialogTitle>{editingProduct ? "Edit Product" : "Add Product"}</DialogTitle>
          </DialogHeader>
          <AdminProductForm
            initialValues={formInitialValues}
            submitting={saving}
            submitLabel={editingProduct ? "Save changes" : "Create product"}
            onCancel={() => setOpenForm(false)}
            onSubmit={onSaveProduct}
          />
        </DialogContent>
      </Dialog>

      <Dialog open={Boolean(deleteTarget)} onOpenChange={() => setDeleteTarget(null)}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Delete Product</DialogTitle>
          </DialogHeader>
          <p className="text-sm text-gray-600">
            Are you sure you want to delete <span className="font-medium">{deleteTarget?.name}</span>?
          </p>
          <div className="mt-2 flex justify-end gap-2">
            <Button type="button" variant="outline" onClick={() => setDeleteTarget(null)}>
              Cancel
            </Button>
            <Button type="button" variant="destructive" disabled={deleting} onClick={() => void onDeleteProduct()}>
              {deleting ? "Deleting..." : "Delete"}
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </section>
  );
};

export const AdminProducts = AdminProductListing;
export default AdminProductListing;


