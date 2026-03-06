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
import { Card, CardContent } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
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
  CheckCircle2,
  ChefHat,
  ClipboardCheck,
  Database,
  Edit,
  Eye,
  EyeOff,
  Loader2,
  Lock,
  Package,
  PauseCircle,
  PlayCircle,
  Plus,
  ShoppingCart,
  Star,
  Trash2,
  TrendingUp,
  Users,
  XCircle,
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

  // Map display labels for 7-stage lifecycle
  const STATUS_DISPLAY: Record<string, { label: string; color: string }> = {
    pending: {
      label: "Order Created",
      color: "bg-slate-100 text-slate-800 border-slate-200",
    },
    confirmed: {
      label: "Payment Confirmed",
      color: "bg-blue-100 text-blue-800 border-blue-200",
    },
    preparing: {
      label: "Food Preparation",
      color: "bg-orange-100 text-orange-800 border-orange-200",
    },
    dispatched: {
      label: "Out for Delivery",
      color: "bg-purple-100 text-purple-800 border-purple-200",
    },
    delivered: {
      label: "Delivered",
      color: "bg-green-100 text-green-800 border-green-200",
    },
    // Extended display stages (frontend-only labels)
    chef_acceptance: {
      label: "Chef Acceptance",
      color: "bg-saffron/10 text-saffron border-saffron/30",
    },
    food_preparation: {
      label: "Food Preparation",
      color: "bg-orange-100 text-orange-800 border-orange-200",
    },
    ready_for_pickup: {
      label: "Ready for Pickup",
      color: "bg-amber-100 text-amber-800 border-amber-200",
    },
    out_for_delivery: {
      label: "Out for Delivery",
      color: "bg-purple-100 text-purple-800 border-purple-200",
    },
  };
  const STATUS_COLORS: Record<string, string> = Object.fromEntries(
    Object.entries(STATUS_DISPLAY).map(([k, v]) => [k, v.color]),
  );

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
// CHEF APPROVALS TAB
// ============================================

type ApprovalStatus = "pending" | "approved" | "rejected" | "under_review";

interface ChefApplication {
  id: number;
  name: string;
  city: string;
  state: string;
  specialty: string;
  appliedOn: string;
  status: ApprovalStatus;
  phone: string;
  email: string;
  experience: string;
  dishes: string;
  kitchenAddress?: string;
  cuisineType?: string;
}

const MOCK_CHEF_APPLICATIONS: ChefApplication[] = [
  {
    id: 1,
    name: "Sunita Devi",
    city: "Varanasi",
    state: "Uttar Pradesh",
    specialty: "UP sweets & achar",
    appliedOn: "2026-03-01",
    status: "pending",
    phone: "+91 97000 11111",
    email: "sunita.varanasi@gmail.com",
    experience: "28 years",
    dishes: "Petha, Besan Ladoo, Nimbu Achar, Imli Chutney, Methi Mathri",
    kitchenAddress: "12, Shiv Nagar Colony, Varanasi, UP 221001",
    cuisineType: "Sweets & Mithai",
  },
  {
    id: 2,
    name: "Kamla Rani",
    city: "Amritsar",
    state: "Punjab",
    specialty: "Punjabi pickles & pinni",
    appliedOn: "2026-03-03",
    status: "pending",
    phone: "+91 98000 22222",
    email: "kamla.amritsar@gmail.com",
    experience: "32 years",
    dishes: "Amritsari Mirch Achar, Pinni, Gajak, Punjabi Wadi, Aam Chunda",
    kitchenAddress: "45, Golden Avenue, Amritsar, Punjab 143001",
    cuisineType: "Pickles & Achar",
  },
  {
    id: 3,
    name: "Meena Sharma",
    city: "Jaipur",
    state: "Rajasthan",
    specialty: "Rajasthani sweets",
    appliedOn: "2026-03-04",
    status: "pending",
    phone: "+91 96000 33333",
    email: "meena.jaipur@gmail.com",
    experience: "20 years",
    dishes: "Ghevar, Churma, Rabri, Kaju Katli, Bajra Roti Masala",
    kitchenAddress: "7, Vaishali Nagar, Jaipur, Rajasthan 302021",
    cuisineType: "Sweets & Mithai",
  },
  {
    id: 4,
    name: "Parvati Mahto",
    city: "Patna",
    state: "Bihar",
    specialty: "Bihari snacks & achar",
    appliedOn: "2026-03-05",
    status: "pending",
    phone: "+91 95000 44444",
    email: "parvati.patna@gmail.com",
    experience: "35 years",
    dishes: "Thekua, Sattu Ladoo, Aam Ka Achar, Tilkut, Makhana Namkeen",
    kitchenAddress: "23, Rajendra Nagar, Patna, Bihar 800016",
    cuisineType: "Namkeen & Snacks",
  },
  {
    id: 5,
    name: "Shanti Devi Negi",
    city: "Dehradun",
    state: "Uttarakhand",
    specialty: "Pahadi chutneys & preserves",
    appliedOn: "2026-03-06",
    status: "pending",
    phone: "+91 94000 55555",
    email: "shanti.dehradun@gmail.com",
    experience: "22 years",
    dishes:
      "Bhang Ki Chutney, Bal Mithai, Timru Achar, Buransh Sharbat, Gahat Dal Chutney",
    kitchenAddress: "9, Rajpur Road, Dehradun, Uttarakhand 248001",
    cuisineType: "Chutneys & Preserves",
  },
];

