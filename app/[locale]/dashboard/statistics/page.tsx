import { getTranslations } from "next-intl/server";
import { BarChart, LineChart, PieChart } from "lucide-react";

export default async function StatisticsPage() {
  const t = await getTranslations();
  const dt = await getTranslations("Dashboard");

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">{dt("statistics")}</h1>
      <p className="text-muted-foreground">
        View your dashboard statistics and analytics data
      </p>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <div className="rounded-lg border p-6 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-medium">Users Growth</h3>
            <BarChart className="text-muted-foreground h-5 w-5" />
          </div>
          <p className="text-3xl font-bold">+27%</p>
          <p className="text-sm text-muted-foreground mt-2">
            Compared to last month
          </p>
        </div>

        <div className="rounded-lg border p-6 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-medium">Revenue</h3>
            <LineChart className="text-muted-foreground h-5 w-5" />
          </div>
          <p className="text-3xl font-bold">$45,231</p>
          <p className="text-sm text-muted-foreground mt-2">
            +20.1% from last quarter
          </p>
        </div>

        <div className="rounded-lg border p-6 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-medium">Active Users</h3>
            <PieChart className="text-muted-foreground h-5 w-5" />
          </div>
          <p className="text-3xl font-bold">2,431</p>
          <p className="text-sm text-muted-foreground mt-2">
            +5.2% from last week
          </p>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <div className="rounded-lg border p-6 shadow-sm">
          <h3 className="text-lg font-medium mb-4">Monthly Overview</h3>
          <div className="h-64 bg-muted/20 rounded flex items-center justify-center">
            <p className="text-muted-foreground">Monthly chart visualization</p>
          </div>
        </div>

        <div className="rounded-lg border p-6 shadow-sm">
          <h3 className="text-lg font-medium mb-4">User Demographics</h3>
          <div className="h-64 bg-muted/20 rounded flex items-center justify-center">
            <p className="text-muted-foreground">
              Demographics chart visualization
            </p>
          </div>
        </div>
      </div>

      <div className="rounded-lg border shadow-sm">
        <div className="p-6 border-b">
          <h3 className="text-lg font-medium">Performance Metrics</h3>
        </div>
        <div className="p-6">
          <div className="space-y-4">
            <div>
              <div className="flex justify-between mb-1">
                <span className="text-sm font-medium">Page Load Time</span>
                <span className="text-sm font-medium">98%</span>
              </div>
              <div className="w-full bg-muted/30 rounded-full h-2">
                <div
                  className="bg-primary h-2 rounded-full"
                  style={{ width: "98%" }}
                ></div>
              </div>
            </div>

            <div>
              <div className="flex justify-between mb-1">
                <span className="text-sm font-medium">Server Response</span>
                <span className="text-sm font-medium">92%</span>
              </div>
              <div className="w-full bg-muted/30 rounded-full h-2">
                <div
                  className="bg-primary h-2 rounded-full"
                  style={{ width: "92%" }}
                ></div>
              </div>
            </div>

            <div>
              <div className="flex justify-between mb-1">
                <span className="text-sm font-medium">Database Queries</span>
                <span className="text-sm font-medium">85%</span>
              </div>
              <div className="w-full bg-muted/30 rounded-full h-2">
                <div
                  className="bg-primary h-2 rounded-full"
                  style={{ width: "85%" }}
                ></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
