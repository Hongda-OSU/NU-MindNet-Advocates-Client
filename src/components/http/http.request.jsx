import { get, post, put, del } from "./http.service";

export const postUserDataAndGetImages = async (route, jsonData) => {
  try {
    const response = await post(route, jsonData);
    return response;
  } catch (err) {
    throw err;
  }
};
