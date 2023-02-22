import axios from "axios";
import { API_URL } from "../config";
import { getCookie } from "../function";

export default axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "multipart/form-data",
    Authorization: getCookie("token"),
  },
});
