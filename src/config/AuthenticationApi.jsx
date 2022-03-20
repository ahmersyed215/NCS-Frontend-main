
import axiosClient from "./apiClient";
import { getAllBedsEndPoint } from "../assets/strings/Strings";

import { baseURL } from "../assets/strings/Strings";

export function getAllBedsAPI(data) {
  return axiosClient.get(getAllBedsEndPoint+data);
}




