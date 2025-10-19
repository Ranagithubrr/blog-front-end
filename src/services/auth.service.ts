import { api } from "@/lib/axiosInstance";


export const registerUser = async (payload: any) => {
    const { data } = await api.post("/auth/register", payload);
    return data;
};