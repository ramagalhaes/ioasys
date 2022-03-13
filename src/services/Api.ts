import axios from "axios";

axios.defaults.headers.get["Access-Control-Allow-Origin"] = "*";

const Api = axios.create({
  baseURL: "https://books.ioasys.com.br/api/v1",
});

Api.interceptors.request.use(async (config) => {
  const token = localStorage.getItem("ioasys@token");
  if (config.headers && token) {
    config.headers.authorization = `Bearer ${token}`;
  }
  return config;
});

Api.interceptors.response.use(undefined, async (err) => {
  const response = await axios.post(
    "https://books.ioasys.com.br/api/v1/auth/refresh-token",
    {
      refreshToken: localStorage.getItem("ioasys@token"),
    }
  );
  localStorage.setItem("raphael", response.headers?.authorization);
});

export default Api;
