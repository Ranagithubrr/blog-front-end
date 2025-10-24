"use client"
import React, { useEffect, useState } from "react";
import { getAllPostsByUser, Post } from "@/services/post.server.service";
import Image from "next/image";
import { FiEdit, FiTrash2 } from "react-icons/fi"; // react-icons
import Link from "next/link";
import { useQuery } from "@tanstack/react-query";

const UsersPosts = () => {
    const token = localStorage.getItem("token") || "";

    const { data: posts = [] } = useQuery<Post[]>({
        queryKey: ["userPosts"],
        queryFn: () => getAllPostsByUser(token),
        enabled: !!token,
    });


    return (
        <div className="w-full max-w-5xl mx-auto py-12 px-4">
            <div className="flex flex-col gap-8">
                {posts.map((post, index) => (
                    <div
                        key={post.id || index}
                        className="relative flex flex-col sm:flex-row bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-xl transition-all duration-300 h-72 sm:h-64"
                    >
                        {/* Edit/Delete Icons */}
                        <div className="absolute top-3 right-3 flex gap-2 z-10">
                            <Link
                                href={`/my-posts/edit/${post.id}`}
                                className="cursor-pointer text-blue-600 hover:text-blue-800 transition"
                            >
                                <FiEdit size={20} />
                            </Link>
                            <button
                                // onClick={() => handleDelete(post.id)}
                                className="cursor-pointer text-red-600 hover:text-red-800 transition"
                            >
                                <FiTrash2 size={20} />
                            </button>
                        </div>

                        {/* Left: Image */}
                        <div className="relative w-full sm:w-1/2 h-48 sm:h-full overflow-hidden">
                            <Image
                                src={post.thumbnail}
                                alt={post.title}
                                height={300}
                                width={500}
                                className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                                style={{
                                    clipPath: "polygon(0 0, 100% 0, 100% 100%, 15% 100%, 0 85%)",
                                }}
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent"></div>
                        </div>

                        {/* Right: Content */}
                        <div className="flex flex-col justify-between p-6 sm:w-1/2 h-full">
                            <div className="flex-1">
                                <h2 className="text-xl font-semibold text-gray-900 mb-3">{post.title}</h2>
                                <p className="text-gray-600 text-sm leading-relaxed mb-4 line-clamp-3">{post.description}</p>
                            </div>

                            <div className="flex items-center justify-between text-gray-500 text-xs mt-2">
                                <div className="flex items-center gap-2">
                                    <span className="text-sm font-medium text-gray-700">{post.author}</span>
                                </div>
                                <span>
                                    {new Date(post.createdAt).toLocaleDateString("en-US", {
                                        day: "numeric",
                                        month: "short",
                                        year: "numeric",
                                    })}
                                </span>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default UsersPosts;
