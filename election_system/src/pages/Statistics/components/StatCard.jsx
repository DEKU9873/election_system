import React from "react";
import { TrendingUp, TrendingDown } from "lucide-react";

// مكون لعرض البطاقات الإحصائية
const StatCard = ({ title, value, icon, trend, color }) => {
  const Icon = icon;
  return (
    <div className="bg-white rounded-lg p-6 shadow-md border border-gray-100 hover:border-blue-200 transition-all duration-300">
      <div className="flex justify-between items-start">
        <div>
          <p className="text-sm font-medium text-gray-500 mb-1">{title}</p>
          <h3 className="text-2xl font-bold text-gray-900">{value}</h3>
          {trend && (
            <div
              className={`flex items-center mt-2 ${
                trend > 0 ? "text-green-600" : "text-red-600"
              }`}
            >
              {trend > 0 ? (
                <TrendingUp size={16} />
              ) : (
                <TrendingDown size={16} />
              )}
              <span className="text-xs font-medium mr-1">
                {Math.abs(trend)}%
              </span>
              <span className="text-xs text-gray-500">من الشهر الماضي</span>
            </div>
          )}
        </div>
        <div className={`p-3 rounded-full ${color}`}>
          <Icon size={20} className="text-white" />
        </div>
      </div>
    </div>
  );
};

export default StatCard;