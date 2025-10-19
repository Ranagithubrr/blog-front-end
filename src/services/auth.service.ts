import { api } from "@/lib/axiosInstance";


export const registerUser = async (payload: any) => {
    const { data } = await api.post("/auth/register", payload);
    return data;
};

export const loginUser = async (payload: { email: string; password: string }) => {
    const { data } = await api.post("/auth/login", payload);
    return data;
};