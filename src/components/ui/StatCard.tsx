import React from "react";

interface StatCardProps {
  icon: React.ReactNode;
  title: string;
  value: number | string;
}

const StatCard: React.FC<StatCardProps> = ({ icon, title, value }) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-4 sm:p-6 hover:shadow-lg transition-shadow duration-200">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3 sm:space-x-4">
          <div className="p-2 sm:p-3 bg-neutral-100 rounded-full">{icon}</div>
          <div className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900">
            {value}
          </div>
        </div>
      </div>
      <div className="mt-3 sm:mt-4">
        <p className="text-sm sm:text-base text-gray-600 font-medium">
          {title}
        </p>
      </div>
    </div>
  );
};

export default StatCard;
