import { UserFormDialog } from "./user-form-dialog";
import type { UserEditDialogProps } from "./types";

export function UserEditDialog(props: UserEditDialogProps) {
  return <UserFormDialog mode="edit" {...props} />;
}