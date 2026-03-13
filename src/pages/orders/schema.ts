import { z } from "zod";

export const shipmentCarrierValues = ["ups", "fedex", "dhl", "local"] as const;

export type ShipmentCarrier = (typeof shipmentCarrierValues)[number];

export interface Order {
  id: string;
  customer: string;
  email: string;
  status: "pending" | "processing" | "shipped" | "delivered" | "cancelled";
  total: number;
  items: number;
  createdAt: string;
  carrier?: ShipmentCarrier;
  trackingNumber?: string;
  refundAmount?: number;
  refundReason?: string;
  refundRestocked?: boolean;
  refundedAt?: string;
}

export const trackShipmentFormSchema = z.object({
  carrier: z
    .string()
    .trim()
    .min(1, "validation.required")
    .refine(
      (value) => shipmentCarrierValues.includes(value as ShipmentCarrier),
      "validation.required",
    ),
  trackingNumber: z.string().trim().min(1, "validation.required"),
});

export type TrackShipmentFormValues = z.infer<typeof trackShipmentFormSchema>;

export const emptyTrackShipmentFormValues: TrackShipmentFormValues = {
  carrier: "",
  trackingNumber: "",
};

export function createRefundFormSchema(orderTotal: number) {
  return z.object({
    amount: z
      .string()
      .trim()
      .min(1, "validation.required")
      .refine((value) => {
        const parsedValue = Number(value);
        return (
          Number.isFinite(parsedValue) &&
          parsedValue > 0 &&
          parsedValue <= orderTotal
        );
      }, "validation.refundAmountInvalid"),
    reason: z.string().trim().min(1, "validation.required"),
    restock: z.boolean(),
  });
}

export type RefundFormValues = {
  amount: string;
  reason: string;
  restock: boolean;
};

export function toTrackShipmentFormValues(
  order?: Order,
): TrackShipmentFormValues {
  if (!order) {
    return emptyTrackShipmentFormValues;
  }

  return {
    carrier: order.carrier ?? "",
    trackingNumber: order.trackingNumber ?? "",
  };
}

export function toRefundFormValues(order: Order): RefundFormValues {
  return {
    amount: order.refundAmount?.toString() ?? order.total.toFixed(2),
    reason: order.refundReason ?? "",
    restock: order.refundRestocked ?? false,
  };
}

export function getCarrierTranslationKey(carrier: ShipmentCarrier) {
  return `carriers.${carrier}`;
}

export function buildTrackedOrder(
  order: Order,
  values: TrackShipmentFormValues,
): Order {
  return {
    ...order,
    carrier: values.carrier as ShipmentCarrier,
    trackingNumber: values.trackingNumber.trim(),
    status:
      order.status === "delivered" || order.status === "cancelled"
        ? order.status
        : "shipped",
  };
}

export function buildRefundedOrder(
  order: Order,
  values: RefundFormValues,
): Order {
  return {
    ...order,
    refundAmount: Number(values.amount),
    refundReason: values.reason.trim(),
    refundRestocked: values.restock,
    refundedAt: new Date().toISOString().slice(0, 10),
    status: order.status === "delivered" ? "delivered" : "cancelled",
  };
}
