import axios from "axios";

export const baseUrl = "http://wwcrm.sgtstocks.com";

const apiUrl = axios.create();
apiUrl.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
      config.baseURL = baseUrl;
    }
    return config;
  },
  (error) => {
    Promise.reject(error);
  }
);

apiUrl.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    return Promise.reject(error);
  }
);
export default apiUrl;
export const loginUrl = "/api/login/";
export const agentListUrl = "/api/admin/list-agents";
export const agentDetailUrl = "/api/admin/agent-details/";
export const clientDetailUrl = "/api/admin/client-details/";

export const clientAddUrl = "/api/agent/create-client/";

export const agentAddUrl = "/api/admin/create-agent/";

export const descriptionAddUrl = "/api/agent/create-transaction/";
