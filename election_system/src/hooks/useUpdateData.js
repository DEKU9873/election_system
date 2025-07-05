import baseUrl from "../Api/baseURL";
import Cookies from "js-cookie";

const useInUpdateDataWithImage = async (url, parmas) => {
  const config = {
    headers: {
      "Content-Type": "multipart/form-data",
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  };
  const res = await baseUrl.put(url, parmas, config);
  return res;
};

const useUpdateData = async (url, parmas) => {
  const res = await baseUrl.put(url, parmas);
  return res;
};
const useUpdateDataWithToken = async (url, parmas) => {
  const token = Cookies.get("token");

  const config = {
    headers: { Authorization: `Bearer ${token}` },
  };
  const res = await baseUrl.put(url, parmas, config);
  return res;
};

export { useInUpdateDataWithImage, useUpdateData, useUpdateDataWithToken };
