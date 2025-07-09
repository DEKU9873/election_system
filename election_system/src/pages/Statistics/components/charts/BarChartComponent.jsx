import React from "react";
import { Bar } from "react-chartjs-2";

// مكون لعرض الرسم البياني الشريطي
const BarChartComponent = ({
  data,
  title,
  valueKey = "amount",
  labelKey = "month",
  valueSuffix = "د.ع",
  colors = ["rgba(54, 162, 235, 0.7)", "rgba(54, 162, 235, 1)"],
}) => {
  // تحويل البيانات إلى الصيغة المطلوبة لمكتبة Chart.js
  const chartData = {
    labels: data.map(
      (item) =>
        item[labelKey] ||
        item.governorate ||
        item.month ||
        item.year ||
        item.election ||
        item.source
    ),
    datasets: [
      {
        data: data.map((item) => item[valueKey]),
        backgroundColor: 'rgba(54, 162, 235, 0.7)',
        hoverBackgroundColor: 'rgba(54, 162, 235, 1)',
        borderColor: 'rgba(54, 162, 235, 1)',
        borderWidth: 1,
        borderRadius: 4,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        callbacks: {
          label: function (context) {
            let label = context.dataset.label || "";
            if (label) {
              label += ": ";
            }
            if (context.parsed.y !== undefined) {
              label +=
                new Intl.NumberFormat("ar-IQ").format(context.parsed.y) +
                " " +
                valueSuffix;
            }
            return label;
          },
        },
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        // إضافة حد أقصى للمحور العمودي لمنع الأشرطة من الخروج من المربع
        suggestedMax: Math.max(...data.map(item => item[valueKey])) * 1.1, // إضافة هامش 10%
        ticks: {
          callback: function (value) {
            return (
              new Intl.NumberFormat("ar-IQ").format(value) + " " + valueSuffix
            );
          },
        },
      },
      x: {
        ticks: {
          font: {
            size: 11,
          },
          // تحسين عرض التسميات عندما تكون طويلة
          maxRotation: 45,
          minRotation: 45,
        },
      },
    },
    // إضافة خيارات لتحسين العرض والتأكد من عدم خروج الأشرطة من المربع
    layout: {
      padding: {
        top: 10,
        right: 10,
        bottom: 10,
        left: 10
      }
    },
    // تحديد الحد الأقصى للارتفاع
    barPercentage: 0.8,
    categoryPercentage: 0.8,
  };

  return (
    <div className="bg-white rounded-lg p-6 shadow-md border border-gray-100 hover:border-blue-200 transition-all duration-300">
      <h3 className="text-lg font-bold text-gray-900 mb-6">{title}</h3>
      <div style={{ height: "300px" }}>
        <Bar data={chartData} options={options} />
      </div>
    </div>
  );
};

export default BarChartComponent;