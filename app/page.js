"use client";
import { useState, useEffect, useRef } from "react";

export default function Home() {
  const [chats, setChats] = useState([]);
  const [current, setCurrent] = useState(null);
  const [input, setInput] = useState("");
  const [tier, setTier] = useState("free");
  const [loading, setLoading] = useState(false);

  const chatRef = useRef(null);

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("chats") || "[]");

    if (saved.length === 0) {
      const newChat = createChat();
      setChats([newChat]);
      setCurrent(newChat);
    } else {
      setChats(saved);
      setCurrent(saved[0]);
    }
  }, []);

  useEffect(() => {
    chatRef.current?.scrollTo(0, chatRef.current.scrollHeight);
  }, [current]);

  function save(data) {
    setChats(data);
    localStorage.setItem("chats", JSON.stringify(data));
  }

  function createChat() {
    return {
      id: Math.random().toString(36),
      messages: [],
      title: "New Chat"
    };
  }

  function newChat() {
    const chat = createChat();
    const updated = [chat, ...chats];
    save(updated);
    setCurrent(chat);
  }

  function updateCurrent(chat) {
    const updated = chats.map(c => c.id === chat.id ? chat : c);
    save(updated);
    setCurrent(chat);
  }

  async function send() {
    if (!input || !current || loading) return;

    const message = input;
    setInput("");
    setLoading(true);

    const updatedChat = {
      ...current,
      messages: [...current.messages, { text: message, user: true }]
    };

    updateCurrent(updatedChat);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          message,
          tier,
          sessionId: current.id
        })
      });

      const data = await res.json();

      const finalChat = {
        ...updatedChat,
        messages: [
          ...updatedChat.messages,
          { text: data.reply, user: false }
        ]
      };

      if (finalChat.title === "New Chat") {
        finalChat.title = message.slice(0, 25);
      }

      updateCurrent(finalChat);

    } catch {
      alert("Error connecting");
    }

    setLoading(false);
  }

  function formatText(text) {
    return text
      .replace(/\*\*(.*?)\*\*/g, "<b>$1</b>")
      .replace(/\n/g, "<br>");
  }

  return (
    <div style={{ display: "flex", height: "100vh", background: "#0f172a", color: "white" }}>

      {/* SIDEBAR */}
      <div style={{
        width: 260,
        background: "#020617",
        padding: 20,
        borderRight: "1px solid #1e293b"
      }}>
        <h3 style={{ marginBottom: 20 }}>DropMentor</h3>

        <button onClick={newChat} style={{
          width: "100%",
          padding: 12,
          borderRadius: 8,
          background: "#22c55e",
          border: "none",
          color: "white",
          cursor: "pointer"
        }}>
          + New Chat
        </button>

        <div style={{ marginTop: 20 }}>
          {chats.map(c => (
            <div key={c.id}
              onClick={() => setCurrent(c)}
              style={{
                padding: 10,
                cursor: "pointer",
                opacity: 0.7
              }}>
              {c.title}
            </div>
          ))}
        </div>
      </div>

      {/* MAIN */}
      <div style={{ flex: 1, display: "flex", flexDirection: "column" }}>

        {/* CHAT */}
        <div
          ref={chatRef}
          style={{
            flex: 1,
            overflowY: "auto",
            display: "flex",
            justifyContent: "center",
            padding: "30px 20px"
          }}
        >
          <div style={{ width: "100%", maxWidth: 800 }}>
            {current?.messages.map((m, i) => (
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
                  maxWidth: "80%"
                }}>
                  <div dangerouslySetInnerHTML={{ __html: formatText(m.text) }} />
                </div>
              </div>
            ))}

            {loading && <div style={{ opacity: 0.6 }}>Thinking...</div>}
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
            gap: 10,
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
                outline: "none"
              }}
            />

            <select value={tier} onChange={e => setTier(e.target.value)}>
              <option value="free">Free</option>
              <option value="starter">Starter</option>
              <option value="pro">PRO</option>
            </select>

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
    </div>
  );
}
