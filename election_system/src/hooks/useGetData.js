import baseUrl from "../Api/baseURL";

const useGetData = async (url, parmas) => {
  const res = await baseUrl.get(url, parmas);
  return res;
};

const useGetDataWithCookies = async (url, params) => {
  const config = {
    withCredentials: true, 
    params,                
  };

  const res = await baseUrl.get(url, config);
  return res;
};

export { useGetData, useGetDataWithCookies };