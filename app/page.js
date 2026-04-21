"use client";
import { useState, useEffect } from "react";

export default function Home() {
  const [chats, setChats] = useState([]);
  const [current, setCurrent] = useState(null);
  const [input, setInput] = useState("");
  const [tier, setTier] = useState("free");

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
    if (!input || !current) return;

    const updatedChat = {
      ...current,
      messages: [...current.messages, { text: input, user: true }]
    };

    updateCurrent(updatedChat);
    const message = input;
    setInput("");

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
      messages: [...updatedChat.messages, { text: data.reply, user: false }]
    };

    if (finalChat.title === "New Chat") {
      finalChat.title = message.slice(0, 25);
    }

    updateCurrent(finalChat);
  }

  function formatText(text) {
    const lines = text.split("\n");
    let html = "";
    let inList = false;

    for (let line of lines) {
      line = line.replace(/\*\*(.*?)\*\*/g, "<b>$1</b>");

      if (line.startsWith("* ") || line.startsWith("- ")) {
        if (!inList) {
          html += "<ul style='margin:10px 0; padding-left:20px;'>";
          inList = true;
        }
        html += "<li style='margin-bottom:6px;'>" + line.slice(2) + "</li>";
      } else {
        if (inList) {
          html += "</ul>";
          inList = false;
        }
        if (line.trim() !== "") {
          html += "<p style='margin:8px 0;'>" + line + "</p>";
        }
      }
    }

    if (inList) html += "</ul>";
    return html;
  }

  return (
    <div style={{ display: "flex", height: "100vh", background: "#0f172a" }}>

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

        {chats.map(c => (
          <div key={c.id}
            onClick={() => setCurrent(c)}
            style={{
              padding: 10,
              cursor: "pointer",
              opacity: 0.7,
              marginTop: 10
            }}>
            {c.title}
          </div>
        ))}
      </div>

      {/* MAIN */}
      <div style={{ flex: 1, display: "flex", flexDirection: "column" }}>

        {/* CHAT */}
        <div style={{
          flex: 1,
          overflowY: "auto",
          padding: 30,
          display: "flex",
          flexDirection: "column",
          gap: 15
        }}>
          {current?.messages.map((m, i) => (
            <div key={i}
              style={{
                display: "flex",
                justifyContent: m.user ? "flex-end" : "flex-start"
              }}>
              <div style={{
                background: m.user ? "#22c55e" : "#1e293b",
                padding: 16,
                borderRadius: 12,
                maxWidth: 650,
                boxShadow: "0 4px 20px rgba(0,0,0,0.2)"
              }}>
                <div
                  dangerouslySetInnerHTML={{
                    __html: formatText(m.text)
                  }}
                />

                {!m.user && (
                  <button
                    onClick={() => navigator.clipboard.writeText(m.text)}
                    style={{
                      marginTop: 10,
                      fontSize: 12,
                      opacity: 0.6,
                      cursor: "pointer",
                      background: "none",
                      border: "none",
                      color: "white"
                    }}>
                    Copy
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* INPUT */}
        <div style={{
          padding: 20,
          borderTop: "1px solid #1e293b",
          background: "#020617"
        }}>
          <div style={{
            display: "flex",
            gap: 10,
            background: "#1e293b",
            padding: 10,
            borderRadius: 12
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
                outline: "none",
                padding: 10
              }}
            />

            <select value={tier} onChange={e => setTier(e.target.value)}>
              <option value="free">Free</option>
              <option value="starter">Starter</option>
              <option value="pro">PRO</option>
            </select>

            <button onClick={send} style={{
              padding: "10px 16px",
              borderRadius: 8,
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
