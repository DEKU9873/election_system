import { saveAs } from "file-saver";
import {
  Document,
  Packer,
  Paragraph,
  Table,
  TableCell,
  TableRow,
  HeadingLevel,
  AlignmentType,
  WidthType,
  TableLayoutType,
  VerticalAlign,
  BorderStyle,
  TextRun,
} from "docx";

// وظيفة مساعدة لتحويل البيانات من Base64 إلى Blob
const b64toBlob = (b64Data, contentType = "", sliceSize = 512) => {
  const byteCharacters = atob(b64Data);
  const byteArrays = [];

  for (let offset = 0; offset < byteCharacters.length; offset += sliceSize) {
    const slice = byteCharacters.slice(offset, offset + sliceSize);
    const byteNumbers = new Array(slice.length);

    for (let i = 0; i < slice.length; i++) {
      byteNumbers[i] = slice.charCodeAt(i);
    }

    const byteArray = new Uint8Array(byteNumbers);
    byteArrays.push(byteArray);
  }

  return new Blob(byteArrays, { type: contentType });
};

// وظيفة مساعدة لإنشاء جدول في مستند Word
function createTable(data, hasHeader = false) {
  const rows = data.map((rowData, rowIndex) => {
    const cells = rowData.map((cellText, cellIndex) => {
      return new TableCell({
        children: [
          new Paragraph({
            children: [
              new TextRun({
                text: cellText,
                bold: hasHeader && rowIndex === 0,
                bidirectional: true, // دعم الاتجاه من اليمين إلى اليسار
              }),
            ],
            alignment: AlignmentType.RIGHT,
            bidirectional: true, // دعم الاتجاه من اليمين إلى اليسار
          }),
        ],
        verticalAlign: VerticalAlign.CENTER, // محاذاة عمودية في المنتصف
        shading:
          hasHeader && rowIndex === 0 ? { fill: "#EEEEEE" } : undefined,
        borders: {
          top: { style: BorderStyle.SINGLE, size: 1, color: "#CCCCCC" },
          bottom: { style: BorderStyle.SINGLE, size: 1, color: "#CCCCCC" },
          left: { style: BorderStyle.SINGLE, size: 1, color: "#CCCCCC" },
          right: { style: BorderStyle.SINGLE, size: 1, color: "#CCCCCC" },
        },
      });
    });

    return new TableRow({
      children: cells,
      tableHeader: hasHeader && rowIndex === 0, // تعيين الصف الأول كرأس للجدول إذا كان هناك رأس
    });
  });

  return new Table({
    rows,
    alignment: AlignmentType.CENTER, // محاذاة الجدول في المنتصف
    width: {
      size: 100,
      type: WidthType.PERCENTAGE, // جعل الجدول يأخذ عرض الصفحة كاملة
    },
    bidirectional: true, // دعم الاتجاه من اليمين إلى اليسار
    layout: TableLayoutType.FIXED, // تخطيط ثابت للجدول
    borders: {
      insideHorizontal: {
        style: BorderStyle.SINGLE,
        size: 1,
        color: "#CCCCCC",
      },
      insideVertical: {
        style: BorderStyle.SINGLE,
        size: 1,
        color: "#CCCCCC",
      },
      top: { style: BorderStyle.SINGLE, size: 2, color: "#000000" },
      bottom: { style: BorderStyle.SINGLE, size: 2, color: "#000000" },
      left: { style: BorderStyle.SINGLE, size: 2, color: "#000000" },
      right: { style: BorderStyle.SINGLE, size: 2, color: "#000000" },
    },
  });
}

