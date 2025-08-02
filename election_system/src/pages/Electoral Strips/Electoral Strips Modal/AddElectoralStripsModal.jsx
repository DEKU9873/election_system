import React, { useState, forwardRef } from "react";
import { Toaster } from "react-hot-toast";
import {
  Lock,
  LogIn,
  CalendarDays,
  FileText,
  ImagePlus,
  Layers,
  X,
  Check,
  AlertCircle,
  Clock,
  RefreshCw,
  Trash2,
  Maximize2,
} from "lucide-react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "./datepicker-custom.css";
import "./image-upload.css";

// إضافة أنماط CSS للسكرول
const scrollbarStyles = `
  .modal-scrollbar::-webkit-scrollbar {
    width: 8px;
  }
  .modal-scrollbar::-webkit-scrollbar-track {
    background: #f1f1f1;
    border-radius: 10px;
  }
  .modal-scrollbar::-webkit-scrollbar-thumb {
    background: #c5c5c5;
    border-radius: 10px;
  }
  .modal-scrollbar::-webkit-scrollbar-thumb:hover {
    background: #a0a0a0;
  }
  .modal-scrollbar {
    scroll-behavior: smooth;
    overscroll-behavior: contain;
  }
  #large-image-preview {
    opacity: 0;
    transition: opacity 0.3s ease-in-out;
  }
  #large-image-preview.opacity-100 {
    opacity: 1;
  }
`;

import GetAllCenter from "../../../hook/Center/get-all-center";
import AddTapesHook from "../../../hook/tapes/add-tapse-hooks";
import GetAllStation from "../../../hook/Stations/get-all-station";
import Select from "react-select";

