import {
  ArrowDownRight,
  ArrowUpRight,
  DollarSign,
  Package,
  ShoppingCart,
  Users,
  TrendingUp,
  Activity,
} from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart"
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  Line,
  LineChart,
  XAxis,
  YAxis,
} from "recharts"

const revenueData = [
  { month: "Jan", revenue: 4000, orders: 240 },
  { month: "Feb", revenue: 3000, orders: 210 },
  { month: "Mar", revenue: 5000, orders: 290 },
  { month: "Apr", revenue: 4500, orders: 260 },
  { month: "May", revenue: 6000, orders: 340 },
  { month: "Jun", revenue: 5500, orders: 310 },
  { month: "Jul", revenue: 7000, orders: 380 },
  { month: "Aug", revenue: 6500, orders: 350 },
  { month: "Sep", revenue: 8000, orders: 420 },
  { month: "Oct", revenue: 7500, orders: 400 },
  { month: "Nov", revenue: 9000, orders: 450 },
  { month: "Dec", revenue: 8500, orders: 430 },
]

const weeklyData = [
  { day: "Mon", visitors: 1200, pageViews: 3500 },
  { day: "Tue", visitors: 1400, pageViews: 4200 },
  { day: "Wed", visitors: 1100, pageViews: 3100 },
  { day: "Thu", visitors: 1600, pageViews: 4800 },
  { day: "Fri", visitors: 1300, pageViews: 3900 },
  { day: "Sat", visitors: 900, pageViews: 2400 },
  { day: "Sun", visitors: 800, pageViews: 2100 },
]

const categoryData = [
  { category: "Electronics", sales: 4500 },
  { category: "Clothing", sales: 3200 },
  { category: "Home", sales: 2800 },
  { category: "Sports", sales: 2100 },
  { category: "Books", sales: 1800 },
  { category: "Other", sales: 1200 },
]

const revenueConfig: ChartConfig = {
  revenue: { label: "Revenue", color: "var(--chart-1)" },
  orders: { label: "Orders", color: "var(--chart-2)" },
}

const weeklyConfig: ChartConfig = {
  visitors: { label: "Visitors", color: "var(--chart-3)" },
  pageViews: { label: "Page Views", color: "var(--chart-4)" },
}

const categoryConfig: ChartConfig = {
  sales: { label: "Sales", color: "var(--chart-1)" },
}

const recentOrders = [
  { id: "#3210", customer: "Olivia Martin", status: "Shipped", amount: "$42.25" },
  { id: "#3209", customer: "Ava Johnson", status: "Processing", amount: "$74.99" },
  { id: "#3208", customer: "Michael Chen", status: "Delivered", amount: "$125.00" },
  { id: "#3207", customer: "Lisa Anderson", status: "Pending", amount: "$89.50" },
  { id: "#3206", customer: "James Wilson", status: "Shipped", amount: "$56.75" },
]

const statusColor: Record<string, string> = {
  Shipped: "default",
  Processing: "secondary",
  Delivered: "outline",
  Pending: "destructive",
}

