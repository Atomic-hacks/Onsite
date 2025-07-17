/* eslint-disable @next/next/no-img-element */

import React from "react";

interface EmptyStateProps {
  title: string;
  description: string;
  buttonText: string;
  onAction: () => void;
 icon?: React.ReactNode | string ;
}

const EmptyState: React.FC<EmptyStateProps> = ({
  title,
  description,
  buttonText,
  onAction,
  icon,
}) => {
  return (
    <div className="bg-white rounded-lg p-12 flex flex-col items-center justify-center text-center">
      {/* Icon Container */}
      <div className="bg-lime-200 rounded-full p-10 mb-6">
         {icon && typeof icon === "string" ? (
        // ✅ only strings go here
        <img
          src={icon}
          alt=""
          className="mx-auto w-20 h-20 object-contain"
        />
      ) : (
        // ✅ any ReactNode (e.g. <svg/> or <Image/>) goes here
        <div className="mx-auto w-20 h-20">{icon}</div>
      )}
      </div>

      <h3 className="text-xl font-semibold text-gray-900 mb-2">{title}</h3>
      <p className="text-gray-500 mb-6">{description}</p>

      <button
        type="button"
        className="bg-lime-800 hover:bg-lime-900 transition-all duration-200 text-white font-medium py-2 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-lime-500"
        onClick={onAction}
      >
        {buttonText}
      </button>
    </div>
  );
};

export default EmptyState;
