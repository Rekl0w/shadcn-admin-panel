import { RouterProvider } from "react-router"
import { Providers } from "@/providers/providers"
import { router } from "@/router"

export function App() {
  return (
    <Providers>
      <RouterProvider router={router} />
    </Providers>
  )
}

export default App