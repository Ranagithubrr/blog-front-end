import Posts from "@/components/posts/Posts";
import ProtectedRoute from "@/components/ProtectedRoute";

export default function Home() {
  return (
    <ProtectedRoute>
      <div>
        <Posts />
      </div>
    </ProtectedRoute>
  );
}
