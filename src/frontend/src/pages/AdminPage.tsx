import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Skeleton } from "@/components/ui/skeleton";
import { Switch } from "@/components/ui/switch";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { getMakerImage, getProductImage } from "@/constants/images";
import {
  useCreateMaker,
  useCreateProduct,
  useCreateTestimonial,
  useDeleteMaker,
  useDeleteProduct,
  useDeleteTestimonial,
  useGetAllMakers,
  useGetAllOrders,
  useGetAllProducts,
  useGetAllTestimonials,
  useUpdateMaker,
  useUpdateOrderStatus,
  useUpdateProduct,
} from "@/hooks/useQueries";
import { Link } from "@tanstack/react-router";
import {
  BarChart2,
  ChefHat,
  Database,
  Edit,
  Eye,
  EyeOff,
  Loader2,
  Lock,
  Package,
  Plus,
  ShoppingCart,
  Star,
  Trash2,
  Users,
} from "lucide-react";
import { motion } from "motion/react";
import { useState } from "react";
import { toast } from "sonner";
import type { Maker, OrderStatus, Product, Testimonial } from "../backend.d";
import { OrderStatus as OrderStatusEnum } from "../backend.d";

const ADMIN_PASSWORD = "choudhary2024";

// ============================================
// MAKERS TAB
// ============================================

