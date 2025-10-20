import PostsList from "@/components/posts/Posts";
import Posts from "@/components/posts/Posts";
import ProtectedRoute from "@/components/ProtectedRoute";
import Link from "next/link";

export default function Home() {
  return (
    <ProtectedRoute>
      <div>
        <h1 className="text-4xl font-bold">Discover Our Latest Posts</h1>
        <PostsList />
      </div>
    </ProtectedRoute>
  );
}
