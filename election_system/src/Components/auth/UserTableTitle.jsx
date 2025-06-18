import React from 'react';
import { User } from 'lucide-react';

const UserTableTitle = () => {
  return (
    <div className="flex items-center gap-3 mb-4">
      <div className="p-2 bg-blue-100 rounded-lg">
        <User className="w-6 h-6 text-blue-600" />
      </div>
      <div>
        <h2 className="text-2xl font-bold text-gray-900">
          إدارة المستخدمين
        </h2>
        <p className="text-gray-600">
          إدارة حسابات المستخدمين والصلاحيات
        </p>
      </div>
    </div>
  );
};

export default UserTableTitle;