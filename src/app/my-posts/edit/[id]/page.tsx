"use client";

import CreatePost from "@/components/posts/CreatePost";
import { useParams } from "next/navigation";

const EditPostPage = () => {
    const params = useParams();
    const postId = Array.isArray(params.id) ? params.id[0] : params.id;
    return <CreatePost postId={postId} />;
};

export default EditPostPage;
