import { ArrowDownRightIcon } from "@/components/ui/arrow-down-right";
import { ArrowUpRightIcon } from "@/components/ui/arrow-up-right";
import { DollarSignIcon } from "@/components/ui/dollar-sign";
import { UsersIcon } from "@/components/ui/users";
import { TrendingUpIcon } from "@/components/ui/trending-up";
import { ActivityIcon } from "@/components/ui/activity";
import { PackageIcon } from "@/components/ui/package";
import { ShoppingCartIcon } from "@/components/ui/shopping-cart";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart";
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
} from "recharts";
import { useTranslation } from "react-i18next";
import { useMemo } from "react";

const RAW_REVENUE_DATA = [
  { month: "jan", revenue: 4000, orders: 240 },
  { month: "feb", revenue: 3000, orders: 210 },
  { month: "mar", revenue: 5000, orders: 290 },
  { month: "apr", revenue: 4500, orders: 260 },
  { month: "may", revenue: 6000, orders: 340 },
  { month: "jun", revenue: 5500, orders: 310 },
  { month: "jul", revenue: 7000, orders: 380 },
  { month: "aug", revenue: 6500, orders: 350 },
  { month: "sep", revenue: 8000, orders: 420 },
  { month: "oct", revenue: 7500, orders: 400 },
  { month: "nov", revenue: 9000, orders: 450 },
  { month: "dec", revenue: 8500, orders: 430 },
];

const RAW_WEEKLY_DATA = [
  { day: "mon", visitors: 1200, pageViews: 3500 },
  { day: "tue", visitors: 1400, pageViews: 4200 },
  { day: "wed", visitors: 1100, pageViews: 3100 },
  { day: "thu", visitors: 1600, pageViews: 4800 },
  { day: "fri", visitors: 1300, pageViews: 3900 },
  { day: "sat", visitors: 900, pageViews: 2400 },
  { day: "sun", visitors: 800, pageViews: 2100 },
];

const RAW_CATEGORY_DATA = [
  { category: "electronics", sales: 4500 },
  { category: "clothing", sales: 3200 },
  { category: "home", sales: 2800 },
  { category: "sports", sales: 2100 },
  { category: "books", sales: 1800 },
  { category: "other", sales: 1200 },
];

const recentOrders = [
  {
    id: "#3210",
    customer: "Olivia Martin",
    status: "shipped",
    amount: "$42.25",
  },
  {
    id: "#3209",
    customer: "Ava Johnson",
    status: "processing",
    amount: "$74.99",
  },
  {
    id: "#3208",
    customer: "Michael Chen",
    status: "delivered",
    amount: "$125.00",
  },
  {
    id: "#3207",
    customer: "Lisa Anderson",
    status: "pending",
    amount: "$89.50",
  },
  {
    id: "#3206",
    customer: "James Wilson",
    status: "shipped",
    amount: "$56.75",
  },
];

const statusColor: Record<string, string> = {
  shipped: "default",
  processing: "secondary",
  delivered: "outline",
  pending: "destructive",
};

