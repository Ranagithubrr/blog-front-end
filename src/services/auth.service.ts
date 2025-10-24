import { api } from "@/lib/axiosInstance";

interface UserInterface {
  name: string;
  email: string;
  phone: string;
  password: string;
  role: string;
}

export const registerUser = async (payload: UserInterface) => {
    const { data } = await api.post("/auth/register", payload);
    return data;
};

export const loginUser = async (payload: { email: string; password: string }) => {
    const { data } = await api.post("/auth/login", payload);
    return data;
};