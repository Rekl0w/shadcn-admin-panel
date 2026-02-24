import { Link } from "react-router"
import { Button } from "@/components/ui/button"
import { Empty } from "@/components/ui/empty"
import { FileQuestion } from "lucide-react"

export default function NotFoundPage() {
  return (
    <div className="flex flex-1 items-center justify-center">
      <div className="text-center space-y-4">
        <Empty>
          <div className="flex flex-col items-center gap-4">
            <FileQuestion className="h-16 w-16 text-muted-foreground" />
            <div>
              <h2 className="text-2xl font-bold">Page Not Found</h2>
              <p className="text-muted-foreground mt-2">
                The page you're looking for doesn't exist or has been moved.
              </p>
            </div>
            <Button render={<Link to="/" />}>
              Back to Dashboard
            </Button>
          </div>
        </Empty>
      </div>
    </div>
  )
}
