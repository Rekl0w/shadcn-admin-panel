import type { Product, ProductFormValues } from "@/pages/products/schema";

export const statusVariants: Record<
  Product["status"],
  "default" | "secondary" | "destructive"
> = {
  "in-stock": "default",
  "low-stock": "secondary",
  "out-of-stock": "destructive",
};

export interface ProductFormDialogProps {
  mode: "create" | "edit";
  open: boolean;
  onOpenChange: (open: boolean) => void;
  product?: Product;
  onSubmit: (payload: ProductFormValues) => void;
}

export interface ProductCreateDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit: (payload: ProductFormValues) => void;
}

export interface ProductEditDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  product: Product;
  onSubmit: (payload: ProductFormValues) => void;
}

export interface ProductDetailsDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  product: Product;
}

export interface ProductDeleteDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  product: Product;
  onConfirm: () => void;
}
