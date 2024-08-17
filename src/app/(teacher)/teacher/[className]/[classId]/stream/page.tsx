"use client";
import { Post } from "@/types";
import axios from "axios";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";

const stream = () => {
  const { className, classId } = useParams();
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await axios.get(`/api/feed/${classId}/overview`);
        setPosts(res.data);
        console.log("posts are:", res.data);

        setLoading(false);
      } catch (error) {
        console.log(error);
      }
    };
    fetchPosts();
  }, [classId, className]);

  return (
    <div className="bg-gray-50 min-h-screen p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-indigo-600 mb-2">Stream</h1>
        <div className="mt-8">
          {loading ? (
            <p>Loading...</p>
          ) : (
            posts.map((post, index) => (
              <div key={index} className="bg-white shadow-md p-4 mb-4">
                <h2 className="text-xl font-bold text-indigo-600">
                  {post.assignment}
                </h2>
                <p className="text-gray-600">{post.message}</p>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default stream;
