import { DataTable } from "@/components/data-table/data-table";
import { getOrderColumns } from "@/pages/orders/columns";
import { useTranslation } from "react-i18next";
import { useCallback, useMemo, useState } from "react";
import { toast } from "sonner";
import {
  OrderDetailsDialog,
  RefundDialog,
  TrackShipmentDialog,
} from "@/pages/orders/dialogs";
import {
  buildRefundedOrder,
  buildTrackedOrder,
  type Order,
  type RefundFormValues,
  type TrackShipmentFormValues,
} from "@/pages/orders/schema";

const initialOrders: Order[] = [
  {
    id: "ORD-001",
    customer: "John Doe",
    email: "john@example.com",
    status: "delivered",
    total: 234.5,
    items: 3,
    createdAt: "2024-12-01",
  },
  {
    id: "ORD-002",
    customer: "Jane Smith",
    email: "jane@example.com",
    status: "shipped",
    total: 89.99,
    items: 1,
    createdAt: "2024-12-02",
  },
  {
    id: "ORD-003",
    customer: "Bob Wilson",
    email: "bob@example.com",
    status: "processing",
    total: 456.0,
    items: 5,
    createdAt: "2024-12-03",
  },
  {
    id: "ORD-004",
    customer: "Alice Brown",
    email: "alice@example.com",
    status: "pending",
    total: 67.25,
    items: 2,
    createdAt: "2024-12-04",
  },
  {
    id: "ORD-005",
    customer: "Charlie Davis",
    email: "charlie@example.com",
    status: "cancelled",
    total: 199.99,
    items: 4,
    createdAt: "2024-12-05",
  },
  {
    id: "ORD-006",
    customer: "Diana Evans",
    email: "diana@example.com",
    status: "delivered",
    total: 312.75,
    items: 2,
    createdAt: "2024-12-06",
  },
  {
    id: "ORD-007",
    customer: "Edward Fox",
    email: "edward@example.com",
    status: "shipped",
    total: 78.5,
    items: 1,
    createdAt: "2024-12-07",
  },
  {
    id: "ORD-008",
    customer: "Fiona Grant",
    email: "fiona@example.com",
    status: "processing",
    total: 543.0,
    items: 6,
    createdAt: "2024-12-08",
  },
  {
    id: "ORD-009",
    customer: "George Hill",
    email: "george@example.com",
    status: "pending",
    total: 125.0,
    items: 3,
    createdAt: "2024-12-09",
  },
  {
    id: "ORD-010",
    customer: "Helen Irwin",
    email: "helen@example.com",
    status: "delivered",
    total: 890.0,
    items: 8,
    createdAt: "2024-12-10",
  },
];

type ActiveOrderDialog =
  | { type: "view"; order: Order }
  | { type: "track"; order: Order }
  | { type: "refund"; order: Order }
  | null;

export default function OrdersPage() {
  const { t } = useTranslation("orders");
  const [orders, setOrders] = useState<Order[]>(initialOrders);
  const [activeDialog, setActiveDialog] = useState<ActiveOrderDialog>(null);

  const closeDialog = useCallback(() => {
    setActiveDialog(null);
  }, []);

  const activeOrder = useMemo(() => {
    if (!activeDialog) {
      return null;
    }

    return (
      orders.find(({ id }) => id === activeDialog.order.id) ??
      activeDialog.order
    );
  }, [activeDialog, orders]);

  const handleCopyOrderId = useCallback(
    (order: Order) => {
      void navigator.clipboard.writeText(order.id);
      toast.success(t("toasts.orderIdCopied"));
    },
    [t],
  );

  const handleTrackShipment = useCallback(
    (values: TrackShipmentFormValues) => {
      if (!activeOrder) {
        return;
      }

      setOrders((currentOrders) =>
        currentOrders.map((order) =>
          order.id === activeOrder.id
            ? buildTrackedOrder(order, values)
            : order,
        ),
      );
      toast.success(t("toasts.shipmentTracked"));
    },
    [activeOrder, t],
  );

  const handleProcessRefund = useCallback(
    (values: RefundFormValues) => {
      if (!activeOrder) {
        return;
      }

      setOrders((currentOrders) =>
        currentOrders.map((order) =>
          order.id === activeOrder.id
            ? buildRefundedOrder(order, values)
            : order,
        ),
      );
      toast.success(t("toasts.refundProcessed"));
    },
    [activeOrder, t],
  );

  const columns = useMemo(
    () =>
      getOrderColumns(t, {
        onCopyId: handleCopyOrderId,
        onView: (order) => setActiveDialog({ type: "view", order }),
        onTrackShipment: (order) => setActiveDialog({ type: "track", order }),
        onProcessRefund: (order) => setActiveDialog({ type: "refund", order }),
      }),
    [handleCopyOrderId, t],
  );

  const columnLabels = useMemo(
    () => ({
      id: t("columns.orderId"),
      customer: t("columns.customer"),
      items: t("columns.items"),
      total: t("columns.total"),
      status: t("columns.status"),
      createdAt: t("columns.date"),
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
      </div>
      <DataTable
        columns={columns}
        data={orders}
        searchKey="customer"
        searchPlaceholder={t("searchPlaceholder")}
        columnLabels={columnLabels}
        filterableColumns={[
          {
            id: "status",
            title: t("filters.status"),
            options: [
              { label: t("filters.pending"), value: "pending" },
              { label: t("filters.processing"), value: "processing" },
              { label: t("filters.shipped"), value: "shipped" },
              { label: t("filters.delivered"), value: "delivered" },
              { label: t("filters.cancelled"), value: "cancelled" },
            ],
          },
        ]}
      />

      {activeDialog?.type === "view" && activeOrder ? (
        <OrderDetailsDialog
          open
          order={activeOrder}
          onOpenChange={(nextOpen) => {
            if (!nextOpen) {
              closeDialog();
            }
          }}
        />
      ) : null}

      {activeDialog?.type === "track" && activeOrder ? (
        <TrackShipmentDialog
          open
          order={activeOrder}
          onOpenChange={(nextOpen) => {
            if (!nextOpen) {
              closeDialog();
            }
          }}
          onSubmit={handleTrackShipment}
        />
      ) : null}

      {activeDialog?.type === "refund" && activeOrder ? (
        <RefundDialog
          open
          order={activeOrder}
          onOpenChange={(nextOpen) => {
            if (!nextOpen) {
              closeDialog();
            }
          }}
          onSubmit={handleProcessRefund}
        />
      ) : null}
    </div>
  );
}
