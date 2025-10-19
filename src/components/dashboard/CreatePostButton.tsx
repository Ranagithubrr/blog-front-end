import Link from "next/link";
import React from "react";

const CreatePostButton: React.FC = () => {
  return (
    <div className="flex justify-end mb-4">
      <Link
        href="/dashboard/create-post"
        className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg transition-colors"
      >
        Create New Post
      </Link>
    </div>
  );
};

export default CreatePostButton;
