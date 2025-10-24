export interface Post {
  id: string;
  title: string;
  description: string;
  thumbnail: string;
  author: string;
  createdAt: string;
}

interface PostResponse {
  _id: string;
  title: string;
  description: string;
  thumbnail: string;
  author: string;
  createdAt: string;
}

const BASE_URL = process.env.NEXT_PUBLIC_API_URL || "https://15.206.27.201:5000/";

export const getAllPosts = async (): Promise<Post[]> => {
  try {
    const res = await fetch(`${BASE_URL}/post`, { cache: "no-store" });
    if (!res.ok) {
      console.warn(`Failed to fetch posts: ${res.status} ${res.statusText}`);
      return [];
    }

    const data: PostResponse[] = await res.json();
    return data.map(({ _id, ...rest }) => ({ id: _id, ...rest }));
  } catch (error) {
    console.error("Error fetching posts:", error);
    return [];
  }
};

export const getAllPostsByUser = async (token: string): Promise<Post[]> => {
  try {
    const res = await fetch(`${BASE_URL}/post/user`, {
      cache: "no-store",
      headers: {
        authorization: `Bearer ${token}`,
      },
    });

    if (!res.ok) {
      console.warn(`Failed to fetch user posts: ${res.status} ${res.statusText}`);
      return [];
    }

    const data: PostResponse[] = await res.json();
    return data.map(({ _id, ...rest }) => ({ id: _id, ...rest }));
  } catch (error) {
    console.error("Error fetching user posts:", error);
    return [];
  }
};
