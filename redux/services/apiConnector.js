import axios from "axios";
import { secureApiService } from "../../utils/apiSecurity";

export const axiosInstance = secureApiService.getApiClient();

export const apiConnector = (method, url, bodyData, headers, params) => {
  return axiosInstance({
    method,
    url,
    data: bodyData || null,
    headers: headers || {},
    params: params || null,
  });
};
