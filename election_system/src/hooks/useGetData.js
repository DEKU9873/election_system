import baseUrl from "../Api/baseURL";
import Cookies from "js-cookie";

const useGetData = async (url, parmas) => {
  const res = await baseUrl.get(url, parmas);
  return res;
};

const useGetDataToken = async (url, parmas) => {
  const token = Cookies.get("token"); 
  const config = {
    headers: { Authorization: `Bearer ${token}` },
  };
  const res = await baseUrl.get(url, config);
  return res;
};

export { useGetData, useGetDataToken };
