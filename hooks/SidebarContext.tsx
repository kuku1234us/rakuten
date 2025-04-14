"use client";

import * as React from "react";
import { usePathname } from "next/navigation";
import { type LucideIcon } from "lucide-react";

// Define a type for the menu item
export type MainMenuItem = {
  title: string;
  url: string;
  icon?: LucideIcon;
  isActive?: boolean;
  items?: {
    title: string;
    url: string;
  }[];
};

// Define a type for section configuration
export type MenuSection = {
  label: string;
  items: MainMenuItem[];
};

// Define a type for breadcrumb elements, using a different name to avoid conflicts
export type BreadcrumbElement = {
  title: string;
  url: string;
  isActive: boolean;
};

// A unique key for storing expanded menus in localStorage
const EXPANDED_MENUS_STORAGE_KEY = "sidebar-expanded-menus";

type SidebarContextType = {
  expandedMenus: Set<string>;
  toggleMenu: (menuId: string, isExpanded: boolean) => void;
  currentPath: string;
  breadcrumbs: BreadcrumbElement[];
};

const SidebarContext = React.createContext<SidebarContextType | undefined>(
  undefined
);

export function useSidebarContext() {
  const context = React.useContext(SidebarContext);
  if (!context) {
    throw new Error(
      "useSidebarContext must be used within a SidebarContextProvider"
    );
  }
  return context;
}

export function SidebarContextProvider({
  children,
  menuSections,
}: {
  children: React.ReactNode;
  menuSections: MenuSection[];
}) {
  // Get the current path, without locale prefix
  const rawPathname = usePathname();
  const currentPath = rawPathname.replace(/^\/[^/]*\//, "/");

  // Create a stable ref for menu sections to avoid unnecessary effects
  const menuSectionsRef = React.useRef(menuSections);

  // Flag to track if we're on the client to avoid hydration issues
  const [isClient, setIsClient] = React.useState(false);

  // Initialize with sections that contain the current path expanded
  const getInitialExpandedMenus = () => {
    const initialExpanded = new Set<string>();

    menuSectionsRef.current.forEach((section) => {
      section.items.forEach((item) => {
        if (
          item.isActive ||
          item.items?.some((subItem) => subItem.url === currentPath)
        ) {
          initialExpanded.add(`${section.label}-${item.title}`);
        }
      });
    });

    return initialExpanded;
  };

  // State to track expanded menu sections
  const [expandedMenus, setExpandedMenus] = React.useState<Set<string>>(
    getInitialExpandedMenus
  );

  // Effect to handle client-side initialization and localStorage
  React.useEffect(() => {
    setIsClient(true);

    // Now that we're on the client, try to load from localStorage
    try {
      const storedMenus = localStorage.getItem(EXPANDED_MENUS_STORAGE_KEY);
      if (storedMenus) {
        const parsedMenus = JSON.parse(storedMenus);
        // Merge stored menus with any that should be expanded based on current path
        setExpandedMenus((prev) => {
          const newSet = new Set<string>(parsedMenus);

          // Also ensure menus for current path are expanded
          menuSectionsRef.current.forEach((section) => {
            section.items.forEach((item) => {
              if (item.items?.some((subItem) => subItem.url === currentPath)) {
                newSet.add(`${section.label}-${item.title}`);
              }
            });
          });

          return newSet;
        });
      }
    } catch (error) {
      console.error("Error loading expanded menus from localStorage:", error);
    }
  }, [currentPath]); // Re-run when path changes

  // Effect to save expanded menus to localStorage when they change
  // This only runs on the client after initial hydration
  React.useEffect(() => {
    if (isClient && expandedMenus.size > 0) {
      try {
        localStorage.setItem(
          EXPANDED_MENUS_STORAGE_KEY,
          JSON.stringify(Array.from(expandedMenus))
        );
      } catch (error) {
        console.error("Error saving expanded menus to localStorage:", error);
      }
    }
  }, [expandedMenus, isClient]);

  // Effect to auto-expand sections when path changes
  React.useEffect(() => {
    let sectionsToExpand: string[] = [];

    menuSectionsRef.current.forEach((section) => {
      section.items.forEach((item) => {
        const menuId = `${section.label}-${item.title}`;
        if (item.items?.some((subItem) => subItem.url === currentPath)) {
          sectionsToExpand.push(menuId);
        }
      });
    });

    if (sectionsToExpand.length > 0) {
      setExpandedMenus((prev) => {
        const newSet = new Set(prev);
        sectionsToExpand.forEach((id) => newSet.add(id));
        return newSet;
      });
    }
  }, [currentPath]);

  // Handle menu toggling with persistence
  const toggleMenu = React.useCallback(
    (menuId: string, isExpanded: boolean) => {
      setExpandedMenus((prev) => {
        const newSet = new Set(prev);
        if (isExpanded) {
          newSet.add(menuId);
        } else {
          newSet.delete(menuId);
        }
        return newSet;
      });
    },
    []
  );

  // Generate breadcrumbs based on the current path and menu structure
  const generateBreadcrumbs = React.useCallback(() => {
    const breadcrumbs: BreadcrumbElement[] = [];

    // Iterate through menu sections to find the current path
    let foundParent = false;
    let foundCurrent = false;

    // Check menu items
    for (const section of menuSectionsRef.current) {
      for (const item of section.items) {
        // Check if this is the parent item (e.g., Dashboard)
        if (
          item.items &&
          item.items.some(
            (subItem) =>
              subItem.url === currentPath ||
              currentPath.startsWith(item.url + "/")
          )
        ) {
          breadcrumbs.push({
            title: item.title,
            url: item.url,
            isActive: false,
          });
          foundParent = true;

          // Check if this is the exact current path
          if (item.url === currentPath) {
            breadcrumbs[breadcrumbs.length - 1].isActive = true;
            foundCurrent = true;
            break;
          }

          // Check child items
          for (const subItem of item.items) {
            if (subItem.url === currentPath) {
              breadcrumbs.push({
                title: subItem.title,
                url: subItem.url,
                isActive: true,
              });
              foundCurrent = true;
              break;
            }
          }
        }

        // If we already found the current item, break out
        if (foundCurrent) {
          break;
        }

        // Check if this is the current item (e.g., Home)
        if (item.url === currentPath) {
          breadcrumbs.push({
            title: item.title,
            url: item.url,
            isActive: true,
          });
          foundCurrent = true;
          break;
        }
      }

      // If we already found the current item, break out
      if (foundCurrent) {
        break;
      }
    }

    // If we couldn't find any breadcrumbs but have a path
    if (breadcrumbs.length === 0 && currentPath !== "/") {
      // Add a fallback Home breadcrumb
      breadcrumbs.push({
        title: "home",
        url: "/",
        isActive: false,
      });
    }

    return breadcrumbs;
  }, [currentPath, menuSectionsRef]);

  // Create breadcrumbs based on the current path
  const breadcrumbs = React.useMemo(
    () => generateBreadcrumbs(),
    [generateBreadcrumbs]
  );

  // Memoize context value to prevent unnecessary renders
  const contextValue = React.useMemo(
    () => ({
      expandedMenus,
      toggleMenu,
      currentPath,
      breadcrumbs,
    }),
    [expandedMenus, toggleMenu, currentPath, breadcrumbs]
  );

  return (
    <SidebarContext.Provider value={contextValue}>
      {children}
    </SidebarContext.Provider>
  );
}
