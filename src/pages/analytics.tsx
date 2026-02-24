import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
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
  XAxis,
  YAxis,
} from "recharts"

const trafficData = [
  { date: "Mon", desktop: 186, mobile: 80 },
  { date: "Tue", desktop: 305, mobile: 200 },
  { date: "Wed", desktop: 237, mobile: 120 },
  { date: "Thu", desktop: 73, mobile: 190 },
  { date: "Fri", desktop: 209, mobile: 130 },
  { date: "Sat", desktop: 214, mobile: 140 },
  { date: "Sun", desktop: 150, mobile: 100 },
]

const conversionData = [
  { month: "Jan", visitors: 4000, conversions: 240 },
  { month: "Feb", visitors: 3000, conversions: 180 },
  { month: "Mar", visitors: 5000, conversions: 350 },
  { month: "Apr", visitors: 4500, conversions: 290 },
  { month: "May", visitors: 6000, conversions: 420 },
  { month: "Jun", visitors: 5500, conversions: 380 },
]

const trafficConfig: ChartConfig = {
  desktop: { label: "Desktop", color: "var(--chart-1)" },
  mobile: { label: "Mobile", color: "var(--chart-2)" },
}

const conversionConfig: ChartConfig = {
  visitors: { label: "Visitors", color: "var(--chart-3)" },
  conversions: { label: "Conversions", color: "var(--chart-4)" },
}

export default function AnalyticsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold tracking-tight">Analytics</h2>
        <p className="text-muted-foreground">Detailed analytics and metrics overview</p>
      </div>

      <div className="grid gap-4 md:grid-cols-4">
        {[
          { label: "Total Visitors", value: "24,589", change: "+12.3%" },
          { label: "Bounce Rate", value: "32.1%", change: "-2.1%" },
          { label: "Avg. Session", value: "4m 32s", change: "+8.5%" },
          { label: "Conversion Rate", value: "3.2%", change: "+0.4%" },
        ].map((stat) => (
          <Card key={stat.label}>
            <CardHeader className="pb-2">
              <CardDescription>{stat.label}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
              <p className="text-xs text-muted-foreground">
                <span className={stat.change.startsWith("+") ? "text-green-500" : "text-red-500"}>
                  {stat.change}
                </span>{" "}
                vs last period
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Traffic by Device</CardTitle>
            <CardDescription>Desktop vs Mobile visitors this week</CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer config={trafficConfig} className="h-72 w-full">
              <AreaChart data={trafficData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Area type="monotone" dataKey="desktop" stroke="var(--color-desktop)" fill="var(--color-desktop)" fillOpacity={0.3} stackId="1" />
                <Area type="monotone" dataKey="mobile" stroke="var(--color-mobile)" fill="var(--color-mobile)" fillOpacity={0.3} stackId="1" />
              </AreaChart>
            </ChartContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Conversion Funnel</CardTitle>
            <CardDescription>Visitors to conversions ratio</CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer config={conversionConfig} className="h-72 w-full">
              <BarChart data={conversionData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Bar dataKey="visitors" fill="var(--color-visitors)" radius={[4, 4, 0, 0]} />
                <Bar dataKey="conversions" fill="var(--color-conversions)" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ChartContainer>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
