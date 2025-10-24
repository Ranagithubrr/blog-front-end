import axios from "axios";

export const api = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL || "https://15.206.27.201:5000/",
    withCredentials: false,
});

// Automatically attach JWT token from localStorage
api.interceptors.request.use((config) => {
    if (typeof window !== "undefined") {
        const token = localStorage.getItem("token");
        if (token) config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

api.interceptors.response.use(
    (response) => response,
    (error) => {
        // Optional: handle 401 globally
        if (error.response?.status === 401) {
            console.warn("Unauthorized, maybe token expired");
            localStorage.removeItem("token");
        }
        return Promise.reject(error);
    }
);
