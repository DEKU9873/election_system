import React from 'react';
import { User } from 'lucide-react';

const UserTableTitle = ({title, subtitle}) => {
  return (
    <div className="flex items-center gap-2 sm:gap-3 mb-3 sm:mb-4">
      {/* <div className="p-1 sm:p-2 bg-blue-100 rounded-lg">
        <User className="w-5 sm:w-6 h-5 sm:h-6 text-blue-600" />
      </div> */}
      <div>
        <h2 className="text-xl sm:text-2xl font-bold text-gray-900">
          {title}
        </h2>
        <p className="text-sm sm:text-base text-gray-600">
          {subtitle}
        </p>
      </div>
    </div>
  );
};

export default UserTableTitle;