import { type ColumnDef } from "@tanstack/react-table"
import { Badge } from "@/components/ui/badge"
import { Checkbox } from "@/components/ui/checkbox"
import { DataTableColumnHeader } from "@/components/data-table/data-table-column-header"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"
import { MoreHorizontal, Eye, Truck, RotateCcw } from "lucide-react"

export interface Order {
  id: string
  customer: string
  email: string
  status: "pending" | "processing" | "shipped" | "delivered" | "cancelled"
  total: number
  items: number
  createdAt: string
}

const statusColors: Record<string, "default" | "secondary" | "outline" | "destructive"> = {
  pending: "outline",
  processing: "secondary",
  shipped: "default",
  delivered: "default",
  cancelled: "destructive",
}

export const orderColumns: ColumnDef<Order>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={table.getIsAllPageRowsSelected()}
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "id",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Order ID" />
    ),
    cell: ({ row }) => (
      <span className="font-mono text-sm">{row.getValue("id")}</span>
    ),
  },
  {
    accessorKey: "customer",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Customer" />
    ),
    cell: ({ row }) => (
      <div>
        <div className="font-medium">{row.getValue("customer")}</div>
        <div className="text-xs text-muted-foreground">{row.original.email}</div>
      </div>
    ),
  },
  {
    accessorKey: "items",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Items" />
    ),
  },
  {
    accessorKey: "total",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Total" />
    ),
    cell: ({ row }) => {
      const amount = parseFloat(row.getValue("total"))
      const formatted = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
      }).format(amount)
      return <span className="font-medium">{formatted}</span>
    },
  },
  {
    accessorKey: "status",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Status" />
    ),
    cell: ({ row }) => {
      const status = row.getValue("status") as string
      return (
        <Badge variant={statusColors[status]} className="capitalize">
          {status}
        </Badge>
      )
    },
    filterFn: (row, id, value) => value.includes(row.getValue(id)),
  },
  {
    accessorKey: "createdAt",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Date" />
    ),
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const order = row.original
      return (
        <DropdownMenu>
          <DropdownMenuTrigger render={<Button variant="ghost" className="h-8 w-8 p-0" />}>
            <span className="sr-only">Open menu</span>
            <MoreHorizontal className="h-4 w-4" />
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem
              onClick={() => navigator.clipboard.writeText(order.id)}
            >
              Copy order ID
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <Eye className="mr-2 h-4 w-4" />
              View details
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Truck className="mr-2 h-4 w-4" />
              Track shipment
            </DropdownMenuItem>
            <DropdownMenuItem>
              <RotateCcw className="mr-2 h-4 w-4" />
              Process refund
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )
    },
  },
]