export default function DashboardPage() {
  const { t } = useTranslation("dashboard");
  const { t: tc } = useTranslation("common");

  const revenueData = useMemo(
    () =>
      RAW_REVENUE_DATA.map((d) => ({
        ...d,
        month: tc(`months.${d.month}`),
      })),
    [tc],
  );

  const weeklyData = useMemo(
    () =>
      RAW_WEEKLY_DATA.map((d) => ({
        ...d,
        day: tc(`days.${d.day}`),
      })),
    [tc],
  );

  const categoryData = useMemo(
    () =>
      RAW_CATEGORY_DATA.map((d) => ({
        ...d,
        category: t(`categories.${d.category}`),
      })),
    [t],
  );

  const revenueConfig: ChartConfig = {
    revenue: { label: t("chartLabels.revenue"), color: "var(--chart-1)" },
    orders: { label: t("chartLabels.ordersLabel"), color: "var(--chart-2)" },
  };

  const weeklyConfig: ChartConfig = {
    visitors: {
      label: t("chartLabels.visitorsLabel"),
      color: "var(--chart-3)",
    },
    pageViews: { label: t("chartLabels.pageViews"), color: "var(--chart-4)" },
  };

  const categoryConfig: ChartConfig = {
    sales: { label: t("chartLabels.sales"), color: "var(--chart-1)" },
  };

  return (
    <div className="space-y-6">
      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">
              {t("stats.totalRevenue")}
            </CardTitle>
            <DollarSignIcon size={16} className="text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$45,231.89</div>
            <div className="flex items-center gap-1 text-xs text-muted-foreground">
              <ArrowUpRightIcon size={12} className="text-green-500" />
              <span className="text-green-500 font-medium">+20.1%</span>{" "}
              {t("stats.fromLastMonth")}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">
              {t("stats.orders")}
            </CardTitle>
            <ShoppingCartIcon size={16} className="text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">+2,350</div>
            <div className="flex items-center gap-1 text-xs text-muted-foreground">
              <ArrowUpRightIcon size={12} className="text-green-500" />
              <span className="text-green-500 font-medium">+12.5%</span>{" "}
              {t("stats.fromLastMonth")}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">
              {t("stats.products")}
            </CardTitle>
            <PackageIcon size={16} className="text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">1,234</div>
            <div className="flex items-center gap-1 text-xs text-muted-foreground">
              <ArrowDownRightIcon size={12} className="text-red-500" />
              <span className="text-red-500 font-medium">-2.1%</span>{" "}
              {t("stats.fromLastMonth")}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">
              {t("stats.activeUsers")}
            </CardTitle>
            <UsersIcon size={16} className="text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">+573</div>
            <div className="flex items-center gap-1 text-xs text-muted-foreground">
              <ArrowUpRightIcon size={12} className="text-green-500" />
              <span className="text-green-500 font-medium">+8.2%</span>{" "}
              {t("stats.fromLastMonth")}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Charts */}
      <Tabs defaultValue="revenue" className="space-y-4">
        <TabsList>
          <TabsTrigger value="revenue">
            <TrendingUpIcon size={16} className="mr-2" />
            {t("tabs.revenue")}
          </TabsTrigger>
          <TabsTrigger value="visitors">
            <ActivityIcon size={16} className="mr-2" />
            {t("tabs.visitors")}
          </TabsTrigger>
          <TabsTrigger value="categories">
            <PackageIcon size={16} className="mr-2" />
            {t("tabs.categories")}
          </TabsTrigger>
        </TabsList>

        <TabsContent value="revenue" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>{t("charts.revenueOverview")}</CardTitle>
                <CardDescription>
                  {t("charts.revenueOverviewDesc")}
                </CardDescription>
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
                <CardTitle>{t("charts.ordersTrend")}</CardTitle>
                <CardDescription>{t("charts.ordersTrendDesc")}</CardDescription>
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
              <CardTitle>{t("charts.weeklyTraffic")}</CardTitle>
              <CardDescription>{t("charts.weeklyTrafficDesc")}</CardDescription>
            </CardHeader>
            <CardContent>
              <ChartContainer config={weeklyConfig} className="h-72 w-full">
                <BarChart data={weeklyData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="day" />
                  <YAxis />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Bar
                    dataKey="visitors"
                    fill="var(--color-visitors)"
                    radius={[4, 4, 0, 0]}
                  />
                  <Bar
                    dataKey="pageViews"
                    fill="var(--color-pageViews)"
                    radius={[4, 4, 0, 0]}
                  />
                </BarChart>
              </ChartContainer>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="categories" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>{t("charts.salesByCategory")}</CardTitle>
              <CardDescription>
                {t("charts.salesByCategoryDesc")}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ChartContainer config={categoryConfig} className="h-72 w-full">
                <BarChart data={categoryData} layout="vertical">
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis type="number" />
                  <YAxis dataKey="category" type="category" width={80} />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Bar
                    dataKey="sales"
                    fill="var(--color-sales)"
                    radius={[0, 4, 4, 0]}
                  />
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
            <CardTitle>{t("recentOrders.title")}</CardTitle>
            <CardDescription>{t("recentOrders.description")}</CardDescription>
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
                      <ShoppingCartIcon size={16} className="text-primary" />
                    </div>
                    <div>
                      <p className="text-sm font-medium">{order.customer}</p>
                      <p className="text-xs text-muted-foreground">
                        {order.id}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Badge
                      variant={
                        statusColor[order.status] as
                          | "default"
                          | "secondary"
                          | "outline"
                          | "destructive"
                      }
                    >
                      {t(`orderStatuses.${order.status}`)}
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
            <CardTitle>{t("systemOverview.title")}</CardTitle>
            <CardDescription>{t("systemOverview.description")}</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span>{t("systemOverview.cpuUsage")}</span>
                <span className="font-medium">72%</span>
              </div>
              <Progress value={72} />
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span>{t("systemOverview.memory")}</span>
                <span className="font-medium">58%</span>
              </div>
              <Progress value={58} />
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span>{t("systemOverview.storage")}</span>
                <span className="font-medium">45%</span>
              </div>
              <Progress value={45} />
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span>{t("systemOverview.bandwidth")}</span>
                <span className="font-medium">89%</span>
              </div>
              <Progress value={89} />
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span>{t("systemOverview.networkIO")}</span>
                <span className="font-medium">34%</span>
              </div>
              <Progress value={34} />
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
