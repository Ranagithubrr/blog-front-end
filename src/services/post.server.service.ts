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
    return data;
  } catch (error) {
    console.error("Error fetching posts:", error);
    return []; 
  }
};

