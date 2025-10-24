export interface Post {
  id: string;
  title: string;
  description: string;
  thumbnail: string;
  author: string;
  createdAt: string;
}

export const getAllPosts = async (): Promise<Post[]> => {
  try {
    const res = await fetch("http://localhost:5000/post", {
      cache: "no-store",
    });

    if (!res.ok) {
      console.warn(`Failed to fetch posts: ${res.status} ${res.statusText}`);
      return [];
    }

    const data = await res.json();
    const posts: Post[] = data.map(({ _id, ...rest }: any) => ({
      id: _id,
      ...rest
    }));
    return posts;
  } catch (error) {
    console.error("Error fetching posts:", error);
    return [];
  }
};


export const getAllPostsByUser = async (token: string): Promise<Post[]> => {
  try {
    const res = await fetch("http://localhost:5000/post/user", {
      cache: "no-store",
      headers: {
        authorization: `Bearer ${token}`,
      },
    });

    if (!res.ok) {
      console.warn(`Failed to fetch posts: ${res.status} ${res.statusText}`);
      return [];
    }

    const data = await res.json();
    const posts: Post[] = data.map(({ _id, ...rest }: any) => ({
      id: _id,
      ...rest
    }));
    return posts;
  } catch (error) {
    console.error("Error fetching posts:", error);
    return [];
  }
};

