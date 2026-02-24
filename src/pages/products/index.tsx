import { Plus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { DataTable } from "@/components/data-table/data-table"
import { productColumns, type Product } from "@/pages/products/columns"
import { toast } from "sonner"

const sampleProducts: Product[] = [
  { id: "1", name: "Wireless Headphones", category: "Electronics", price: 79.99, stock: 150, status: "in-stock", sku: "WH-001" },
  { id: "2", name: "Smart Watch Pro", category: "Electronics", price: 299.99, stock: 45, status: "in-stock", sku: "SW-002" },
  { id: "3", name: "Cotton T-Shirt", category: "Clothing", price: 24.99, stock: 8, status: "low-stock", sku: "CT-003" },
  { id: "4", name: "Running Shoes", category: "Sports", price: 129.99, stock: 0, status: "out-of-stock", sku: "RS-004" },
  { id: "5", name: "Desk Lamp", category: "Home", price: 49.99, stock: 200, status: "in-stock", sku: "DL-005" },
  { id: "6", name: "Bluetooth Speaker", category: "Electronics", price: 59.99, stock: 5, status: "low-stock", sku: "BS-006" },
  { id: "7", name: "Wool Sweater", category: "Clothing", price: 89.99, stock: 67, status: "in-stock", sku: "WS-007" },
  { id: "8", name: "Yoga Mat", category: "Sports", price: 34.99, stock: 0, status: "out-of-stock", sku: "YM-008" },
  { id: "9", name: "Coffee Maker", category: "Home", price: 149.99, stock: 30, status: "in-stock", sku: "CM-009" },
  { id: "10", name: "Laptop Stand", category: "Electronics", price: 44.99, stock: 3, status: "low-stock", sku: "LS-010" },
  { id: "11", name: "Denim Jacket", category: "Clothing", price: 119.99, stock: 25, status: "in-stock", sku: "DJ-011" },
  { id: "12", name: "Tennis Racket", category: "Sports", price: 89.99, stock: 15, status: "in-stock", sku: "TR-012" },
]

export default function ProductsPage() {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Products</h2>
          <p className="text-muted-foreground">Manage your product catalog</p>
        </div>
        <Button onClick={() => toast.success("Create product dialog would open here")}>
          <Plus className="mr-2 h-4 w-4" />
          Add Product
        </Button>
      </div>
      <DataTable
        columns={productColumns}
        data={sampleProducts}
        searchKey="name"
        searchPlaceholder="Search products..."
        filterableColumns={[
          {
            id: "category",
            title: "Category",
            options: [
              { label: "Electronics", value: "Electronics" },
              { label: "Clothing", value: "Clothing" },
              { label: "Sports", value: "Sports" },
              { label: "Home", value: "Home" },
            ],
          },
          {
            id: "status",
            title: "Status",
            options: [
              { label: "In Stock", value: "in-stock" },
              { label: "Low Stock", value: "low-stock" },
              { label: "Out of Stock", value: "out-of-stock" },
            ],
          },
        ]}
      />
    </div>
  )
}
