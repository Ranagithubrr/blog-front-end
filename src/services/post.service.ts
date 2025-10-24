import { api } from "@/lib/axiosInstance";

// =========================
// ✅ Types
// =========================

export interface Post {
  id: string;
  title: string;
  description: string;
  thumbnail: string;
  author: string;
  createdAt: string;
}

export interface PostPayload {
  title: string;
  description: string;
  thumbnail: string;
}

export interface ApiResponse<T> {
  success: boolean;
  message?: string;
  data: T;
}

// =========================
// ✅ API Functions
// =========================

// Get all posts
export const getPosts = async (): Promise<Post[]> => {
  try {
    const { data } = await api.get<ApiResponse<Post[]>>("/post");
    return data.data;
  } catch (error) {
    console.error("❌ Failed to fetch posts:", error);
    return [];
  }
};

// Create new post
export const createPost = async (payload: PostPayload): Promise<Post | null> => {
  try {
    const { data } = await api.post<ApiResponse<Post>>("/post", payload);
    return data.data;
  } catch (error) {
    console.error("❌ Failed to create post:", error);
    return null;
  }
};

// Update post
export const updatePost = async (id: string, payload: PostPayload): Promise<Post | null> => {
  try {
    const { data } = await api.patch<ApiResponse<Post>>(`/post/${id}`, payload);
    return data.data;
  } catch (error) {
    console.error("❌ Failed to update post:", error);
    return null;
  }
};

// Delete post
export const deletePost = async (id: string): Promise<boolean> => {
  try {
    const { data } = await api.delete<ApiResponse<null>>(`/post/${id}`);
    return data.success;
  } catch (error) {
    console.error("❌ Failed to delete post:", error);
    return false;
  }
};

// Get single post by ID
export const getSinglePost = async (id: string): Promise<Post | null> => {
  try {
    const { data } = await api.get<ApiResponse<Post>>(`/post/${id}`);
    return data.data;
  } catch (error) {
    console.error("❌ Failed to fetch single post:", error);
    return null;
  }
};

// Get posts by logged-in user
export const getUserPosts = async (token: string): Promise<Post[]> => {
  try {
    const { data } = await api.get<ApiResponse<Post[]>>("/post/user", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return data.data;
  } catch (error) {
    console.error("❌ Failed to fetch user posts:", error);
    return [];
  }
};
