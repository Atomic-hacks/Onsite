import React from "react";
import LogsTable from "../ui/log-table";
import { LogEntry } from "../../types";

interface ProjectLogsProps {
  stats: {
    totalLogs: number;
    totalNotes: number;
    totalImages: number;
  };
  recentLogs: LogEntry[];
}

const ProjectLogs: React.FC<ProjectLogsProps> = ({ recentLogs }) => {
  return (
    <div className="h-full overflow-y-auto pl-6 ">
      <span className="block mt-6 mb-14">
        <p className="text-sm text-neutral-400 ">
          Residential Development Lekki
        </p>
        <h3 className="text-lg text-neutral-800">Daily Logs</h3>
      </span>
      <LogsTable logs={recentLogs} />
    </div>
  );
};

export default ProjectLogs;
