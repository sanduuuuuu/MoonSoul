// import axios from "axios";

// const API_BASE_URL = "http://localhost:8080/api/v1/"; // Adjust backend URL

// export const handleLogin = async (email: string, password: string) => {
//   try {
//     const response = await axios.post(`${API_BASE_URL}auth/authentication`, {
//       email,
//       password,
//     });

//     console.log("Login successful:", response.data);

//     // Store the token in localStorage or sessionStorage
//     localStorage.setItem("jwt_token", response.data.token);
//   } catch (error) {
//     console.error("Login failed:", error);
//   }
// };

// export const register = async (credentials: { firstname:string; lastname:string; email: string; password: string }) => {
//   return axios.post(`${API_BASE_URL}auth/register`, credentials);
// };