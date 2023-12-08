import axios from "axios";

const baseURL = "https://jx3j3qu3gk.execute-api.us-east-2.amazonaws.com/prod";

const baseHeaders = {
  "Content-Type": "application/json",
};

const http = axios.create({
  baseURL: baseURL,
  headers: baseHeaders,
});

const sendHttpRequest = async (route, method, data = {}, headers = {}) => {
  try {
    const response = await http({
      url: route,
      method,
      headers: { ...baseHeaders, ...headers },
      data,
    });
    return response.data;
  } catch (err) {
    throw err;
  }
};

export const get = async (route, params = {}, headers = {}) =>
  sendHttpRequest(route, "GET", { params }, headers);

export const post = async (route, data, headers = {}) =>
  sendHttpRequest(route, "POST", data, headers);

export const put = async (route, data, headers = {}) =>
  sendHttpRequest(route, "PUT", data, headers);

export const del = async (route, data, headers = {}) =>
  sendHttpRequest(route, "DELETE", data, headers);
