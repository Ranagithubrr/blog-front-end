import Posts from "@/components/posts/Posts";
import ProtectedRoute from "@/components/ProtectedRoute";
import Link from "next/link";

export default function Home() {
  return (
    <ProtectedRoute>
      <div>
        <div>
          <h1 className="text-4xl font-bold text-center mt-10">Welcome to the Blog Site</h1>
          <div className="flex justify-end mt-4 mr-5">
            <Link
              href="/dashboard"
              className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg transition-colors"
            >
              Go to Dashboard
            </Link>
          </div>
        </div>
        <Posts />
      </div>
    </ProtectedRoute>
  );
}
