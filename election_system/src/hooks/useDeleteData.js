import baseURL from "../Api/baseURL";
const useDeleteData = async (url, parmas) => {
  const res = await baseURL.delete(url, parmas);
  return res.data;
};

const useDeleteDataWithToken = async (url, parmas) => {


    const config = {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
    }
    const res = await baseURL.delete(url, config, parmas);
    return res.data;
}

export { useDeleteData, useDeleteDataWithToken };
