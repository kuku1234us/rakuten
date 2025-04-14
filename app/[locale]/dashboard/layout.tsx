import React from "react";
import { cookies } from "next/headers";
import { AppSidebar } from "@/components/Navigation/app-sidebar";
import { BreadcrumbNavigation } from "@/components/Navigation/BreadcrumbNavigation";
import { Separator } from "@/components/ui/separator";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { Logo } from "@/components/shared/logo";

// Constants for sidebar cookie name
const SIDEBAR_COOKIE_NAME = "sidebar_state";

// Memoize the AppSidebar to prevent unnecessary rerenders
const MemoizedAppSidebar = React.memo(AppSidebar);

export default async function DashboardLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  // Get the sidebar state from cookies on the server
  const cookieStore = await cookies();
  const defaultOpen = cookieStore.get(SIDEBAR_COOKIE_NAME)?.value === "true";

  return (
    <SidebarProvider defaultOpen={defaultOpen !== false}>
      <MemoizedAppSidebar />
      <SidebarInset>
        <header className="flex h-10 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12">
          <div className="flex w-full items-center justify-between px-4">
            <div className="flex items-center gap-2">
              <SidebarTrigger className="-ml-1 text-foreground" />
              <Separator orientation="vertical" className="mr-2 h-4" />
              <BreadcrumbNavigation />
            </div>
            <div className="flex items-center h-full">
              <Logo height={28} width={58} className="mr-1" />
            </div>
          </div>
        </header>
        <div className="flex flex-1 flex-col gap-4 p-4 pt-0">{children}</div>
      </SidebarInset>
    </SidebarProvider>
  );
}
