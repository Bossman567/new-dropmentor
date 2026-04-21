"use client";
import { useState, useEffect, useRef } from "react";

export default function Home() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  const chatRef = useRef(null);

  useEffect(() => {
    chatRef.current?.scrollTo(0, chatRef.current.scrollHeight);
  }, [messages]);

  async function send() {
    if (!input || loading) return;

    const userMsg = { text: input, user: true };
    setMessages(prev => [...prev, userMsg]);

    const message = input;
    setInput("");
    setLoading(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          message,
          tier: "pro"
        })
      });

      const data = await res.json();

      setMessages(prev => [
        ...prev,
        { text: data.reply, user: false }
      ]);

    } catch {
      setMessages(prev => [
        ...prev,
        { text: "Error connecting", user: false }
      ]);
    }

    setLoading(false);
  }

  function formatText(text) {
    return text
      .replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>")
      .replace(/\n/g, "<br>");
  }

  return (
    <div style={{
      height: "100vh",
      display: "flex",
      flexDirection: "column",
      background: "linear-gradient(to bottom, #0f172a, #020617)",
      color: "white"
    }}>

      {/* HEADER */}
      <div style={{
        padding: "16px 24px",
        borderBottom: "1px solid #1e293b",
        fontWeight: "600",
        fontSize: "18px"
      }}>
        DropMentor AI
      </div>

      {/* CHAT */}
      <div
        ref={chatRef}
        style={{
          flex: 1,
          overflowY: "auto",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          padding: "30px 20px"
        }}
      >
        <div style={{ width: "100%", maxWidth: "800px" }}>
          {messages.map((m, i) => (
            <div
              key={i}
              style={{
                marginBottom: 20,
                display: "flex",
                justifyContent: m.user ? "flex-end" : "flex-start"
              }}
            >
              <div style={{
                padding: "14px 16px",
                borderRadius: 12,
                background: m.user ? "#22c55e" : "#1e293b",
                maxWidth: "80%",
                lineHeight: 1.6,
                fontSize: 15
              }}>
                <div
                  dangerouslySetInnerHTML={{
                    __html: formatText(m.text)
                  }}
                />
              </div>
            </div>
          ))}

          {loading && (
            <div style={{ opacity: 0.6 }}>
              Thinking...
            </div>
          )}
        </div>
      </div>

      {/* INPUT */}
      <div style={{
        padding: 20,
        borderTop: "1px solid #1e293b",
        display: "flex",
        justifyContent: "center"
      }}>
        <div style={{
          width: "100%",
          maxWidth: 800,
          display: "flex",
          background: "#1e293b",
          borderRadius: 14,
          padding: 8
        }}>
          <input
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyDown={e => e.key === "Enter" && send()}
            placeholder="Ask anything..."
            style={{
              flex: 1,
              background: "transparent",
              border: "none",
              color: "white",
              padding: 12,
              outline: "none",
              fontSize: 15
            }}
          />

          <button
            onClick={send}
            style={{
              background: "#22c55e",
              border: "none",
              padding: "10px 16px",
              borderRadius: 10,
              color: "white",
              cursor: "pointer"
            }}
          >
            Send
          </button>
        </div>
      </div>

    </div>
  );
}
