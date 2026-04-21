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
    chatRef.current?.scrollTo({
      top: chatRef.current.scrollHeight,
      behavior: "smooth"
    });
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
      .replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>")
      .replace(/\n/g, "<br>");
  }

  return (
    <div style={{
      display: "flex",
      height: "100vh",
      background: "radial-gradient(circle at top, #1e293b, #020617)",
      color: "white",
      fontFamily: "Inter, sans-serif"
    }}>

      {/* SIDEBAR */}
      <div style={{
        width: 260,
        backdropFilter: "blur(20px)",
        background: "rgba(2,6,23,0.6)",
        padding: 20,
        borderRight: "1px solid rgba(255,255,255,0.05)"
      }}>
        <h3 style={{ marginBottom: 20, opacity: 0.9 }}>DropMentor</h3>

        <button onClick={newChat} style={{
          width: "100%",
          padding: 12,
          borderRadius: 12,
          background: "#22c55e",
          border: "none",
          color: "white",
          cursor: "pointer",
          fontWeight: 500,
          transition: "0.2s"
        }}>
          + New Chat
        </button>

        <div style={{ marginTop: 20 }}>
          {chats.map(c => (
            <div key={c.id}
              onClick={() => setCurrent(c)}
              style={{
                padding: 10,
                borderRadius: 8,
                cursor: "pointer",
                marginBottom: 6,
                background: current?.id === c.id ? "rgba(255,255,255,0.08)" : "transparent",
                transition: "0.2s"
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
            padding: "40px 20px"
          }}
        >
          <div style={{ width: "100%", maxWidth: 800 }}>
            {current?.messages.map((m, i) => (
              <div key={i}
                style={{
                  marginBottom: 24,
                  display: "flex",
                  justifyContent: m.user ? "flex-end" : "flex-start"
                }}>
                <div style={{
                  padding: "16px 18px",
                  borderRadius: 16,
                  background: m.user
                    ? "linear-gradient(135deg,#22c55e,#16a34a)"
                    : "rgba(30,41,59,0.7)",
                  backdropFilter: "blur(10px)",
                  maxWidth: "75%",
                  lineHeight: 1.6,
                  position: "relative"
                }}>
                  <div dangerouslySetInnerHTML={{ __html: formatText(m.text) }} />

                  {!m.user && (
                    <button
                      onClick={() => navigator.clipboard.writeText(m.text)}
                      style={{
                        position: "absolute",
                        top: 8,
                        right: 10,
                        opacity: 0,
                        transition: "0.2s",
                        fontSize: 12,
                        background: "none",
                        border: "none",
                        color: "white",
                        cursor: "pointer"
                      }}
                      onMouseEnter={e => e.target.style.opacity = 1}
                      onMouseLeave={e => e.target.style.opacity = 0}
                    >
                      Copy
                    </button>
                  )}
                </div>
              </div>
            ))}

            {loading && (
              <div style={{ opacity: 0.6 }}>
                ● ● ●
              </div>
            )}
          </div>
        </div>

        {/* INPUT */}
        <div style={{
          padding: 20,
          display: "flex",
          justifyContent: "center"
        }}>
          <div style={{
            width: "100%",
            maxWidth: 800,
            display: "flex",
            gap: 10,
            background: "rgba(30,41,59,0.7)",
            backdropFilter: "blur(20px)",
            borderRadius: 20,
            padding: 10,
            border: "1px solid rgba(255,255,255,0.05)"
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

            <button onClick={send} style={{
              padding: "10px 18px",
              borderRadius: 12,
              background: "#22c55e",
              border: "none",
              color: "white",
              cursor: "pointer"
            }}>
              Send
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}
