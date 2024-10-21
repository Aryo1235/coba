// authService.js
import { apiRequest, generateRandomToken } from "./utils/apiUtils";
import { apiLogin } from "./api";

// Login
export const login = async (username, password) => {
  const data = await apiRequest("get", apiLogin);

  // Cari user berdasarkan username dan password
  const user = data.find(
    (user) => user.username === username && user.password === password
  );

  if (user) {
    return {
      success: true,
      token: user.token,
      userId: user.id,
      username: user.username,
    };
  } else {
    return {
      success: false,
      message: "Username atau password salah",
    };
  }
};

// Update User Profile
export const updateUserProfile = async (userId, username, password) => {
  const url = `${apiLogin}/${userId}`;
  const data = { username, password };

  return apiRequest("put", url, data); // Update menggunakan PUT
};

// Register User
export const registerUser = async (username, password) => {
  const userData = {
    username: username,
    password: password,
    token: generateRandomToken(), // Buat token acak untuk user baru
  };

  return apiRequest("post", apiLogin, userData); // Buat user baru
};
