"use client";

import React, { useState } from "react";
import SearchNavbar from "../../components/layouts/SearchNav";
import TabNavigation, { defaultTabs } from "../../components/layouts/TabNav";
import StatsOverview from "../../components/dashboard/StatOverview";
import StatusTabs from "../../components/dashboard/StatusTab";
import EmptyState from "../../components/EmptyState";
import crane from "../../../public/crane.svg";
import ProjectModal from "@/components/ProjectModal";

export default function Home() {
  const [projectStatus, setProjectStatus] = useState<"active" | "archived">("active");
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  // Mock data
  const stats = {
    totalProjects: 50,
    totalLogs: 50,
    totalCollaborators: 50,
  };

  const statusCounts = {
    active: 3,
    archived: 0,
  };

  // Handlers
  const handleStatusChange = (status: "active" | "archived") => {
    setProjectStatus(status);
  };

  const openModal = (): void => setIsModalOpen(true);
  const closeModal = (): void => setIsModalOpen(false);
  
  const handleSearch = (query: string) => {
    console.log("Searching for:", query);
    // Add search logic here
  };

  return (
    <div className="min-h-screen">
      {/* Search Navigation */}
      <SearchNavbar
        user={{ name: "User", avatar: "/avatar-placeholder.png" }}
        onSearch={handleSearch}
      />

      {/* Main Content */}
      <main className="max-w-5xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
        {/* Tab Navigation - No onChange needed, Next.js handles routing */}
        <TabNavigation tabs={defaultTabs} />

        {/* Stats Overview */}
        <div className="my-6">
          <StatsOverview
            totalProjects={stats.totalProjects}
            totalLogs={stats.totalLogs}
            totalCollaborators={stats.totalCollaborators}
          />
        </div>

        {/* Project Status Tabs */}
        <div className="flex justify-between items-center">
          <StatusTabs
            activeCount={statusCounts.active}
            archivedCount={statusCounts.archived}
            currentStatus={projectStatus}
            onStatusChange={handleStatusChange}
          />

          {/* Add Project Button */}
          <button
            type="button"
            className="bg-lime-800 hover:bg-lime-900 transition-all duration-200 text-white p-2 rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-lime-600"
            onClick={openModal}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 4.5v15m7.5-7.5h-15"
              />
            </svg>
          </button>
        </div>

        {/* Empty State */}
        <div className="mt-6">
          <EmptyState
            title="No Projects"
            description="Tap the Create Project button below to start a project."
            buttonText="Create Project"
            onAction={openModal}
            icon={crane.src}
          />
        </div>
        
        <ProjectModal isOpen={isModalOpen} onClose={closeModal} />
      </main>
    </div>
  );
}