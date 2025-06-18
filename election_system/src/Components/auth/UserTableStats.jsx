import React from 'react';
import { User } from 'lucide-react';

const UserTableStats = ({ data }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
      <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
        <div className="flex items-center gap-2">
          <User className="w-5 h-5 text-blue-600" />
          <span className="text-sm font-medium text-blue-800">
            إجمالي المستخدمين
          </span>
        </div>
        <p className="text-2xl font-bold text-blue-900 mt-1">{data.length}</p>
      </div>
      <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
        <div className="flex items-center gap-2">
          <User className="w-5 h-5 text-blue-600" />
          <span className="text-sm font-medium text-blue-800">
            طريقة التسجيل الإلكتروني
          </span>
        </div>
        <p className="text-2xl font-bold text-blue-900 mt-1">
          {data.filter((user) => user.registrationMethod === "إلكتروني").length}
        </p>
      </div>
    </div>
  );
};

export default UserTableStats;