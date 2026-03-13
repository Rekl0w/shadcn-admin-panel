import { PlusIcon } from "@/components/ui/plus";
import { Button } from "@/components/ui/button";
import { DataTable } from "@/components/data-table/data-table";
import { getProductColumns } from "@/pages/products/columns";
import { toast } from "sonner";
import { useTranslation } from "react-i18next";
import { useCallback, useMemo, useState } from "react";
import {
  ProductDeleteDialog,
  ProductDetailsDialog,
  ProductFormDialog,
} from "@/pages/products/dialogs";
import {
  toProductViewModel,
  type Product,
  type ProductFormValues,
} from "@/pages/products/schema";

const initialProducts: Product[] = [
  {
    id: "1",
    name: "Wireless Headphones",
    category: "Electronics",
    price: 79.99,
    stock: 150,
    status: "in-stock",
    sku: "WH-001",
  },
  {
    id: "2",
    name: "Smart Watch Pro",
    category: "Electronics",
    price: 299.99,
    stock: 45,
    status: "in-stock",
    sku: "SW-002",
  },
  {
    id: "3",
    name: "Cotton T-Shirt",
    category: "Clothing",
    price: 24.99,
    stock: 8,
    status: "low-stock",
    sku: "CT-003",
  },
  {
    id: "4",
    name: "Running Shoes",
    category: "Sports",
    price: 129.99,
    stock: 0,
    status: "out-of-stock",
    sku: "RS-004",
  },
  {
    id: "5",
    name: "Desk Lamp",
    category: "Home",
    price: 49.99,
    stock: 200,
    status: "in-stock",
    sku: "DL-005",
  },
  {
    id: "6",
    name: "Bluetooth Speaker",
    category: "Electronics",
    price: 59.99,
    stock: 5,
    status: "low-stock",
    sku: "BS-006",
  },
  {
    id: "7",
    name: "Wool Sweater",
    category: "Clothing",
    price: 89.99,
    stock: 67,
    status: "in-stock",
    sku: "WS-007",
  },
  {
    id: "8",
    name: "Yoga Mat",
    category: "Sports",
    price: 34.99,
    stock: 0,
    status: "out-of-stock",
    sku: "YM-008",
  },
  {
    id: "9",
    name: "Coffee Maker",
    category: "Home",
    price: 149.99,
    stock: 30,
    status: "in-stock",
    sku: "CM-009",
  },
  {
    id: "10",
    name: "Laptop Stand",
    category: "Electronics",
    price: 44.99,
    stock: 3,
    status: "low-stock",
    sku: "LS-010",
  },
  {
    id: "11",
    name: "Denim Jacket",
    category: "Clothing",
    price: 119.99,
    stock: 25,
    status: "in-stock",
    sku: "DJ-011",
  },
  {
    id: "12",
    name: "Tennis Racket",
    category: "Sports",
    price: 89.99,
    stock: 15,
    status: "in-stock",
    sku: "TR-012",
  },
];

type ActiveProductDialog =
  | { type: "create" }
  | { type: "view"; product: Product }
  | { type: "edit"; product: Product }
  | { type: "delete"; product: Product }
  | null;

