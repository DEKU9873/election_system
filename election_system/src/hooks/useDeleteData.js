import baseURL from "../Api/baseURL";
import Cookies from "js-cookie";

const useDeleteData = async (url, parmas) => {
  const res = await baseURL.delete(url, parmas);
  return res.data;
};

const useDeleteDataWithToken = async (url, parmas) => {
  const token = Cookies.get("token");

  const config = {
    headers: { Authorization: `Bearer ${token}` },
  };
  // تصحيح ترتيب المعاملات في دالة delete
  // في axios، المعامل الثاني هو config وليس البيانات
  const res = await baseURL.delete(url, config);
  return res.data;
};

export { useDeleteData, useDeleteDataWithToken };
