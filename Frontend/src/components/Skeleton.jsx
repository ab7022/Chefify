import React from "react";
import Skeleton from "react-loading-skeleton";

const SkeletonCard = () => {
  return (
    <div className="max-w-2xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">
        <Skeleton height={40} width={200} />
      </h1>

      <section className="mt-4">
        <h2 className="text-lg font-semibold mb-4">
          <Skeleton height={24} width={120} />
        </h2>
        <div className="grid grid-cols-2 gap-6">
          {Array(6)
            .fill()
            .map((_, index) => (
              <div
                key={index}
                className="bg-gray-100 shadow-md rounded-md overflow-hidden"
              >
                <Skeleton height={150} />
                <div className="p-4">
                  <h3 className="text-xl font-semibold mb-2">
                    <Skeleton height={20} width={`80%`} />
                  </h3>
                  <p className="text-gray-600">
                    <Skeleton count={2} height={16} width={`100%`} />
                  </p>
                </div>
              </div>
            ))}
        </div>
      </section>
    </div>
  );
};

export default SkeletonCard;
