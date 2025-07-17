"use client";
import React, { useState } from "react";
import { Search, List, Grid, MoreHorizontal, Filter } from "lucide-react";
import { CgToggleSquare } from "react-icons/cg";

interface LogEntry {
  id: string;
  type: string;
  status: string;
  description: string;
  dateCreated: string;
  createdBy: string;
  dateModified: string;
  modifiedBy: string;
}

interface StatusBadgeProps {
  status: string;
}

const StatusBadge: React.FC<StatusBadgeProps> = ({ status }) => {
  const getStatusStyles = (status: string) => {
    switch (status.toLowerCase()) {
      case "non issue":
        return "bg-neutral-200 text-neutral-800";
      case "pending":
        return "bg-orange-100 text-orange-800 ";
      case "in-progress":
        return "bg-orange-100 text-orange-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <span
      className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium border ${getStatusStyles(
        status
      )}`}
    >
      {status}
    </span>
  );
};

interface LogsTableProps {
  logs: LogEntry[];
  title?: string;
  description?: string;
}

const LogsTable: React.FC<LogsTableProps> = ({
  logs,
  title = "Recent Logs",
  description = "List of all project logs",
}) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [itemsPerPage, setItemsPerPage] = useState(100);
  const [viewMode, setViewMode] = useState<"list" | "grid">("list");

  // Sample data for demonstration
  const sampleLogs: LogEntry[] = [
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

  const displayLogs = logs.length > 0 ? logs : sampleLogs;

  const filteredLogs = displayLogs.filter((log) =>
    Object.values(log).some((value) =>
      value.toString().toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  return (
    <div className="bg-white rounded-xl shadow-md">
      {/* Header Section */}
      <div className="px-4 sm:px-6 py-4 border-b border-gray-200">
        <h2 className="text-lg font-semibold text-gray-900 mb-1">{title}</h2>
        <p className="text-sm text-gray-500 mb-4 sm:mb-6">{description}</p>

        {/* Search and Controls */}
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          {/* Search Bar */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input
              type="text"
              placeholder="Search list"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent w-full sm:w-64 bg-gray-50"
            />
          </div>

          {/* Controls */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4">
            {/* Items per page - Hidden on mobile */}
            <div className="hidden sm:flex items-center gap-2 text-sm text-gray-600">
              <span>Items per page</span>
              <select
                value={itemsPerPage}
                onChange={(e) => setItemsPerPage(Number(e.target.value))}
                className="border border-gray-300 rounded px-2 py-1 text-sm bg-white"
              >
                <option value={100}>100</option>
                <option value={50}>50</option>
                <option value={25}>25</option>
              </select>
            </div>

            <div className="flex items-center gap-2 sm:gap-4">
              {/* Filters Button */}
              <button className="flex items-center justify-center gap-2 px-3 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 bg-white flex-1 sm:flex-initial">
                <Filter className="w-4 h-4 sm:hidden" />
                <CgToggleSquare className="w-4 h-4 hidden sm:block" />
                <span className="hidden sm:inline">Filters</span>
              </button>

              {/* View Mode Toggle */}
              <div className="flex border border-gray-300 rounded-lg bg-white">
                <button
                  onClick={() => setViewMode("list")}
                  className={`p-2 ${
                    viewMode === "list" ? "bg-gray-100" : "bg-white"
                  }`}
                >
                  <List className="w-4 h-4 text-gray-600" />
                </button>
                <button
                  onClick={() => setViewMode("grid")}
                  className={`p-2 border-l border-gray-300 ${
                    viewMode === "grid" ? "bg-gray-100" : "bg-white"
                  }`}
                >
                  <Grid className="w-4 h-4 text-gray-600" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Cards View */}
      <div className="block sm:hidden rounded-lg">
        {filteredLogs.slice(0, itemsPerPage).map((log, index) => (
          <div key={index} className="p-4 border-b border-gray-200 bg-white">
            <div className="flex items-start justify-between mb-3">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-sm font-medium text-gray-900">
                    #{log.id}
                  </span>
                  <StatusBadge status={log.status} />
                </div>
                <p className="text-sm text-gray-600 mb-1">{log.type}</p>
              </div>
              <button className="text-gray-400 hover:text-gray-600 p-1">
                <MoreHorizontal className="w-4 h-4" />
              </button>
            </div>

            <div className="grid grid-cols-2 gap-3 text-xs text-gray-500">
              <div>
                <span className="font-medium">Created:</span>
                <br />
                {log.dateCreated}
                <br />
                <span className="text-gray-700">by {log.createdBy}</span>
              </div>
              <div>
                <span className="font-medium">Modified:</span>
                <br />
                {log.dateModified}
                <br />
                <span className="text-gray-700">by {log.modifiedBy}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Desktop Table View */}
      <div className="hidden sm:block overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-4 lg:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                ID
              </th>
              <th className="px-4 lg:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                TYPE
              </th>
              <th className="px-4 lg:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                STATUS
              </th>
              <th className="hidden md:table-cell px-4 lg:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                DESCRIPTION
              </th>
              <th className="px-4 lg:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                DATE CREATED
              </th>
              <th className="hidden lg:table-cell px-4 lg:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                CREATED BY
              </th>
              <th className="hidden xl:table-cell px-4 lg:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                DATE MODIFIED
              </th>
              <th className="hidden xl:table-cell px-4 lg:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                MODIFIED BY
              </th>
              <th className="px-4 lg:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                ACTION
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {filteredLogs.slice(0, itemsPerPage).map((log, index) => (
              <tr key={index} className="hover:bg-gray-50">
                <td className="px-4 lg:px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {log.id}
                </td>
                <td className="px-4 lg:px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                  {log.type}
                </td>
                <td className="px-4 lg:px-6 py-4 whitespace-nowrap">
                  <StatusBadge status={log.status} />
                </td>
                <td className="hidden md:table-cell px-4 lg:px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                  {log.description}
                </td>
                <td className="px-4 lg:px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                  <div>{log.dateCreated}</div>
                  <div className="lg:hidden text-xs text-gray-500">
                    by {log.createdBy}
                  </div>
                </td>
                <td className="hidden lg:table-cell px-4 lg:px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                  {log.createdBy}
                </td>
                <td className="hidden xl:table-cell px-4 lg:px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                  {log.dateModified}
                </td>
                <td className="hidden xl:table-cell px-4 lg:px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                  {log.modifiedBy}
                </td>
                <td className="px-4 lg:px-6 py-4 whitespace-nowrap text-sm text-gray-400">
                  <button className="hover:text-gray-600 p-1">
                    <MoreHorizontal className="w-4 h-4" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default LogsTable;
