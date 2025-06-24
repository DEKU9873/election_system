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
  const res = await baseURL.delete(url, config, parmas);
  return res.data;
};

export { useDeleteData, useDeleteDataWithToken };
