'use client'

import { useEffect, useState, useRef } from "react";

export function useWebSocket(url: string) {
    const [ messages, setMessages ] = useState<string[]>([]);
    const [ isConnected, setIsConnected ] = useState(false);
    const socketRef = useRef<WebSocket | null >(null);

    useEffect(() => {
        const socket = new WebSocket(url);
        socketRef.current = socket

        socket.onopen = () => setIsConnected(true);
        socket.onclose = () => setIsConnected(false)

        socket.onmessage = (event) => {
            setMessages((prev) => [...prev, event.data]) 
        };

        return () => {
            socket.close();
        };
    }, [url])

    const sendMessage = (message: string) => {
        if (socketRef.current?.readyState === WebSocket.OPEN) {
            socketRef.current.send(message)
        }
    }

    return {messages, isConnected, sendMessage};
}
