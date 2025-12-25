"use client";

import { useEffect, useState } from "react";
import { io, Socket } from "socket.io-client";

export default function useOnlineUsers(userId: string) {
    const [onlineUsers, setOnlineUsers] = useState<string[]>([]);

    useEffect(() => {
        const socket: Socket = io(process.env.NEXT_PUBLIC_API_URL, {
            query: { userId },
            transports: ["websocket"],
        });

        socket.on("onlineUsers", (users: string[]) => {
            console.log("🔥 ONLINE USERS FROM BACKEND:", users);
            setOnlineUsers(users);
        });

        return () => {
            socket.disconnect();
        };
    }, [userId]);

    return onlineUsers;
}
