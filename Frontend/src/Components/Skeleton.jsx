// Skeleton components
const SkeletonCard = () => (
  <div className="bg-white p-4 rounded-lg shadow-sm animate-pulse">
    <div className="h-3 w-24 bg-gray-200 mb-3 rounded"></div>
    <div className="h-6 w-36 bg-gray-300 mb-2 rounded"></div>
  </div>
);

const SkeletonChart = () => (
  <div className="bg-white p-4 rounded-lg shadow-sm animate-pulse">
    <div className="h-5 w-40 bg-gray-200 mb-6 rounded"></div>
    <div className="h-64 w-full bg-gray-100 rounded"></div>
  </div>
);

const SkeletonCategoryItem = () => (
  <div className="flex items-center justify-between animate-pulse">
    <div className="flex items-center gap-3">
      <div className="w-2 h-2 rounded-full bg-gray-300"></div>
      <div className="h-4 w-20 bg-gray-200 rounded"></div>
    </div>
    <div className="h-4 w-16 bg-gray-200 rounded"></div>
  </div>
);

const SkeletonTransaction = () => (
  <div className="flex items-center justify-between animate-pulse">
    <div className="flex items-center gap-3">
      <div className="w-8 h-8 rounded-full bg-gray-200"></div>
      <div>
        <div className="h-4 w-24 bg-gray-200 rounded mb-2"></div>
        <div className="h-3 w-16 bg-gray-100 rounded"></div>
      </div>
    </div>
    <div className="h-4 w-16 bg-gray-200 rounded"></div>
  </div>
);

export {
  SkeletonCard,
  SkeletonChart,
  SkeletonCategoryItem,
  SkeletonTransaction,
};
