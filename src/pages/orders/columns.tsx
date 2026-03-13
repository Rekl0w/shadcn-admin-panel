import { type ColumnDef } from "@tanstack/react-table";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { DataTableColumnHeader } from "@/components/data-table/data-table-column-header";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { MoreHorizontal } from "lucide-react";
import { EyeIcon } from "@/components/ui/eye";
import { TruckIcon } from "@/components/ui/truck";
import { RotateCCWIcon } from "@/components/ui/rotate-ccw";
import type { TFunction } from "i18next";
import type { Order } from "@/pages/orders/schema";

export interface OrderColumnActions {
  onView: (order: Order) => void;
  onTrackShipment: (order: Order) => void;
  onProcessRefund: (order: Order) => void;
  onCopyId?: (order: Order) => void;
}

const statusColors: Record<
  string,
  "default" | "secondary" | "outline" | "destructive"
> = {
  pending: "outline",
  processing: "secondary",
  shipped: "default",
  delivered: "default",
  cancelled: "destructive",
};

export function getOrderColumns(
  t: TFunction,
  actions: OrderColumnActions,
): ColumnDef<Order>[] {
  return [
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
        <DataTableColumnHeader column={column} title={t("columns.orderId")} />
      ),
      cell: ({ row }) => (
        <span className="font-mono text-sm">{row.getValue("id")}</span>
      ),
    },
    {
      accessorKey: "customer",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title={t("columns.customer")} />
      ),
      cell: ({ row }) => (
        <div>
          <div className="font-medium">{row.getValue("customer")}</div>
          <div className="text-xs text-muted-foreground">
            {row.original.email}
          </div>
        </div>
      ),
    },
    {
      accessorKey: "items",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title={t("columns.items")} />
      ),
    },
    {
      accessorKey: "total",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title={t("columns.total")} />
      ),
      cell: ({ row }) => {
        const amount = parseFloat(row.getValue("total"));
        const formatted = new Intl.NumberFormat("en-US", {
          style: "currency",
          currency: "USD",
        }).format(amount);
        return <span className="font-medium">{formatted}</span>;
      },
    },
    {
      accessorKey: "status",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title={t("columns.status")} />
      ),
      cell: ({ row }) => {
        const status = row.getValue("status") as string;
        return (
          <Badge variant={statusColors[status]} className="capitalize">
            {t(`statuses.${status}`)}
          </Badge>
        );
      },
      filterFn: (row, id, value) => value.includes(row.getValue(id)),
    },
    {
      accessorKey: "createdAt",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title={t("columns.date")} />
      ),
    },
    {
      id: "actions",
      cell: ({ row }) => {
        const order = row.original;
        return (
          <DropdownMenu>
            <DropdownMenuTrigger
              render={<Button variant="ghost" className="h-8 w-8 p-0" />}
            >
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>{t("common:table.actions")}</DropdownMenuLabel>
              <DropdownMenuItem
                onClick={() => {
                  if (actions.onCopyId) {
                    actions.onCopyId(order);
                    return;
                  }

                  void navigator.clipboard.writeText(order.id);
                }}
              >
                {t("actions.copyOrderId")}
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => actions.onView(order)}>
                <EyeIcon size={16} className="mr-2" />
                {t("actions.viewDetails")}
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => actions.onTrackShipment(order)}>
                <TruckIcon size={16} className="mr-2" />
                {t("actions.trackShipment")}
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => actions.onProcessRefund(order)}>
                <RotateCCWIcon size={16} className="mr-2" />
                {t("actions.processRefund")}
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        );
      },
    },
  ];
}