function MakersTab() {
  const makersQuery = useGetAllMakers();
  const createMaker = useCreateMaker();
  const updateMaker = useUpdateMaker();
  const deleteMaker = useDeleteMaker();

  const [showForm, setShowForm] = useState(false);
  const [editMaker, setEditMaker] = useState<Maker | null>(null);
  const [deleteId, setDeleteId] = useState<bigint | null>(null);
  const [formData, setFormData] = useState<Partial<Maker>>({
    name: "",
    state: "",
    bio: "",
    story: "",
    photoUrl: "",
    whatsappNumber: "",
    isActive: true,
  });

  function openAdd() {
    setEditMaker(null);
    setFormData({
      name: "",
      state: "",
      bio: "",
      story: "",
      photoUrl: "",
      whatsappNumber: "",
      isActive: true,
    });
    setShowForm(true);
  }

  function openEdit(maker: Maker) {
    setEditMaker(maker);
    setFormData({ ...maker });
    setShowForm(true);
  }

  async function handleSave() {
    try {
      if (editMaker) {
        await updateMaker.mutateAsync({ ...editMaker, ...formData } as Maker);
        toast.success("Maker updated successfully");
      } else {
        await createMaker.mutateAsync({ ...formData, id: 0n } as Maker);
        toast.success("Maker added successfully");
      }
      setShowForm(false);
    } catch {
      toast.error("Failed to save maker");
    }
  }

  async function handleDelete() {
    if (deleteId === null) return;
    try {
      await deleteMaker.mutateAsync(deleteId);
      toast.success("Maker deleted");
      setDeleteId(null);
    } catch {
      toast.error("Failed to delete maker");
    }
  }

  const makers = makersQuery.data ?? [];

  return (
    <div>
      <div className="flex items-center justify-between mb-5">
        <h3 className="font-display font-bold text-lg text-foreground">
          Makers ({makers.length})
        </h3>
        <Button
          onClick={openAdd}
          size="sm"
          data-ocid="admin.add_button"
          className="bg-saffron hover:bg-terracotta text-cream"
        >
          <Plus className="w-4 h-4 mr-1.5" /> Add Maker
        </Button>
      </div>

      {makersQuery.isLoading ? (
        <div className="space-y-3" data-ocid="admin.loading_state">
          {[1, 2, 3].map((i) => (
            <Skeleton key={i} className="h-14 w-full rounded-lg" />
          ))}
        </div>
      ) : makers.length === 0 ? (
        <div
          className="text-center py-12 text-muted-foreground"
          data-ocid="admin.makers.empty_state"
        >
          No makers yet. Add your first maker!
        </div>
      ) : (
        <div className="overflow-x-auto rounded-xl border border-border">
          <Table data-ocid="admin.makers.table">
            <TableHeader>
              <TableRow>
                <TableHead>Photo</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>State</TableHead>
                <TableHead>Active</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {makers.map((maker, idx) => (
                <TableRow
                  key={maker.id.toString()}
                  data-ocid={`admin.makers.row.${idx + 1}`}
                >
                  <TableCell>
                    <img
                      src={getMakerImage(maker.name)}
                      alt={maker.name}
                      className="w-10 h-10 rounded-full object-cover"
                    />
                  </TableCell>
                  <TableCell className="font-display font-semibold text-sm">
                    {maker.name}
                  </TableCell>
                  <TableCell>
                    <span className="state-badge">{maker.state}</span>
                  </TableCell>
                  <TableCell>
                    <Switch checked={maker.isActive} disabled />
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex items-center gap-2 justify-end">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => openEdit(maker)}
                        data-ocid={`admin.makers.edit_button.${idx + 1}`}
                      >
                        <Edit className="w-3.5 h-3.5" />
                      </Button>
                      <Button
                        variant="destructive"
                        size="sm"
                        onClick={() => setDeleteId(maker.id)}
                        data-ocid={`admin.makers.delete_button.${idx + 1}`}
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      )}

      {/* Form Dialog */}
      <Dialog open={showForm} onOpenChange={setShowForm}>
        <DialogContent
          className="max-w-lg max-h-[80vh] overflow-y-auto"
          data-ocid="admin.makers.dialog"
        >
          <DialogHeader>
            <DialogTitle className="font-display">
              {editMaker ? "Edit Maker" : "Add New Maker"}
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-2">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label className="font-body text-xs mb-1.5 block">Name *</Label>
                <Input
                  value={formData.name ?? ""}
                  onChange={(e) =>
                    setFormData((p) => ({ ...p, name: e.target.value }))
                  }
                  placeholder="e.g. Anju Choudhary"
                  className="font-body text-sm"
                  data-ocid="admin.makers.input"
                />
              </div>
              <div>
                <Label className="font-body text-xs mb-1.5 block">
                  State *
                </Label>
                <Select
                  value={formData.state ?? ""}
                  onValueChange={(val) =>
                    setFormData((p) => ({ ...p, state: val }))
                  }
                >
                  <SelectTrigger data-ocid="admin.makers.select">
                    <SelectValue placeholder="Select state" />
                  </SelectTrigger>
                  <SelectContent>
                    {[
                      "Bihar",
                      "Haryana",
                      "Punjab",
                      "Uttar Pradesh",
                      "Uttarakhand",
                    ].map((s) => (
                      <SelectItem key={s} value={s}>
                        {s}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div>
              <Label className="font-body text-xs mb-1.5 block">Bio</Label>
              <Textarea
                value={formData.bio ?? ""}
                onChange={(e) =>
                  setFormData((p) => ({ ...p, bio: e.target.value }))
                }
                placeholder="Short bio..."
                rows={2}
                className="font-body text-sm"
                data-ocid="admin.makers.textarea"
              />
            </div>
            <div>
              <Label className="font-body text-xs mb-1.5 block">Story</Label>
              <Textarea
                value={formData.story ?? ""}
                onChange={(e) =>
                  setFormData((p) => ({ ...p, story: e.target.value }))
                }
                placeholder="Full story..."
                rows={3}
                className="font-body text-sm"
              />
            </div>
            <div>
              <Label className="font-body text-xs mb-1.5 block">
                WhatsApp Number
              </Label>
              <Input
                value={formData.whatsappNumber ?? ""}
                onChange={(e) =>
                  setFormData((p) => ({ ...p, whatsappNumber: e.target.value }))
                }
                placeholder="+91 9XXXXXXXXX"
                className="font-body text-sm"
              />
            </div>
            <div className="flex items-center gap-3">
              <Switch
                checked={formData.isActive ?? true}
                onCheckedChange={(val) =>
                  setFormData((p) => ({ ...p, isActive: val }))
                }
                data-ocid="admin.makers.switch"
              />
              <Label className="font-body text-xs">Active</Label>
            </div>
          </div>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setShowForm(false)}
              data-ocid="admin.makers.cancel_button"
            >
              Cancel
            </Button>
            <Button
              onClick={handleSave}
              disabled={createMaker.isPending || updateMaker.isPending}
              className="bg-saffron hover:bg-terracotta text-cream"
              data-ocid="admin.makers.save_button"
            >
              {(createMaker.isPending || updateMaker.isPending) && (
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
              )}
              {editMaker ? "Save Changes" : "Add Maker"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Confirm */}
      <AlertDialog
        open={deleteId !== null}
        onOpenChange={() => setDeleteId(null)}
      >
        <AlertDialogContent data-ocid="admin.makers.dialog">
          <AlertDialogHeader>
            <AlertDialogTitle className="font-display">
              Delete Maker?
            </AlertDialogTitle>
            <AlertDialogDescription className="font-body text-sm">
              This will permanently delete the maker and cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel data-ocid="admin.makers.cancel_button">
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDelete}
              className="bg-destructive text-destructive-foreground"
              data-ocid="admin.makers.confirm_button"
            >
              {deleteMaker.isPending ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                "Delete"
              )}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}

// ============================================
// PRODUCTS TAB
// ============================================

function ProductsTab() {
  const productsQuery = useGetAllProducts();
  const makersQuery = useGetAllMakers();
  const createProduct = useCreateProduct();
  const updateProduct = useUpdateProduct();
  const deleteProduct = useDeleteProduct();

  const [showForm, setShowForm] = useState(false);
  const [editProduct, setEditProduct] = useState<Product | null>(null);
  const [deleteId, setDeleteId] = useState<bigint | null>(null);
  const [formData, setFormData] = useState<Partial<Product>>({
    name: "",
    description: "",
    ingredients: [],
    preparationMethod: "",
    usp: "",
    category: "achar",
    state: "",
    mrp: 0,
    sellingPrice: 0,
    minBatchKg: 1,
    isAvailable: true,
    makerId: 0n,
    imageUrl: "",
  });
  const [ingredientsText, setIngredientsText] = useState("");

  const products = productsQuery.data ?? [];
  const makers = makersQuery.data ?? [];

  function openAdd() {
    setEditProduct(null);
    setFormData({
      name: "",
      description: "",
      ingredients: [],
      preparationMethod: "",
      usp: "",
      category: "achar",
      state: "",
      mrp: 0,
      sellingPrice: 0,
      minBatchKg: 1,
      isAvailable: true,
      makerId: 0n,
      imageUrl: "",
    });
    setIngredientsText("");
    setShowForm(true);
  }

  function openEdit(product: Product) {
    setEditProduct(product);
    setFormData({ ...product });
    setIngredientsText(product.ingredients.join(", "));
    setShowForm(true);
  }

  async function handleSave() {
    const ingredients = ingredientsText
      .split(",")
      .map((s) => s.trim())
      .filter(Boolean);
    const data = { ...formData, ingredients } as Product;
    try {
      if (editProduct) {
        await updateProduct.mutateAsync({ ...editProduct, ...data });
        toast.success("Product updated");
      } else {
        await createProduct.mutateAsync({ ...data, id: 0n });
        toast.success("Product added");
      }
      setShowForm(false);
    } catch {
      toast.error("Failed to save product");
    }
  }

  async function handleDelete() {
    if (deleteId === null) return;
    try {
      await deleteProduct.mutateAsync(deleteId);
      toast.success("Product deleted");
      setDeleteId(null);
    } catch {
      toast.error("Failed to delete product");
    }
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-5">
        <h3 className="font-display font-bold text-lg text-foreground">
          Products ({products.length})
        </h3>
        <Button
          onClick={openAdd}
          size="sm"
          data-ocid="admin.add_button"
          className="bg-saffron hover:bg-terracotta text-cream"
        >
          <Plus className="w-4 h-4 mr-1.5" /> Add Product
        </Button>
      </div>

      {productsQuery.isLoading ? (
        <div className="space-y-3">
          {[1, 2, 3].map((i) => (
            <Skeleton key={i} className="h-14 w-full rounded-lg" />
          ))}
        </div>
      ) : products.length === 0 ? (
        <div
          className="text-center py-12 text-muted-foreground"
          data-ocid="admin.products.empty_state"
        >
          No products yet.
        </div>
      ) : (
        <div className="overflow-x-auto rounded-xl border border-border">
          <Table data-ocid="admin.products.table">
            <TableHeader>
              <TableRow>
                <TableHead>Image</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>State</TableHead>
                <TableHead>Price</TableHead>
                <TableHead>Min Batch</TableHead>
                <TableHead>Available</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {products.map((product, idx) => (
                <TableRow
                  key={product.id.toString()}
                  data-ocid={`admin.products.row.${idx + 1}`}
                >
                  <TableCell>
                    <img
                      src={getProductImage(product.category, product.name)}
                      alt={product.name}
                      className="w-10 h-10 rounded-lg object-cover"
                    />
                  </TableCell>
                  <TableCell className="font-display font-semibold text-sm">
                    {product.name}
                  </TableCell>
                  <TableCell>
                    <span className="state-badge">{product.state}</span>
                  </TableCell>
                  <TableCell className="text-sm font-body">
                    <span className="text-saffron font-bold">
                      ₹{product.sellingPrice}
                    </span>
                    <span className="text-muted-foreground line-through ml-1.5 text-xs">
                      ₹{product.mrp}
                    </span>
                  </TableCell>
                  <TableCell className="text-sm font-body">
                    {product.minBatchKg} kg
                  </TableCell>
                  <TableCell>
                    <Switch checked={product.isAvailable} disabled />
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex items-center gap-2 justify-end">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => openEdit(product)}
                        data-ocid={`admin.products.edit_button.${idx + 1}`}
                      >
                        <Edit className="w-3.5 h-3.5" />
                      </Button>
                      <Button
                        variant="destructive"
                        size="sm"
                        onClick={() => setDeleteId(product.id)}
                        data-ocid={`admin.products.delete_button.${idx + 1}`}
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      )}

      {/* Form Dialog */}
      <Dialog open={showForm} onOpenChange={setShowForm}>
        <DialogContent
          className="max-w-2xl max-h-[80vh] overflow-y-auto"
          data-ocid="admin.products.dialog"
        >
          <DialogHeader>
            <DialogTitle className="font-display">
              {editProduct ? "Edit Product" : "Add New Product"}
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-2">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label className="font-body text-xs mb-1.5 block">
                  Product Name *
                </Label>
                <Input
                  value={formData.name ?? ""}
                  onChange={(e) =>
                    setFormData((p) => ({ ...p, name: e.target.value }))
                  }
                  className="font-body text-sm"
                  data-ocid="admin.products.input"
                />
              </div>
              <div>
                <Label className="font-body text-xs mb-1.5 block">
                  Category *
                </Label>
                <Select
                  value={formData.category ?? "achar"}
                  onValueChange={(val) =>
                    setFormData((p) => ({ ...p, category: val }))
                  }
                >
                  <SelectTrigger data-ocid="admin.products.select">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {[
                      "achar",
                      "sweets",
                      "namkeen",
                      "snacks",
                      "chutney",
                      "masala",
                    ].map((c) => (
                      <SelectItem key={c} value={c} className="capitalize">
                        {c}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label className="font-body text-xs mb-1.5 block">
                  State *
                </Label>
                <Select
                  value={formData.state ?? ""}
                  onValueChange={(val) =>
                    setFormData((p) => ({ ...p, state: val }))
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select state" />
                  </SelectTrigger>
                  <SelectContent>
                    {[
                      "Bihar",
                      "Haryana",
                      "Punjab",
                      "Uttar Pradesh",
                      "Uttarakhand",
                    ].map((s) => (
                      <SelectItem key={s} value={s}>
                        {s}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label className="font-body text-xs mb-1.5 block">Maker</Label>
                <Select
                  value={formData.makerId?.toString() ?? "0"}
                  onValueChange={(val) =>
                    setFormData((p) => ({ ...p, makerId: BigInt(val) }))
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select maker" />
                  </SelectTrigger>
                  <SelectContent>
                    {makers.map((m) => (
                      <SelectItem key={m.id.toString()} value={m.id.toString()}>
                        {m.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="grid grid-cols-3 gap-4">
              <div>
                <Label className="font-body text-xs mb-1.5 block">
                  MRP (₹)
                </Label>
                <Input
                  type="number"
                  value={formData.mrp ?? 0}
                  onChange={(e) =>
                    setFormData((p) => ({ ...p, mrp: Number(e.target.value) }))
                  }
                  className="font-body text-sm"
                />
              </div>
              <div>
                <Label className="font-body text-xs mb-1.5 block">
                  Selling Price (₹)
                </Label>
                <Input
                  type="number"
                  value={formData.sellingPrice ?? 0}
                  onChange={(e) =>
                    setFormData((p) => ({
                      ...p,
                      sellingPrice: Number(e.target.value),
                    }))
                  }
                  className="font-body text-sm"
                />
              </div>
              <div>
                <Label className="font-body text-xs mb-1.5 block">
                  Min Batch (kg)
                </Label>
                <Input
                  type="number"
                  value={formData.minBatchKg ?? 1}
                  onChange={(e) =>
                    setFormData((p) => ({
                      ...p,
                      minBatchKg: Number(e.target.value),
                    }))
                  }
                  className="font-body text-sm"
                />
              </div>
            </div>
            <div>
              <Label className="font-body text-xs mb-1.5 block">
                Description
              </Label>
              <Textarea
                value={formData.description ?? ""}
                onChange={(e) =>
                  setFormData((p) => ({ ...p, description: e.target.value }))
                }
                rows={2}
                className="font-body text-sm"
                data-ocid="admin.products.textarea"
              />
            </div>
            <div>
              <Label className="font-body text-xs mb-1.5 block">
                Ingredients (comma-separated)
              </Label>
              <Input
                value={ingredientsText}
                onChange={(e) => setIngredientsText(e.target.value)}
                placeholder="Raw mango, mustard oil, salt..."
                className="font-body text-sm"
              />
            </div>
            <div>
              <Label className="font-body text-xs mb-1.5 block">
                Preparation Method
              </Label>
              <Textarea
                value={formData.preparationMethod ?? ""}
                onChange={(e) =>
                  setFormData((p) => ({
                    ...p,
                    preparationMethod: e.target.value,
                  }))
                }
                rows={2}
                className="font-body text-sm"
              />
            </div>
            <div>
              <Label className="font-body text-xs mb-1.5 block">
                USP / What makes it special
              </Label>
              <Input
                value={formData.usp ?? ""}
                onChange={(e) =>
                  setFormData((p) => ({ ...p, usp: e.target.value }))
                }
                className="font-body text-sm"
              />
            </div>
            <div className="flex items-center gap-3">
              <Switch
                checked={formData.isAvailable ?? true}
                onCheckedChange={(val) =>
                  setFormData((p) => ({ ...p, isAvailable: val }))
                }
              />
              <Label className="font-body text-xs">Available for order</Label>
            </div>
          </div>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setShowForm(false)}
              data-ocid="admin.products.cancel_button"
            >
              Cancel
            </Button>
            <Button
              onClick={handleSave}
              disabled={createProduct.isPending || updateProduct.isPending}
              className="bg-saffron hover:bg-terracotta text-cream"
              data-ocid="admin.products.save_button"
            >
              {(createProduct.isPending || updateProduct.isPending) && (
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
              )}
              {editProduct ? "Save Changes" : "Add Product"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete */}
      <AlertDialog
        open={deleteId !== null}
        onOpenChange={() => setDeleteId(null)}
      >
        <AlertDialogContent data-ocid="admin.products.dialog">
          <AlertDialogHeader>
            <AlertDialogTitle className="font-display">
              Delete Product?
            </AlertDialogTitle>
            <AlertDialogDescription className="font-body text-sm">
              This cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel data-ocid="admin.products.cancel_button">
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDelete}
              className="bg-destructive text-destructive-foreground"
              data-ocid="admin.products.confirm_button"
            >
              {deleteProduct.isPending ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                "Delete"
              )}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}

// ============================================
// ORDERS TAB
// ============================================

function OrdersTab() {
  const ordersQuery = useGetAllOrders();
  const updateStatus = useUpdateOrderStatus();
  const orders = ordersQuery.data ?? [];

  async function handleStatusChange(orderId: bigint, status: string) {
    try {
      await updateStatus.mutateAsync({
        orderId,
        status: status as OrderStatus,
      });
      toast.success("Order status updated");
    } catch {
      toast.error("Failed to update status");
    }
  }

  const STATUS_COLORS: Record<string, string> = {
    pending: "bg-yellow-100 text-yellow-800 border-yellow-200",
    confirmed: "bg-blue-100 text-blue-800 border-blue-200",
    preparing: "bg-orange-100 text-orange-800 border-orange-200",
    dispatched: "bg-purple-100 text-purple-800 border-purple-200",
    delivered: "bg-green-100 text-green-800 border-green-200",
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-5">
        <h3 className="font-display font-bold text-lg text-foreground">
          Orders ({orders.length})
        </h3>
      </div>

      {ordersQuery.isLoading ? (
        <div className="space-y-3">
          {[1, 2, 3].map((i) => (
            <Skeleton key={i} className="h-14 w-full rounded-lg" />
          ))}
        </div>
      ) : orders.length === 0 ? (
        <div
          className="text-center py-12 text-muted-foreground"
          data-ocid="admin.orders.empty_state"
        >
          No orders yet.
        </div>
      ) : (
        <div className="overflow-x-auto rounded-xl border border-border">
          <Table data-ocid="admin.orders.table">
            <TableHeader>
              <TableRow>
                <TableHead>Customer</TableHead>
                <TableHead>Phone</TableHead>
                <TableHead>Qty (kg)</TableHead>
                <TableHead>Advance (₹)</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Update Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {orders.map((order, idx) => (
                <TableRow
                  key={order.id.toString()}
                  data-ocid={`admin.orders.row.${idx + 1}`}
                >
                  <TableCell className="font-body font-semibold text-sm">
                    {order.customerName}
                  </TableCell>
                  <TableCell className="font-body text-sm text-muted-foreground">
                    {order.customerPhone}
                  </TableCell>
                  <TableCell className="font-body text-sm">
                    {order.quantityKg} kg
                  </TableCell>
                  <TableCell className="font-body text-sm text-saffron font-bold">
                    ₹{order.advanceAmount}
                  </TableCell>
                  <TableCell>
                    <span
                      className={`px-2 py-0.5 rounded-full text-xs border font-semibold font-body ${STATUS_COLORS[order.status] ?? "bg-muted text-muted-foreground"}`}
                    >
                      {order.status}
                    </span>
                  </TableCell>
                  <TableCell>
                    <Select
                      value={order.status}
                      onValueChange={(val) => handleStatusChange(order.id, val)}
                    >
                      <SelectTrigger
                        className="w-32 h-8 text-xs font-body"
                        data-ocid="admin.orders.select"
                      >
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {Object.values(OrderStatusEnum).map((s) => (
                          <SelectItem
                            key={s}
                            value={s}
                            className="text-xs font-body capitalize"
                          >
                            {s}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      )}
    </div>
  );
}

// ============================================
// TESTIMONIALS TAB
// ============================================

function TestimonialsTab() {
  const testimonialsQuery = useGetAllTestimonials();
  const createTestimonial = useCreateTestimonial();
  const deleteTestimonial = useDeleteTestimonial();
  const testimonials = testimonialsQuery.data ?? [];

  const [showForm, setShowForm] = useState(false);
  const [deleteId, setDeleteId] = useState<bigint | null>(null);
  const [formData, setFormData] = useState<Partial<Testimonial>>({
    customerName: "",
    message: "",
    rating: 5n,
    location: "",
  });

  async function handleAdd() {
    try {
      await createTestimonial.mutateAsync({
        ...formData,
        id: 0n,
        createdAt: BigInt(Date.now()),
      } as Testimonial);
      toast.success("Testimonial added");
      setShowForm(false);
      setFormData({ customerName: "", message: "", rating: 5n, location: "" });
    } catch {
      toast.error("Failed to add testimonial");
    }
  }

  async function handleDelete() {
    if (deleteId === null) return;
    try {
      await deleteTestimonial.mutateAsync(deleteId);
      toast.success("Testimonial deleted");
      setDeleteId(null);
    } catch {
      toast.error("Failed to delete");
    }
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-5">
        <h3 className="font-display font-bold text-lg text-foreground">
          Testimonials ({testimonials.length})
        </h3>
        <Button
          onClick={() => setShowForm(true)}
          size="sm"
          data-ocid="admin.add_button"
          className="bg-saffron hover:bg-terracotta text-cream"
        >
          <Plus className="w-4 h-4 mr-1.5" /> Add Testimonial
        </Button>
      </div>

      {testimonialsQuery.isLoading ? (
        <div className="space-y-3">
          {[1, 2, 3].map((i) => (
            <Skeleton key={i} className="h-14 w-full rounded-lg" />
          ))}
        </div>
      ) : testimonials.length === 0 ? (
        <div
          className="text-center py-12 text-muted-foreground"
          data-ocid="admin.testimonials.empty_state"
        >
          No testimonials yet.
        </div>
      ) : (
        <div className="space-y-3">
          {testimonials.map((t, idx) => (
            <div
              key={t.id.toString()}
              className="bg-card rounded-xl border border-border p-4 flex items-start justify-between gap-4"
              data-ocid={`admin.testimonials.item.${idx + 1}`}
            >
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <span className="font-display font-semibold text-sm text-foreground">
                    {t.customerName}
                  </span>
                  <span className="text-muted-foreground text-xs font-body">
                    — {t.location}
                  </span>
                </div>
                <div className="flex items-center gap-0.5 mb-1">
                  {Array.from(
                    { length: Number(t.rating) },
                    (_, i) => `star-${i}`,
                  ).map((starKey) => (
                    <Star
                      key={starKey}
                      className="w-3 h-3 fill-saffron text-saffron"
                    />
                  ))}
                </div>
                <p className="text-muted-foreground text-xs font-body line-clamp-2">
                  {t.message}
                </p>
              </div>
              <Button
                variant="destructive"
                size="sm"
                onClick={() => setDeleteId(t.id)}
                data-ocid={`admin.testimonials.delete_button.${idx + 1}`}
              >
                <Trash2 className="w-3.5 h-3.5" />
              </Button>
            </div>
          ))}
        </div>
      )}

      {/* Add Testimonial Dialog */}
      <Dialog open={showForm} onOpenChange={setShowForm}>
        <DialogContent data-ocid="admin.testimonials.dialog">
          <DialogHeader>
            <DialogTitle className="font-display">Add Testimonial</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-2">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label className="font-body text-xs mb-1.5 block">
                  Customer Name
                </Label>
                <Input
                  value={formData.customerName ?? ""}
                  onChange={(e) =>
                    setFormData((p) => ({ ...p, customerName: e.target.value }))
                  }
                  className="font-body text-sm"
                  data-ocid="admin.testimonials.input"
                />
              </div>
              <div>
                <Label className="font-body text-xs mb-1.5 block">
                  Location
                </Label>
                <Input
                  value={formData.location ?? ""}
                  onChange={(e) =>
                    setFormData((p) => ({ ...p, location: e.target.value }))
                  }
                  className="font-body text-sm"
                />
              </div>
            </div>
            <div>
              <Label className="font-body text-xs mb-1.5 block">
                Rating (1–5)
              </Label>
              <Select
                value={formData.rating?.toString() ?? "5"}
                onValueChange={(val) =>
                  setFormData((p) => ({ ...p, rating: BigInt(val) }))
                }
              >
                <SelectTrigger data-ocid="admin.testimonials.select">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {[1, 2, 3, 4, 5].map((r) => (
                    <SelectItem key={r} value={r.toString()}>
                      {r} Star{r !== 1 ? "s" : ""}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label className="font-body text-xs mb-1.5 block">Message</Label>
              <Textarea
                value={formData.message ?? ""}
                onChange={(e) =>
                  setFormData((p) => ({ ...p, message: e.target.value }))
                }
                rows={3}
                className="font-body text-sm"
                data-ocid="admin.testimonials.textarea"
              />
            </div>
          </div>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setShowForm(false)}
              data-ocid="admin.testimonials.cancel_button"
            >
              Cancel
            </Button>
            <Button
              onClick={handleAdd}
              disabled={createTestimonial.isPending}
              className="bg-saffron hover:bg-terracotta text-cream"
              data-ocid="admin.testimonials.save_button"
            >
              {createTestimonial.isPending && (
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
              )}
              Add
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <AlertDialog
        open={deleteId !== null}
        onOpenChange={() => setDeleteId(null)}
      >
        <AlertDialogContent data-ocid="admin.testimonials.dialog">
          <AlertDialogHeader>
            <AlertDialogTitle className="font-display">
              Delete Testimonial?
            </AlertDialogTitle>
            <AlertDialogDescription className="font-body text-sm">
              This cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel data-ocid="admin.testimonials.cancel_button">
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDelete}
              className="bg-destructive text-destructive-foreground"
              data-ocid="admin.testimonials.confirm_button"
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}

// ============================================
// MAIN ADMIN PAGE
// ============================================

// ============================================
// DATA STATUS PANEL
// ============================================

function SeedDataPanel() {
  const makersQuery = useGetAllMakers();
  const productsQuery = useGetAllProducts();

  const makerCount = makersQuery.data?.length ?? 0;
  const productCount = productsQuery.data?.length ?? 0;
  const isLoading = makersQuery.isLoading || productsQuery.isLoading;

  return (
    <div
      className="bg-card rounded-2xl border border-border p-5 mb-6"
      data-ocid="admin.status.panel"
    >
      <div className="flex items-center gap-4">
        <div className="w-10 h-10 rounded-xl bg-emerald-500/10 flex items-center justify-center shrink-0">
          <Database className="w-5 h-5 text-emerald-600" />
        </div>
        <div className="flex-1 min-w-0">
          {isLoading ? (
            <div className="space-y-1.5" data-ocid="admin.status.loading_state">
              <div className="h-3.5 w-48 bg-muted animate-pulse rounded" />
              <div className="h-3 w-32 bg-muted animate-pulse rounded" />
            </div>
          ) : (
            <>
              <h3 className="font-display font-bold text-sm text-emerald-700 dark:text-emerald-400 flex items-center gap-1.5">
                <span className="inline-block w-2 h-2 rounded-full bg-emerald-500" />
                Data Pre-loaded — Store is Live
              </h3>
              <p className="text-muted-foreground font-body text-xs mt-0.5">
                <span className="font-semibold text-foreground">
                  {makerCount} makers
                </span>{" "}
                and{" "}
                <span className="font-semibold text-foreground">
                  {productCount} products
                </span>{" "}
                are live across Bihar, Haryana, Punjab, Uttar Pradesh &amp;
                Uttarakhand.
              </p>
            </>
          )}
        </div>
        {!isLoading && (
          <div className="text-right shrink-0">
            <div className="font-display font-bold text-2xl text-saffron">
              {productCount}
            </div>
            <div className="text-muted-foreground text-xs font-body">
              products
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default function AdminPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState("");
  const [showPwd, setShowPwd] = useState(false);
  const [error, setError] = useState("");

  function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    if (password === ADMIN_PASSWORD) {
      setIsAuthenticated(true);
      setError("");
    } else {
      setError("Incorrect password. Please try again.");
    }
  }

  if (!isAuthenticated) {
    return (
      <main className="min-h-screen pt-16 flex items-center justify-center bg-background">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full max-w-sm mx-4"
        >
          <div className="bg-card rounded-2xl border border-border p-8 shadow-warm-lg">
            <div className="text-center mb-6">
              <div className="w-14 h-14 rounded-2xl bg-saffron/10 flex items-center justify-center mx-auto mb-4">
                <Lock className="w-7 h-7 text-saffron" />
              </div>
              <h1 className="font-display font-bold text-2xl text-foreground">
                Admin Panel
              </h1>
              <p className="text-muted-foreground font-body text-sm mt-1">
                Choudhary Aunty Management
              </p>
            </div>

            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <Label className="font-body text-xs mb-1.5 block">
                  Admin Password
                </Label>
                <div className="relative">
                  <Input
                    type={showPwd ? "text" : "password"}
                    value={password}
                    onChange={(e) => {
                      setPassword(e.target.value);
                      setError("");
                    }}
                    placeholder="Enter password"
                    className="font-body pr-10"
                    data-ocid="admin.input"
                    autoFocus
                  />
                  <button
                    type="button"
                    onClick={() => setShowPwd(!showPwd)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                  >
                    {showPwd ? (
                      <EyeOff className="w-4 h-4" />
                    ) : (
                      <Eye className="w-4 h-4" />
                    )}
                  </button>
                </div>
                {error && (
                  <p
                    className="text-destructive text-xs font-body mt-1.5"
                    data-ocid="admin.error_state"
                  >
                    {error}
                  </p>
                )}
              </div>
              <Button
                type="submit"
                className="w-full bg-saffron hover:bg-terracotta text-cream font-semibold"
                data-ocid="admin.submit_button"
              >
                Access Admin Panel
              </Button>
            </form>
          </div>
        </motion.div>
      </main>
    );
  }

  return (
    <main className="min-h-screen pt-16 bg-background">
      <div className="container mx-auto px-4 sm:px-6 max-w-6xl py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="font-display text-2xl sm:text-3xl font-bold text-foreground">
              Admin Panel
            </h1>
            <p className="text-muted-foreground font-body text-sm mt-0.5">
              Manage makers, products, orders & testimonials
            </p>
          </div>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setIsAuthenticated(false)}
            className="font-body text-xs"
          >
            Logout
          </Button>
        </div>

        <SeedDataPanel />

        {/* Quick Dashboard Links */}
        <div className="flex flex-wrap items-center gap-3 mb-6">
          <Link to="/maker-dashboard" data-ocid="admin.maker_dashboard.link">
            <Button
              variant="outline"
              size="sm"
              className="font-body text-xs gap-1.5 hover:border-saffron/50 hover:text-saffron transition-colors"
            >
              <Users className="w-3.5 h-3.5" />
              Maker Dashboard →
            </Button>
          </Link>
          <Link
            to="/platform-dashboard"
            data-ocid="admin.platform_dashboard.link"
          >
            <Button
              variant="outline"
              size="sm"
              className="font-body text-xs gap-1.5 hover:border-saffron/50 hover:text-saffron transition-colors"
            >
              <BarChart2 className="w-3.5 h-3.5" />
              Platform Dashboard →
            </Button>
          </Link>
          <Link to="/customer-profile" data-ocid="admin.loyalty.link">
            <Button
              variant="outline"
              size="sm"
              className="font-body text-xs gap-1.5 hover:border-saffron/50 hover:text-saffron transition-colors"
            >
              🏅 Rishta Rewards →
            </Button>
          </Link>
        </div>

        <Tabs defaultValue="makers">
          <TabsList className="mb-6 bg-muted/50 p-1 h-auto gap-1 flex-wrap">
            <TabsTrigger
              value="makers"
              data-ocid="admin.makers_tab"
              className="font-body text-xs sm:text-sm flex items-center gap-1.5 data-[state=active]:bg-card data-[state=active]:text-saffron"
            >
              <ChefHat className="w-3.5 h-3.5" /> Makers
            </TabsTrigger>
            <TabsTrigger
              value="products"
              data-ocid="admin.products_tab"
              className="font-body text-xs sm:text-sm flex items-center gap-1.5 data-[state=active]:bg-card data-[state=active]:text-saffron"
            >
              <Package className="w-3.5 h-3.5" /> Products
            </TabsTrigger>
            <TabsTrigger
              value="orders"
              data-ocid="admin.orders_tab"
              className="font-body text-xs sm:text-sm flex items-center gap-1.5 data-[state=active]:bg-card data-[state=active]:text-saffron"
            >
              <ShoppingCart className="w-3.5 h-3.5" /> Orders
            </TabsTrigger>
            <TabsTrigger
              value="testimonials"
              data-ocid="admin.testimonials_tab"
              className="font-body text-xs sm:text-sm flex items-center gap-1.5 data-[state=active]:bg-card data-[state=active]:text-saffron"
            >
              <Star className="w-3.5 h-3.5" /> Testimonials
            </TabsTrigger>
          </TabsList>

          <TabsContent value="makers">
            <MakersTab />
          </TabsContent>
          <TabsContent value="products">
            <ProductsTab />
          </TabsContent>
          <TabsContent value="orders">
            <OrdersTab />
          </TabsContent>
          <TabsContent value="testimonials">
            <TestimonialsTab />
          </TabsContent>
        </Tabs>
      </div>
    </main>
  );
}
