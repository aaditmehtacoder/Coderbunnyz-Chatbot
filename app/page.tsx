// app/page.tsx
import ChatBubble from "../components/ChatBubble";

export default function Home() {
  return (
    <main>
      {/* Floating chatbot widget */}
      <div>
        <ChatBubble />
      </div>
    </main>
  );
}
