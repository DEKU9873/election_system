import baseURL from "../Api/baseURL";

const useUpdateDataWithImage = async (url, parmas) => {
  const config = {
    headers: { "Content-Type": "multipart/form-data" },
  };
  const res = await baseURL.put(url, parmas, config);
  return res;
};

const useUpdateData = async (url, parmas) => {
  const res = await baseURL.put(url, parmas);
  return res;
};

export { useUpdateDataWithImage, useUpdateData };
