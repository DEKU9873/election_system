import baseUrl from "../Api/baseURL";
import Cookies from "js-cookie";

const useInsertDataWithImage = async (url, formData) => {
  
    const token = Cookies.get("token"); // جلب التوكن من الكوكيز

    const config = {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: token ? `Bearer ${token}` : undefined,
      },
    };
    const res = await baseUrl.post(url, formData, config);
    return res.data;
};

const useInsertData = async (url, parmas) => {
  const res = await baseUrl.post(url, parmas);
  return res;
};

const useInsertDataWithToken = async (url, parmas) => {
  const token = Cookies.get("token");

  const config = {
    headers: { Authorization: token ? `Bearer ${token}` : undefined },
  };
  const res = await baseUrl.post(url, parmas, config);

  return res;
};

export { useInsertData, useInsertDataWithImage, useInsertDataWithToken };
