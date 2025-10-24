import { api } from "@/lib/axiosInstance";

export const getPosts = async () => {
  const { data } = await api.get("/posts");
  return data;
};

export const createPost = async (payload: any) => {
  const { data } = await api.post("/post", payload);
  return data;
};

export const updatePost = async (id: string, payload: any) => {
  try {
    const { data } = await api.patch(`/post/${id}`, payload);
    return data;
  } catch (error) {
    console.error("Failed to update post:", error);
    return null; 
  }
};


export const deletePost = async (id: string) => {
  const { data } = await api.delete(`/post/${id}`);
  return data;
};

export const getSinglePost = async (id: string) => {
  const { data } = await api.get(`/post/${id}`);
  return data;
};
