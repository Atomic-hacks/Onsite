import React from "react";
import { FolderIcon, ClipboardIcon, UsersIcon } from "lucide-react";
import StatCard from "../ui/StatCard";

interface StatsOverviewProps {
  totalProjects: number;
  totalLogs: number;
  totalCollaborators: number;
}

const StatsOverview: React.FC<StatsOverviewProps> = ({
  totalProjects = 0,
  totalLogs = 0,
  totalCollaborators = 0,
}) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
      <StatCard
        icon={<FolderIcon className="h-5 w-5 text-lime-800" />}
        title="Total Projects"
        value={totalProjects}
      />
      <StatCard
        icon={<ClipboardIcon className="h-5 w-5 text-lime-800" />}
        title="Total Logs"
        value={totalLogs}
      />
      <StatCard
        icon={<UsersIcon className="h-5 w-5 text-lime-800" />}
        title="Total Collaborators"
        value={totalCollaborators}
      />
    </div>
  );
};

export default StatsOverview;
