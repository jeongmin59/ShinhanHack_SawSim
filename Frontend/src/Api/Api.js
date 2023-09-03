import axios from "axios";

axios.defaults.withCredentials = true;

const Api = axios.create({
  baseURL: "https://shbhack.shinhan.com/",
  headers: {
    "Content-Type": "application/json; charset = UTF-8",
  },
});

export default Api;