// وظيفة تصدير البيانات إلى ملف Word
const exportToWord = async (financialData, callbacks) => {
  const { setIsExporting, setExportType, setExportSuccess, setExportError } = callbacks;
  
  if (!financialData) return;
  
  setIsExporting(true);
  setExportType("Word");
  setExportSuccess(false);
  setExportError(false);

  // متغير لتخزين المستند خارج نطاق try
  let docInstance;

  try {
    // إنشاء مستند Word جديد
    docInstance = new Document({
      // إعدادات المستند
      styles: {
        paragraphStyles: [
          {
            id: "Normal",
            run: {
              bidirectional: true, // دعم الاتجاه من اليمين إلى اليسار للنص العادي
            },
            paragraph: {
              bidirectional: true, // دعم الاتجاه من اليمين إلى اليسار للفقرات
            },
          },
        ],
      },
      sections: [
        {
          properties: {
            page: {
              margin: {
                top: 1000, // هوامش أعلى
                right: 1000, // هوامش يمين
                bottom: 1000, // هوامش أسفل
                left: 1000, // هوامش يسار
              },
            },
            bidi: true, // تمكين الاتجاه من اليمين إلى اليسار للقسم بأكمله
          },
          children: [
            new Paragraph({
              text: "الإحصائيات المالية",
              heading: HeadingLevel.HEADING_1,
              alignment: AlignmentType.CENTER,
              bidirectional: true, // دعم الاتجاه من اليمين إلى اليسار
              spacing: {
                after: 400, // مسافة بعد العنوان
              },
            }),
            new Paragraph({
              children: [
                new TextRun({
                  text: `تاريخ التقرير: ${new Date().toLocaleDateString(
                    "ar-SA"
                  )}`,
                  bidirectional: true, // دعم الاتجاه من اليمين إلى اليسار
                  bold: true,
                }),
              ],
              alignment: AlignmentType.RIGHT,
              bidirectional: true, // دعم الاتجاه من اليمين إلى اليسار
              spacing: {
                after: 200, // مسافة بعد التاريخ
              },
            }),
            new Paragraph({
              text: "نظرة عامة",
              heading: HeadingLevel.HEADING_2,
              alignment: AlignmentType.RIGHT,
            }),
            createTable([
              ["الميزانية الإجمالية", `${financialData.totalBudget}`],
              ["إجمالي المصروفات", `${financialData.totalExpenses}`],
              ["الميزانية المتبقية", `${financialData.remainingBudget}`],
              ["نسبة الإنفاق", `${financialData.percentSpent}%`],
              ["إجمالي الإيرادات", `${financialData.totalRevenue}`],
            ]),
            new Paragraph({
              text: "المصروفات حسب الفئة",
              heading: HeadingLevel.HEADING_2,
              alignment: AlignmentType.RIGHT,
            }),
            createTable(
              [
                ["الفئة", "المبلغ", "النسبة المئوية"],
                ...financialData.expensesByCategory.map((item) => [
                  item.category,
                  `${item.amount}`,
                  `${item.percentage}%`,
                ]),
              ],
              true
            ),
            new Paragraph({
              text: "الإيرادات حسب المصدر",
              heading: HeadingLevel.HEADING_2,
              alignment: AlignmentType.RIGHT,
            }),
            createTable(
              [
                ["المصدر", "المبلغ", "النسبة المئوية"],
                ...financialData.revenueBySource.map((item) => [
                  item.source,
                  `${item.amount}`,
                  `${item.percentage}%`,
                ]),
              ],
              true
            ),
            new Paragraph({
              text: "المصروفات الشهرية",
              heading: HeadingLevel.HEADING_2,
              alignment: AlignmentType.RIGHT,
            }),
            createTable(
              [
                ["الشهر", "المبلغ"],
                ...financialData.monthlyExpenses.map((item) => [
                  item.month,
                  `${item.amount}`,
                ]),
              ],
              true
            ),
          ],
        },
      ],
    });

    // تحويل المستند إلى ملف Word وتنزيله
    // استخدام Packer.toBlob بدلاً من Packer.toBuffer لأنه أكثر توافقاً مع المتصفح
    try {
      if (!docInstance) throw new Error("فشل في إنشاء المستند");
      
      const blob = await Packer.toBlob(docInstance);
      saveAs(
        blob,
        `الإحصائيات_المالية_${new Date().toLocaleDateString("ar-SA")}.docx`
      );
      setExportSuccess(true);

      // إخفاء رسالة النجاح بعد 3 ثوان
      setTimeout(() => {
        setExportSuccess(false);
      }, 3000);
    } catch (blobError) {
      console.warn(
        "فشل استخدام Packer.toBlob، محاولة استخدام طريقة بديلة:",
        blobError
      );

      try {
        // التحقق من وجود المستند قبل محاولة تبسيطه
        if (!docInstance || !docInstance.document) {
          throw new Error("المستند غير متاح للتصدير");
        }

        // طريقة بديلة باستخدام Packer.toBase64String
        const base64 = await Packer.toBase64String(docInstance);
        const blob = b64toBlob(
          base64,
          "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
        );
        saveAs(
          blob,
          `الإحصائيات_المالية_${new Date().toLocaleDateString("ar-SA")}.docx`
        );
        setExportSuccess(true);

        // إخفاء رسالة النجاح بعد 3 ثوان
        setTimeout(() => {
          setExportSuccess(false);
        }, 3000);
      } catch (base64Error) {
        console.warn(
          "فشل استخدام Packer.toBase64String، محاولة استخدام طريقة أخرى:",
          base64Error
        );

        // التحقق من وجود المستند قبل محاولة تبسيطه
        if (!docInstance || !docInstance.document || !docInstance.document.sections || !docInstance.document.sections[0] || !docInstance.document.sections[0].children) {
          throw new Error("المستند غير متاح للتصدير");
        }

        // طريقة ثالثة باستخدام Packer.save
        Packer.save(docInstance)
          .then((buffer) => {
            const blob = new Blob([buffer], {
              type: "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
            });
            saveAs(
              blob,
              `الإحصائيات_المالية_${new Date().toLocaleDateString(
                "ar-SA"
              )}.docx`
            );
            setExportSuccess(true);

            // إخفاء رسالة النجاح بعد 3 ثوان
            setTimeout(() => {
              setExportSuccess(false);
            }, 3000);
          })
          .catch((saveError) => {
            throw saveError; // إعادة رمي الخطأ ليتم التقاطه في الـ catch الخارجي
          });
      }
    }
  } catch (error) {
    console.error("خطأ في تصدير ملف Word:", error);
    setExportError(true);
    // إخفاء رسالة الخطأ بعد 3 ثوان
    setTimeout(() => {
      setExportError(false);
    }, 3000);
  } finally {
    setIsExporting(false);
  }
};

export default exportToWord;