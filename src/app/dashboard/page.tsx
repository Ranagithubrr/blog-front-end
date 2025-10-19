import React from "react";
import ProfileCard from "@/components/dashboard/ProfileCard";
import CreatePostButton from "@/components/dashboard/CreatePostButton";
import UserPosts from "@/components/dashboard/UserPosts";

const fakePosts = [
  {
    id: "1",
    title: "My First Post",
    description: "This is the description of my first post.",
    createdAt: "2025-10-19",
  },
  {
    id: "2",
    title: "Another Post",
    description: "This is another post description.",
    createdAt: "2025-10-18",
  },
];

const DashboardPage = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <ProfileCard
        name="Masud Rana"
        email="masud3@example.com"
        phone="+880123456789"
        role="admin"
      />
      <CreatePostButton />
      <UserPosts posts={fakePosts} />
    </div>
  );
};

export default DashboardPage;
