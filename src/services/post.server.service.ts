export interface Post {
  id: string;
  title: string;
  description: string;
  thumbnail: string;
  author: string;
  createdAt: string;
}

export const getAllPosts = async (): Promise<Post[]> => {
  const res = await fetch("http://localhost:5000/post", {
    cache: "no-store", // ensures fresh data every request
  });

  if (!res.ok) throw new Error("Failed to fetch posts");

  return res.json();
};