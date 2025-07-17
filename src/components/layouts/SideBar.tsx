"use client";
import React, { useState, useEffect } from "react";
import { usePathname, useSearchParams, useRouter } from "next/navigation";
import Link from "next/link";
import {
  ChevronLeft,
  FileText,
  Settings,
  Home,
  NotepadText,
  Menu,
  X,
} from "lucide-react";
import { NavItem } from "../../types";
import { HiPhoto } from "react-icons/hi2";
import { FaTools } from "react-icons/fa";

const Sidebar: React.FC = () => {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const router = useRouter();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Get current tab from URL params, default to 'overview'
  const currentTab = searchParams.get("tab") || "overview";

  const navItems: NavItem[] = [
    {
      id: "overview",
      label: "Project Overview",
      icon: <Home className="w-5 h-5" />,
      href: "",
    },
    {
      id: "logs",
      label: "Daily Logs",
      icon: <FileText className="w-5 h-5" />,
      href: "",
    },
    {
      id: "notes",
      label: "Notes",
      icon: <NotepadText className="w-5 h-5" />,
      href: "",
    },
    {
      id: "gallery",
      label: "Gallery",
      icon: <HiPhoto className="w-5 h-5" />,
      href: "",
    },
    {
      id: "materials",
      label: "Materials",
      icon: <FaTools className="w-5 h-5" />,
      href: "",
    },
    {
      id: "settings",
      label: "Settings",
      icon: <Settings className="w-5 h-5" />,
      href: "",
    },
  ];

  // Define which items are enabled
  const enabledItems = ["overview", "logs"];

  const handleTabClick = (id: string) => {
    // Only allow navigation for enabled items
    if (!enabledItems.includes(id)) return;
    
    const currentUrl = new URL(window.location.href);
    currentUrl.searchParams.set("tab", id);

    router.push(`/projects?tab=${id}`);

    setIsMobileMenuOpen(false);
  };

  const handleOverlayClick = () => {
    setIsMobileMenuOpen(false);
  };
  
  const handleKeyDown = (e: React.KeyboardEvent, id: string) => {
    // Only allow keyboard navigation for enabled items
    if (!enabledItems.includes(id)) return;
    
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      handleTabClick(id);
    }
  };

  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [pathname, searchParams]);

  return (
    <>
      {/* Mobile Menu Button */}
      <button
        onClick={() => setIsMobileMenuOpen(true)}
        className="lg:hidden fixed top-3 left-4 z-50 p-2 bg-white border border-gray-200 rounded-lg shadow-sm hover:bg-gray-50 transition-colors"
        aria-label="Open navigation menu"
      >
        <Menu className="w-5 h-5 text-gray-600" />
      </button>

      {/* Mobile Overlay */}
      {isMobileMenuOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-black bg-opacity-50 z-40"
          onClick={handleOverlayClick}
          aria-hidden="true"
        />
      )}

      {/* Sidebar */}
      <div
        className={`
          fixed lg:static inset-y-0 left-0 z-50
          w-64 bg-white border-r border-gray-200 flex flex-col
          transform transition-transform duration-300 ease-in-out
          ${isMobileMenuOpen ? "translate-x-0" : "-translate-x-full"}
          lg:translate-x-0
        `}
      >
        {/* Mobile Close Button */}
        <div className="lg:hidden flex justify-end p-4">
          <button
            onClick={() => setIsMobileMenuOpen(false)}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            aria-label="Close navigation menu"
          >
            <X className="w-5 h-5 text-gray-600" />
          </button>
        </div>

        {/* Back to Home */}
        <div className="p-4 border-b border-gray-200">
          <Link
            href="/"
            className="flex items-center text-gray-600 hover:text-gray-800 transition-colors"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            <ChevronLeft className="w-5 h-5 mr-2" />
            <span className="text-sm font-medium">Back to Home</span>
          </Link>
        </div>

        {/* Navigation */}
        <nav
          className="flex-1 p-4"
          role="navigation"
          aria-label="Project navigation"
        >
          <ul className="space-y-2">
            {navItems.map((item) => {
              const isActive = currentTab === item.id;
              const isEnabled = enabledItems.includes(item.id);

              return (
                <li key={item.id}>
                  <button
                    onClick={() => handleTabClick(item.id)}
                    onKeyDown={(e) => handleKeyDown(e, item.id)}
                    disabled={!isEnabled}
                    className={`w-full text-left flex items-center justify-between px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                      !isEnabled
                        ? "text-gray-400 cursor-not-allowed opacity-50"
                        : isActive
                        ? "bg-neutral-50 text-lime-700"
                        : "text-gray-600 hover:text-gray-800 hover:bg-gray-50"
                    }`}
                    aria-current={isActive ? "page" : undefined}
                    title={isEnabled ? `Navigate to ${item.label}` : `${item.label} (disabled)`}
                  >
                    <span className="gap-2 flex items-center">
                      {item.icon}
                      {item.label}
                    </span>

                    <span
                      className={`w-1.5 h-1.5 rounded-full ml-8 ${
                        isActive ? "bg-lime-700" : "bg-transparent"
                      }`}
                      aria-hidden="true"
                    />
                  </button>
                </li>
              );
            })}
          </ul>
        </nav>
      </div>
    </>
  );
};

export default Sidebar;