import { ECOMMERCE_TOKEN, ENDPOINT } from "@/constants";
import { getCookie } from "cookies-next";
import axios from "axios";

const request = axios.create({
  baseURL: `${ENDPOINT}api/v1/`,
  timeout: 10000,
  headers: {
    Authorization: `Bearer ${getCookie(ECOMMERCE_TOKEN)}`,
  },
});

export default request;
