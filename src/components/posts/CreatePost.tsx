"use client";

import React, { useState } from "react";
import { FieldError, useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { createPost } from "@/services/post.service";
import { useAuth } from "@/providers/AuthProvider";

// Zod validation
const PostSchema = z.object({
  title: z.string().min(2, "Title must be at least 2 characters").max(100),
  description: z
    .string()
    .min(10, "Description must be at least 10 characters")
    .max(1000),
  image: z
    .any()
    .refine((file) => file?.[0]?.size <= 5_000_000, "Max file size 5MB")
    .optional(),
});

type PostFormType = z.infer<typeof PostSchema>;

const CreatePost = () => {
  const { user } = useAuth();
  const [imageUrl, setImageUrl] = useState<string>("");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<PostFormType>({
    resolver: zodResolver(PostSchema),
  });

  const { mutate, isPending } = useMutation({
    mutationFn: createPost,
    onSuccess: (data) => {
      console.log("Post created successfully:", data);
    },
    onError: (error) => {
      console.error("Error creating post:", error);
    },
  });

  // Upload image to S3
  const uploadImageToS3 = async (file: File) => {
    // 1. Get presigned URL from your backend
    const presignedRes = await fetch("/api/s3-presigned-url?fileName=" + file.name);
    const { url, key } = await presignedRes.json(); // backend returns { url, key }

    // 2. Upload file to S3 using the presigned URL
    await fetch(url, {
      method: "PUT",
      headers: {
        "Content-Type": file.type,
      },
      body: file,
    });

    // 3. Return the public URL (or key) for storing in DB
    const publicUrl = `https://blog-bucketname.s3.amazonaws.com/${key}`;
    return publicUrl;
  };

  const onSubmit = async (data: PostFormType) => {
    let uploadedImage = "";
    if (data.image && data.image.length > 0) {
      uploadedImage = await uploadImageToS3(data.image[0]);
      setImageUrl(uploadedImage);
    }

    mutate({
      title: data.title,
      description: data.description,
      author: user.name,
      authorId: user._id,
      thumbnail: uploadedImage,
    });
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-md mt-5">
      <h1 className="text-2xl font-bold mb-4">Create New Post</h1>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        {/* Title */}
        <div>
          <input
            type="text"
            placeholder="Post Title"
            {...register("title")}
            className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {errors.title && (
            <p className="text-red-500 text-sm mt-1">{errors.title.message}</p>
          )}
        </div>

        {/* Description */}
        <div>
          <textarea
            placeholder="Post Description"
            rows={6}
            {...register("description")}
            className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
          />
          {errors.description && (
            <p className="text-red-500 text-sm mt-1">{errors.description.message}</p>
          )}
        </div>

        {/* Image */}
        <div>
          <input type="file" {...register("image")} accept="image/*" />
          {errors.image && (errors.image as FieldError).message && (
            <p className="text-red-500 text-sm mt-1">
              {(errors.image as FieldError).message}
            </p>
          )}
          {imageUrl && <p className="text-green-500 mt-1">Image uploaded!</p>}
        </div>

        {/* Submit */}
        <button
          disabled={isPending}
          type="submit"
          className="bg-blue-600 cursor-pointer text-white px-6 py-2 rounded-md hover:bg-blue-700 transition"
        >
          {isPending ? "Please Wait..." : "Publish Post"}
        </button>
      </form>
    </div>
  );
};

export default CreatePost;
