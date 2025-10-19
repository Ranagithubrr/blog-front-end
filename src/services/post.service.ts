import { api } from "@/lib/axiosInstance";

export const getPosts = async () => {
  const { data } = await api.get("/posts");
  return data;
};

export const createPost = async (payload: any) => {
  const { data } = await api.post("/posts", payload);
  return data;
};

export const updatePost = async (id: string, payload: any) => {
  const { data } = await api.put(`/posts/${id}`, payload);
  return data;
};

export const deletePost = async (id: string) => {
  const { data } = await api.delete(`/posts/${id}`);
  return data;
};
