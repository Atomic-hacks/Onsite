"use client";
import React, { Suspense, useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import DashboardView from "../../components/projects/ProjectOverview"; // Adjust path as needed
import { Loader2 } from "lucide-react";
import { Project, LogEntry } from "../../types";
import ProjectLogs from "@/components/projects/ProjectLogs";

// Mock data - replace with actual API calls
const mockProject: Project = {
  id: "234578",
  projectNumber: "23001",
  location: "Lekki, Lagos",
  startDate: "2nd Aug 2023",
  duration: 50,
  type: "Residential",
  description: "Construction of a 3 bedroom estate",
  title: "Residential Development Lekki",
};

const mockStats = {
  totalLogs: 50,
  totalNotes: 50,
  totalImages: 50,
};

const mockRecentLogs: LogEntry[] = [
  {
    id: "234578",
    type: "Notes",
    status: "Non Issue",
    description: "50",
    dateCreated: "2nd Aug 2023",
    createdBy: "Christopher",
    dateModified: "2nd Aug 2023",
    modifiedBy: "Christopher",
  },
  {
    id: "234578",
    type: "Work Done",
    status: "Non Issue",
    description: "50",
    dateCreated: "2nd Aug 2023",
    createdBy: "Christopher",
    dateModified: "2nd Aug 2023",
    modifiedBy: "Christopher",
  },
  {
    id: "234578",
    type: "Issue",
    status: "Pending",
    description: "50",
    dateCreated: "2nd Aug 2023",
    createdBy: "Gbolahan",
    dateModified: "2nd Aug 2023",
    modifiedBy: "Gbolahan",
  },
  {
    id: "234578",
    type: "Issue",
    status: "In-progress",
    description: "50",
    dateCreated: "2nd Aug 2023",
    createdBy: "Christopher",
    dateModified: "2nd Aug 2023",
    modifiedBy: "Christopher",
  },
  {
    id: "234578",
    type: "Work Done",
    status: "Non Issue",
    description: "50",
    dateCreated: "2nd Aug 2023",
    createdBy: "Gbolahan",
    dateModified: "2nd Aug 2023",
    modifiedBy: "Gbolahan",
  },
  {
    id: "234578",
    type: "Notes",
    status: "Non Issue",
    description: "50",
    dateCreated: "2nd Aug 2023",
    createdBy: "Christopher",
    dateModified: "2nd Aug 2023",
    modifiedBy: "Christopher",
  },
];

// Loading component
const LoadingSpinner = () => (
  <div className="flex items-center justify-center h-64">
    <Loader2 className="w-8 h-8 animate-spin text-gray-500" />
    <span className="ml-2 text-gray-600">Loading...</span>
  </div>
);

// Placeholder component for tabs that aren't implemented yet
const ComingSoon = ({ tabName }: { tabName: string }) => (
  <div className="flex items-center justify-center h-64">
    <div className="text-center">
      <div className="text-gray-500 text-lg font-semibold mb-2">
        {tabName} Coming Soon
      </div>
      <div className="text-gray-400 text-sm">
        This section is under development.
      </div>
    </div>
  </div>
);

// Main content component that handles tab switching
const ProjectContent = () => {
  const searchParams = useSearchParams();
  const currentTab = searchParams.get("tab") || "overview";
  const [isLoading, setIsLoading] = useState(false);

  // Handle loading state when tab changes
  useEffect(() => {
    setIsLoading(true);

    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 600);

    return () => clearTimeout(timer);
  }, [currentTab]);

  const renderContent = () => {
    if (isLoading) {
      return <LoadingSpinner />;
    }

    switch (currentTab) {
      case "overview":
        return (
          <DashboardView
            project={mockProject}
            stats={mockStats}
            recentLogs={mockRecentLogs}
          />
        );
      case "logs":
        return <ProjectLogs stats={mockStats} recentLogs={mockRecentLogs} />;
      case "notes":
        return <ComingSoon tabName="Notes" />;
      case "gallery":
        return <ComingSoon tabName="Gallery" />;
      case "materials":
        return <ComingSoon tabName="Materials" />;
      case "settings":
        return <ComingSoon tabName="Settings" />;
      default:
        return (
          <div className="flex items-center justify-center">
            <div className="text-center">
              <div className="text-gray-500 text-lg font-semibold mb-2">
                Page Not Found
              </div>
              <div className="text-gray-400 text-sm">
                The requested tab &quot;{currentTab}&quot; does not exist.
              </div>
            </div>
          </div>
        );
    }
  };

  return (
    <div className="p-2 flex-1 h-full overflow-y-auto scrollbar-hide">
      {renderContent()}
    </div>
  );
};

// Main page component
const ProjectsPage = () => {
  return (
    <Suspense fallback={<LoadingSpinner />}>
      <ProjectContent />
    </Suspense>
  );
};

export default ProjectsPage;
