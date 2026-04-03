import { z } from "zod";

import type { User } from "@/pages/users/columns";
import {
  createUserPayloadSchema,
  updateUserPayloadSchema,
} from "@/service/request/schemas";

export const userRoleValues = ["admin", "editor", "viewer"] as const;

export const createUserFormSchema = createUserPayloadSchema.extend({
  role: z.enum(userRoleValues),
});

export const editUserFormSchema = updateUserPayloadSchema.extend({
  name: createUserPayloadSchema.shape.name,
  email: createUserPayloadSchema.shape.email,
  role: z.enum(userRoleValues),
  password: z.string(),
});

export const roleVariants: Record<
  User["role"],
  "default" | "secondary" | "outline"
> = {
  admin: "default",
  editor: "secondary",
  viewer: "outline",
};

export const statusVariants: Record<
  User["status"],
  "default" | "secondary" | "destructive"
> = {
  active: "default",
  inactive: "secondary",
  banned: "destructive",
};

export const emptyUserFormValues = {
  name: "",
  email: "",
  password: "",
  role: "viewer",
} satisfies {
  name: string;
  email: string;
  password: string;
  role: User["role"];
};

export interface UserFormPayload {
  name: string;
  email: string;
  role: User["role"];
  password?: string;
}

export interface UserFormDialogProps {
  mode: "create" | "edit";
  open: boolean;
  onOpenChange: (open: boolean) => void;
  user?: User;
  onSubmit: (payload: UserFormPayload) => void;
}

export interface UserCreateDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit: (payload: UserFormPayload) => void;
}

export interface UserEditDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  user: User;
  onSubmit: (payload: UserFormPayload) => void;
}

export interface UserDetailsDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  user: User;
}

export interface UserDeleteDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  user: User;
  onConfirm: () => void;
}