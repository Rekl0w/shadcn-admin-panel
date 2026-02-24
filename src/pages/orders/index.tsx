import { DataTable } from "@/components/data-table/data-table"
import { orderColumns, type Order } from "@/pages/orders/columns"

const sampleOrders: Order[] = [
  { id: "ORD-001", customer: "John Doe", email: "john@example.com", status: "delivered", total: 234.50, items: 3, createdAt: "2024-12-01" },
  { id: "ORD-002", customer: "Jane Smith", email: "jane@example.com", status: "shipped", total: 89.99, items: 1, createdAt: "2024-12-02" },
  { id: "ORD-003", customer: "Bob Wilson", email: "bob@example.com", status: "processing", total: 456.00, items: 5, createdAt: "2024-12-03" },
  { id: "ORD-004", customer: "Alice Brown", email: "alice@example.com", status: "pending", total: 67.25, items: 2, createdAt: "2024-12-04" },
  { id: "ORD-005", customer: "Charlie Davis", email: "charlie@example.com", status: "cancelled", total: 199.99, items: 4, createdAt: "2024-12-05" },
  { id: "ORD-006", customer: "Diana Evans", email: "diana@example.com", status: "delivered", total: 312.75, items: 2, createdAt: "2024-12-06" },
  { id: "ORD-007", customer: "Edward Fox", email: "edward@example.com", status: "shipped", total: 78.50, items: 1, createdAt: "2024-12-07" },
  { id: "ORD-008", customer: "Fiona Grant", email: "fiona@example.com", status: "processing", total: 543.00, items: 6, createdAt: "2024-12-08" },
  { id: "ORD-009", customer: "George Hill", email: "george@example.com", status: "pending", total: 125.00, items: 3, createdAt: "2024-12-09" },
  { id: "ORD-010", customer: "Helen Irwin", email: "helen@example.com", status: "delivered", total: 890.00, items: 8, createdAt: "2024-12-10" },
]

export default function OrdersPage() {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Orders</h2>
          <p className="text-muted-foreground">Track and manage customer orders</p>
        </div>
      </div>
      <DataTable
        columns={orderColumns}
        data={sampleOrders}
        searchKey="customer"
        searchPlaceholder="Search orders..."
        filterableColumns={[
          {
            id: "status",
            title: "Status",
            options: [
              { label: "Pending", value: "pending" },
              { label: "Processing", value: "processing" },
              { label: "Shipped", value: "shipped" },
              { label: "Delivered", value: "delivered" },
              { label: "Cancelled", value: "cancelled" },
            ],
          },
        ]}
      />
    </div>
  )
}
