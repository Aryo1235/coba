import axios from "axios";

const api_key = import.meta.env.VITE_API_KEY;
const apiBaseURL = import.meta.env.VITE_API_BASE_URL;
const imageBaseURL = import.meta.env.VITE_IMAGE_BASE_URL;
const apiLogin = import.meta.env.VITE_LOGIN;

// Fetch data from server using Axios
const fetchDataFromServer = async (url) => {
  try {
    const response = await axios.get(url);
    return response.data;
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error; // Throw error to be caught in component
  }
};

// Get upcoming movies
const getUpcomingMovies = () => {
  const url = `${apiBaseURL}/movie/upcoming?api_key=${api_key}&language=en-US&page=1`;
  return fetchDataFromServer(url);
};

// Get popular weekly movies
const getPopularWeeklyMovies = () => {
  const url = `${apiBaseURL}/trending/movie/week?api_key=${api_key}`;
  return fetchDataFromServer(url);
};

// Get top-rated movies
const getTopRatedMovies = () => {
  const url = `${apiBaseURL}/movie/top_rated?api_key=${api_key}&language=en-US&page=1`;
  return fetchDataFromServer(url);
};

// Get popular movies
const getPopularMovies = () => {
  const url = `${apiBaseURL}/movie/popular?api_key=${api_key}`;
  return fetchDataFromServer(url);
};

// Search movies by query
const searchMovies = (query, page = 1) => {
  const url = `${apiBaseURL}/search/movie?api_key=${api_key}&query=${query}&page=${page}`;
  return fetchDataFromServer(url);
};

const genreList = () => {
  const url = `https://api.themoviedb.org/3/genre/movie/list?api_key=${api_key}`;
  return fetchDataFromServer(url);
};

const getMovieDetail = (id) => {
  const url = `https://api.themoviedb.org/3/movie/${id}?api_key=${api_key}`;
  return fetchDataFromServer(url);
};

const getLanguages = () => {
  const url = `${apiBaseURL}/configuration/languages?api_key=${api_key}`;
  return fetchDataFromServer(url);
};

const getMovieVideos = (id) => {
  const url = `${apiBaseURL}/movie/${id}/videos?api_key=${api_key}`;
  return fetchDataFromServer(url);
};

const getMovieCredits = (id) => {
  const url = `${apiBaseURL}/movie/${id}/credits?api_key=${api_key}`;
  return fetchDataFromServer(url);
};

const getMoviesSuggestions = (id) => {
  const url = `${apiBaseURL}/movie/${id}/recommendations?api_key=${api_key}&language=en-US&page=1`;
  return fetchDataFromServer(url);
};

const getMoviesByGenre = (genreId, page = 1) => {
  const url = `${apiBaseURL}/discover/movie?api_key=${api_key}&with_genres=${genreId}&page=${page}`;
  return fetchDataFromServer(url);
};

// Get movie reviews
const getMovieReviews = (id) => {
  const url = `${apiBaseURL}/movie/${id}/reviews?api_key=${api_key}&language=en-US&page=1`;
  return fetchDataFromServer(url);
};

// Ganti dengan URL dari Mock.IO

const login = async (username, password) => {
  // Update sesuai endpoint MockAPI
  try {
    const response = await axios.get(apiLogin); // Gunakan GET untuk mendapatkan semua data

    // Mencari user yang cocok dengan username dan password
    const user = response.data.find(
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
  } catch (error) {
    console.error("Error during login:", error);
    throw error; // Tangani error di komponen pemanggil
  }
};

const updateUserProfile = async (userId, username, password) => {
  const url = `${apiLogin}/${userId}`; // Use the user ID for the endpoint
  try {
    const response = await axios.put(url, {
      username: username,
      password: password, // Include password if changing it
    });
    return response.data; // Return the updated user data
  } catch (error) {
    console.error("Error updating profile:", error);
    throw error; // Handle error in the calling component
  }
};

const registerUser = async (username, password) => {
  try {
    const response = await axios.post(apiLogin, {
      username: username,
      password: password, // Include password if changing it
      generateRandomToken: generateRandomToken(),
    });
    return response.data; // Return the updated user data
  } catch (error) {
    console.error("Error updating profile:", error);
    throw error; // Handle error in the calling component
  }
};

const deleteUser = async (userId) => {
  try {
    const response = await axios.delete(`${apiLogin}/${userId}`); // Menggunakan userId dalam endpoint
    return response.data; // Mengembalikan data respons jika berhasil
  } catch (error) {
    console.error("Error deleting user:", error);
    throw error; // Menangani error di komponen pemanggil
  }
};

// Fungsi untuk membuat token acak
const generateRandomToken = () => {
  return Math.random().toString(36).substr(2);
};

export {
  api_key,
  imageBaseURL,
  fetchDataFromServer,
  getUpcomingMovies,
  getPopularWeeklyMovies,
  getTopRatedMovies,
  getPopularMovies,
  searchMovies,
  genreList,
  getMovieDetail,
  getLanguages,
  getMovieVideos,
  getMovieCredits,
  getMoviesSuggestions,
  getMoviesByGenre,
  getMovieReviews,
  login,
  updateUserProfile,
  registerUser,
  deleteUser,
};
