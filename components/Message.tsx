"use client";

import React from "react";
import { motion } from "framer-motion";

type MessageProps = {
  role: "user" | "assistant";
  content: string;
};

// Simple Markdown → HTML renderer
function renderMarkdown(markdown: string) {
  return markdown
    // ***bold+italic***
    .replace(/\*\*\*(.*?)\*\*\*/g, "<b><i>$1</i></b>")
    // **bold**
    .replace(/\*\*(.*?)\*\*/g, "<b>$1</b>")
    // *italic*
    .replace(/\*(.*?)\*/g, "<i>$1</i>")
    // [text](url)
    .replace(
      /\[(.*?)\]\((.*?)\)/g,
      '<a href="$2" target="_blank" class="text-blue-600 underline">$1</a>'
    );
}

export default function Message({ role, content }: MessageProps) {
  const isUser = role === "user";

  return (
    <div
      className={`flex w-full ${
        isUser ? "justify-end" : "justify-start"
      } items-start gap-2`}
    >
      {/* Avatar for assistant ONLY */}
      {!isUser && (
        <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-pink-500 to-purple-600 p-[2px] shadow-lg shadow-pink-500/40">
          <img
            src="/samaira-avatar.png"
            alt="Samaira Avatar"
            className="w-full h-full rounded-full object-cover"
          />
        </div>
      )}

      {/* Animated bubble */}
      <motion.div
        initial={{ opacity: 0, y: 8, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.18 }}
        className={`p-3 max-w-[75%] rounded-2xl text-sm leading-relaxed shadow-md ${
          isUser
            ? "bg-gradient-to-r from-purple-600 to-pink-500 text-white"
            : "bg-gradient-to-br from-white/95 to-slate-100/90 backdrop-blur-xl border border-white/70 text-slate-900"
        }`}
      >
        <div
          dangerouslySetInnerHTML={{
            __html: renderMarkdown(content),
          }}
        />
      </motion.div>
    </div>
  );
}
