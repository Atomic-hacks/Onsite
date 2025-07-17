import React from "react";
import { Project } from "../../types";

interface ProjectHeaderProps {
  project: Project;
  onEdit?: () => void;
  onDeactivate?: () => void;
}

const ProjectHeader: React.FC<ProjectHeaderProps> = ({
  project,
  onEdit,
  onDeactivate,
}) => {
  return (
    <div className="bg-white rounded-xl m-4 border-b border-gray-200 p-6 shadow-sm">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6 gap-4">
        <h1 className="text-2xl font-semibold text-gray-900">
          {project.title}
        </h1>
        <div className="flex gap-3">
          <button
            onClick={onEdit}
            className="px-4 py-2 bg-lime-700 text-white text-sm font-medium rounded-lg hover:bg-lime-800 duration-300 transition-colors"
          >
            Edit
          </button>
          <button
            onClick={onDeactivate}
            className="px-4 py-2 bg-gray-100 text-gray-700 text-sm font-medium rounded-lg hover:bg-gray-200 transition-colors"
          >
            Deactivate
          </button>
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6 lg:gap-8 mb-6">
        <div>
          <p className="text-xs font-medium text-gray-500 uppercase tracking-wide mb-1">
            ID
          </p>
          <p className="text-sm font-medium text-gray-900">{project.id}</p>
        </div>
        <div>
          <p className="text-xs font-medium text-gray-500 uppercase tracking-wide mb-1">
            PROJECT NUMBER
          </p>
          <p className="text-sm font-medium text-gray-900">
            {project.projectNumber}
          </p>
        </div>
        <div>
          <p className="text-xs font-medium text-gray-500 uppercase tracking-wide mb-1">
            LOCATION
          </p>
          <p className="text-sm font-medium text-gray-900">
            {project.location}
          </p>
        </div>
        <div>
          <p className="text-xs font-medium text-gray-500 uppercase tracking-wide mb-1">
            START DATE
          </p>
          <p className="text-sm font-medium text-gray-900">
            {project.startDate}
          </p>
        </div>
        <div>
          <p className="text-xs font-medium text-gray-500 uppercase tracking-wide mb-1">
            DURATION
          </p>
          <p className="text-sm font-medium text-gray-900">
            {project.duration}
          </p>
        </div>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 lg:gap-8">
        <div>
          <p className="text-xs font-medium text-gray-500 uppercase tracking-wide mb-1">
            TYPE
          </p>
          <p className="text-sm font-medium text-gray-900">{project.type}</p>
        </div>
        <div className="lg:col-span-4">
          <p className="text-xs font-medium text-gray-500 uppercase tracking-wide mb-1">
            DESCRIPTION
          </p>
          <p className="text-sm font-medium text-gray-900">
            {project.description}
          </p>
        </div>
      </div>
    </div>
  );
};

export default ProjectHeader;
