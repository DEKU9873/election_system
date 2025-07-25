import React from "react";

const Loader = () => {
  return (
    <div className="flex items-center justify-center p-6 z-999999999">
      <div className="w-12 h-12 border-4 border-gray-200 border-t-blue-600 rounded-full animate-spin"></div>
    </div>
  );
};

export default Loader;
