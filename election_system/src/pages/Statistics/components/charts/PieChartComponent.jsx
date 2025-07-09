import React from "react";
import { Pie } from "react-chartjs-2";

// مكون لعرض الرسم البياني الدائري
const PieChartComponent = ({ data, title = "توزيع المصروفات حسب الفئة" }) => {
  // تحويل البيانات إلى الصيغة المطلوبة لمكتبة Chart.js
  const chartData = {
    labels: data.map((item) => item.category),
    datasets: [
      {
        data: data.map((item) => item.amount),
        backgroundColor: [
          'rgba(54, 162, 235, 0.7)',
          'rgba(255, 99, 132, 0.7)',
          'rgba(255, 206, 86, 0.7)',
          'rgba(75, 192, 192, 0.7)',
          'rgba(153, 102, 255, 0.7)',
          'rgba(255, 159, 64, 0.7)',
          'rgba(199, 199, 199, 0.7)'
        ],
        borderColor: [
          'rgba(54, 162, 235, 1)',
          'rgba(255, 99, 132, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
          'rgba(255, 159, 64, 1)',
          'rgba(199, 199, 199, 1)'
        ],
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "right",
        labels: {
          font: {
            size: 12,
          },
          color: "rgba(54, 162, 235, 1)",
          // تحسين عرض التسميات في وسيلة الإيضاح
          boxWidth: 15,
          padding: 10,
        },
        // تحسين موضع وسيلة الإيضاح
        align: "center",
        fullSize: true,
      },
      tooltip: {
        callbacks: {
          label: function (context) {
            let label = context.label || "";
            if (label) {
              label += ": ";
            }
            if (context.parsed !== undefined) {
              label +=
                new Intl.NumberFormat("ar-IQ").format(context.parsed) + " د.ع";
            }
            return label;
          },
        },
      },
    },
    // إضافة خيارات لتحسين العرض
    layout: {
      padding: {
        top: 10,
        right: 10,
        bottom: 10,
        left: 10
      }
    },
    // تحسين حجم الرسم البياني
    cutout: '40%',
  };

  return (
    <div className="bg-white rounded-lg p-6 shadow-md border border-gray-100 hover:border-blue-200 transition-all duration-300">
      <h3 className="text-lg font-bold text-gray-900 mb-4">
        {title}
      </h3>
      <div style={{ height: "300px" }}>
        <Pie data={chartData} options={options} />
      </div>
    </div>
  );
};

export default PieChartComponent;