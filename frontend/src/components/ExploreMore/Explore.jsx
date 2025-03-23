import React, { useState } from "react";
import { useSelector } from "react-redux";
import HomeLower from "../HomeMiddle/HomeLower";

const Explore = () => {
  const [cat, setCat] = useState("all");
  const { posts } = useSelector((st) => st.auth);

  const categories = [
    { label: "All", value: "all" },
    { label: "Sketch", value: "sketch" },
    { label: "Painting", value: "painting" },
    { label: "Drawing", value: "drawing" },
    { label: "3D", value: "3d" },
  ];

  const filteredPosts = posts?.filter((item) => {
    if (cat === "all") return true;
    const categoryMatch = cat === "3d" ? "digital-painting" : cat;
    return item.postCategory === categoryMatch;
  });

  return (
    <div className="min-h-screen bg-blue-100 py-8">
      {/* Category Filters */}
      <div className="container mx-auto px-4">
        <div className="flex flex-wrap justify-center gap-3 mb-8">
          {categories.map((category) => (
            <button
              key={category.value}
              onClick={() => setCat(category.value)}
              className={`px-4 py-2 rounded-md text-sm sm:text-base font-medium transition-colors duration-300 ${
                cat === category.value
                  ? "bg-indigo-600 text-white"
                  : "bg-indigo-50 text-gray-700 hover:bg-indigo-200 hover:text-indigo-600"
              } shadow-sm`}
            >
              {category.label}
            </button>
          ))}
        </div>

        {/* Product Grid */}
        {filteredPosts?.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredPosts.map((item) => (
              <HomeLower key={item._id} post={item} />
            ))}
          </div>
        ) : (
          <div className="text-center text-gray-600 text-lg">
            No products found in this category.
          </div>
        )}
      </div>
    </div>
  );
};

export default Explore;