export default function ProductsPage() {
  const { t } = useTranslation("products");
  const [products, setProducts] = useState<Product[]>(initialProducts);
  const [activeDialog, setActiveDialog] = useState<ActiveProductDialog>(null);

  const closeDialog = useCallback(() => {
    setActiveDialog(null);
  }, []);

  const activeProduct = useMemo(() => {
    if (!activeDialog || !("product" in activeDialog)) {
      return null;
    }

    return (
      products.find(({ id }) => id === activeDialog.product.id) ??
      activeDialog.product
    );
  }, [activeDialog, products]);

  const handleCopyProductId = useCallback(
    (product: Product) => {
      void navigator.clipboard.writeText(product.id);
      toast.success(t("toasts.productIdCopied"));
    },
    [t],
  );

  const handleCreateProduct = useCallback(
    (payload: ProductFormValues) => {
      setProducts((currentProducts) => [
        toProductViewModel(
          crypto.randomUUID?.() ?? `product-${Date.now()}`,
          payload,
        ),
        ...currentProducts,
      ]);
      toast.success(t("toasts.created"));
    },
    [t],
  );

  const handleEditProduct = useCallback(
    (payload: ProductFormValues) => {
      if (!activeProduct) {
        return;
      }

      setProducts((currentProducts) =>
        currentProducts.map((product) =>
          product.id === activeProduct.id
            ? toProductViewModel(activeProduct.id, payload)
            : product,
        ),
      );
      toast.success(t("toasts.updated"));
    },
    [activeProduct, t],
  );

  const handleDeleteProduct = useCallback(() => {
    if (!activeProduct) {
      return;
    }

    setProducts((currentProducts) =>
      currentProducts.filter((product) => product.id !== activeProduct.id),
    );
    closeDialog();
    toast.success(t("toasts.deleted"));
  }, [activeProduct, closeDialog, t]);

  const columns = useMemo(
    () =>
      getProductColumns(t, {
        onCopyId: handleCopyProductId,
        onView: (product) => setActiveDialog({ type: "view", product }),
        onEdit: (product) => setActiveDialog({ type: "edit", product }),
        onDelete: (product) => setActiveDialog({ type: "delete", product }),
      }),
    [handleCopyProductId, t],
  );

  const columnLabels = useMemo(
    () => ({
      name: t("columns.product"),
      category: t("columns.category"),
      price: t("columns.price"),
      stock: t("columns.stock"),
      status: t("columns.status"),
    }),
    [t],
  );

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">{t("title")}</h2>
          <p className="text-muted-foreground">{t("description")}</p>
        </div>
        <Button onClick={() => setActiveDialog({ type: "create" })}>
          <PlusIcon size={16} className="mr-2" />
          {t("addProduct")}
        </Button>
      </div>
      <DataTable
        columns={columns}
        data={products}
        searchKey="name"
        searchPlaceholder={t("searchPlaceholder")}
        columnLabels={columnLabels}
        filterableColumns={[
          {
            id: "category",
            title: t("filters.category"),
            options: [
              { label: t("filters.electronics"), value: "Electronics" },
              { label: t("filters.clothing"), value: "Clothing" },
              { label: t("filters.sports"), value: "Sports" },
              { label: t("filters.home"), value: "Home" },
            ],
          },
          {
            id: "status",
            title: t("filters.status"),
            options: [
              { label: t("filters.inStock"), value: "in-stock" },
              { label: t("filters.lowStock"), value: "low-stock" },
              { label: t("filters.outOfStock"), value: "out-of-stock" },
            ],
          },
        ]}
      />

      {activeDialog?.type === "create" ? (
        <ProductFormDialog
          mode="create"
          open
          onOpenChange={(nextOpen) => {
            if (!nextOpen) {
              closeDialog();
            }
          }}
          onSubmit={handleCreateProduct}
        />
      ) : null}

      {activeDialog?.type === "view" && activeProduct ? (
        <ProductDetailsDialog
          open
          product={activeProduct}
          onOpenChange={(nextOpen) => {
            if (!nextOpen) {
              closeDialog();
            }
          }}
        />
      ) : null}

      {activeDialog?.type === "edit" && activeProduct ? (
        <ProductFormDialog
          mode="edit"
          open
          product={activeProduct}
          onOpenChange={(nextOpen) => {
            if (!nextOpen) {
              closeDialog();
            }
          }}
          onSubmit={handleEditProduct}
        />
      ) : null}

      {activeDialog?.type === "delete" && activeProduct ? (
        <ProductDeleteDialog
          open
          product={activeProduct}
          onOpenChange={(nextOpen) => {
            if (!nextOpen) {
              closeDialog();
            }
          }}
          onConfirm={handleDeleteProduct}
        />
      ) : null}
    </div>
  );
}
