"use client";

import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import Message from "./Message";

type ChatDrawerProps = {
  open: boolean;
  onClose: () => void;
};

type ChatMessage = {
  role: "user" | "assistant";
  content: string;
};

export default function ChatDrawer({ open, onClose }: ChatDrawerProps) {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      role: "assistant",
      content:
        "Hi! I'm ***Samaira***, the creator of **CoderBunnyz**! 🐰💻 Ask me anything about the game, how it teaches coding, or where to get it!"
    }
  ]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);

  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  // Auto-scroll to bottom when messages or typing change
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, isTyping]);

  async function sendMessage() {
    if (!input.trim()) return;

    const message: ChatMessage = { role: "user", content: input };
    setMessages((prev: ChatMessage[]) => [...prev, message]);
    setInput("");
    setIsTyping(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify([...messages, message])
      });

      const data = await res.json();
      setMessages((prev: ChatMessage[]) => [
        ...prev,
        { role: "assistant", content: data.reply as string }
      ]);
    } catch (err) {
      setMessages((prev: ChatMessage[]) => [
        ...prev,
        {
          role: "assistant",
          content:
            "Oops, something went wrong talking to my brain (OpenAI). Please try again in a moment! 💜"
        }
      ]);
    } finally {
      setIsTyping(false);
    }
  }

  return (
    <>
      {/* BACKDROP */}
      {open && (
        <div
          onClick={onClose}
          className="fixed inset-0 backdrop-blur-sm bg-black/30"
        />
      )}

      {/* DRAWER */}
      <motion.div
        initial={{ x: 400 }}
        animate={{ x: open ? 0 : 400 }}
        transition={{ type: "spring", stiffness: 120, damping: 16 }}
        className="fixed right-0 top-0 h-full w-[360px] bg-slate-900/90 backdrop-blur-2xl shadow-2xl border-l border-white/10 flex flex-col overflow-hidden"
      >
        {/* HEADER */}
        <div className="relative p-4 bg-gradient-to-r from-pink-500 via-purple-600 to-indigo-500 text-white flex items-center justify-between shadow-lg">
          <div className="flex items-center gap-2">
            <div className="w-9 h-9 rounded-full bg-white/20 p-[2px]">
              <img
                src="/samaira-avatar.png"
                alt="Samaira"
                className="w-full h-full rounded-full object-cover"
              />
            </div>
            <div className="flex flex-col leading-tight">
              <span className="font-semibold text-sm">
                Samaira from CoderBunnyz
              </span>
              <span className="text-xs text-pink-100/90">
                Coding board game creator ✨
              </span>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-sm opacity-80 hover:opacity-100 transition"
          >
            ✕
          </button>
        </div>

        {/* FLOATING WATERMARK */}
        <div className="pointer-events-none absolute inset-0 flex items-center justify-center opacity-5">
          <img
            src="/coderbunnyz.png"
            alt="CoderBunnyz Logo"
            className="w-52 h-auto"
          />
        </div>

        {/* MESSAGES AREA */}
        <div className="relative flex-1 p-4 space-y-3 overflow-y-auto flex flex-col">
          {messages.map((msg, i) => (
            <Message key={i} role={msg.role} content={msg.content} />
          ))}

          {/* Typing indicator */}
          {isTyping && (
            <div className="flex items-start gap-2">
              <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-pink-500 to-purple-600 p-[2px] shadow-lg shadow-pink-500/40">
                <img
                  src="/samaira-avatar.png"
                  alt="Samaira Avatar"
                  className="w-full h-full rounded-full object-cover"
                />
              </div>
              <motion.div
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.15 }}
                className="px-3 py-2 rounded-2xl bg-gradient-to-br from-white/90 to-slate-100/90 border border-white/70 shadow-md text-xs text-slate-700 flex items-center gap-1"
              >
                <span>Samaira is typing</span>
                <span className="flex gap-[2px]">
                  <span className="w-1.5 h-1.5 rounded-full bg-slate-500 animate-bounce [animation-delay:-0.2s]" />
                  <span className="w-1.5 h-1.5 rounded-full bg-slate-500 animate-bounce [animation-delay:-0.1s]" />
                  <span className="w-1.5 h-1.5 rounded-full bg-slate-500 animate-bounce" />
                </span>
              </motion.div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* INPUT */}
        <div className="p-4 border-t border-white/10 bg-slate-950/80">
          <div className="flex gap-2">
            <input
              className="flex-1 p-2 rounded-xl border border-slate-600 bg-slate-900/80 text-sm text-white placeholder:text-slate-400 outline-none focus:border-pink-500 focus:ring-1 focus:ring-pink-500 transition"
              placeholder="Ask about CoderBunnyz, CoderMindz, or CoderMarz…"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && sendMessage()}
            />
            <button
              onClick={sendMessage}
              className="bg-gradient-to-r from-pink-500 to-purple-600 text-white px-4 py-2 rounded-xl text-sm font-medium shadow-md hover:shadow-lg hover:brightness-110 transition disabled:opacity-50"
              disabled={!input.trim() || isTyping}
            >
              Send
            </button>
          </div>
          <p className="mt-1 text-[10px] text-slate-400">
            Powered by OpenAI • Chat with the real creator of CoderBunnyz 🐰
          </p>
        </div>
      </motion.div>
    </>
  );
}
