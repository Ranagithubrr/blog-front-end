"use client"
import React, { useState } from "react";
import { getAllPostsByUser, Post } from "@/services/post.server.service";
import Image from "next/image";
import { FiEdit, FiTrash2 } from "react-icons/fi"; // react-icons
import Link from "next/link";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { deletePost } from "@/services/post.service";

const UsersPosts = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [postIdToDelete, setPostIdToDelete] = useState<string | null>(null);

    const onClose = () => {
        setIsModalOpen(false);
        setPostIdToDelete(null);
    };

    const token = localStorage.getItem("token") || "";
    const queryClient = useQueryClient();

    const { data: posts = [] } = useQuery<Post[]>({
        queryKey: ["userPosts"],
        queryFn: () => getAllPostsByUser(token),
        enabled: !!token,
    });

    const { mutate } = useMutation({
        mutationFn: (postId: string) => deletePost(postId),
        onSuccess: () => {
            setIsModalOpen(false);
            setPostIdToDelete(null);
            queryClient.invalidateQueries({ queryKey: ["posts"] });    
            queryClient.invalidateQueries({ queryKey: ["userPosts"] });
        },
        onError: (error) => {
            console.error("Failed to delete post:", error);
        },
    });

    const handleDelete = (postId: string) => {
        setIsModalOpen(true);
        setPostIdToDelete(postId);
    }


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
                                onClick={() => handleDelete(post.id)}
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
            {/* delete modal */}
            {isModalOpen && (
                <div
                    className="h-screen w-screen bg-gray-800/80 fixed z-40 flex items-center justify-center top-0 left-0"
                    onClick={() => setIsModalOpen(false)}
                >
                    <div
                        className="bg-white rounded-xl shadow-lg w-96 p-6 z-50"
                        onClick={(e) => e.stopPropagation()} // prevent closing when clicking inside modal
                    >
                        <h2 className="text-lg font-semibold text-gray-900 mb-4">Confirm Delete</h2>
                        <p className="text-gray-600 mb-6">Are you sure you want to delete this item?</p>

                        <div className="flex justify-end gap-3">
                            <button
                                onClick={onClose}
                                className="cursor-pointer px-4 py-2 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-100"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={() => mutate(postIdToDelete!)}
                                className="cursor-pointer px-4 py-2 rounded-lg bg-red-500 text-white hover:bg-red-600"
                            >
                                Delete
                            </button>
                        </div>
                    </div>
                </div>
            )}

        </div>
    );
};

export default UsersPosts;
