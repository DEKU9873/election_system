import baseURL from "../Api/baseURL";
import Cookies from "js-cookie";

const useGetData = async (url, parmas) => {
  const res = await baseURL.get(url, parmas);
  return res.data;
};

const useGetDataToken = async (url, params) => {
  const refreshTokenUrl = "/accont/token/refresh/";
  const config = {
    headers: { Authorization: `Bearer ${Cookies.get("access")}` },
  };

  try {
    // محاولة الحصول على البيانات باستخدام التوكن الحالي
    const res = await baseURL.get(url, config);
    return res.data;
  } catch (error) {
    // التحقق إذا كان الخطأ بسبب انتهاء صلاحية التوكن
    if (error.response && error.response.status === 401) {
      try {
        // محاولة تجديد التوكن
        const refreshToken = Cookies.get("refresh");
        const refreshResponse = await baseURL.post(refreshTokenUrl, {
          refresh: refreshToken,
        });

        // تحديث التوكن في الكوكيز
        Cookies.set("access", refreshResponse.data.access);

        // إعادة المحاولة باستخدام التوكن الجديد
        config.headers.Authorization = `Bearer ${Cookies.get("access")}`;
        const retryRes = await baseURL.get(url, config);
        return retryRes.data;
      } catch (refreshError) {
        // إذا فشل تجديد التوكن، يمكن إخراج المستخدم أو التعامل مع الخطأ
        console.error("Failed to refresh token:", refreshError);
        throw refreshError;
      }
    } else {
      // إذا كان الخطأ ليس بسبب التوكن
      throw error;
    }
  }
};



export { useGetData, useGetDataToken };

// const useGetDataToken = async (url, params) => {
//   const refreshTokenUrl = "/account/token/refresh/";
//   const config = {
//     headers: { Authorization: `Bearer ${localStorage.getItem("access")}` },
//   };

//   try {
//     // محاولة الحصول على البيانات باستخدام رمز الوصول الحالي
//     const res = await baseURL.get(url, config);
//     return res.data;
//   } catch (error) {
//     // التحقق مما إذا كان الخطأ بسبب انتهاء صلاحية الرمز
//     if (error.response && error.response.status === 401) {
//       try {
//         const refreshToken = localStorage.getItem("refresh");

//         // التحقق من وجود الرمز المميز للتحديث وصلاحيته
//         if (!refreshToken) {
//           // لا يوجد رمز مميز للتحديث - فرض تسجيل الخروج
//           return handleLogout();
//         }

//         // التحقق من صلاحية الرمز المميز للتحديث (ستحتاج إلى تنفيذ فك تشفير الرمز)
//         const isRefreshTokenExpired = isTokenExpired(refreshToken);
//         if (isRefreshTokenExpired) {
//           return handleLogout();
//         }

//         // محاولة تحديث الرمز
//         const refreshResponse = await baseURL.post(refreshTokenUrl, {
//           refresh: refreshToken,
//         });

//         // تحديث الرموز في localStorage
//         localStorage.setItem("access", refreshResponse.data.data.access_token);

//         // إعادة محاولة الطلب الأصلي باستخدام الرمز الجديد
//         config.headers.Authorization = `Bearer ${refreshResponse.data.data.access_token}`;
//         const retryRes = await baseURL.get(url, config);
//         return retryRes.data;
//       } catch (refreshError) {
//         // إذا فشل تحديث الرمز، تسجيل الخروج
//         console.error("فشل تحديث الرمز:", refreshError);
//         return handleLogout();
//       }
//     } else {
//       // إذا لم يكن الخطأ متعلقًا بالرمز المميز، إعادة طرح الخطأ الأصلي
//       throw error;
//     }
//   }
// };

// // دالة مساعدة للتحقق من انتهاء صلاحية الرمز
// const isTokenExpired = (token) => {
//   try {
//     // فك تشفير الرمز للتحقق من انتهاء صلاحيته
//     const decoded = jwtDecode(token);
//     const currentTime = Date.now() / 1000;
//     return decoded.exp < currentTime;
//   } catch (error) {
//     // إذا فشل فك التشفير، اعتبار الرمز غير صالح
//     console.error("خطأ في فك تشفير الرمز:", error);
//     return true;
//   }
// };

// // معالج لتسجيل الخروج
// const handleLogout = () => {
//   // مسح جميع البيانات المتعلقة بالمصادقة من localStorage
//   localStorage.removeItem("access");
//   localStorage.removeItem("refresh");
//   localStorage.removeItem("user");

//   // إعادة التوجيه إلى صفحة تسجيل الدخول أو تنفيذ إجراء تسجيل الخروج
//   // هذا يعتمد على إعدادات التوجيه الخاصة بك
//   window.location.href = "/login";

//   // إذا كنت تستخدم Redux أو أي إدارة حالة أخرى
//   // store.dispatch(logoutAction());

//   // منع التنفيذ بعد الآن
//   throw new Error("تم تسجيل الخروج");
// };

// const useGetDataToken = async (url, parmas) => {
//     const config = {
//         headers: { Authorization: `Bearer ${localStorage.getItem("access")}` }
//     }
//     const res = await baseURL.get(url, config);
//     return res.data;
// }

// const useGetDataToken = async (url, params) => {
//   const refreshTokenUrl = "/accont/token/refresh/";
//   const config = {
//     headers: { Authorization: `Bearer ${localStorage.getItem("access")}` },
//   };

//   try {
//     // محاولة الحصول على البيانات باستخدام التوكن الحالي
//     const res = await baseURL.get(url, config);
//     return res.data;
//   } catch (error) {
//     // التحقق إذا كان الخطأ بسبب انتهاء صلاحية التوكن
//     if (error.response && error.response.status === 401) {
//       try {

//         // محاولة تجديد التوكن
//         const refreshToken = localStorage.getItem("refresh");
//         const refreshResponse = await baseURL.post(refreshTokenUrl, {
//           refresh: refreshToken,
//         });

//         // تحديث التوكن في localStorage
//         localStorage.setItem("access", refreshResponse.data.access);

//         // إعادة المحاولة باستخدام التوكن الجديد
//         config.headers.Authorization = `Bearer ${refreshResponse.data.data.access_token}`;
//         const retryRes = await baseURL.get(url, config);
//         return retryRes.data;
//       } catch (refreshError) {
//         // إذا فشل تجديد التوكن، يمكن إخراج المستخدم أو التعامل مع الخطأ
//         console.error("Failed to refresh token:", refreshError);
//         throw refreshError;
//       }
//     } else {
//       // إذا كان الخطأ ليس بسبب التوكن
//       throw error;
//     }
//   }
// };
