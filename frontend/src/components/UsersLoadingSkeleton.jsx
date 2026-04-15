import React from 'react';

const UsersLoadingSkeleton = () => {
  // Create an array of 8 items for the skeleton list
  const skeletonItems = Array(8).fill(null);

  return (
    <div className="flex flex-col h-full overflow-hidden">
      {/* Skeleton Header */}
      <div className="p-5 border-b border-base-300">
        <div className="h-6 w-24 bg-base-300 rounded animate-pulse" />
      </div>

      {/* Skeleton List */}
      <div className="flex-1 overflow-y-auto p-3 space-y-4">
        {skeletonItems.map((_, idx) => (
          <div key={idx} className="flex items-center gap-3 p-2 w-full animate-pulse">
            {/* Avatar skeleton */}
            <div className="size-12 rounded-full bg-base-300 shrink-0" />
            
            {/* Text skeleton (Hidden on mobile via lg:block if needed) */}
            <div className="hidden lg:block flex-1 space-y-2">
              <div className="h-4 bg-base-300 rounded w-3/4" />
              <div className="h-3 bg-base-300/50 rounded w-1/2" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UsersLoadingSkeleton;