const AddElectoralStripsModal = ({ onClose }) => {
  const [
    electionCenterId,
    stationId,
    date,
    tape_image,
    notes,
    status,
    loading,
    submitClicked,
    onChangeElectionCenterId,
    onChangeStationId,
    onChangeDate,
    onChangeTapeImage,
    onChangeNotes,
    onChangeStatus,
    onSubmit,
    stationsByCenter, // استلام المحطات المرتبطة بالمركز
  ] = AddTapesHook(onClose);
  
  // دالة لتحديث معرض الصور المصغرة
  const updateThumbnailGallery = (images) => {
    const galleryElement = document.getElementById("thumbnails-gallery");
    if (!galleryElement) return;
    
    // مسح المحتوى الحالي
    galleryElement.innerHTML = "";
    
    // إضافة رسالة إذا لم تكن هناك صور
    if (images.length === 0) {
      const emptyMessage = document.createElement("div");
      emptyMessage.className = "w-full py-3 text-center text-gray-400 text-xs italic";
      emptyMessage.textContent = "لم يتم اختيار أي صور بعد";
      galleryElement.appendChild(emptyMessage);
      return;
    }
    
    // إضافة الصور المصغرة
    images.forEach((file, index) => {
      const reader = new FileReader();
      reader.onload = (e) => {
        const thumbnailDiv = document.createElement("div");
        thumbnailDiv.className = "relative rounded-lg overflow-hidden border border-gray-200 group shadow-sm hover:shadow-md transition-all duration-200";
        
        // إنشاء عنصر الصورة المصغرة مع معلومات إضافية
        thumbnailDiv.innerHTML = `
          <div class="w-20 h-20 bg-cover bg-center" style="background-image: url('${e.target.result}')"></div>
          <div class="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-1 text-[10px] text-white text-center truncate">
            ${index + 1}/${images.length}
          </div>
          <div class="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200">
            <div class="bg-black/60 w-full h-full flex flex-col items-center justify-center">
              <div class="flex space-x-1 rtl:space-x-reverse mb-1">
                <button type="button" data-action="view" data-index="${index}" class="p-1.5 rounded-full bg-blue-500/80 hover:bg-blue-600 text-white transition-colors">
                  <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path><circle cx="12" cy="12" r="3"></circle></svg>
                </button>
                <button type="button" data-action="delete" data-index="${index}" class="p-1.5 rounded-full bg-red-500/80 hover:bg-red-600 text-white transition-colors">
                  <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 6h18"></path><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"></path><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"></path><line x1="10" y1="11" x2="10" y2="17"></line><line x1="14" y1="11" x2="14" y2="17"></line></svg>
                </button>
              </div>
              <span class="text-white text-[9px] px-1 py-0.5 bg-black/40 rounded-sm">${file.name.length > 15 ? file.name.substring(0, 12) + '...' : file.name}</span>
            </div>
          </div>
        `;
        
        // إضافة حدث النقر لعرض الصورة
        thumbnailDiv.addEventListener("click", (e) => {
          // إذا لم يكن النقر على زر، نقوم بتحديث الصورة الرئيسية
          if (!e.target.closest('button')) {
            // تحديث الصورة الرئيسية في المعاينة
            const previewElement = document.getElementById("image-preview");
            const largePreviewContainer = document.querySelector(".image-preview-container");
            
            if (previewElement && largePreviewContainer) {
              previewElement.style.backgroundImage = `url(${e.target.result})`;
              largePreviewContainer.style.backgroundImage = `url(${e.target.result})`;
              window.imagePreviewUrl = e.target.result;
            }
          }
        });
        
        // إضافة أحداث النقر للأزرار
        const buttons = thumbnailDiv.querySelectorAll("button");
        buttons.forEach(button => {
          button.addEventListener("click", (e) => {
            e.preventDefault();
            e.stopPropagation();
            
            const action = button.getAttribute("data-action");
            const imageIndex = parseInt(button.getAttribute("data-index"));
            
            if (action === "delete") {
              removeImageByIndex(imageIndex);
            } else if (action === "view") {
              // عرض الصورة في نافذة جديدة
              const newWindow = window.open();
              newWindow.document.write(`
                <html>
                  <head>
                    <title>معاينة الصورة</title>
                    <style>
                      body {
                        margin: 0;
                        padding: 0;
                        display: flex;
                        justify-content: center;
                        align-items: center;
                        min-height: 100vh;
                        background-color: #0f172a;
                        font-family: Arial, sans-serif;
                      }
                      img {
                        max-width: 95%;
                        max-height: 90vh;
                        object-fit: contain;
                        border-radius: 8px;
                        box-shadow: 0 0 30px rgba(0,0,0,0.5);
                      }
                    </style>
                  </head>
                  <body>
                    <img src="${e.target.result}" />
                  </body>
                </html>
              `);
            }
          });
        });
        
        galleryElement.appendChild(thumbnailDiv);
      };
      reader.readAsDataURL(file);
    });
  };
  
  // دالة لحذف صورة محددة بواسطة الفهرس
  const removeImageByIndex = (index) => {
    // إضافة تأثير انتقالي للصورة المحذوفة
    const thumbnailElements = document.querySelectorAll("#thumbnails-gallery > div");
    if (thumbnailElements && thumbnailElements[index]) {
      const thumbnailToRemove = thumbnailElements[index];
      thumbnailToRemove.classList.add("thumbnail-removing");
      
      // عرض رسالة تأكيد صغيرة
      const confirmMessage = document.createElement("div");
      confirmMessage.className = "fixed bottom-4 right-4 bg-red-500 text-white px-4 py-2 rounded-lg shadow-lg text-sm flex items-center z-50 animate-fade-in";
      confirmMessage.innerHTML = `
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="ml-2"><path d="M3 6h18"></path><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"></path><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"></path></svg>
        تم حذف الصورة
      `;
      document.body.appendChild(confirmMessage);
      
      // إزالة رسالة التأكيد بعد فترة
      setTimeout(() => {
        confirmMessage.classList.add("animate-fade-out");
        setTimeout(() => {
          document.body.removeChild(confirmMessage);
        }, 300);
      }, 2000);
      
      // انتظار انتهاء التأثير الانتقالي قبل حذف الصورة فعليًا
      setTimeout(() => {
        // تحديث مصفوفة الصور
        const updatedImages = [...tape_image];
        updatedImages.splice(index, 1);
        
        // تحديث الحالة
        const emptyEvent = { target: { files: [] } };
        onChangeTapeImage(emptyEvent);
        
        // إعادة إضافة الصور المتبقية
        if (updatedImages.length > 0) {
          const dataTransfer = new DataTransfer();
          updatedImages.forEach(file => {
            dataTransfer.items.add(file);
          });
          
          const newEvent = { 
            target: { 
              files: dataTransfer.files 
            } 
          };
          onChangeTapeImage(newEvent);
          
          // تحديث واجهة المستخدم
          if (updatedImages.length > 0) {
            const firstFile = updatedImages[0];
            const reader = new FileReader();
            reader.onload = (e) => {
              const previewElement = document.getElementById("image-preview");
              if (previewElement) {
                previewElement.style.backgroundImage = `url(${e.target.result})`;
              }
              
              const imageContainer = document.querySelector(".image-preview-container");
              if (imageContainer) {
                imageContainer.style.backgroundImage = `url(${e.target.result})`;
              }
              
              // تحديث معلومات الملفات
              const fileNameElement = document.getElementById("file-name");
              if (fileNameElement) {
                fileNameElement.textContent = updatedImages.length > 1 
                  ? `${updatedImages.length} صور محددة` 
                  : firstFile.name;
              }
              
              // حساب الحجم الإجمالي للملفات
              let totalSize = 0;
              updatedImages.forEach(file => {
                totalSize += file.size;
              });
              
              const fileSizeElement = document.getElementById("file-size");
              if (fileSizeElement) {
                fileSizeElement.textContent = totalSize < 1024 * 1024
                  ? `${(totalSize / 1024).toFixed(1)} كيلوبايت`
                  : `${(totalSize / (1024 * 1024)).toFixed(1)} ميجابايت`;
              }
              
              // تحديث URL الصورة للعرض
              window.imagePreviewUrl = e.target.result;
            };
            reader.readAsDataURL(firstFile);
          }
        } else {
          // إذا لم تبق أي صور، نقوم بإعادة تعيين واجهة المستخدم
          const previewElement = document.getElementById("image-preview");
          if (previewElement) {
            previewElement.style.backgroundImage = "";
            previewElement.classList.remove("has-image");
            document.getElementById("upload-text").style.display = "block";
            document.getElementById("change-text").style.display = "none";
          }
          
          // إخفاء المعاينة الكبيرة
          const largePreviewElement = document.getElementById("large-image-preview");
          if (largePreviewElement) {
            largePreviewElement.classList.remove("opacity-100");
            setTimeout(() => {
              largePreviewElement.classList.add("hidden");
            }, 300);
          }
        }
      }, 300); // انتظار انتهاء التأثير الانتقالي
    } else {
      // إذا لم يتم العثور على العنصر، نقوم بالحذف مباشرة
      const updatedImages = [...tape_image];
      updatedImages.splice(index, 1);
      
      // تحديث الحالة
      const emptyEvent = { target: { files: [] } };
      onChangeTapeImage(emptyEvent);
      
      // إعادة إضافة الصور المتبقية إذا وجدت
      if (updatedImages.length > 0) {
        const dataTransfer = new DataTransfer();
        updatedImages.forEach(file => {
          dataTransfer.items.add(file);
        });
        
        const newEvent = { 
          target: { 
            files: dataTransfer.files 
          } 
        };
        onChangeTapeImage(newEvent);
      }
    }
  };

  const [centers] = GetAllCenter();
  // لم نعد بحاجة إلى جلب جميع المحطات لأننا سنستخدم المحطات المرتبطة بالمركز فقط
  // const [stations] = GetAllStation();

  const centerOptions = centers?.map((center) => ({
    value: center.id,
    label: center.name,
  }));

  // استخدام المحطات المرتبطة بالمركز المختار
  const stationOptions = stationsByCenter?.map((station) => ({
    value: station.id,
    label: station.name,
  })) || [];

  const handleCenterChange = (selectedOption) => {
    onChangeElectionCenterId({ target: { value: selectedOption.value } });
  };

  const handleStationChange = (selectedOption) => {
    onChangeStationId({ target: { value: selectedOption.value } });
  };

  const handleStatusChange = (selectedOption) => {
    onChangeStatus({ target: { value: selectedOption.value } });
  };

  // خيارات الحالة
  const statusOptions = [
    {
      value: "مقبول",
      label: "مقبول",
      icon: <Check size={14} className="text-green-500" />,
    },
    {
      value: "مرفوض",
      label: "مرفوض",
      icon: <AlertCircle size={14} className="text-red-500" />,
    },
    {
      value: "قيد المراجعة",
      label: "قيد المراجعة",
      icon: <Clock size={14} className="text-yellow-500" />,
    },
  ];

  // معالج تغيير التاريخ مع تأثير بصري
  const handleDateChange = (date) => {
    // إضافة تأثير بصري عند اختيار التاريخ
    const datePickerInput = document.querySelector(
      ".react-datepicker__input-container input"
    );
    if (datePickerInput) {
      datePickerInput.classList.add("date-selected-effect");
      setTimeout(() => {
        datePickerInput.classList.remove("date-selected-effect");
      }, 500);
    }

    // استدعاء معالج التغيير الأصلي
    onChangeDate({
      target: { value: date ? date.toISOString().split("T")[0] : "" },
    });
  };

  // أنماط مخصصة للتقويم

  const selectStyles = {
    control: (base) => ({
      ...base,
      paddingRight: "10px",
      borderRadius: "0.5rem",
      borderColor: "#E5E7EB",
      minHeight: "34px",
      fontSize: "0.875rem",
      "&:hover": {
        borderColor: "#E5E7EB",
      },
    }),
    placeholder: (base) => ({
      ...base,
      textAlign: "right",
      fontSize: "0.875rem",
    }),
    input: (base) => ({
      ...base,
      textAlign: "right",
      fontSize: "0.875rem",
    }),
    option: (base) => ({
      ...base,
      fontSize: "0.875rem",
      textAlign: "right",
    }),
    singleValue: (base) => ({
      ...base,
      fontSize: "0.875rem",
      textAlign: "right",
    }),
  };

  return (
    <div
      className="fixed inset-0 bg-black/30 backdrop-blur-sm z-50 min-h-screen flex items-center justify-center p-4"
      onClick={onClose}
    >
      <div className="absolute inset-0" />
      <div
        className="bg-white backdrop-blur-sm p-6 rounded-2xl shadow-2xl w-full max-w-3xl flex flex-col items-center relative max-h-[90vh] overflow-y-auto modal-scrollbar"
        onClick={(e) => e.stopPropagation()}
      >
        <style>{scrollbarStyles}</style>
        <button
          onClick={onClose}
          className="absolute left-4 top-4 text-gray-500 hover:text-gray-700 transition-colors"
        >
          <X size={20} />
        </button>
        <h1 className="text-xl font-bold text-gray-800 mb-4 text-center">
          إضافة شريط انتخابي جديد
        </h1>
        <div className="w-full grid grid-cols-2 gap-3">
          <div>
            <label className="block text-gray-700 font-medium mb-1 text-right text-sm">
              المركز
            </label>
            <div className="relative">
              <Select
                options={centerOptions}
                value={centerOptions?.find(
                  (option) => option.value === electionCenterId
                )}
                onChange={handleCenterChange}
                placeholder="اختر المركز"
                isSearchable={true}
                className="text-right"
                styles={selectStyles}
              />
              <Lock
                className="absolute left-4 top-1/2 transform -translate-y-1/2 text-blue-600"
                size={16}
              />
            </div>
          </div>

          <div>
            <label className="block text-gray-700 font-medium mb-1 text-right text-sm">
              المحطة
            </label>
            <div className="relative">
              <Select
                options={stationOptions}
                value={stationOptions?.find(
                  (option) => option.value === stationId
                )}
                onChange={handleStationChange}
                placeholder={electionCenterId ? "اختر المحطة" : "اختر المركز أولاً"}
                isSearchable={true}
                isDisabled={!electionCenterId} // تعطيل الاختيار إذا لم يتم اختيار مركز
                className="text-right"
                styles={selectStyles}
              />
              <Lock
                className="absolute left-4 top-1/2 transform -translate-y-1/2 text-blue-600"
                size={16}
              />
            </div>
          </div>

          <div>
            <label className="block text-gray-700 font-medium mb-1 text-right text-sm">
              التاريخ
            </label>
            <div className="relative">
              <div className="relative image-upload-container">
                <DatePicker
                  selected={date ? new Date(date) : null}
                  onChange={handleDateChange}
                  dateFormat="dd/MM/yyyy"
                  placeholderText="اختر التاريخ"
                  todayButton="اليوم"
                  isClearable
                  showWeekNumbers
                  weekLabel="أسبوع"
                  className="w-full pr-10 text-right"
                  calendarClassName="rtl custom-datepicker"
                  showYearDropdown
                  showMonthDropdown
                  yearDropdownItemNumber={10}
                  scrollableYearDropdown
                  dropdownMode="select"
                  popperPlacement="bottom-end"
                  popperModifiers={[
                    {
                      name: "offset",
                      options: {
                        offset: [0, 8],
                      },
                    },
                    {
                      name: "preventOverflow",
                      options: {
                        boundary: "viewport",
                        padding: 20,
                      },
                    },
                  ]}
                  renderCustomHeader={({
                    date,
                    changeYear,
                    changeMonth,
                    decreaseMonth,
                    increaseMonth,
                    prevMonthButtonDisabled,
                    nextMonthButtonDisabled,
                  }) => (
                    <div className="custom-datepicker-header flex justify-between items-center px-2 py-2 bg-blue-50 rounded-t-lg">
                      <div className="flex">
                        <button
                          type="button"
                          onClick={decreaseMonth}
                          disabled={prevMonthButtonDisabled}
                          className="prev-month-btn p-1 rounded-full hover:bg-blue-100 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="16"
                            height="16"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          >
                            <polyline points="15 18 9 12 15 6"></polyline>
                          </svg>
                        </button>
                        <button
                          type="button"
                          onClick={increaseMonth}
                          disabled={nextMonthButtonDisabled}
                          className="next-month-btn p-1 rounded-full hover:bg-blue-100 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="16"
                            height="16"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          >
                            <polyline points="9 18 15 12 9 6"></polyline>
                          </svg>
                        </button>
                      </div>
                      <div className="flex space-x-2 rtl:space-x-reverse">
                        <select
                          value={date.getFullYear()}
                          onChange={({ target: { value } }) =>
                            changeYear(value)
                          }
                          className="year-select text-sm bg-white border border-gray-200 rounded px-2 py-1 focus:outline-none focus:ring-1 focus:ring-blue-400"
                        >
                          {Array.from(
                            { length: 20 },
                            (_, i) => date.getFullYear() - 10 + i
                          ).map((year) => (
                            <option key={year} value={year}>
                              {year}
                            </option>
                          ))}
                        </select>
                        <select
                          value={date.getMonth()}
                          onChange={({ target: { value } }) =>
                            changeMonth(value)
                          }
                          className="month-select text-sm bg-white border border-gray-200 rounded px-2 py-1 focus:outline-none focus:ring-1 focus:ring-blue-400"
                        >
                          {[
                            "يناير",
                            "فبراير",
                            "مارس",
                            "أبريل",
                            "مايو",
                            "يونيو",
                            "يوليو",
                            "أغسطس",
                            "سبتمبر",
                            "أكتوبر",
                            "نوفمبر",
                            "ديسمبر",
                          ].map((month, i) => (
                            <option key={month} value={i}>
                              {month}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>
                  )}
                  dayClassName={(date) => {
                    const today = new Date();
                    const isToday =
                      date.getDate() === today.getDate() &&
                      date.getMonth() === today.getMonth() &&
                      date.getFullYear() === today.getFullYear();

                    if (isToday) return "today-highlight";
                    if (date.getDay() === 5) return "friday-highlight";
                    return undefined;
                  }}
                />
                <CalendarDays
                  className="absolute left-4 top-1/2 transform -translate-y-1/2 text-blue-600 pointer-events-none"
                  size={16}
                />
              </div>
            </div>
          </div>

          <div>
            <label className="block text-gray-700 font-medium mb-1 text-right text-sm">
              صور الشريط
            </label>
            <div className="relative">
              <div className="image-upload-container relative group">
                <input
                  type="file"
                  accept="image/*"
                  id="tape-image-upload"
                  className="hidden"
                  multiple
                  onChange={(e) => {
                    onChangeTapeImage(e);
                    // عرض معاينة الصور
                    const files = e.target.files;
                    if (files && files.length > 0) {
                      // إظهار مؤشر التحميل
                      const previewElement =
                        document.getElementById("image-preview");
                      if (previewElement) {
                        previewElement.classList.add("upload-pulse");
                        document.getElementById("upload-text").innerHTML =
                          '<div class="flex items-center"><div class="w-3 h-3 border-2 border-blue-600 border-t-transparent rounded-full animate-spin ml-2"></div>جاري التحميل...</div>';
                      }

                      // إظهار المعاينة الكبيرة مع تأثير التحميل
                      const largePreviewElement = document.getElementById(
                        "large-image-preview"
                      );
                      if (largePreviewElement) {
                        // استخدام setTimeout لإضافة تأثير انتقالي سلس
                        setTimeout(() => {
                          largePreviewElement.classList.remove("hidden");
                          largePreviewElement.classList.add("opacity-100");
                        }, 10);
                        const imageContainer =
                          largePreviewElement.querySelector(".image-preview-container");
                        if (imageContainer) {
                          imageContainer.classList.add("image-loading");
                        }
                      }

                      // تحديث واجهة المستخدم لعرض الصور المختارة
                      // استخدام أول صورة للمعاينة الرئيسية وعرض جميع الصور في المعرض المصغر
                      const firstFile = files[0];
                      const reader = new FileReader();
                      reader.onload = (e) => {
                        const previewElement =
                          document.getElementById("image-preview");
                        const largePreviewElement = document.getElementById(
                          "large-image-preview"
                        );
                        if (previewElement) {
                          // إزالة مؤشر التحميل
                          previewElement.classList.remove("upload-pulse");

                          // تعيين الصورة كخلفية
                          previewElement.style.backgroundImage = `url(${e.target.result})`;
                          previewElement.classList.add("has-image");
                          document.getElementById("upload-text").style.display =
                            "none";
                          document.getElementById("change-text").style.display =
                            "block";
                        }
                        if (largePreviewElement) {
                          // إزالة تأثير التحميل
                          const imageContainer =
                            largePreviewElement.querySelector(".image-preview-container");
                          if (imageContainer) {
                            imageContainer.classList.remove("image-loading");
                            imageContainer.style.backgroundImage = `url(${e.target.result})`;
                          }

                          // الحصول على جميع الصور المختارة من الحالة
                          const allSelectedImages = tape_image;
                          
                          // إضافة معلومات الملفات
                          const totalImagesCount = allSelectedImages.length;
                          document.getElementById("file-name").textContent =
                            totalImagesCount > 1 ? `${totalImagesCount} صور محددة` : firstFile.name;
                          
                          // حساب الحجم الإجمالي للملفات
                          let totalSize = 0;
                          allSelectedImages.forEach(file => {
                            totalSize += file.size;
                          });
                          
                          document.getElementById("file-size").textContent =
                            totalSize < 1024 * 1024
                              ? `${(totalSize / 1024).toFixed(1)} كيلوبايت`
                              : `${(totalSize / (1024 * 1024)).toFixed(
                                  1
                                )} ميجابايت`;

                          // تخزين URL الصورة للعرض
                          window.imagePreviewUrl = e.target.result;
                          
                          // إنشاء معرض مصغر للصور المختارة
                          updateThumbnailGallery(allSelectedImages);
                        }
                      };
                      reader.readAsDataURL(firstFile);
                    }
                  }}
                />
                <label
                  htmlFor="tape-image-upload"
                  id="image-preview"
                  className="w-full h-[100px] flex flex-col items-center justify-center border-2 border-dashed border-blue-400 rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100 transition-all duration-200 bg-center bg-no-repeat bg-cover relative overflow-hidden group"
                  onDragOver={(e) => {
                    e.preventDefault();
                    e.currentTarget.classList.add("border-blue-600", "bg-blue-50");
                  }}
                  onDragLeave={(e) => {
                    e.preventDefault();
                    e.currentTarget.classList.remove("border-blue-600", "bg-blue-50");
                  }}
                  onDrop={(e) => {
                    e.preventDefault();
                    e.currentTarget.classList.remove("border-blue-600", "bg-blue-50");
                    const files = e.dataTransfer.files;
                    if (files && files.length > 0) {
                      // التحقق من أن جميع الملفات هي صور
                      const allImages = Array.from(files).every(file => file.type.startsWith("image/"));
                      if (allImages) {
                        // إنشاء حدث مزيف لتمرير الملفات إلى onChangeTapeImage
                        const dataTransfer = new DataTransfer();
                        Array.from(files).forEach(file => {
                          dataTransfer.items.add(file);
                        });
                        const fileInputElement =
                          document.getElementById("tape-image-upload");
                        fileInputElement.files = dataTransfer.files;

                        // إطلاق حدث تغيير لتحديث الحالة
                        const changeEvent = new Event("change", {
                          bubbles: true,
                        });
                        fileInputElement.dispatchEvent(changeEvent);
                      }
                    }
                  }}
                >
                  <span
                    id="upload-text"
                    className="text-sm text-gray-600 flex flex-col items-center justify-center h-full"
                  >
                    <ImagePlus size={32} className="mb-2 text-blue-600" />
                    <span className="font-medium text-blue-600">اسحب الصور أو انقر للاختيار</span>
                    <span className="text-xs text-gray-500 mt-1">يمكنك اختيار صور متعددة</span>
                  </span>
                  <span
                    id="change-text"
                    className="text-sm text-white hidden absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center transition-opacity duration-200 opacity-0 group-hover:opacity-100"
                  >
                    <span className="flex items-center">
                      <RefreshCw size={16} className="ml-2" />
                      تغيير الصور
                    </span>
                  </span>
                </label>
                <button
                  type="button"
                  className="absolute left-2 top-2 text-gray-500 hover:text-red-500 transition-colors z-10 bg-white rounded-full p-1.5 shadow-md"
                  onClick={(e) => {
                    e.preventDefault();
                    // إعادة تعيين حقل الإدخال
                    const fileInput =
                      document.getElementById("tape-image-upload");
                    fileInput.value = "";

                    // إعادة تعيين المعاينة
                    const previewElement =
                      document.getElementById("image-preview");
                    previewElement.style.backgroundImage = "";
                    previewElement.classList.remove("has-image");
                    document.getElementById("upload-text").style.display =
                      "block";
                    document.getElementById("change-text").style.display =
                      "none";

                    // إخفاء المعاينة الكبيرة مع تأثير انتقالي
                    const largePreviewElement = document.getElementById(
                      "large-image-preview"
                    );
                    if (largePreviewElement) {
                      largePreviewElement.classList.remove("opacity-100");
                      // انتظار انتهاء التأثير الانتقالي قبل إخفاء العنصر
                      setTimeout(() => {
                        largePreviewElement.classList.add("hidden");
                      }, 300);
                    }

                    // مسح معرض الصور المصغرة
                    const galleryElement = document.getElementById("thumbnails-gallery");
                    if (galleryElement) {
                      galleryElement.innerHTML = "";
                    }

                    // استدعاء onChangeTapeImage مع حدث فارغ
                    const emptyEvent = { target: { value: null, files: [] } };
                    onChangeTapeImage(emptyEvent);
                  }}
                >
                  <Trash2 size={16} />
                </button>

                {/* معاينة كبيرة للصورة */}
                <div
                  id="large-image-preview"
                  className="hidden mt-3 rounded-lg overflow-hidden border border-gray-200 shadow-md cursor-pointer transition-all duration-300 ease-in-out bg-white"
                  onClick={(e) => {
                    // منع انتشار الحدث للأزرار داخل المعاينة
                    if (
                      e.target === e.currentTarget ||
                      e.target.classList.contains("image-preview-container")
                    ) {
                      // فتح الصورة في نافذة جديدة
                      if (window.imagePreviewUrl) {
                        const newWindow = window.open();
                        newWindow.document.write(`
                        <html>
                          <head>
                            <title>معاينة الصورة</title>
                            <style>
                              body {
                                margin: 0;
                                padding: 0;
                                display: flex;
                                justify-content: center;
                                align-items: center;
                                min-height: 100vh;
                                background-color: #1a1a1a;
                              }
                              img {
                                max-width: 100%;
                                max-height: 100vh;
                                object-fit: contain;
                                box-shadow: 0 0 20px rgba(0,0,0,0.3);
                              }
                              .controls {
                                position: fixed;
                                bottom: 20px;
                                left: 50%;
                                transform: translateX(-50%);
                                background-color: rgba(0,0,0,0.7);
                                padding: 10px 20px;
                                border-radius: 30px;
                                display: flex;
                                gap: 15px;
                              }
                              .controls button {
                                background: none;
                                border: none;
                                color: white;
                                cursor: pointer;
                                font-size: 14px;
                                display: flex;
                                align-items: center;
                                gap: 5px;
                              }
                              .controls button:hover {
                                color: #93c5fd;
                              }
                            </style>
                          </head>
                          <body>
                            <img src="${window.imagePreviewUrl}" id="preview-image" />
                            <div class="controls">
                              <button onclick="document.getElementById('preview-image').style.objectFit='contain'">
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect><circle cx="8.5" cy="8.5" r="1.5"></circle><polyline points="21 15 16 10 5 21"></polyline></svg>
                                عرض كامل
                              </button>
                              <button onclick="document.getElementById('preview-image').style.objectFit='cover'">
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line><line x1="11" y1="8" x2="11" y2="14"></line><line x1="8" y1="11" x2="14" y2="11"></line></svg>
                                تكبير
                              </button>
                            </div>
                          </body>
                        </html>
                      `);
                      }
                    }
                  }}
                >
                  <div className="relative">
                    <div className="image-preview-container h-40 bg-center bg-no-repeat bg-cover w-full bg-contain overflow-hidden"></div>
                    <div className="absolute top-0 right-0 bg-black bg-opacity-60 text-white p-1.5 text-xs rounded-bl-lg">
                      <span className="flex items-center"><Maximize2 size={12} className="ml-1" />انقر للعرض بالحجم الكامل</span>
                    </div>
                    {/* معرض الصور المصغرة - تصميم محسن */}
                    <div className="border-t border-gray-200 bg-gray-50">
                      <div className="flex justify-between items-center px-3 py-2 border-b border-gray-200">
                        <span className="text-xs text-gray-500">الصور المختارة</span>
                        <span className="text-xs font-medium text-blue-600">{tape_image?.length || 0} صورة</span>
                      </div>
                      <div id="thumbnails-gallery" className="flex flex-wrap gap-2 p-3 bg-white max-h-32 overflow-y-auto scrollbar-thumb-rounded scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100"></div>
                    </div>
                    <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-60 text-white p-2 text-xs flex justify-between items-center">
                      <div className="flex items-center space-x-2">
                        <button
                          type="button"
                          className="text-white hover:text-red-300 transition-colors p-1.5 rounded-full bg-black bg-opacity-40 hover:bg-opacity-70"
                          onClick={(e) => {
                            e.preventDefault();
                            // إعادة تعيين حقل الإدخال
                            const fileInput =
                              document.getElementById("tape-image-upload");
                            fileInput.value = "";

                            // إعادة تعيين المعاينة
                            const previewElement =
                              document.getElementById("image-preview");
                            previewElement.style.backgroundImage = "";
                            previewElement.classList.remove("has-image");
                            document.getElementById(
                              "upload-text"
                            ).style.display = "block";
                            document.getElementById(
                              "change-text"
                            ).style.display = "none";

                            // إخفاء المعاينة الكبيرة مع تأثير انتقالي
                            const largePreviewElement = document.getElementById(
                              "large-image-preview"
                            );
                            if (largePreviewElement) {
                              largePreviewElement.classList.remove(
                                "opacity-100"
                              );
                              // انتظار انتهاء التأثير الانتقالي قبل إخفاء العنصر
                              setTimeout(() => {
                                largePreviewElement.classList.add("hidden");
                              }, 300);
                            }

                            // استدعاء onChangeTapeImage مع حدث فارغ
                            const emptyEvent = {
                              target: { value: null, files: [] },
                            };
                            onChangeTapeImage(emptyEvent);
                          }}
                        >
                          <Trash2 size={14} />
                        </button>
                        <button
                          type="button"
                          className="text-white hover:text-blue-300 transition-colors p-1.5 rounded-full bg-black bg-opacity-40 hover:bg-opacity-70"
                          onClick={(e) => {
                            e.preventDefault();
                            // فتح الصورة في نافذة جديدة
                            if (window.imagePreviewUrl) {
                              const newWindow = window.open();
                              newWindow.document.write(`
                                <html>
                                  <head>
                                    <title>معاينة الصورة</title>
                                    <style>
                                      body {
                                        margin: 0;
                                        padding: 0;
                                        display: flex;
                                        justify-content: center;
                                        align-items: center;
                                        min-height: 100vh;
                                        background-color: #0f172a;
                                        font-family: Arial, sans-serif;
                                      }
                                      .image-container {
                                        position: relative;
                                        max-width: 95vw;
                                        max-height: 90vh;
                                        box-shadow: 0 0 30px rgba(0,0,0,0.5);
                                        border-radius: 8px;
                                        overflow: hidden;
                                      }
                                      img {
                                        max-width: 100%;
                                        max-height: 90vh;
                                        object-fit: contain;
                                        display: block;
                                        transition: transform 0.3s ease;
                                      }
                                      .controls {
                                        position: fixed;
                                        bottom: 30px;
                                        left: 50%;
                                        transform: translateX(-50%);
                                        background-color: rgba(15,23,42,0.85);
                                        padding: 12px 25px;
                                        border-radius: 50px;
                                        display: flex;
                                        gap: 20px;
                                        box-shadow: 0 5px 15px rgba(0,0,0,0.3);
                                        backdrop-filter: blur(10px);
                                        border: 1px solid rgba(255,255,255,0.1);
                                      }
                                      .controls button {
                                        background: none;
                                        border: none;
                                        color: white;
                                        cursor: pointer;
                                        font-size: 14px;
                                        display: flex;
                                        align-items: center;
                                        gap: 8px;
                                        padding: 5px 10px;
                                        border-radius: 5px;
                                        transition: all 0.2s ease;
                                      }
                                      .controls button:hover {
                                        color: #93c5fd;
                                        background-color: rgba(255,255,255,0.1);
                                      }
                                      .image-info {
                                        position: absolute;
                                        top: 15px;
                                        right: 15px;
                                        background-color: rgba(15,23,42,0.75);
                                        color: white;
                                        padding: 8px 15px;
                                        border-radius: 20px;
                                        font-size: 12px;
                                        backdrop-filter: blur(5px);
                                        border: 1px solid rgba(255,255,255,0.1);
                                        opacity: 0.8;
                                        transition: opacity 0.2s ease;
                                      }
                                      .image-info:hover {
                                        opacity: 1;
                                      }
                                    </style>
                                  </head>
                                  <body>
                                    <div class="image-container">
                                      <img src="${window.imagePreviewUrl}" id="preview-image" />
                                      <div class="image-info">
                                        معاينة الصورة
                                      </div>
                                    </div>
                                    <div class="controls">
                                      <button onclick="document.getElementById('preview-image').style.objectFit='contain'">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect><circle cx="8.5" cy="8.5" r="1.5"></circle><polyline points="21 15 16 10 5 21"></polyline></svg>
                                        عرض كامل
                                      </button>
                                      <button onclick="document.getElementById('preview-image').style.objectFit='cover'">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line><line x1="11" y1="8" x2="11" y2="14"></line><line x1="8" y1="11" x2="14" y2="11"></line></svg>
                                        تكبير
                                      </button>
                                      <button onclick="window.close()">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
                                        إغلاق
                                      </button>
                                    </div>
                                  </body>
                                </html>
                              `);
                            }
                          }}
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="14"
                            height="14"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          >
                            <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
                            <polyline points="15 3 21 3 21 9"></polyline>
                            <line x1="10" y1="14" x2="21" y2="3"></line>
                          </svg>
                        </button>
                      </div>
                      <div className="flex flex-col items-end">
                        <span
                          id="file-name"
                          className="truncate max-w-[180px] text-right font-medium"
                        ></span>
                        <span
                          id="file-size"
                          className="text-blue-200 text-xs flex items-center mt-0.5"
                        >
                          <FileText size={10} className="ml-1" />
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="col-span-2">
            <label className="block text-gray-700 font-medium mb-1 text-right text-sm">
              الملاحظات
            </label>
            <div className="relative">
              <textarea
                className="w-full pr-10 py-1.5 border rounded-lg focus:ring-1 focus:ring-blue-400 text-right text-sm"
                value={notes}
                onChange={onChangeNotes}
                rows={3}
                placeholder="أدخل الملاحظات هنا"
                dir="rtl"
              />
              <FileText
                className="absolute left-4 top-4 transform text-blue-600"
                size={16}
              />
            </div>
          </div>

          <div className="col-span-2">
            <label className="block text-gray-700 font-medium mb-1 text-right text-sm">
              الحالة
            </label>
            <div className="relative">
              <Select
                options={statusOptions}
                value={statusOptions.find((option) => option.value === status)}
                onChange={handleStatusChange}
                placeholder="اختر الحالة"
                isSearchable={false}
                className="text-right"
                styles={{
                  ...selectStyles,
                  option: (base, state) => ({
                    ...base,
                    fontSize: "0.875rem",
                    textAlign: "right",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "flex-end",
                    backgroundColor: state.isSelected
                      ? "#dbeafe"
                      : state.isFocused
                      ? "#f0f7ff"
                      : "white",
                    color: state.isSelected ? "#1e40af" : "#374151",
                    fontWeight: state.isSelected ? 500 : 400,
                    padding: "8px 12px",
                    "&:hover": {
                      backgroundColor: "#f0f7ff",
                    },
                  }),
                  singleValue: (base) => ({
                    ...base,
                    fontSize: "0.875rem",
                    textAlign: "right",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "flex-end",
                  }),
                }}
                formatOptionLabel={(option) => (
                  <div className="flex items-center justify-end w-full">
                    <span>{option.label}</span>
                    <span className="ml-2">{option.icon}</span>
                  </div>
                )}
                components={{
                  IndicatorSeparator: () => null,
                  DropdownIndicator: () => (
                    <div className="px-2">
                      <Layers size={16} className="text-blue-600" />
                    </div>
                  ),
                }}
              />
            </div>
          </div>
        </div>

        <div className="flex gap-3 w-full mt-4">
          <button
            onClick={onClose}
            className="w-1/3 bg-gray-100 hover:bg-gray-200 text-gray-700 py-1.5 px-3 rounded-lg font-medium text-sm transition-colors duration-200"
          >
            إلغاء
          </button>
          <button
            onClick={onSubmit}
            className="w-2/3 bg-blue-600 hover:bg-blue-700 text-white py-1.5 px-3 rounded-lg font-medium text-sm transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={loading}
          >
            {loading ? (
              <>
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin ml-2 inline-block"></div>
                جاري الإضافة...
              </>
            ) : (
              <>
                إضافة شريط انتخابي
                <LogIn size={16} className="mr-1 inline" />
              </>
            )}
          </button>
        </div>
      </div>
      <Toaster />
    </div>
  );
};

export default AddElectoralStripsModal;