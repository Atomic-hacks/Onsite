import React from "react";

interface StatusTabsProps {
  activeCount: number;
  archivedCount: number;
  currentStatus: "active" | "archived";
  onStatusChange: (status: "active" | "archived") => void;
}

const StatusTabs: React.FC<StatusTabsProps> = ({
  activeCount,
  archivedCount,
  currentStatus,
  onStatusChange,
}) => {
  return (
    <div className="flex border-b-0 mb-4">
      <button
        onClick={() => onStatusChange("active")}
        className={`
          py-2 px-4 rounded-full text-sm font-medium mr-2
          ${
            currentStatus === "active"
              ? "bg-white text-lime-800"
              : "bg-gray-100 text-gray-700 hover:bg-gray-200"
          }
        `}
      >
        Active{" "}
        <span className="ml-1 px-1.5 py-0.5 text-xs rounded-full bg-[#E5F6D9]">
          {activeCount}
        </span>
      </button>
      <button
        onClick={() => onStatusChange("archived")}
        className={`
          py-2 px-4 rounded-full text-sm font-medium
          ${
            currentStatus === "archived"
              ? "bg-white text-lime-800"
              : "bg-gray-100 text-gray-700 hover:bg-gray-200"
          }
        `}
      >
        Archived{" "}
        <span className="ml-1 px-1.5 py-0.5 text-xs rounded-full bg-[#E5F6D9]">
          {archivedCount}
        </span>
      </button>
    </div>
  );
};

export default StatusTabs;
