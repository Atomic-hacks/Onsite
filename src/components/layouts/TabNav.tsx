"use client";
import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { HomeIcon, FolderIcon } from "lucide-react";

export interface NavigationTab {
  name: string;
  href: string;
  icon: React.ElementType;
}

interface TabNavigationProps {
  tabs: NavigationTab[];
}

const TabNavigation: React.FC<TabNavigationProps> = ({ tabs }) => {
  const pathname = usePathname(); // Get current path

  return (
    <div className="rounded-xl shadow-lg bg-white">
      <nav className="flex justify-center space-x-4" aria-label="Tabs">
        {tabs.map((tab) => {
          const isActive = pathname === tab.href;

          return (
            <Link
              key={tab.name}
              href={tab.href}
              className={`
                inline-flex items-center py-4 border-b-2 text-sm font-medium transition-all duration-300 px-6
                ${
                  isActive
                    ? "border-lime-700 text-lime-700"
                    : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                }
              `}
              aria-current={isActive ? "page" : undefined}
            >
              <tab.icon
                className={`-ml-0.5 mr-2 h-5 w-5 ${
                  isActive ? "text-lime-700" : "text-gray-400"
                }`}
                aria-hidden="true"
              />
              {tab.name}
            </Link>
          );
        })}
      </nav>
    </div>
  );
};

// Default tabs configuration
export const defaultTabs: NavigationTab[] = [
  { name: "Home", href: "/dashboard", icon: HomeIcon },
  { name: "Projects", href: "/dashboard/projects", icon: FolderIcon },
];

export default TabNavigation;
