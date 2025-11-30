// app/embed/page.tsx
import ChatBubble from "../../components/ChatBubble";

export default function EmbedWidget() {
  return (
    <main className="w-full h-full">
      {/* Only the floating chat bubble + drawer */}
      <ChatBubble />
    </main>
  );
}
