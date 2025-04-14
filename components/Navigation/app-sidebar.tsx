"use client";

import * as React from "react";
import {
  ChevronRight,
  Home,
  LayoutDashboard,
  Settings,
  Users,
  Layers,
  FileText,
  BarChart,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useIsMobile } from "@/hooks/use-mobile";
import {
  SidebarContextProvider,
  type MenuSection,
} from "@/hooks/SidebarContext";
import { MainSidebarMenu } from "./MainSidebarMenu";
import { NavUser } from "./nav-user";
import { useTranslations } from "next-intl";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar";

const defaultMenuSections: MenuSection[] = [
  {
    label: "main",
    items: [
      {
        title: "home",
        url: "/",
        icon: Home,
      },
      {
        title: "dashboard",
        url: "/dashboard",
        icon: LayoutDashboard,
        items: [
          {
            title: "allStocks",
            url: "/dashboard/all-stocks",
          },
          {
            title: "overview",
            url: "/dashboard",
          },
          {
            title: "statistics",
            url: "/dashboard/statistics",
          },
          {
            title: "performance",
            url: "/dashboard/performance",
          },
        ],
      },
    ],
  },
  {
    label: "management",
    items: [
      {
        title: "users",
        url: "/dashboard/users",
        icon: Users,
        items: [
          {
            title: "users",
            url: "/dashboard/users",
          },
        ],
      },
      {
        title: "projects",
        url: "/dashboard/projects",
        icon: Layers,
        items: [
          {
            title: "projects",
            url: "/dashboard/projects",
          },
        ],
      },
      {
        title: "tasks",
        url: "/dashboard/tasks",
        icon: FileText,
        items: [
          {
            title: "tasks",
            url: "/dashboard/tasks",
          },
        ],
      },
      {
        title: "calendar",
        url: "/dashboard/calendar",
        icon: BarChart,
        items: [
          {
            title: "calendar",
            url: "/dashboard/calendar",
          },
        ],
      },
    ],
  },
  {
    label: "system",
    items: [
      {
        title: "settings",
        url: "/settings",
        icon: Settings,
        items: [
          {
            title: "account",
            url: "/settings/account",
          },
          {
            title: "preferences",
            url: "/settings/preferences",
          },
          {
            title: "notifications",
            url: "/settings/notifications",
          },
          {
            title: "security",
            url: "/settings/security",
          },
          {
            title: "privacy",
            url: "/settings/privacy",
          },
        ],
      },
    ],
  },
];

// Memoize the sidebar structure to prevent unnecessary rerenders
const MemoizedSidebarContent = React.memo(function SidebarContentInner() {
  const t = useTranslations("Navigation");

  // Translate menu sections
  const translatedMenuSections = React.useMemo(() => {
    return defaultMenuSections.map((section) => ({
      label: t(section.label),
      items: section.items.map((item) => ({
        ...item,
        title: t(item.title),
        items: item.items?.map((subItem) => ({
          ...subItem,
          title: t(subItem.title),
        })),
      })),
    }));
  }, [t]);

  return (
    <>
      {translatedMenuSections.map((section) => (
        <MainSidebarMenu key={section.label} section={section} />
      ))}
    </>
  );
});
export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <SidebarContextProvider menuSections={defaultMenuSections}>
      <Sidebar collapsible="icon" {...props}>
        <SidebarHeader>
          <div className="text-lg font-bold p-2">Next.js 15</div>
        </SidebarHeader>
        <SidebarContent>
          <MemoizedSidebarContent />
        </SidebarContent>
        <SidebarFooter>
          <NavUser />
        </SidebarFooter>
        <SidebarRail />
      </Sidebar>
    </SidebarContextProvider>
  );
}
