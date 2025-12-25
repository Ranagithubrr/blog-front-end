"use client";

import { useEffect, useState } from "react";
import useOnlineUsers from "@/hooks/useOnlineUsers";

export default function Page() {
  const [userId, setUserId] = useState<string | null>(null);

  useEffect(() => {
    const savedUser = localStorage.getItem("user");
    if (savedUser) {
      const parsed = JSON.parse(savedUser);
      setUserId(parsed._id);
    }
  }, []);

  const onlineUsers = useOnlineUsers(userId);

  return (
    <div className="min-h-screen bg-gray-100 flex justify-center py-12 px-4">
      <div className="w-full max-w-md bg-white rounded-xl shadow-lg p-6">

        <h2 className="text-2xl font-bold text-gray-800 mb-6">
          Online Users ({onlineUsers.length})
        </h2>

        <ul className="space-y-3">
          {onlineUsers.map((user) => (
            <li
              key={user._id}
              className="flex items-center gap-3 bg-green-50 border border-green-200 p-3 rounded-lg"
            >
              <span className="h-3 w-3 rounded-full bg-green-500 animate-pulse"></span>
              <span className="text-gray-800 font-medium">{user.name}</span>
            </li>
          ))}
        </ul>

      </div>
    </div>
  );
}
