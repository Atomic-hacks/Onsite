"use client";
import React from "react";
import ProjectHeader from "../ui/project-header";
import StatCard from "../ui/StatCard";
import LogsTable from "../ui/log-table";
import { Project, LogEntry } from "../../types";
import { FolderIcon, NotepadText } from "lucide-react";
import { HiPhoto } from "react-icons/hi2";

interface DashboardViewProps {
  project: Project;
  stats: {
    totalLogs: number;
    totalNotes: number;
    totalImages: number;
  };
  recentLogs: LogEntry[];
}

const DashboardView: React.FC<DashboardViewProps> = ({
  project,
  recentLogs,
}) => {
  return (
    <div className="h-full overflow-y-auto">
      <ProjectHeader
        project={project}
        onEdit={() => console.log("Edit project")}
        onDeactivate={() => console.log("Deactivate project")}
      />

      <div className="p-6 space-y-6">
        {/* Stats Cards */}
        <div className="grid grid-cols-3 gap-6">
          <StatCard
            icon={<FolderIcon className="h-5 w-5 text-lime-800" />}
            title="Total Projects"
            value="50"
          />
          <StatCard
            icon={<NotepadText className="h-5 w-5 text-lime-800" />}
            title="Total Logs"
            value="50"
          />
          <StatCard
            icon={<HiPhoto className="h-5 w-5 text-lime-800" />}
            title="Total Images"
            value="50"
          />
        </div>

        {/* Recent Logs Table */}
        <LogsTable logs={recentLogs} />
      </div>
    </div>
  );
};

export default DashboardView;
