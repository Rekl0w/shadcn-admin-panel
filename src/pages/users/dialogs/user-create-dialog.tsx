import { UserFormDialog } from "./user-form-dialog";
import type { UserCreateDialogProps } from "./types";

export function UserCreateDialog(props: UserCreateDialogProps) {
  return <UserFormDialog mode="create" {...props} />;
}