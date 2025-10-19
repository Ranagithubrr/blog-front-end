import React from "react";

interface Post {
    id: string;
    title: string;
    description: string;
    createdAt: string;
}

interface UserPostsProps {
    posts: Post[];
}

const UserPosts: React.FC<UserPostsProps> = ({ posts }) => {
    return (
        <div>
            <h2 className="text-2xl font-bold mb-4">My Posts</h2>
            {posts.length === 0 ? (
                <p className="text-gray-500">You have not created any posts yet.</p>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {posts.map((post) => (
                        <div
                            key={post.id}
                            className="bg-white rounded-xl shadow-md p-4 hover:shadow-xl transition-shadow"
                        >
                            <h3 className="font-semibold text-lg mb-2">{post.title}</h3>
                            <p className="text-gray-600 text-sm mb-2">{post.description}</p>
                            <span className="text-gray-400 text-xs">
                                {new Date(post.createdAt).toLocaleDateString()}
                            </span>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default UserPosts;
