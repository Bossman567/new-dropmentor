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

  // 🔥 FINAL TEXT FORMATTER
  function formatText(text) {
    const lines = text.split("\n");
    let html = "";
    let inList = false;

    for (let line of lines) {
      // bold (**text**)
      line = line.replace(/\*\*(.*?)\*\*/g, "<b>$1</b>");

      // bullet list (* või -)
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
    <div style={{ display: "flex", height: "100vh" }}>

      {/* SIDEBAR */}
      <div style={{ width: 250, background: "#020617", padding: 20 }}>
        <h3>DropMentor</h3>

        <button onClick={newChat} style={{ width: "100%", padding: 10 }}>
          + New Chat
        </button>

        {chats.map(c => (
          <div key={c.id}
            onClick={() => setCurrent(c)}
            style={{ padding: 10, cursor: "pointer", opacity: 0.7 }}>
            {c.title}
          </div>
        ))}
      </div>

      {/* MAIN */}
      <div style={{ flex: 1, display: "flex", flexDirection: "column" }}>

        {/* CHAT */}
        <div style={{ flex: 1, overflowY: "auto", padding: 20 }}>
          {current?.messages.map((m, i) => (
            <div key={i}
              style={{
                display: "flex",
                justifyContent: m.user ? "flex-end" : "flex-start",
                marginBottom: 15
              }}>
              <div style={{
                background: m.user ? "#22c55e" : "#1e293b",
                padding: 12,
                borderRadius: 10,
                maxWidth: 600
              }}>
                <div
                  dangerouslySetInnerHTML={{
                    __html: formatText(m.text)
                  }}
                />
              </div>
            </div>
          ))}
        </div>

        {/* INPUT */}
        <div style={{ padding: 20 }}>
          <div style={{ display: "flex", gap: 10 }}>
            <input
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={e => e.key === "Enter" && send()}
              style={{ flex: 1, padding: 12 }}
            />

            <select value={tier} onChange={e => setTier(e.target.value)}>
              <option value="free">Free</option>
              <option value="starter">Starter</option>
              <option value="pro">PRO</option>
            </select>

            <button onClick={send}>Send</button>
          </div>
        </div>

      </div>
    </div>
  );
}
