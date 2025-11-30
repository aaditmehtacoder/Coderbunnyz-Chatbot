"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import ChatDrawer from "./ChatDrawer";

export default function ChatBubble() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <motion.button
        onClick={() => setOpen(true)}
        className="fixed bottom-6 right-6 bg-gradient-to-r from-pink-500 to-purple-600 text-white rounded-full p-4 shadow-lg shadow-purple-400 cursor-pointer"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
      >
        💬
      </motion.button>

      <ChatDrawer open={open} onClose={() => setOpen(false)} />
    </>
  );
}
