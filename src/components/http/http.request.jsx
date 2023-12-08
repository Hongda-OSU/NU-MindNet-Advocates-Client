import { get, post, put, del } from "./http.service";

export const postUserDataAndGetImages = async (route, jsonData) => {
  try {
    const response = await post(route, jsonData);
    const { image_urls, statistics } = response;
    return {
      imageUrls: image_urls,
      statistics: statistics,
    };
  } catch (err) {
    throw err;
  }
};
