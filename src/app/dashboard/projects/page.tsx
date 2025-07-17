"use client";

import React, { useState } from "react";
import SearchNavbar from "../../../components/layouts/SearchNav";
import TabNavigation, { defaultTabs } from "../../../components/layouts/TabNav";
import { FiGrid, FiList, FiMoreVertical } from "react-icons/fi";
import { BiSearch } from "react-icons/bi";

interface Project {
  id: string;
  users: number;
  number: string;
  title: string;
  location: string;
  startDate: string;
  duration: number;
  durationType: string;
  type: string;
  createdBy: string;
  description: string;
  status: "Active" | "Archive";
}

const ProjectsPage: React.FC = () => {
  const [viewMode, setViewMode] = useState<"list" | "grid">("list");
  const [searchTerm, setSearchTerm] = useState("");
  const [itemsPerPage, setItemsPerPage] = useState("100");

  const handleSearch = (query: string) => {
    console.log("Searching for:", query);
    // Add search logic here
  };

  // Mock data
  const projects: Project[] = [
    {
      id: "234576",
      users: 10,
      number: "33001",
      title: "Residential Development Project",
      location: "Lekki, Lagos",
      startDate: "2nd Aug 2023",
      duration: 50,
      durationType: "Days",
      type: "Residential",
      createdBy: "User001",
      description: "A development work going on in the heart of Lekki, Lagos",
      status: "Active",
    },
    {
      id: "234577",
      users: 10,
      number: "33002",
      title: "Commercial Complex Project",
      location: "Victoria Island, Lagos",
      startDate: "15th Aug 2023",
      duration: 12,
      durationType: "Weeks",
      type: "Commercial",
      createdBy: "User002",
      description: "Modern commercial complex in Victoria Island",
      status: "Active",
    },
    {
      id: "234578",
      users: 8,
      number: "33003",
      title: "Infrastructure Development",
      location: "Abuja",
      startDate: "1st Sep 2023",
      duration: 6,
      durationType: "Months",
      type: "Infrastructure",
      createdBy: "User003",
      description: "Road and bridge construction project",
      status: "Archive",
    },
  ];

  const ActionMenu: React.FC<{ project: Project }> = ({ project }) => {
    const [menuOpen, setMenuOpen] = useState(false);

    return (
      <div className="relative">
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="p-1 rounded-full hover:bg-gray-100"
        >
          <FiMoreVertical className="text-gray-600" />
        </button>

        {menuOpen && (
          <div className="absolute right-0 z-10 mt-1 bg-white border rounded shadow-lg w-32">
            <div className="py-1">
              <button
                className="w-full px-4 py-2 text-left text-sm hover:bg-gray-100"
                onClick={() => {
                  console.log("Edit project", project.id);
                  setMenuOpen(false);
                }}
              >
                Edit
              </button>
              <button
                className="w-full px-4 py-2 text-left text-sm hover:bg-gray-100"
                onClick={() => {
                  console.log("Share project", project.id);
                  setMenuOpen(false);
                }}
              >
                Share
              </button>
              <button
                className="w-full px-4 py-2 text-left text-sm hover:bg-gray-100"
                onClick={() => {
                  console.log("Archive project", project.id);
                  setMenuOpen(false);
                }}
              >
                Archive
              </button>
            </div>
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="min-h-screen">
      {/* Search Navigation */}
      <SearchNavbar
        user={{ name: "User", avatar: "/avatar-placeholder.png" }}
        onSearch={handleSearch}
      />

      {/* Main Content */}
      <main className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
        {/* Tab Navigation */}
        <TabNavigation tabs={defaultTabs} />

        {/* Projects Content */}
        <div className="mt-6 p-6 bg-white rounded-lg shadow-sm">
          <div className="mb-6">
            <h1 className="text-2xl font-bold text-gray-800">Projects</h1>
            <p className="text-sm text-gray-500">List of all user projects</p>
          </div>

          <div className="flex flex-col lg:flex-row justify-between mb-4 gap-4">
            <div className="relative flex-grow max-w-md">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <BiSearch className="text-gray-400" />
              </div>
              <input
                type="search"
                className="w-full pl-10 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-lime-500"
                placeholder="Search projects..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            <div className="flex items-center space-x-2">
              <span className="text-sm text-gray-500">Items per page:</span>
              <select
                value={itemsPerPage}
                onChange={(e) => setItemsPerPage(e.target.value)}
                className="border border-gray-200 rounded px-2 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-lime-500"
              >
                <option value="50">50</option>
                <option value="100">100</option>
                <option value="200">200</option>
              </select>

              <button className="px-3 py-1 bg-white border border-gray-200 rounded-md text-sm text-gray-600 hover:bg-gray-50">
                Filters
              </button>

              <div className="flex border border-gray-200 rounded-md overflow-hidden">
                <button
                  className={`px-2 py-1 ${
                    viewMode === "list" ? "bg-gray-100" : "bg-white"
                  }`}
                  onClick={() => setViewMode("list")}
                >
                  <FiList className="text-gray-600" />
                </button>
                <button
                  className={`px-2 py-1 ${
                    viewMode === "grid" ? "bg-gray-100" : "bg-white"
                  }`}
                  onClick={() => setViewMode("grid")}
                >
                  <FiGrid className="text-gray-600" />
                </button>
              </div>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="min-w-full bg-white border-collapse">
              <thead>
                <tr className="bg-gray-50 text-left text-xs text-gray-500 uppercase tracking-wider">
                  <th className="px-4 py-3 border-b">ID</th>
                  <th className="px-4 py-3 border-b">USERS</th>
                  <th className="px-4 py-3 border-b">NUMBER</th>
                  <th className="px-4 py-3 border-b">TITLE</th>
                  <th className="px-4 py-3 border-b">LOCATION</th>
                  <th className="px-4 py-3 border-b">START DATE</th>
                  <th className="px-4 py-3 border-b">DURATION</th>
                  <th className="px-4 py-3 border-b">DURATION TYPE</th>
                  <th className="px-4 py-3 border-b">TYPE</th>
                  <th className="px-4 py-3 border-b">CREATED BY</th>
                  <th className="px-4 py-3 border-b">DESCRIPTION</th>
                  <th className="px-4 py-3 border-b">STATUS</th>
                  <th className="px-4 py-3 border-b">ACTION</th>
                </tr>
              </thead>
              <tbody className="text-sm text-gray-700">
                {projects.map((project, index) => (
                  <tr
                    key={`${project.id}-${index}`}
                    className="hover:bg-gray-50"
                  >
                    <td className="px-4 py-3 border-b">{project.id}</td>
                    <td className="px-4 py-3 border-b">{project.users}</td>
                    <td className="px-4 py-3 border-b">{project.number}</td>
                    <td className="px-4 py-3 border-b">{project.title}</td>
                    <td className="px-4 py-3 border-b">{project.location}</td>
                    <td className="px-4 py-3 border-b">{project.startDate}</td>
                    <td className="px-4 py-3 border-b">{project.duration}</td>
                    <td className="px-4 py-3 border-b">
                      {project.durationType}
                    </td>
                    <td className="px-4 py-3 border-b">{project.type}</td>
                    <td className="px-4 py-3 border-b">{project.createdBy}</td>
                    <td className="px-4 py-3 border-b max-w-xs truncate">
                      {project.description}
                    </td>
                    <td className="px-4 py-3 border-b">
                      <span
                        className={`px-2 py-1 rounded-md text-xs ${
                          project.status === "Active"
                            ? "bg-lime-100 text-lime-800"
                            : "bg-gray-100 text-gray-800"
                        }`}
                      >
                        {project.status}
                      </span>
                    </td>
                    <td className="px-4 py-3 border-b">
                      <ActionMenu project={project} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  );
};

export default ProjectsPage;
