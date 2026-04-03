import { ProductFormDialog } from "./product-form-dialog";
import type { ProductEditDialogProps } from "./types";

export function ProductEditDialog(props: ProductEditDialogProps) {
  return <ProductFormDialog mode="edit" {...props} />;
}
