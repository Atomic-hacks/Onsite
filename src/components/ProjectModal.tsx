"use client";

import { useState, FC, MouseEvent } from "react";
import { X, Calendar, ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface ProjectModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface RoleOption {
  id: string;
  name: string;
}

const ProjectModal: FC<ProjectModalProps> = ({ isOpen, onClose }) => {
  const [projectRole, setProjectRole] = useState<string>("");
  const [showRoleDropdown, setShowRoleDropdown] = useState<boolean>(false);
  const [showDurationDropdown, setShowDurationDropdown] =
    useState<boolean>(false);
  const [duration, setDuration] = useState<string>("Days");

  const roles: RoleOption[] = [
    { id: "architect", name: "Architect" },
    { id: "contractor", name: "Contractor" },
    { id: "engineer", name: "Engineer" },
    { id: "plumber", name: "Plumber" },
    { id: "bricklayer", name: "Bricklayer" },
  ];

  if (!isOpen) return null;

  const handleSelectRole = (role: string): void => {
    setProjectRole(role);
    setShowRoleDropdown(false);
  };

  const handleSelectDuration = (durationType: string): void => {
    setDuration(durationType);
    setShowDurationDropdown(false);
  };

  const handleOverlayClick = (e: MouseEvent<HTMLDivElement>): void => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <AnimatePresence>
      <div
        className="fixed inset-0 flex items-start justify-center z-50 p-6 pt-16 overflow-auto"
        onClick={handleOverlayClick}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: -20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: -20 }}
          transition={{ type: "spring", damping: 25, stiffness: 300 }}
          className="bg-white rounded-lg shadow-xl w-full max-w-md border border-blue-200"
        >
          {/* Modal header */}
          <div className="flex justify-between items-center p-4">
            <h2 className="text-lg font-medium text-gray-800">
              Create Project
            </h2>
            <button
              onClick={onClose}
              className="text-gray-500 hover:text-gray-700 rounded-full p-1"
              aria-label="Close"
            >
              <X size={20} />
            </button>
          </div>

          {/* Modal content */}
          <div className="p-4 space-y-3">
            <input
              type="text"
              placeholder="Project Number"
              className="w-full p-3 bg-gray-100 border-0 rounded-md"
              aria-label="Project Number"
            />

            <input
              type="text"
              placeholder="Project Name"
              className="w-full p-3 bg-gray-100 border-0 rounded-md"
              aria-label="Project Name"
            />

            <input
              type="text"
              placeholder="Location"
              className="w-full p-3 bg-gray-100 border-0 rounded-md"
              aria-label="Location"
            />

            <div className="relative">
              <input
                type="text"
                placeholder="Start Date"
                className="w-full p-3 bg-gray-100 border-0 rounded-md"
                aria-label="Start Date"
              />
              <Calendar
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                size={20}
              />
            </div>

            <div className="flex gap-2">
              <input
                type="text"
                placeholder="Duration"
                className="flex-1 p-3 bg-gray-100 border-0 rounded-md"
                aria-label="Duration"
              />

              <div className="relative w-24">
                <button
                  className="w-full p-3 bg-gray-100 border-0 rounded-md flex items-center justify-between"
                  onClick={() => setShowDurationDropdown(!showDurationDropdown)}
                  aria-label="Select Duration Unit"
                  aria-expanded={showDurationDropdown}
                  aria-haspopup="listbox"
                >
                  <span>{duration}</span>
                  <div className="flex flex-col">
                    <ChevronDown size={12} className="text-gray-500" />
                  </div>
                </button>

                {showDurationDropdown && (
                  <div
                    className="absolute z-10 mt-1 w-full bg-white border border-gray-200 rounded-md shadow-lg overflow-auto"
                    role="listbox"
                  >
                    {["Days", "Weeks", "Months"].map((option) => (
                      <div
                        key={option}
                        className="p-2 hover:bg-gray-50 cursor-pointer"
                        onClick={() => handleSelectDuration(option)}
                        role="option"
                        aria-selected={duration === option}
                      >
                        {option}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>

            <div className="relative">
              <button
                className="w-full p-3 bg-gray-100 border-0 rounded-md flex items-center justify-between"
                aria-label="Select Project Type"
                aria-haspopup="listbox"
              >
                <span className="text-gray-500">Project Type</span>
                <ChevronDown size={16} className="text-gray-500" />
              </button>
            </div>

            <div className="relative">
              <button
                className="w-full p-3 bg-gray-100 border-0 rounded-md flex items-center justify-between"
                onClick={() => setShowRoleDropdown(!showRoleDropdown)}
                aria-label="Select Project Role"
                aria-expanded={showRoleDropdown}
                aria-haspopup="listbox"
              >
                <span className="text-gray-500">
                  {projectRole || "Project Role"}
                </span>
                <ChevronDown size={16} className="text-gray-500" />
              </button>

              {showRoleDropdown && (
                <div
                  className="absolute z-10 mt-1 w-full bg-white border border-gray-200 rounded-md shadow-lg max-h-40 overflow-auto"
                  role="listbox"
                >
                  {roles.map((role) => (
                    <div
                      key={role.id}
                      className="p-2.5 hover:bg-gray-50 cursor-pointer"
                      onClick={() => handleSelectRole(role.name)}
                      role="option"
                      aria-selected={projectRole === role.name}
                    >
                      {role.name}
                    </div>
                  ))}
                </div>
              )}
            </div>

            <textarea
              placeholder="Description"
              className="w-full p-3 bg-gray-100 border-0 rounded-md h-40"
              aria-label="Description"
            />

            <button
              className="w-40 py-3 bg-lime-800 text-white rounded-xs hover:bg-lime-700 transition-all duration-200 font-medium mb-4"
              aria-label="Create Project"
            >
              Create Project
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default ProjectModal;
