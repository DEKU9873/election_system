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
  TextDirection,
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
                rightToLeft: true, // تمكين الاتجاه من اليمين إلى اليسار للنص
                font: {
                  name: "Arial", // خط يدعم العربية
                  hint: "eastAsia", // إعداد للغات الشرقية
                },
              }),
            ],
            alignment: AlignmentType.RIGHT,
            rightToLeft: true, // تمكين الاتجاه من اليمين إلى اليسار للفقرة
            textDirection: TextDirection.RIGHT_TO_LEFT, // اتجاه النص من اليمين إلى اليسار
          }),
        ],
        verticalAlign: VerticalAlign.CENTER,
        shading:
          hasHeader && rowIndex === 0 ? { fill: "#EEEEEE" } : undefined,
        borders: {
          top: { style: BorderStyle.SINGLE, size: 1, color: "#CCCCCC" },
          bottom: { style: BorderStyle.SINGLE, size: 1, color: "#CCCCCC" },
          left: { style: BorderStyle.SINGLE, size: 1, color: "#CCCCCC" },
          right: { style: BorderStyle.SINGLE, size: 1, color: "#CCCCCC" },
        },
        textDirection: TextDirection.RIGHT_TO_LEFT, // اتجاه النص في الخلية
      });
    });

    return new TableRow({
      children: cells,
      tableHeader: hasHeader && rowIndex === 0,
    });
  });

  return new Table({
    rows,
    alignment: AlignmentType.CENTER,
    width: {
      size: 100,
      type: WidthType.PERCENTAGE,
    },
    layout: TableLayoutType.FIXED,
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
    // إضافة إعدادات الاتجاه للجدول
    tableProperties: {
      rightToLeft: true, // الجدول من اليمين إلى اليسار
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

  let docInstance;

  try {
    // إنشاء مستند Word جديد
    docInstance = new Document({
      styles: {
        paragraphStyles: [
          {
            id: "Normal",
            run: {
              rightToLeft: true,
              font: {
                name: "Arial",
                hint: "eastAsia",
              },
            },
            paragraph: {
              rightToLeft: true,
              alignment: AlignmentType.RIGHT,
              textDirection: TextDirection.RIGHT_TO_LEFT,
            },
          },
          {
            id: "Heading1",
            run: {
              rightToLeft: true,
              font: {
                name: "Arial",
                hint: "eastAsia",
              },
            },
            paragraph: {
              rightToLeft: true,
              alignment: AlignmentType.CENTER,
              textDirection: TextDirection.RIGHT_TO_LEFT,
            },
          },
          {
            id: "Heading2",
            run: {
              rightToLeft: true,
              font: {
                name: "Arial",
                hint: "eastAsia",
              },
            },
            paragraph: {
              rightToLeft: true,
              alignment: AlignmentType.RIGHT,
              textDirection: TextDirection.RIGHT_TO_LEFT,
            },
          },
        ],
      },
      sections: [
        {
          properties: {
            page: {
              margin: {
                top: 1000,
                right: 1000,
                bottom: 1000,
                left: 1000,
              },
            },
            rightToLeft: true, // القسم من اليمين إلى اليسار
            textDirection: TextDirection.RIGHT_TO_LEFT, // اتجاه النص في القسم
          },
          children: [
            new Paragraph({
              children: [
                new TextRun({
                  text: "الإحصائيات المالية",
                  bold: true,
                  size: 32,
                  rightToLeft: true,
                  font: {
                    name: "Arial",
                    hint: "eastAsia",
                  },
                }),
              ],
              heading: HeadingLevel.HEADING_1,
              alignment: AlignmentType.CENTER,
              rightToLeft: true,
              textDirection: TextDirection.RIGHT_TO_LEFT,
              spacing: {
                after: 400,
              },
            }),
            new Paragraph({
              children: [
                new TextRun({
                  text: `تاريخ التقرير: ${new Date().toLocaleDateString("ar-SA")}`,
                  rightToLeft: true,
                  bold: true,
                  font: {
                    name: "Arial",
                    hint: "eastAsia",
                  },
                }),
              ],
              alignment: AlignmentType.RIGHT,
              rightToLeft: true,
              textDirection: TextDirection.RIGHT_TO_LEFT,
              spacing: {
                after: 200,
              },
            }),
            new Paragraph({
              children: [
                new TextRun({
                  text: "نظرة عامة",
                  bold: true,
                  size: 24,
                  rightToLeft: true,
                  font: {
                    name: "Arial",
                    hint: "eastAsia",
                  },
                }),
              ],
              heading: HeadingLevel.HEADING_2,
              alignment: AlignmentType.RIGHT,
              rightToLeft: true,
              textDirection: TextDirection.RIGHT_TO_LEFT,
              spacing: {
                before: 200,
                after: 200,
              },
            }),
            createTable([
              ["الميزانية الإجمالية", `${financialData.totalBudget}`],
              ["إجمالي المصروفات", `${financialData.totalExpenses}`],
              ["الميزانية المتبقية", `${financialData.remainingBudget}`],
              ["نسبة الإنفاق", `${financialData.percentSpent}%`],
              ["إجمالي الإيرادات", `${financialData.totalRevenue}`],
            ]),
            new Paragraph({
              children: [
                new TextRun({
                  text: "المصروفات حسب الفئة",
                  bold: true,
                  size: 24,
                  rightToLeft: true,
                  font: {
                    name: "Arial",
                    hint: "eastAsia",
                  },
                }),
              ],
              heading: HeadingLevel.HEADING_2,
              alignment: AlignmentType.RIGHT,
              rightToLeft: true,
              textDirection: TextDirection.RIGHT_TO_LEFT,
              spacing: {
                before: 200,
                after: 200,
              },
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
              children: [
                new TextRun({
                  text: "الإيرادات حسب المصدر",
                  bold: true,
                  size: 24,
                  rightToLeft: true,
                  font: {
                    name: "Arial",
                    hint: "eastAsia",
                  },
                }),
              ],
              heading: HeadingLevel.HEADING_2,
              alignment: AlignmentType.RIGHT,
              rightToLeft: true,
              textDirection: TextDirection.RIGHT_TO_LEFT,
              spacing: {
                before: 200,
                after: 200,
              },
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
              children: [
                new TextRun({
                  text: "المصروفات الشهرية",
                  bold: true,
                  size: 24,
                  rightToLeft: true,
                  font: {
                    name: "Arial",
                    hint: "eastAsia",
                  },
                }),
              ],
              heading: HeadingLevel.HEADING_2,
              alignment: AlignmentType.RIGHT,
              rightToLeft: true,
              textDirection: TextDirection.RIGHT_TO_LEFT,
              spacing: {
                before: 200,
                after: 200,
              },
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
    try {
      if (!docInstance) throw new Error("فشل في إنشاء المستند");
      
      const blob = await Packer.toBlob(docInstance);
      saveAs(
        blob,
        `الإحصائيات_المالية_${new Date().toLocaleDateString("ar-SA")}.docx`
      );
      setExportSuccess(true);

      setTimeout(() => {
        setExportSuccess(false);
      }, 3000);
    } catch (blobError) {
      console.warn(
        "فشل استخدام Packer.toBlob، محاولة استخدام طريقة بديلة:",
        blobError
      );

      try {
        if (!docInstance || !docInstance.document) {
          throw new Error("المستند غير متاح للتصدير");
        }

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

        setTimeout(() => {
          setExportSuccess(false);
        }, 3000);
      } catch (base64Error) {
        console.warn(
          "فشل استخدام Packer.toBase64String، محاولة استخدام طريقة أخرى:",
          base64Error
        );

        if (!docInstance || !docInstance.document || !docInstance.document.sections || !docInstance.document.sections[0] || !docInstance.document.sections[0].children) {
          throw new Error("المستند غير متاح للتصدير");
        }

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

            setTimeout(() => {
              setExportSuccess(false);
            }, 3000);
          })
          .catch((saveError) => {
            throw saveError;
          });
      }
    }
  } catch (error) {
    console.error("خطأ في تصدير ملف Word:", error);
    setExportError(true);
    setTimeout(() => {
      setExportError(false);
    }, 3000);
  } finally {
    setIsExporting(false);
  }
};

export default exportToWord;