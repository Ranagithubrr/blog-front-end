import React from "react";
import { getAllPosts, Post } from "@/services/post.server.service";
import Image from "next/image";

export default async function PostsList() {
    const posts: Post[] = await getAllPosts();

    return (
        <div className="w-full max-w-5xl mx-auto py-12 px-4">
            <div className="flex flex-col gap-8">
                {posts.map((post, index) => (
                    <div
                        key={post.id || index}
                        className="flex flex-col sm:flex-row bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-xl transition-all duration-300 h-72 sm:h-64"
                    >
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
                                <p className="text-gray-600 text-sm leading-relaxed mb-4 line-clamp-3">
                                    {post.description}
                                </p>
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
}