const HYGIENE_CHECKLIST = [
  "Clean and hygienic workspace with regular sanitization",
  "Proper food storage in airtight, food-grade containers",
  "Use of food-grade packaging materials only",
  "Regular hand hygiene and use of gloves during prep",
  "No signs of pests or rodents in kitchen area",
];

function ChefApprovalsTab() {
  const [applications, setApplications] = useState<ChefApplication[]>(
    MOCK_CHEF_APPLICATIONS,
  );
  const [rejectId, setRejectId] = useState<number | null>(null);
  const [rejectReason, setRejectReason] = useState("");
  const [viewApp, setViewApp] = useState<ChefApplication | null>(null);
  const [hygieneChecks, setHygieneChecks] = useState<boolean[]>(
    Array(HYGIENE_CHECKLIST.length).fill(false),
  );
  const [hygieneScore, setHygieneScore] = useState("8");

  function approve(id: number) {
    setApplications((prev) =>
      prev.map((a) => (a.id === id ? { ...a, status: "approved" } : a)),
    );
    toast.success("Chef application approved! Profile will be created.");
  }

  function setUnderReview(id: number) {
    setApplications((prev) =>
      prev.map((a) => (a.id === id ? { ...a, status: "under_review" } : a)),
    );
    toast("Application marked as Under Review.");
  }

  function rejectConfirmed() {
    if (rejectId === null) return;
    setApplications((prev) =>
      prev.map((a) => (a.id === rejectId ? { ...a, status: "rejected" } : a)),
    );
    toast.error(
      rejectReason
        ? `Application rejected: ${rejectReason.slice(0, 40)}...`
        : "Application rejected.",
    );
    setRejectId(null);
    setRejectReason("");
  }

  const total = applications.length;
  const pending = applications.filter(
    (a) => a.status === "pending" || a.status === "under_review",
  ).length;
  const approved = applications.filter((a) => a.status === "approved").length;

  return (
    <div>
      <div className="flex items-center justify-between mb-5">
        <div>
          <h3 className="font-display font-bold text-lg text-foreground">
            Chef Applications
          </h3>
          <p className="text-muted-foreground font-body text-xs mt-0.5">
            {pending} pending review
          </p>
        </div>
        <Badge className="bg-amber-100 text-amber-800 border-amber-200 font-body text-xs">
          {pending} Pending
        </Badge>
      </div>

      {/* KPI Row */}
      <div className="grid grid-cols-3 gap-3 mb-5">
        <div
          className="bg-muted/60 rounded-xl border border-border p-3 text-center"
          data-ocid="admin.chef_approvals.card"
        >
          <div className="font-display text-2xl font-bold text-foreground">
            {total}
          </div>
          <div className="font-body text-xs text-muted-foreground mt-0.5">
            Total Applications
          </div>
        </div>
        <div
          className="bg-amber-50 rounded-xl border border-amber-200 p-3 text-center"
          data-ocid="admin.chef_approvals.card"
        >
          <div className="font-display text-2xl font-bold text-amber-700">
            {pending}
          </div>
          <div className="font-body text-xs text-amber-600 mt-0.5">
            Pending Review
          </div>
        </div>
        <div
          className="bg-green-50 rounded-xl border border-green-200 p-3 text-center"
          data-ocid="admin.chef_approvals.card"
        >
          <div className="font-display text-2xl font-bold text-green-700">
            {approved}
          </div>
          <div className="font-body text-xs text-green-600 mt-0.5">
            Approved Chefs
          </div>
        </div>
      </div>

      <div className="overflow-x-auto rounded-xl border border-border">
        <Table data-ocid="admin.chef_approvals.table">
          <TableHeader>
            <TableRow>
              <TableHead className="font-body text-xs">Name</TableHead>
              <TableHead className="font-body text-xs">City / State</TableHead>
              <TableHead className="font-body text-xs">Specialty</TableHead>
              <TableHead className="font-body text-xs">Applied On</TableHead>
              <TableHead className="font-body text-xs">Status</TableHead>
              <TableHead className="font-body text-xs text-right">
                Actions
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {applications.map((app, idx) => (
              <TableRow
                key={app.id}
                data-ocid={`admin.chef_approvals.row.${idx + 1}`}
              >
                <TableCell className="font-display font-semibold text-sm">
                  {app.name}
                </TableCell>
                <TableCell className="font-body text-sm text-muted-foreground">
                  {app.city}, {app.state}
                </TableCell>
                <TableCell className="font-body text-sm">
                  {app.specialty}
                </TableCell>
                <TableCell className="font-body text-xs text-muted-foreground">
                  {app.appliedOn}
                </TableCell>
                <TableCell>
                  {app.status === "pending" && (
                    <span className="px-2 py-0.5 rounded-full text-xs font-semibold font-body bg-amber-100 text-amber-800 border border-amber-200">
                      Pending
                    </span>
                  )}
                  {app.status === "under_review" && (
                    <span className="px-2 py-0.5 rounded-full text-xs font-semibold font-body bg-blue-100 text-blue-800 border border-blue-200">
                      Under Review
                    </span>
                  )}
                  {app.status === "approved" && (
                    <span className="px-2 py-0.5 rounded-full text-xs font-semibold font-body bg-green-100 text-green-800 border border-green-200">
                      Approved
                    </span>
                  )}
                  {app.status === "rejected" && (
                    <span className="px-2 py-0.5 rounded-full text-xs font-semibold font-body bg-red-100 text-red-800 border border-red-200">
                      Rejected
                    </span>
                  )}
                </TableCell>
                <TableCell className="text-right">
                  <div className="flex items-center gap-1.5 justify-end flex-wrap">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => {
                        setViewApp(app);
                        setHygieneChecks(
                          Array(HYGIENE_CHECKLIST.length).fill(true),
                        );
                      }}
                      className="font-body text-xs"
                      data-ocid={`admin.chef_approvals.view_button.${idx + 1}`}
                    >
                      View Details
                    </Button>
                    {(app.status === "pending" ||
                      app.status === "under_review") && (
                      <>
                        <Button
                          size="sm"
                          onClick={() => approve(app.id)}
                          className="bg-green-600 hover:bg-green-700 text-white font-body text-xs"
                          data-ocid={`admin.chef_approvals.approve_button.${idx + 1}`}
                        >
                          <CheckCircle2 className="w-3.5 h-3.5 mr-1" />
                          Approve
                        </Button>
                        {app.status === "pending" && (
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => setUnderReview(app.id)}
                            className="font-body text-xs border-blue-300 text-blue-700 hover:bg-blue-50"
                            data-ocid={`admin.chef_approvals.secondary_button.${idx + 1}`}
                          >
                            Review
                          </Button>
                        )}
                        <Button
                          variant="destructive"
                          size="sm"
                          onClick={() => setRejectId(app.id)}
                          className="font-body text-xs"
                          data-ocid={`admin.chef_approvals.delete_button.${idx + 1}`}
                        >
                          <XCircle className="w-3.5 h-3.5 mr-1" />
                          Reject
                        </Button>
                      </>
                    )}
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {/* View Details Dialog */}
      <Dialog open={viewApp !== null} onOpenChange={() => setViewApp(null)}>
        <DialogContent
          className="max-w-lg max-h-[85vh] overflow-y-auto"
          data-ocid="admin.chef_approvals.dialog"
        >
          <DialogHeader>
            <DialogTitle className="font-display">
              Application: {viewApp?.name}
            </DialogTitle>
          </DialogHeader>
          {viewApp && (
            <div className="space-y-5 py-2">
              {/* Basic Info */}
              <div className="grid grid-cols-2 gap-3 text-sm font-body">
                <div>
                  <span className="text-muted-foreground text-xs">City</span>
                  <p className="font-semibold">{viewApp.city}</p>
                </div>
                <div>
                  <span className="text-muted-foreground text-xs">State</span>
                  <p className="font-semibold">{viewApp.state}</p>
                </div>
                <div>
                  <span className="text-muted-foreground text-xs">Phone</span>
                  <p className="font-semibold">{viewApp.phone}</p>
                </div>
                <div>
                  <span className="text-muted-foreground text-xs">Email</span>
                  <p className="font-semibold">{viewApp.email}</p>
                </div>
                <div>
                  <span className="text-muted-foreground text-xs">
                    Experience
                  </span>
                  <p className="font-semibold">{viewApp.experience}</p>
                </div>
                <div>
                  <span className="text-muted-foreground text-xs">
                    Specialty
                  </span>
                  <p className="font-semibold">{viewApp.specialty}</p>
                </div>
              </div>

              <div>
                <p className="text-muted-foreground text-xs font-body mb-1">
                  Signature Dishes
                </p>
                <p className="font-body text-sm text-foreground">
                  {viewApp.dishes}
                </p>
              </div>

              {/* Kitchen Details Section */}
              <div className="border-t border-border pt-4">
                <div className="flex items-center gap-2 mb-3">
                  <ChefHat className="w-4 h-4 text-saffron" />
                  <h4 className="font-display font-bold text-sm text-foreground">
                    Kitchen Details
                  </h4>
                </div>
                <div className="grid grid-cols-1 gap-2 text-sm font-body bg-muted/40 rounded-xl p-3">
                  {viewApp.kitchenAddress && (
                    <div>
                      <span className="text-muted-foreground text-xs block">
                        Kitchen Address
                      </span>
                      <p className="font-semibold text-sm">
                        {viewApp.kitchenAddress}
                      </p>
                    </div>
                  )}
                  {viewApp.cuisineType && (
                    <div>
                      <span className="text-muted-foreground text-xs block">
                        Cuisine Type
                      </span>
                      <p className="font-semibold text-sm">
                        {viewApp.cuisineType}
                      </p>
                    </div>
                  )}
                  <div>
                    <span className="text-muted-foreground text-xs block">
                      Experience
                    </span>
                    <p className="font-semibold text-sm">
                      {viewApp.experience}
                    </p>
                  </div>
                </div>
              </div>

              {/* Kitchen Photos Placeholder */}
              <div className="border-t border-border pt-4">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-display font-bold text-sm text-foreground">
                    Kitchen Photos
                  </h4>
                  <span className="text-xs font-body px-2 py-0.5 bg-blue-100 text-blue-700 rounded-full border border-blue-200">
                    3 photos submitted
                  </span>
                </div>
                <div className="flex gap-2">
                  {[1, 2, 3].map((n) => (
                    <div
                      key={n}
                      className="w-20 h-20 rounded-xl bg-muted/60 border border-border flex items-center justify-center"
                    >
                      <span className="text-2xl">📷</span>
                    </div>
                  ))}
                </div>
                <p className="text-xs font-body text-muted-foreground mt-2">
                  Photos to be collected via WhatsApp verification
                </p>
              </div>

              {/* Identity Verification */}
              <div className="flex items-center justify-between py-3 px-3 rounded-xl bg-muted/40 border border-border">
                <div>
                  <p className="font-body text-sm font-semibold text-foreground">
                    Identity Verification
                  </p>
                  <p className="text-xs font-body text-muted-foreground">
                    Aadhaar / Govt ID
                  </p>
                </div>
                <span className="text-xs font-body px-2 py-0.5 bg-amber-100 text-amber-700 rounded-full border border-amber-200 font-semibold">
                  Pending Collection
                </span>
              </div>

              {/* Self-Certified Hygiene Checklist */}
              <div className="border-t border-border pt-4">
                <div className="flex items-center gap-2 mb-3">
                  <ClipboardCheck className="w-4 h-4 text-saffron" />
                  <h4 className="font-display font-bold text-sm text-foreground">
                    Self-Certified Hygiene Checklist
                  </h4>
                </div>
                <div className="space-y-2.5 mb-4">
                  {HYGIENE_CHECKLIST.map((item) => (
                    <div
                      key={item}
                      className="flex items-start gap-2.5 bg-green-50/60 rounded-lg px-3 py-2"
                    >
                      <CheckCircle2 className="w-4 h-4 text-green-600 shrink-0 mt-0.5" />
                      <span className="font-body text-xs text-foreground/80 leading-relaxed">
                        {item}
                      </span>
                    </div>
                  ))}
                </div>

                {/* Admin Hygiene Score */}
                <div className="border-t border-border pt-3">
                  <p className="font-body text-xs font-semibold text-muted-foreground mb-2">
                    Admin Hygiene Assessment:
                  </p>
                  <div className="space-y-2.5">
                    {HYGIENE_CHECKLIST.map((item, i) => (
                      <div
                        key={`admin-${item}`}
                        className="flex items-start gap-3"
                      >
                        <Checkbox
                          id={`hygiene-${i}`}
                          checked={hygieneChecks[i]}
                          onCheckedChange={(checked) => {
                            setHygieneChecks((prev) => {
                              const next = [...prev];
                              next[i] = checked === true;
                              return next;
                            });
                          }}
                          data-ocid={`admin.hygiene.checkbox.${i + 1}`}
                        />
                        <label
                          htmlFor={`hygiene-${i}`}
                          className="font-body text-xs text-foreground/80 leading-relaxed cursor-pointer"
                        >
                          {item}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="mt-4 flex items-center gap-3">
                  <Label className="font-body text-xs">
                    Hygiene Score (1–10):
                  </Label>
                  <Select value={hygieneScore} onValueChange={setHygieneScore}>
                    <SelectTrigger
                      className="w-20 font-body text-sm"
                      data-ocid="admin.hygiene.select"
                    >
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {Array.from({ length: 10 }, (_, i) => i + 1).map((n) => (
                        <SelectItem key={n} value={n.toString()}>
                          {n}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <span className="text-xs font-body text-muted-foreground">
                    / 10
                  </span>
                </div>
              </div>
            </div>
          )}
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setViewApp(null)}
              data-ocid="admin.chef_approvals.close_button"
            >
              Close
            </Button>
            {(viewApp?.status === "pending" ||
              viewApp?.status === "under_review") && (
              <Button
                onClick={() => {
                  if (viewApp) approve(viewApp.id);
                  setViewApp(null);
                }}
                className="bg-green-600 hover:bg-green-700 text-white"
                data-ocid="admin.chef_approvals.confirm_button"
              >
                <CheckCircle2 className="w-4 h-4 mr-2" />
                Approve Chef
              </Button>
            )}
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Reject Dialog with rejection reason */}
      <AlertDialog
        open={rejectId !== null}
        onOpenChange={(open) => {
          if (!open) {
            setRejectId(null);
            setRejectReason("");
          }
        }}
      >
        <AlertDialogContent data-ocid="admin.chef_approvals.dialog">
          <AlertDialogHeader>
            <AlertDialogTitle className="font-display">
              Reject Application?
            </AlertDialogTitle>
            <AlertDialogDescription className="font-body text-sm">
              This will reject the chef's application. They will be notified via
              WhatsApp.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <div className="px-1 pb-2">
            <Label className="font-body text-xs font-semibold mb-1.5 block">
              Reason for Rejection{" "}
              <span className="text-muted-foreground font-normal">
                (optional)
              </span>
            </Label>
            <Textarea
              value={rejectReason}
              onChange={(e) => setRejectReason(e.target.value)}
              placeholder="e.g. Kitchen hygiene concerns, incomplete information..."
              rows={3}
              className="font-body text-sm"
              data-ocid="admin.chef_approvals.textarea"
            />
          </div>
          <AlertDialogFooter>
            <AlertDialogCancel
              data-ocid="admin.chef_approvals.cancel_button"
              onClick={() => setRejectReason("")}
            >
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction
              onClick={rejectConfirmed}
              className="bg-destructive text-destructive-foreground"
              data-ocid="admin.chef_approvals.confirm_button"
            >
              Reject Application
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}

// ============================================
// DISH APPROVALS TAB
// ============================================

interface DishSubmission {
  id: number;
  dishName: string;
  makerName: string;
  category: string;
  price: number;
  submittedOn: string;
  status: ApprovalStatus;
}

const MOCK_DISH_SUBMISSIONS: DishSubmission[] = [
  {
    id: 1,
    dishName: "Rajasthani Ghevar",
    makerName: "Sunita Devi",
    category: "sweets",
    price: 280,
    submittedOn: "2026-03-05",
    status: "pending",
  },
  {
    id: 2,
    dishName: "Amritsari Mirch Achar",
    makerName: "Preetkaur Aunty",
    category: "achar",
    price: 190,
    submittedOn: "2026-03-04",
    status: "pending",
  },
  {
    id: 3,
    dishName: "UP Special Gajar Halwa",
    makerName: "Sarla Maasi",
    category: "sweets",
    price: 320,
    submittedOn: "2026-03-03",
    status: "pending",
  },
];

function DishApprovalsTab() {
  const [dishes, setDishes] = useState<DishSubmission[]>(MOCK_DISH_SUBMISSIONS);
  const [rejectId, setRejectId] = useState<number | null>(null);

  function approveDish(id: number) {
    setDishes((prev) =>
      prev.map((d) => (d.id === id ? { ...d, status: "approved" } : d)),
    );
    toast.success("Dish approved and listed on the platform!");
  }

  function rejectConfirmed() {
    if (rejectId === null) return;
    setDishes((prev) =>
      prev.map((d) => (d.id === rejectId ? { ...d, status: "rejected" } : d)),
    );
    toast.error("Dish rejected. Maker will be notified.");
    setRejectId(null);
  }

  const pending = dishes.filter((d) => d.status === "pending").length;

  return (
    <div>
      <div className="flex items-center justify-between mb-5">
        <div>
          <h3 className="font-display font-bold text-lg text-foreground">
            Dish Approval Queue
          </h3>
          <p className="text-muted-foreground font-body text-xs mt-0.5">
            {pending} dishes waiting for review
          </p>
        </div>
        <Badge className="bg-orange-100 text-orange-800 border-orange-200 font-body text-xs">
          {pending} Pending
        </Badge>
      </div>

      <div className="overflow-x-auto rounded-xl border border-border">
        <Table data-ocid="admin.dish_approvals.table">
          <TableHeader>
            <TableRow>
              <TableHead className="font-body text-xs">Dish Name</TableHead>
              <TableHead className="font-body text-xs">Maker</TableHead>
              <TableHead className="font-body text-xs">Category</TableHead>
              <TableHead className="font-body text-xs">Price</TableHead>
              <TableHead className="font-body text-xs">Submitted</TableHead>
              <TableHead className="font-body text-xs">Status</TableHead>
              <TableHead className="font-body text-xs text-right">
                Actions
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {dishes.map((dish, idx) => (
              <TableRow
                key={dish.id}
                data-ocid={`admin.dish_approvals.row.${idx + 1}`}
              >
                <TableCell className="font-display font-semibold text-sm">
                  {dish.dishName}
                </TableCell>
                <TableCell className="font-body text-sm text-muted-foreground">
                  {dish.makerName}
                </TableCell>
                <TableCell>
                  <span className="capitalize text-xs font-body px-2 py-0.5 bg-muted rounded-full border border-border">
                    {dish.category}
                  </span>
                </TableCell>
                <TableCell className="font-body text-sm text-saffron font-bold">
                  ₹{dish.price}
                </TableCell>
                <TableCell className="font-body text-xs text-muted-foreground">
                  {dish.submittedOn}
                </TableCell>
                <TableCell>
                  {dish.status === "pending" && (
                    <span className="px-2 py-0.5 rounded-full text-xs font-semibold font-body bg-amber-100 text-amber-800 border border-amber-200">
                      Pending
                    </span>
                  )}
                  {dish.status === "approved" && (
                    <span className="px-2 py-0.5 rounded-full text-xs font-semibold font-body bg-green-100 text-green-800 border border-green-200">
                      Live
                    </span>
                  )}
                  {dish.status === "rejected" && (
                    <span className="px-2 py-0.5 rounded-full text-xs font-semibold font-body bg-red-100 text-red-800 border border-red-200">
                      Rejected
                    </span>
                  )}
                </TableCell>
                <TableCell className="text-right">
                  {dish.status === "pending" && (
                    <div className="flex items-center gap-2 justify-end">
                      <Button
                        size="sm"
                        onClick={() => approveDish(dish.id)}
                        className="bg-green-600 hover:bg-green-700 text-white font-body text-xs"
                        data-ocid={`admin.dish_approvals.approve_button.${idx + 1}`}
                      >
                        <CheckCircle2 className="w-3.5 h-3.5 mr-1" />
                        Approve
                      </Button>
                      <Button
                        variant="destructive"
                        size="sm"
                        onClick={() => setRejectId(dish.id)}
                        className="font-body text-xs"
                        data-ocid={`admin.dish_approvals.delete_button.${idx + 1}`}
                      >
                        Reject
                      </Button>
                    </div>
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {/* Reject Confirmation */}
      <AlertDialog
        open={rejectId !== null}
        onOpenChange={() => setRejectId(null)}
      >
        <AlertDialogContent data-ocid="admin.dish_approvals.dialog">
          <AlertDialogHeader>
            <AlertDialogTitle className="font-display">
              Reject Dish?
            </AlertDialogTitle>
            <AlertDialogDescription className="font-body text-sm">
              This dish submission will be rejected and the maker will be
              notified.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel data-ocid="admin.dish_approvals.cancel_button">
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction
              onClick={rejectConfirmed}
              className="bg-destructive text-destructive-foreground"
              data-ocid="admin.dish_approvals.confirm_button"
            >
              Reject Dish
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}

// ============================================
// CHEF PERFORMANCE TAB
// ============================================

interface MakerPerformance {
  name: string;
  state: string;
  ordersCompleted: number;
  rating: number;
  revenue: number;
  responseRate: number;
  status: "Active" | "Suspended";
}

const MAKER_PERFORMANCE_DATA: MakerPerformance[] = [
  {
    name: "Anju Choudhary",
    state: "Bihar",
    ordersCompleted: 47,
    rating: 4.8,
    revenue: 18200,
    responseRate: 95,
    status: "Active",
  },
  {
    name: "Babita Tai",
    state: "Haryana",
    ordersCompleted: 31,
    rating: 4.6,
    revenue: 12400,
    responseRate: 88,
    status: "Active",
  },
  {
    name: "Sarla Maasi",
    state: "UP",
    ordersCompleted: 28,
    rating: 4.7,
    revenue: 11100,
    responseRate: 92,
    status: "Active",
  },
  {
    name: "Preetkaur Aunty",
    state: "Punjab",
    ordersCompleted: 22,
    rating: 4.9,
    revenue: 9800,
    responseRate: 97,
    status: "Active",
  },
  {
    name: "Geeta Devi",
    state: "Uttarakhand",
    ordersCompleted: 15,
    rating: 4.5,
    revenue: 5600,
    responseRate: 80,
    status: "Active",
  },
];

function ChefPerformanceTab() {
  const [performers, setPerformers] = useState<MakerPerformance[]>(
    MAKER_PERFORMANCE_DATA,
  );
  const [suspendName, setSuspendName] = useState<string | null>(null);

  function toggleStatus(name: string) {
    const current = performers.find((p) => p.name === name);
    if (!current) return;
    if (current.status === "Active") {
      setSuspendName(name);
    } else {
      setPerformers((prev) =>
        prev.map((p) => (p.name === name ? { ...p, status: "Active" } : p)),
      );
      toast.success(`${name} reinstated successfully.`);
    }
  }

  function confirmSuspend() {
    if (!suspendName) return;
    setPerformers((prev) =>
      prev.map((p) =>
        p.name === suspendName ? { ...p, status: "Suspended" } : p,
      ),
    );
    toast.error(`${suspendName} has been suspended.`);
    setSuspendName(null);
  }

  const totalRevenue = performers.reduce((s, p) => s + p.revenue, 0);
  const avgRating = (
    performers.reduce((s, p) => s + p.rating, 0) / performers.length
  ).toFixed(1);
  const activeCount = performers.filter((p) => p.status === "Active").length;

  return (
    <div>
      <h3 className="font-display font-bold text-lg text-foreground mb-5">
        Chef Performance
      </h3>

      {/* Summary cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
        {[
          {
            label: "Total Makers",
            value: performers.length.toString(),
            icon: Users,
            color: "text-saffron",
            bg: "bg-saffron/10",
          },
          {
            label: "Active",
            value: activeCount.toString(),
            icon: PlayCircle,
            color: "text-green-600",
            bg: "bg-green-50",
          },
          {
            label: "Avg Rating",
            value: `${avgRating}★`,
            icon: Star,
            color: "text-amber-500",
            bg: "bg-amber-50",
          },
          {
            label: "Total Revenue",
            value: `₹${totalRevenue.toLocaleString("en-IN")}`,
            icon: TrendingUp,
            color: "text-blue-600",
            bg: "bg-blue-50",
          },
        ].map((kpi, idx) => (
          <Card
            key={kpi.label}
            className="border-border shadow-xs"
            data-ocid={`admin.chef_performance.card.${idx + 1}`}
          >
            <CardContent className="py-4 px-4">
              <div
                className={`w-8 h-8 rounded-lg ${kpi.bg} flex items-center justify-center mb-2`}
              >
                <kpi.icon className={`w-4 h-4 ${kpi.color}`} />
              </div>
              <div className={`font-display text-xl font-bold ${kpi.color}`}>
                {kpi.value}
              </div>
              <div className="text-muted-foreground font-body text-xs">
                {kpi.label}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="overflow-x-auto rounded-xl border border-border">
        <Table data-ocid="admin.chef_performance.table">
          <TableHeader>
            <TableRow>
              <TableHead className="font-body text-xs">Maker</TableHead>
              <TableHead className="font-body text-xs">State</TableHead>
              <TableHead className="font-body text-xs">Orders</TableHead>
              <TableHead className="font-body text-xs">Rating</TableHead>
              <TableHead className="font-body text-xs">Revenue</TableHead>
              <TableHead className="font-body text-xs">Response Rate</TableHead>
              <TableHead className="font-body text-xs">Status</TableHead>
              <TableHead className="font-body text-xs text-right">
                Actions
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {performers.map((perf, idx) => (
              <TableRow
                key={perf.name}
                data-ocid={`admin.chef_performance.row.${idx + 1}`}
              >
                <TableCell>
                  <div className="flex items-center gap-2">
                    <img
                      src={getMakerImage(perf.name)}
                      alt={perf.name}
                      className="w-8 h-8 rounded-full object-cover border border-border"
                    />
                    <span className="font-display font-semibold text-sm">
                      {perf.name}
                    </span>
                  </div>
                </TableCell>
                <TableCell>
                  <span className="state-badge text-xs">{perf.state}</span>
                </TableCell>
                <TableCell className="font-body text-sm font-semibold">
                  {perf.ordersCompleted}
                </TableCell>
                <TableCell>
                  <span className="font-body text-sm font-bold text-amber-600">
                    {perf.rating}★
                  </span>
                </TableCell>
                <TableCell className="font-body text-sm text-saffron font-bold">
                  ₹{perf.revenue.toLocaleString("en-IN")}
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <div className="w-16 h-1.5 rounded-full bg-border overflow-hidden">
                      <div
                        className="h-full bg-green-500 rounded-full"
                        style={{ width: `${perf.responseRate}%` }}
                      />
                    </div>
                    <span className="font-body text-xs text-muted-foreground">
                      {perf.responseRate}%
                    </span>
                  </div>
                </TableCell>
                <TableCell>
                  <span
                    className={`px-2 py-0.5 rounded-full text-xs font-semibold font-body border ${
                      perf.status === "Active"
                        ? "bg-green-100 text-green-800 border-green-200"
                        : "bg-red-100 text-red-800 border-red-200"
                    }`}
                  >
                    {perf.status}
                  </span>
                </TableCell>
                <TableCell className="text-right">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => toggleStatus(perf.name)}
                    className={`font-body text-xs ${
                      perf.status === "Active"
                        ? "hover:border-red-300 hover:text-red-600"
                        : "hover:border-green-300 hover:text-green-600"
                    }`}
                    data-ocid={`admin.chef_performance.toggle.${idx + 1}`}
                  >
                    {perf.status === "Active" ? (
                      <>
                        <PauseCircle className="w-3.5 h-3.5 mr-1" />
                        Suspend
                      </>
                    ) : (
                      <>
                        <PlayCircle className="w-3.5 h-3.5 mr-1" />
                        Reinstate
                      </>
                    )}
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {/* Suspend Confirm */}
      <AlertDialog
        open={suspendName !== null}
        onOpenChange={() => setSuspendName(null)}
      >
        <AlertDialogContent data-ocid="admin.chef_performance.dialog">
          <AlertDialogHeader>
            <AlertDialogTitle className="font-display">
              Suspend {suspendName}?
            </AlertDialogTitle>
            <AlertDialogDescription className="font-body text-sm">
              This maker will be suspended and unable to receive new orders.
              Existing orders will be unaffected.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel data-ocid="admin.chef_performance.cancel_button">
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction
              onClick={confirmSuspend}
              className="bg-destructive text-destructive-foreground"
              data-ocid="admin.chef_performance.confirm_button"
            >
              Suspend
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
              value="chef-approvals"
              data-ocid="admin.chef_approvals_tab"
              className="font-body text-xs sm:text-sm flex items-center gap-1.5 data-[state=active]:bg-card data-[state=active]:text-saffron"
            >
              <CheckCircle2 className="w-3.5 h-3.5" /> Chef Approvals
            </TabsTrigger>
            <TabsTrigger
              value="dish-approvals"
              data-ocid="admin.dish_approvals_tab"
              className="font-body text-xs sm:text-sm flex items-center gap-1.5 data-[state=active]:bg-card data-[state=active]:text-saffron"
            >
              <ClipboardCheck className="w-3.5 h-3.5" /> Dish Approvals
            </TabsTrigger>
            <TabsTrigger
              value="chef-performance"
              data-ocid="admin.chef_performance_tab"
              className="font-body text-xs sm:text-sm flex items-center gap-1.5 data-[state=active]:bg-card data-[state=active]:text-saffron"
            >
              <TrendingUp className="w-3.5 h-3.5" /> Chef Performance
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
          <TabsContent value="chef-approvals">
            <ChefApprovalsTab />
          </TabsContent>
          <TabsContent value="dish-approvals">
            <DishApprovalsTab />
          </TabsContent>
          <TabsContent value="chef-performance">
            <ChefPerformanceTab />
          </TabsContent>
          <TabsContent value="testimonials">
            <TestimonialsTab />
          </TabsContent>
        </Tabs>
      </div>
    </main>
  );
}
