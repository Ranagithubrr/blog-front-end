import PostsList from "@/app/(blog)/posts/Posts";

export default function Home() {
  return (
      <div>
        <h1 className="text-4xl font-bold font-mono uppercase">Discover Our Latest Posts</h1>
        <PostsList />
      </div>
  );
}
