import { PlusIcon } from "@/components/ui/plus";
import { Button } from "@/components/ui/button";
import { DataTable } from "@/components/data-table/data-table";
import { getProductColumns, type Product } from "@/pages/products/columns";
import { toast } from "sonner";
import { useTranslation } from "react-i18next";
import { useMemo } from "react";

const sampleProducts: Product[] = [
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

export default function ProductsPage() {
  const { t } = useTranslation("products");
  const columns = useMemo(() => getProductColumns(t), [t]);

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
        <Button
          onClick={() => toast.success("Create product dialog would open here")}
        >
          <PlusIcon size={16} className="mr-2" />
          {t("addProduct")}
        </Button>
      </div>
      <DataTable
        columns={columns}
        data={sampleProducts}
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
    </div>
  );
}
