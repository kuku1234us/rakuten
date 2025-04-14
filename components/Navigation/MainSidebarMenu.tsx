"use client";

import * as React from "react";
import { ChevronRight, type LucideIcon } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useTranslations } from "next-intl";

import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from "@/components/ui/sidebar";
import { useSidebarContext, type MenuSection } from "@/hooks/SidebarContext";

export function MainSidebarMenu({ section }: { section: MenuSection }) {
  const { expandedMenus, toggleMenu, currentPath } = useSidebarContext();
  const t = useTranslations("Navigation");
  const pathname = usePathname();

  // Get the locale from the current path
  const locale = pathname.split("/")[1] || "en";

  // Track which item we're currently hovering over
  const [hoveredItem, setHoveredItem] = React.useState<string | null>(null);

  return (
    <SidebarGroup>
      <SidebarGroupLabel>{section.label}</SidebarGroupLabel>
      <SidebarMenu>
        {section.items.map((item) => {
          // Create a unique ID for this menu item
          const menuId = `${section.label}-${item.title}`;
          const isExpanded = expandedMenus.has(menuId);

          // Add locale to URLs
          const localizedUrl = `/${locale}${item.url}`;

          // Check if this menu contains the current path
          const containsCurrentPath = item.items?.some(
            (subItem) => subItem.url === currentPath
          );

          // Check if this is the current path
          const isCurrentPath = currentPath === item.url;
          const isActive = isCurrentPath || containsCurrentPath;

          // If this item doesn't have children, render a normal link
          if (!item.items || item.items.length === 0) {
            return (
              <SidebarMenuItem key={menuId}>
                <Link href={localizedUrl} passHref legacyBehavior>
                  <SidebarMenuButton
                    tooltip={t(item.title)}
                    isActive={isActive}
                  >
                    {item.icon && <item.icon className="size-4" />}
                    <span>{t(item.title)}</span>
                  </SidebarMenuButton>
                </Link>
              </SidebarMenuItem>
            );
          }

          return (
            <Collapsible
              key={menuId}
              asChild
              open={isExpanded}
              onOpenChange={(open) => {
                // When a user clicks to open a menu, update our persistent state
                toggleMenu(menuId, open);
              }}
              className="group/collapsible"
            >
              <SidebarMenuItem
                onMouseEnter={() => setHoveredItem(menuId)}
                onMouseLeave={() => setHoveredItem(null)}
              >
                <CollapsibleTrigger asChild>
                  <SidebarMenuButton
                    tooltip={t(item.title)}
                    isActive={isActive}
                  >
                    {item.icon && <item.icon className="size-4" />}
                    <span>{t(item.title)}</span>
                    <ChevronRight className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
                  </SidebarMenuButton>
                </CollapsibleTrigger>
                <CollapsibleContent>
                  <SidebarMenuSub>
                    {item.items?.map((subItem) => {
                      const isSubItemActive = currentPath === subItem.url;
                      const subItemLocalizedUrl = `/${locale}${subItem.url}`;

                      return (
                        <SidebarMenuSubItem key={subItem.title}>
                          <SidebarMenuSubButton
                            asChild
                            isActive={isSubItemActive}
                            onClick={() => {
                              // When clicking a sub-item, ensure the parent menu stays open
                              if (!isExpanded) {
                                toggleMenu(menuId, true);
                              }
                            }}
                          >
                            <Link href={subItemLocalizedUrl}>
                              <span>{t(subItem.title)}</span>
                            </Link>
                          </SidebarMenuSubButton>
                        </SidebarMenuSubItem>
                      );
                    })}
                  </SidebarMenuSub>
                </CollapsibleContent>
              </SidebarMenuItem>
            </Collapsible>
          );
        })}
      </SidebarMenu>
    </SidebarGroup>
  );
}
