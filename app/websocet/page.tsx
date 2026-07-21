"use client"

import { useWebSocket } from "@/hooks/useWebSocket"
import { useState } from "react"

export default function ChatPage() {
    const [ input, setInput] = useState('')

    const wsUrl = process.env.NEXT_PUBLIC_WS_URL || 'ws://localhost:8080';
    const {messages, isConnected, sendMessage} = useWebSocket(wsUrl)

    const handleSend = () => {
        if (!input.trim()) return;
        sendMessage(input);
        setInput('');
    }
    
return (
    <div className="p-6 max-w-md mx-auto">
      <div className="flex items-center gap-2 mb-4">
        <span className={`h-3 w-3 rounded-full ${isConnected ? 'bg-green-500' : 'bg-red-500'}`} />
        <span className="text-sm font-medium">
          {isConnected ? 'Підключено' : 'Відключено'}
        </span>
      </div>

      <div className="border rounded p-4 h-60 overflow-y-auto mb-4 bg-gray-50 flex flex-col gap-1">
        {messages.map((msg, idx) => (
          <div key={idx} className="bg-white p-2 rounded border text-sm">
            {msg}
          </div>
        ))}
      </div>

      <div className="flex gap-2">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Напишіть повідомлення..."
          className="border p-2 rounded flex-1 text-sm"
        />
        <button
          onClick={handleSend}
          className="bg-blue-600 text-white px-4 py-2 rounded text-sm hover:bg-blue-700 transition"
        >
          Надіслати
        </button>
      </div>
    </div>
  );

}