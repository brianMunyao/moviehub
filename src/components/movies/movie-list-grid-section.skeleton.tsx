import React from "react";
import { Skeleton } from "@/components/ui/skeleton";

type Props = {
  title?: string;
  count?: number;
};

const MovieListGridSectionSkeleton = ({ title, count = 10 }: Props) => {
  return (
    <div className="flex flex-col gap-4 px-4 py-10 max-w-7xl mx-auto">
      {title && (
        <div className="w-fit flex flex-col gap-1 mb-5">
          <Skeleton className="h-6 md:h-8 w-40" />
          <Skeleton className="h-[10px] w-[30%] rounded-full" />
        </div>
      )}

      <div className="w-full grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
        {Array.from({ length: count }).map((_, idx) => (
          <div key={idx} className="h-80">
            <div className="flex flex-col h-full">
              <Skeleton className="w-full h-64 rounded-lg" />
              <div className="mt-2 space-y-2">
                <Skeleton className="h-4 w-3/4" />
                <Skeleton className="h-4 w-1/2" />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MovieListGridSectionSkeleton;
