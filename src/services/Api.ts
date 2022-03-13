import axios from "axios";
import axiosRetry from "axios-retry";

axios.defaults.headers.get["Access-Control-Allow-Origin"] = "*";

const Api = axios.create({
  baseURL: "https://books.ioasys.com.br/api/v1"
});

axiosRetry(Api, { retryDelay: () => 500 });

Api.interceptors.request.use(async (config) => {
  const token = localStorage.getItem("ioasys@token");
  if (config.headers && token && config.method === "get") {
    config.headers.authorization = `Bearer ${token}`;
  }
  return config;
});

export default Api;
