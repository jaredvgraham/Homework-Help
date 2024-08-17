"use client";
import { Post } from "@/types";
import axios from "axios";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";

const Stream = () => {
  const { className, classId } = useParams();
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await axios.get(`/api/feed/${classId}/overview`);
        setPosts(res.data);
        setLoading(false);
      } catch (error) {
        console.log(error);
      }
    };
    fetchPosts();
  }, [classId, className]);

  return (
    <div className="bg-gradient-to-br from-gray-50 to-gray-200 min-h-screen p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-5xl font-extrabold text-gray-800 mb-8 text-center tracking-tight">
          Class Stream
        </h1>
        <div className="space-y-6">
          {loading ? (
            <p className="text-gray-500 text-center text-lg">Loading...</p>
          ) : (
            posts.map((post, index) => (
              <div
                key={index}
                className={`rounded-lg p-6 shadow-lg hover:shadow-xl transition-shadow duration-300 transform hover:scale-105 ${
                  post.postType === "assignment"
                    ? "bg-blue-100 border-l-4 border-blue-500"
                    : "bg-white"
                }`}
              >
                <h2
                  className={`text-2xl font-bold mb-2 ${
                    post.postType === "assignment"
                      ? "text-blue-800"
                      : "text-gray-700"
                  }`}
                >
                  {post.message}
                </h2>
                <p className="text-gray-600 mb-4">{post.description}</p>

                <div className="flex justify-between items-center mt-4">
                  <span className="text-sm text-gray-500">
                    Posted on: {new Date(post.createdAt).toLocaleDateString()}
                  </span>
                  <button className="text-indigo-600 hover:text-indigo-800 transition-colors duration-300">
                    Read More →
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default Stream;
