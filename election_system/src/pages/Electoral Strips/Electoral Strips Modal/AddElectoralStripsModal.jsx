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
} from "lucide-react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "./datepicker-custom.css";
import "./image-upload.css";
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
  ] = AddTapesHook();

  const [centers] = GetAllCenter();
  const [stations] = GetAllStation();

  const centerOptions = centers?.map((center) => ({
    value: center.id,
    label: center.name,
  }));

  const stationOptions = stations?.map((station) => ({
    value: station.id,
    label: station.name,
  }));

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
    { value: "مقبول", label: "مقبول", icon: <Check size={14} className="text-green-500" /> },
    { value: "مرفوض", label: "مرفوض", icon: <AlertCircle size={14} className="text-red-500" /> },
    { value: "قيد المراجعة", label: "قيد المراجعة", icon: <Clock size={14} className="text-yellow-500" /> },
  ];
  
  // معالج تغيير التاريخ مع تأثير بصري
  const handleDateChange = (date) => {
    // إضافة تأثير بصري عند اختيار التاريخ
    const datePickerInput = document.querySelector('.react-datepicker__input-container input');
    if (datePickerInput) {
      datePickerInput.classList.add('date-selected-effect');
      setTimeout(() => {
        datePickerInput.classList.remove('date-selected-effect');
      }, 500);
    }
    
    // استدعاء معالج التغيير الأصلي
    onChangeDate({ target: { value: date ? date.toISOString().split('T')[0] : '' } });
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
    <div className="fixed inset-0 bg-black/30 backdrop-blur-sm z-50 min-h-screen flex items-center justify-center p-4" onClick={onClose}>
      <div className="absolute inset-0" />
      <div className="bg-white backdrop-blur-sm p-6 rounded-2xl shadow-2xl w-full max-w-3xl flex flex-col items-center relative" onClick={(e) => e.stopPropagation()}>
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
                placeholder="اختر المحطة"
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
                    nextMonthButtonDisabled 
                  }) => (
                    <div className="custom-datepicker-header flex justify-between items-center px-2 py-2 bg-blue-50 rounded-t-lg">
                      <div className="flex">
                        <button
                          type="button"
                          onClick={decreaseMonth}
                          disabled={prevMonthButtonDisabled}
                          className="prev-month-btn p-1 rounded-full hover:bg-blue-100 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <polyline points="15 18 9 12 15 6"></polyline>
                          </svg>
                        </button>
                        <button
                          type="button"
                          onClick={increaseMonth}
                          disabled={nextMonthButtonDisabled}
                          className="next-month-btn p-1 rounded-full hover:bg-blue-100 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <polyline points="9 18 15 12 9 6"></polyline>
                          </svg>
                        </button>
                      </div>
                      <div className="flex space-x-2 rtl:space-x-reverse">
                        <select
                          value={date.getFullYear()}
                          onChange={({ target: { value } }) => changeYear(value)}
                          className="year-select text-sm bg-white border border-gray-200 rounded px-2 py-1 focus:outline-none focus:ring-1 focus:ring-blue-400"
                        >
                          {Array.from({ length: 20 }, (_, i) => date.getFullYear() - 10 + i).map(year => (
                            <option key={year} value={year}>{year}</option>
                          ))}
                        </select>
                        <select
                          value={date.getMonth()}
                          onChange={({ target: { value } }) => changeMonth(value)}
                          className="month-select text-sm bg-white border border-gray-200 rounded px-2 py-1 focus:outline-none focus:ring-1 focus:ring-blue-400"
                        >
                          {[
                            "يناير", "فبراير", "مارس", "أبريل", "مايو", "يونيو",
                            "يوليو", "أغسطس", "سبتمبر", "أكتوبر", "نوفمبر", "ديسمبر"
                          ].map((month, i) => (
                            <option key={month} value={i}>{month}</option>
                          ))}
                        </select>
                      </div>
                    </div>
                  )}
                  dayClassName={date => {
                     const today = new Date();
                     const isToday = date.getDate() === today.getDate() && 
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
              صورة الشريط
            </label>
            <div className="relative">
              <div className="image-upload-container relative group">
                <input
                  type="file"
                  accept="image/*"
                  id="tape-image-upload"
                  className="hidden"
                  onChange={(e) => {
                    onChangeTapeImage(e);
                    // عرض معاينة الصورة
                    const file = e.target.files[0];
                    if (file) {
                      // إظهار مؤشر التحميل
                      const previewElement = document.getElementById('image-preview');
                      if (previewElement) {
                        previewElement.classList.add('upload-pulse');
                        document.getElementById('upload-text').innerHTML = '<div class="flex items-center"><div class="w-3 h-3 border-2 border-blue-600 border-t-transparent rounded-full animate-spin ml-2"></div>جاري التحميل...</div>';
                      }
                      
                      // إظهار المعاينة الكبيرة مع تأثير التحميل
                      const largePreviewElement = document.getElementById('large-image-preview');
                      if (largePreviewElement) {
                        largePreviewElement.classList.remove('hidden');
                        const imageContainer = largePreviewElement.querySelector('.h-24');
                        if (imageContainer) {
                          imageContainer.classList.add('image-loading');
                        }
                      }
                      
                      const reader = new FileReader();
                      reader.onload = (e) => {
                        const previewElement = document.getElementById('image-preview');
                        const largePreviewElement = document.getElementById('large-image-preview');
                        if (previewElement) {
                          // إزالة مؤشر التحميل
                          previewElement.classList.remove('upload-pulse');
                          
                          // تعيين الصورة كخلفية
                          previewElement.style.backgroundImage = `url(${e.target.result})`;
                          previewElement.classList.add('has-image');
                          document.getElementById('upload-text').style.display = 'none';
                          document.getElementById('change-text').style.display = 'block';
                        }
                        if (largePreviewElement) {
                          // إزالة تأثير التحميل
                          const imageContainer = largePreviewElement.querySelector('.h-24');
                          if (imageContainer) {
                            imageContainer.classList.remove('image-loading');
                            imageContainer.style.backgroundImage = `url(${e.target.result})`;
                          }
                          
                          // إضافة اسم الملف
                          document.getElementById('file-name').textContent = file.name;
                          document.getElementById('file-size').textContent = 
                            (file.size < 1024 * 1024) 
                              ? `${(file.size / 1024).toFixed(1)} كيلوبايت` 
                              : `${(file.size / (1024 * 1024)).toFixed(1)} ميجابايت`;
                          
                          // تخزين URL الصورة للعرض
                          window.imagePreviewUrl = e.target.result;
                        }
                      };
                      reader.readAsDataURL(file);
                    }
                  }}
                />
                <label 
                  htmlFor="tape-image-upload" 
                  id="image-preview"
                  className="w-full h-[34px] flex items-center justify-center border border-dashed border-blue-400 rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100 transition-all duration-200 bg-center bg-no-repeat bg-cover"
                  onDragOver={(e) => {
                    e.preventDefault();
                    e.currentTarget.classList.add('border-blue-600');
                  }}
                  onDragLeave={(e) => {
                    e.preventDefault();
                    e.currentTarget.classList.remove('border-blue-600');
                  }}
                  onDrop={(e) => {
                    e.preventDefault();
                    e.currentTarget.classList.remove('border-blue-600');
                    const file = e.dataTransfer.files[0];
                    if (file && file.type.startsWith('image/')) {
                      // إنشاء حدث مزيف لتمرير الملف إلى onChangeTapeImage
                      const dataTransfer = new DataTransfer();
                      dataTransfer.items.add(file);
                      const fileInputElement = document.getElementById('tape-image-upload');
                      fileInputElement.files = dataTransfer.files;
                      
                      // إطلاق حدث تغيير لتحديث الحالة
                      const changeEvent = new Event('change', { bubbles: true });
                      fileInputElement.dispatchEvent(changeEvent);
                    }
                  }}
                >
                  <span id="upload-text" className="text-sm text-gray-600 flex items-center">
                    <ImagePlus size={16} className="ml-2 text-blue-600" />
                    اسحب الصورة أو انقر للاختيار
                  </span>
                  <span id="change-text" className="text-sm text-gray-600 hidden">
                    تغيير الصورة
                  </span>
                </label>
                <button 
                  type="button" 
                  className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-red-500 transition-colors z-10 bg-white rounded-full p-1"
                  onClick={(e) => {
                    e.preventDefault();
                    // إعادة تعيين حقل الإدخال
                    const fileInput = document.getElementById('tape-image-upload');
                    fileInput.value = '';
                    
                    // إعادة تعيين المعاينة
                    const previewElement = document.getElementById('image-preview');
                    previewElement.style.backgroundImage = '';
                    previewElement.classList.remove('has-image');
                    document.getElementById('upload-text').style.display = 'block';
                    document.getElementById('change-text').style.display = 'none';
                    
                    // إخفاء المعاينة الكبيرة
                    const largePreviewElement = document.getElementById('large-image-preview');
                    if (largePreviewElement) {
                      largePreviewElement.classList.add('hidden');
                    }
                    
                    // استدعاء onChangeTapeImage مع حدث فارغ
                    const emptyEvent = { target: { value: null, files: [] } };
                    onChangeTapeImage(emptyEvent);
                  }}
                >
                  <X size={14} />
                </button>
                
                {/* معاينة كبيرة للصورة */}
                <div id="large-image-preview" className="hidden mt-2 rounded-lg overflow-hidden border border-gray-200 shadow-sm cursor-pointer" onClick={(e) => {
                  // منع انتشار الحدث للأزرار داخل المعاينة
                  if (e.target === e.currentTarget || e.target.classList.contains('h-24')) {
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
                }}>
                  <div className="relative">
                    <div className="h-24 bg-center bg-no-repeat bg-cover w-full bg-contain"></div>
                    <div className="absolute top-0 right-0 bg-black bg-opacity-50 text-white p-1 text-xs rounded-bl-lg">
                      <span>انقر للعرض بالحجم الكامل</span>
                    </div>
                    <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 text-white p-1 text-xs flex justify-between items-center">
                      <div className="flex items-center space-x-1">
                        <button 
                          type="button"
                          className="text-white hover:text-red-300 transition-colors p-1 rounded-full"
                          onClick={(e) => {
                            e.preventDefault();
                            // إعادة تعيين حقل الإدخال
                            const fileInput = document.getElementById('tape-image-upload');
                            fileInput.value = '';
                            
                            // إعادة تعيين المعاينة
                            const previewElement = document.getElementById('image-preview');
                            previewElement.style.backgroundImage = '';
                            previewElement.classList.remove('has-image');
                            document.getElementById('upload-text').style.display = 'block';
                            document.getElementById('change-text').style.display = 'none';
                            
                            // إخفاء المعاينة الكبيرة
                            const largePreviewElement = document.getElementById('large-image-preview');
                            if (largePreviewElement) {
                              largePreviewElement.classList.add('hidden');
                            }
                            
                            // استدعاء onChangeTapeImage مع حدث فارغ
                            const emptyEvent = { target: { value: null, files: [] } };
                            onChangeTapeImage(emptyEvent);
                          }}
                        >
                          <X size={14} />
                        </button>
                        <button 
                          type="button"
                          className="text-white hover:text-blue-300 transition-colors p-1 rounded-full"
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
                          }}
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
                            <polyline points="15 3 21 3 21 9"></polyline>
                            <line x1="10" y1="14" x2="21" y2="3"></line>
                          </svg>
                        </button>
                      </div>
                      <div className="flex flex-col items-end">
                        <span id="file-name" className="truncate max-w-[150px] text-right"></span>
                        <span id="file-size" className="text-gray-300 text-xs"></span>
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
                value={statusOptions.find(option => option.value === status)}
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
                    backgroundColor: state.isSelected ? "#dbeafe" : state.isFocused ? "#f0f7ff" : "white",
                    color: state.isSelected ? "#1e40af" : "#374151",
                    fontWeight: state.isSelected ? 500 : 400,
                    padding: "8px 12px",
                    '&:hover': {
                      backgroundColor: "#f0f7ff",
                    }
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
