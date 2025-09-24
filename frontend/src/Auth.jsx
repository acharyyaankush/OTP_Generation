import axios from "axios";

const api = axios.create({
    baseURL:"http://localhost:3000/user",
});

export const registerUser = (userData) => api.post("/registerUser",userData);

export const loginUser = (userData) => api.post("/loginUser",userData);

export const forgetpass = (userData) => api.post("/send_otp",userData);