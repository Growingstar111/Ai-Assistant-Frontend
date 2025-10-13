import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import React, { useState, useEffect, useRef } from "react";
import {
  chatWithAI,
  deleteChatHistoryApi,
  getChatHistory,
} from "../Endpoints/endpoints";
import Navbar from "../components/Navbar";
import { Toast } from "../common_Functions/common_function";

const ChatBox = () => {
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [showHistory, setShowHistory] = useState(false);
  const [fullConversation, setFullConversation] = useState([]);

  const chatEndRef = useRef(null);
  const queryClient = useQueryClient();
  queryClient.invalidateQueries({ queryKey: ["chat"] });
  const { data } = useQuery({
    queryKey: ["chat"],
    queryFn: async () => await getChatHistory(),
  });

  const sortedHistory =
    data?.data?.data?.sort(
      (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
    ) || [];

 
  const { mutate } = useMutation({
    mutationFn: async (mess) => {
      setLoading(true);
      return await chatWithAI(mess);
    },
    onSuccess: (res) => {
      setFullConversation((prev) => [
        ...prev,
        { role: "assistant", content: res?.data?.reply },
      ]);
      setLoading(false);
    },
    onError: (error) => {
      console.error(error);
      setLoading(false);
    },
  });


  const handleChat = () => {
    if (!message.trim()) return;

    setFullConversation((prev) => [
      ...prev,
      { role: "user", content: message },
    ]);

    mutate({ message });
    setMessage("");
  };

  const mutationRemoveHistory = useMutation({
    mutationFn: async () => await deleteChatHistoryApi(),
    onSuccess: (res) => {
      Toast.fire({
        title: "History Deleted",
        icon: "success",
      });
    },
    onError: (error) => {
      console.error(error);
      Toast.fire({
        title: `${error?.message} ` || "Something went wrong",
      });
    },
  });

  
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [fullConversation, loading]);

  return (
    <div className="flex flex-col h-screen">
      <Navbar />

      <div className="flex-1 flex">
      
        <div className="hidden lg:flex flex-col w-64 bg-gray-900 text-white p-4 space-y-4 fixed h-full">
          <h2 className="text-lg font-semibold mb-2">Menu</h2>
          <button
            className="bg-blue-600 py-2 px-4 w-full rounded hover:bg-blue-700"
            onClick={() => {
              setFullConversation([]);
              setShowHistory(false);
            }}
          >
            + New Chat
          </button>
          <button
            className="bg-gray-700 py-2 px-4 w-full rounded hover:bg-gray-600"
            onClick={() => setShowHistory(!showHistory)}
          >
            History
          </button>
          <button
            className="bg-gray-700 py-2 px-4 w-full rounded hover:bg-gray-600"
            onClick={mutationRemoveHistory.mutate}
          >
            Delete History
          </button>

          {showHistory && (
            <div className="mt-4 overflow-y-auto flex-1 space-y-2 max-h-[calc(100vh-150px)]">
              {sortedHistory.map((chat) => (
                <div
                  key={chat._id}
                  className="bg-gray-800 w-full px-3 py-2 rounded cursor-pointer hover:bg-gray-700"
                  onClick={() => {
                    setFullConversation(
                      chat.messages.map((msg) => ({
                        role: msg.role,
                        content: msg.content,
                      }))
                    );
                    setShowHistory(false);
                  }}
                >
                  {chat.title || "Untitled Chat"} -{" "}
                  {new Date(chat.createdAt).toLocaleString()}
                </div>
              ))}
              {sortedHistory.length === 0 && (
                <p className="text-gray-400 text-sm">No chat history</p>
              )}
            </div>
          )}
        </div>

        {/* Mobile Sidebar */}
        <div
          className={`fixed inset-y-0 left-0 w-64 bg-gray-900 text-white p-4 space-y-4 z-50 transform transition-transform duration-300 lg:hidden
            ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}`}
        >
          <h2 className="text-lg font-semibold mb-2">Menu</h2>
          <button
            className="bg-blue-600 py-2 px-4 w-full rounded hover:bg-blue-700"
            onClick={() => {
              setFullConversation([]);
              setShowHistory(false);
              setSidebarOpen(false);
            }}
          >
            + New Chat
          </button>
          <button
            className="bg-gray-700 py-2 px-4 w-full rounded hover:bg-gray-600"
            onClick={() => setShowHistory(!showHistory)}
          >
            History
          </button>
          <button
            className="bg-gray-700 py-2 px-4 w-full rounded hover:bg-gray-600"
            onClick={mutationRemoveHistory.mutate}
          >
            Delete History
          </button>

          {showHistory && (
            <div className="mt-4 max-h-[70vh] overflow-y-auto space-y-2">
              {sortedHistory.map((chat) => (
                <div
                  key={chat._id}
                  className="bg-gray-800 px-3 py-2 rounded cursor-pointer hover:bg-gray-700"
                  onClick={() => {
                    setFullConversation(
                      chat.messages.map((msg) => ({
                        role: msg.role,
                        content: msg.content,
                      }))
                    );
                    setShowHistory(false);
                    setSidebarOpen(false);
                  }}
                >
                  {chat.title || "Untitled Chat"} -{" "}
                </div>
              ))}
              {sortedHistory.length === 0 && (
                <p className="text-gray-400 text-sm">No chat history</p>
              )}
            </div>
          )}
        </div>

        {/* Mobile overlay */}
        {sidebarOpen && (
          <div
            className="fixed inset-0 bg-black/50 z-40 lg:hidden"
            onClick={() => setSidebarOpen(false)}
          ></div>
        )}

        {/* Chat Area */}
        <div className="flex-1 flex mt-12 flex-col ml-0 lg:ml-64 bg-gradient-to-b from-black to-[#020353]">
          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3">
            {fullConversation.map((msg, index) => (
              <div
                key={index}
                className={`flex ${
                  msg.role === "user" ? "justify-end" : "justify-start"
                }`}
              >
                <div
                  className={`px-4 py-2 rounded-2xl break-words ${
                    msg.role === "user"
                      ? "bg-blue-500 text-white"
                      : "bg-black text-white  w-full max-w-lg  "
                  }`}
                >
                  {msg.content}
                </div>
              </div>
            ))}

            {loading && (
              <div className="flex justify-start">
                <div className="bg-black text-white px-4 py-2 rounded-2xl animate-pulse">
                  AI is thinking...
                </div>
              </div>
            )}

            <div ref={chatEndRef}></div>
          </div>

          {/* Input */}
          <div className="p-4 flex items-center gap-2 bg-black/70 sticky bottom-0 z-10">
            {/* Hamburger for mobile */}
            <button
              className="lg:hidden text-white bg-gray-700 px-3 py-2 rounded-full hover:bg-gray-600 transition"
              onClick={() => setSidebarOpen(!sidebarOpen)}
            >
              ☰
            </button>

            <input
              type="text"
              name="message"
              value={message}
              placeholder="Type a message..."
              className="flex-1 border bg-black text-white rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
              onChange={(e) => setMessage(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault();
                  handleChat();
                }
              }}
            />

            <button
              type="button"
              onClick={handleChat}
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
            >
              Send
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatBox;
