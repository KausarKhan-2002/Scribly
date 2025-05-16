const ConnectionShimmer = () => {
  return (
    <section className="p-7 h-[90vh] overflow-hidden">
      {/* Heading Skeleton */}
      <div className="w-40 h-6 bg-gray-100 rounded mb-6 animate-pulse" />

      {/* Search + Tabs */}
      <div className="flex items-end gap-5 justify-between mb-6">
        {/* Search Skeleton */}
        <div className="w-full md:w-[70%] xl:w-[65%] h-10 bg-gray-100 rounded-md animate-pulse" />

        {/* Tabs Skeleton */}
        <div className="flex gap-3">
          <div className="w-24 h-8 bg-gray-100 rounded-md animate-pulse" />
          <div className="w-24 h-8 bg-gray-100 rounded-md animate-pulse" />
          <div className="w-24 h-8 bg-gray-100 rounded-md animate-pulse" />
        </div>
      </div>

      {/* Cards Skeleton Grid */}
      <section className="grid md:grid-cols-2 xl:grid-cols-3 gap-3">
        {[...Array(6)].map((_, idx) => (
          <SkeletonSocialCard key={idx} />
        ))}
      </section>
    </section>
  );
};

export default ConnectionShimmer;

const SkeletonSocialCard = () => {
  return (
    <div className="bg-white shadow-sm rounded-2xl p-4 flex justify-between items-center animate-pulse border border-gray-100">
      {/* Left side: Avatar + Info */}
      <div className="flex items-center gap-4">
        <div className="w-14 h-14 bg-gray-100 rounded-full" />
        <div className="space-y-2">
          <div className="w-32 h-4 bg-gray-100 rounded" />
          <div className="w-24 h-3 bg-gray-100 rounded" />
        </div>
      </div>

      {/* Right side: Button */}
      <div className="w-20 h-8 bg-gray-100 rounded-full" />
    </div>
  );
};