export default function DashboardPage() {
  return (
    <div className="space-y-6">
      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$45,231.89</div>
            <div className="flex items-center gap-1 text-xs text-muted-foreground">
              <ArrowUpRight className="h-3 w-3 text-green-500" />
              <span className="text-green-500 font-medium">+20.1%</span> from last month
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Orders</CardTitle>
            <ShoppingCart className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">+2,350</div>
            <div className="flex items-center gap-1 text-xs text-muted-foreground">
              <ArrowUpRight className="h-3 w-3 text-green-500" />
              <span className="text-green-500 font-medium">+12.5%</span> from last month
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Products</CardTitle>
            <Package className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">1,234</div>
            <div className="flex items-center gap-1 text-xs text-muted-foreground">
              <ArrowDownRight className="h-3 w-3 text-red-500" />
              <span className="text-red-500 font-medium">-2.1%</span> from last month
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Active Users</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">+573</div>
            <div className="flex items-center gap-1 text-xs text-muted-foreground">
              <ArrowUpRight className="h-3 w-3 text-green-500" />
              <span className="text-green-500 font-medium">+8.2%</span> from last month
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Charts */}
      <Tabs defaultValue="revenue" className="space-y-4">
        <TabsList>
          <TabsTrigger value="revenue">
            <TrendingUp className="h-4 w-4 mr-2" />
            Revenue
          </TabsTrigger>
          <TabsTrigger value="visitors">
            <Activity className="h-4 w-4 mr-2" />
            Visitors
          </TabsTrigger>
          <TabsTrigger value="categories">
            <Package className="h-4 w-4 mr-2" />
            Categories
          </TabsTrigger>
        </TabsList>

        <TabsContent value="revenue" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Revenue Overview</CardTitle>
                <CardDescription>Monthly revenue for the current year</CardDescription>
              </CardHeader>
              <CardContent>
                <ChartContainer config={revenueConfig} className="h-64 w-full">
                  <AreaChart data={revenueData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <ChartTooltip content={<ChartTooltipContent />} />
                    <Area
                      type="monotone"
                      dataKey="revenue"
                      stroke="var(--color-revenue)"
                      fill="var(--color-revenue)"
                      fillOpacity={0.2}
                    />
                  </AreaChart>
                </ChartContainer>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Orders Trend</CardTitle>
                <CardDescription>Monthly orders for the current year</CardDescription>
              </CardHeader>
              <CardContent>
                <ChartContainer config={revenueConfig} className="h-64 w-full">
                  <LineChart data={revenueData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <ChartTooltip content={<ChartTooltipContent />} />
                    <Line
                      type="monotone"
                      dataKey="orders"
                      stroke="var(--color-orders)"
                      strokeWidth={2}
                      dot={{ r: 4 }}
                    />
                  </LineChart>
                </ChartContainer>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="visitors" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Weekly Traffic</CardTitle>
              <CardDescription>Visitors and page views this week</CardDescription>
            </CardHeader>
            <CardContent>
              <ChartContainer config={weeklyConfig} className="h-72 w-full">
                <BarChart data={weeklyData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="day" />
                  <YAxis />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Bar dataKey="visitors" fill="var(--color-visitors)" radius={[4, 4, 0, 0]} />
                  <Bar dataKey="pageViews" fill="var(--color-pageViews)" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ChartContainer>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="categories" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Sales by Category</CardTitle>
              <CardDescription>Product category performance</CardDescription>
            </CardHeader>
            <CardContent>
              <ChartContainer config={categoryConfig} className="h-72 w-full">
                <BarChart data={categoryData} layout="vertical">
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis type="number" />
                  <YAxis dataKey="category" type="category" width={80} />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Bar dataKey="sales" fill="var(--color-sales)" radius={[0, 4, 4, 0]} />
                </BarChart>
              </ChartContainer>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Bottom Section */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        {/* Recent Orders */}
        <Card className="md:col-span-4">
          <CardHeader>
            <CardTitle>Recent Orders</CardTitle>
            <CardDescription>Latest 5 orders from the store</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentOrders.map((order) => (
                <div
                  key={order.id}
                  className="flex items-center justify-between rounded-lg border p-3"
                >
                  <div className="flex items-center gap-3">
                    <div className="flex h-9 w-9 items-center justify-center rounded-full bg-primary/10">
                      <ShoppingCart className="h-4 w-4 text-primary" />
                    </div>
                    <div>
                      <p className="text-sm font-medium">{order.customer}</p>
                      <p className="text-xs text-muted-foreground">{order.id}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Badge variant={statusColor[order.status] as "default" | "secondary" | "outline" | "destructive"}>
                      {order.status}
                    </Badge>
                    <span className="text-sm font-medium">{order.amount}</span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Server Stats */}
        <Card className="md:col-span-3">
          <CardHeader>
            <CardTitle>System Overview</CardTitle>
            <CardDescription>Server resource utilization</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span>CPU Usage</span>
                <span className="font-medium">72%</span>
              </div>
              <Progress value={72} />
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span>Memory</span>
                <span className="font-medium">58%</span>
              </div>
              <Progress value={58} />
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span>Storage</span>
                <span className="font-medium">45%</span>
              </div>
              <Progress value={45} />
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span>Bandwidth</span>
                <span className="font-medium">89%</span>
              </div>
              <Progress value={89} />
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span>Network I/O</span>
                <span className="font-medium">34%</span>
              </div>
              <Progress value={34} />
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
