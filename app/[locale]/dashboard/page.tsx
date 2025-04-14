import { getTranslations } from "next-intl/server";

export default async function DashboardPage() {
  const t = await getTranslations();
  const dt = await getTranslations("Dashboard");
  const ct = await getTranslations("Common");

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">{dt("overview")}</h1>
      <p className="text-muted-foreground">{dt("welcomeMessage")}</p>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <div className="rounded-lg border p-6 shadow-sm">
          <h3 className="text-lg font-medium">{dt("activeProjects")}</h3>
          <p className="text-3xl font-bold mt-2">12</p>
        </div>

        <div className="rounded-lg border p-6 shadow-sm">
          <h3 className="text-lg font-medium">{dt("pendingTasks")}</h3>
          <p className="text-3xl font-bold mt-2">24</p>
        </div>

        <div className="rounded-lg border p-6 shadow-sm">
          <h3 className="text-lg font-medium">{dt("teamMembers")}</h3>
          <p className="text-3xl font-bold mt-2">8</p>
        </div>
      </div>

      <div className="rounded-lg border shadow-sm">
        <div className="p-6">
          <h3 className="text-lg font-medium">{dt("recentActivity")}</h3>
        </div>
        <div className="p-6 border-t">
          <ul className="space-y-4">
            <li className="flex items-center gap-4">
              <div className="w-2 h-2 rounded-full bg-green-500"></div>
              <div>
                <p className="text-sm font-medium">{dt("projectUpdated")}</p>
                <p className="text-xs text-muted-foreground">
                  2 {ct("hoursAgo")}
                </p>
              </div>
            </li>
            <li className="flex items-center gap-4">
              <div className="w-2 h-2 rounded-full bg-blue-500"></div>
              <div>
                <p className="text-sm font-medium">{dt("taskAssigned")}</p>
                <p className="text-xs text-muted-foreground">
                  5 {ct("hoursAgo")}
                </p>
              </div>
            </li>
            <li className="flex items-center gap-4">
              <div className="w-2 h-2 rounded-full bg-amber-500"></div>
              <div>
                <p className="text-sm font-medium">{dt("meetingScheduled")}</p>
                <p className="text-xs text-muted-foreground">
                  {ct("yesterday")}
                </p>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
