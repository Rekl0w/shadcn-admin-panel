import { ProductFormDialog } from "./product-form-dialog";
import type { ProductCreateDialogProps } from "./types";

export function ProductCreateDialog(props: ProductCreateDialogProps) {
  return <ProductFormDialog mode="create" {...props} />;
}
