"use client";

import { getSinglePost } from "@/services/post.service";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "next/navigation";
import React from "react";

const PostPage = () => {
  const params = useParams();
  const id = Array.isArray(params.id) ? params.id[0] : params.id;

  const { data: post, isLoading } = useQuery({
    queryKey: ["post", id],
    queryFn: () => getSinglePost(id!),
    enabled: !!id,
  });

  if (isLoading) return <div className="text-center py-10">Loading...</div>;
  if (!post) return <div className="text-center py-10">Post not found</div>;

  return (
    <div className="max-w-4xl mx-auto p-6">
      {/* Post Title */}
      <h1 className="text-3xl font-bold mb-4">{post.title}</h1>

      {/* Author & Date */}
      <div className="flex items-center justify-between text-gray-500 text-sm mb-4">
        <span>By {post.author}</span>
        <span>
          {new Date(post.createdAt).toLocaleDateString("en-US", {
            day: "numeric",
            month: "short",
            year: "numeric",
          })}
        </span>
      </div>

      {/* Thumbnail */}
      <img
        src={post.thumbnail}
        alt={post.title}
        className="w-full h-64 object-cover rounded-md mb-6"
      />

      {/* Description */}
      <p className="text-gray-700 leading-relaxed">{post.description}</p>
    </div>
  );
};

export default PostPage;
