import type {
  Order,
  RefundFormValues,
  TrackShipmentFormValues,
} from "@/pages/orders/schema";

export const statusVariants: Record<
  Order["status"],
  "default" | "secondary" | "outline" | "destructive"
> = {
  pending: "outline",
  processing: "secondary",
  shipped: "default",
  delivered: "default",
  cancelled: "destructive",
};

export interface OrderDetailsDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  order: Order;
}

export interface TrackShipmentDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  order: Order;
  onSubmit: (values: TrackShipmentFormValues) => void;
}

export interface RefundDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  order: Order;
  onSubmit: (values: RefundFormValues) => void;
}