import { UserPlus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { DataTable } from "@/components/data-table/data-table"
import { userColumns, type User } from "@/pages/users/columns"
import { toast } from "sonner"

const sampleUsers: User[] = [
  { id: "1", name: "Alice Johnson", email: "alice@example.com", role: "admin", status: "active", createdAt: "2024-01-15" },
  { id: "2", name: "Bob Smith", email: "bob@example.com", role: "editor", status: "active", createdAt: "2024-02-20" },
  { id: "3", name: "Carol Williams", email: "carol@example.com", role: "viewer", status: "inactive", createdAt: "2024-03-10" },
  { id: "4", name: "David Brown", email: "david@example.com", role: "editor", status: "active", createdAt: "2024-04-05" },
  { id: "5", name: "Eve Davis", email: "eve@example.com", role: "admin", status: "active", createdAt: "2024-05-12" },
  { id: "6", name: "Frank Miller", email: "frank@example.com", role: "viewer", status: "banned", createdAt: "2024-06-18" },
  { id: "7", name: "Grace Wilson", email: "grace@example.com", role: "editor", status: "active", createdAt: "2024-07-22" },
  { id: "8", name: "Henry Taylor", email: "henry@example.com", role: "viewer", status: "active", createdAt: "2024-08-30" },
  { id: "9", name: "Ivy Anderson", email: "ivy@example.com", role: "admin", status: "inactive", createdAt: "2024-09-14" },
  { id: "10", name: "Jack Thomas", email: "jack@example.com", role: "editor", status: "active", createdAt: "2024-10-01" },
  { id: "11", name: "Kate Jackson", email: "kate@example.com", role: "viewer", status: "active", createdAt: "2024-10-15" },
  { id: "12", name: "Leo White", email: "leo@example.com", role: "editor", status: "inactive", createdAt: "2024-11-02" },
]

export default function UsersPage() {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Users</h2>
          <p className="text-muted-foreground">Manage your users and their roles</p>
        </div>
        <Button onClick={() => toast.success("Create user dialog would open here")}>
          <UserPlus className="mr-2 h-4 w-4" />
          Add User
        </Button>
      </div>
      <DataTable
        columns={userColumns}
        data={sampleUsers}
        searchKey="name"
        searchPlaceholder="Search users..."
        filterableColumns={[
          {
            id: "role",
            title: "Role",
            options: [
              { label: "Admin", value: "admin" },
              { label: "Editor", value: "editor" },
              { label: "Viewer", value: "viewer" },
            ],
          },
          {
            id: "status",
            title: "Status",
            options: [
              { label: "Active", value: "active" },
              { label: "Inactive", value: "inactive" },
              { label: "Banned", value: "banned" },
            ],
          },
        ]}
      />
    </div>
  )
}
