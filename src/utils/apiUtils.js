import axios from "axios";

// Fungsi reusable untuk melakukan request ke API
export const apiRequest = async (method, url, data = null) => {
  try {
    const response = await axios({
      method: method,
      url: url,
      data: data,
    });
    return response.data;
  } catch (error) {
    console.error(`Error during ${method} request to ${url}:`, error);
    throw error;
  }
};

// Fungsi untuk membuat token acak
export const generateRandomToken = () => {
  return Math.random().toString(36).substr(2);
};
