import React from "react";

export const MovieDetailSkeleton = () => {
  return (
    <div className="h-[90vh] w-full bg-black text-white animate-pulse">
      <div className="relative w-full h-[90vh] bg-gray-800" />

      <div className="max-w-7xl mx-auto relative px-4 flex flex-col md:flex-row gap-8 bottom-10 -translate-y-full">
        <div className="w-52 h-72 bg-gray-700 rounded-xl shadow-lg" />

        <div className="flex-1 space-y-4">
          <div className="h-10 w-2/3 bg-gray-700 rounded" />
          <div className="h-6 w-1/2 bg-gray-600 rounded" />

          <div className="flex flex-wrap gap-4">
            <div className="h-4 w-24 bg-gray-600 rounded" />
            <div className="h-4 w-20 bg-gray-600 rounded" />
            <div className="h-4 w-28 bg-gray-600 rounded" />
            <div className="h-4 w-16 bg-gray-600 rounded" />
          </div>

          <div className="h-24 w-full bg-gray-700 rounded" />
        </div>
      </div>
    </div>
  );
};
