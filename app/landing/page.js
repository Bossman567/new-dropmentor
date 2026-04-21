"use client";

const menuItems = ["Home", "How it works", "Features", "Pricing", "AI Assistant", "Contact"];

export default function Landing() {
  return (
    <div style={{
      background: "radial-gradient(circle at top, #0f172a, #020617)",
      color: "white",
      minHeight: "100vh",
      fontFamily: "Inter, sans-serif"
    }}>

      {/* NAVBAR */}
      <div style={{
        display: "flex",
        justifyContent: "space-between",
        padding: "20px 40px",
        borderBottom: "1px solid rgba(255,255,255,0.05)"
      }}>
        <h2>DropAI</h2>

        <div style={{ display: "flex", gap: 20 }}>
          <span>Home</span>
          <span>Features</span>
          <span>Pricing</span>
          <span>AI Assistant</span>
        </div>

        <button style={{
          background: "#22c55e",
          border: "none",
          padding: "10px 16px",
          borderRadius: 10,
          color: "white"
        }}>
          Sign in
        </button>
      </div>

      {/* HERO */}
      <div style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "80px 40px",
        maxWidth: 1200,
        margin: "auto"
      }}>

        <div style={{ maxWidth: 500 }}>
          <h1 style={{
            fontSize: 60,
            lineHeight: 1.1,
            fontWeight: 700
          }}>
            Start <span style={{
              background: "linear-gradient(90deg,#22c55e,#3b82f6)",
              WebkitBackgroundClip: "text",
              color: "transparent"
            }}>
              dropshipping
            </span> with AI
          </h1>

          <p style={{ opacity: 0.7, marginTop: 20 }}>
            Find winning products, build your store, and launch marketing — all in one place.
          </p>

          <div style={{ display: "flex", gap: 15, marginTop: 30 }}>
            <button style={{
              background: "#22c55e",
              padding: "14px 20px",
              borderRadius: 10,
              border: "none"
            }}>
              Start free
            </button>

            <button style={{
              background: "transparent",
              border: "1px solid rgba(255,255,255,0.2)",
              padding: "14px 20px",
              borderRadius: 10
            }}>
              See how it works
            </button>
    <div
      style={{
        minHeight: "100vh",
        color: "#dbeafe",
        fontFamily: "Inter, sans-serif",
        background:
          "radial-gradient(1000px 600px at 20% 0%, rgba(17, 132, 255, 0.18), transparent 60%), radial-gradient(900px 500px at 80% 80%, rgba(153, 50, 255, 0.2), transparent 65%), linear-gradient(180deg, #030b24 0%, #020617 100%)"
      }}
    >
      <div style={{ maxWidth: 1260, margin: "0 auto", padding: "0 28px 40px" }}>
        <header
          style={{
            height: 74,
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            borderBottom: "1px solid rgba(148, 163, 184, 0.14)"
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <div
              style={{
                width: 34,
                height: 34,
                borderRadius: 10,
                display: "grid",
                placeItems: "center",
                fontWeight: 700,
                color: "#03132f",
                background: "linear-gradient(135deg,#22d3ee,#a78bfa)",
                boxShadow: "0 0 24px rgba(56, 189, 248, 0.45)"
              }}
            >
              ✦
            </div>
            <strong style={{ color: "#22d3ee", fontSize: 29 }}>DropAI</strong>
          </div>
        </div>

        <div style={{
          width: 450,
          height: 300,
          borderRadius: 20,
          background: "linear-gradient(135deg,#1e293b,#020617)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          opacity: 0.7
        }}>
          IMAGE HERE
        </div>
      </div>

      {/* PRICING */}
      <div style={{
        textAlign: "center",
        marginTop: 100
      }}>
        <h2 style={{ fontSize: 40 }}>
          Simple <span style={{
            background: "linear-gradient(90deg,#22c55e,#3b82f6)",
            WebkitBackgroundClip: "text",
            color: "transparent"
          }}>pricing</span>
        </h2>

        <p style={{ opacity: 0.6 }}>
          Start free. Cancel anytime.
        </p>
      </div>

      <div style={{
        display: "flex",
        justifyContent: "center",
        gap: 30,
        marginTop: 50,
        paddingBottom: 100
      }}>

        {/* FREE */}
        <div style={cardStyle}>
          <h3>Free</h3>
          <h1>€0</h1>

          <button style={outlineBtn}>Start free</button>

          <ul>
            <li>1 store</li>
            <li>AI product picker</li>
            <li>Basic analytics</li>
          </ul>
        </div>

        {/* STARTER */}
        <div style={cardStyle}>
          <h3>Starter</h3>
          <h1>€9.99</h1>

          <button style={outlineBtn}>Choose Starter</button>

          <ul>
            <li>3 stores</li>
            <li>AI product picker</li>
            <li>Ad generator</li>
          </ul>
        </div>

        {/* PRO */}
        <div style={{
          ...cardStyle,
          border: "1px solid #22c55e"
        }}>
          <h3>Pro</h3>
          <h1>€29.99</h1>

          <button style={mainBtn}>Choose Pro</button>

          <ul>
            <li>Unlimited stores</li>
            <li>Unlimited AI</li>
            <li>Priority support</li>
          </ul>
        </div>
          <nav style={{ display: "flex", gap: 30, color: "#cbd5e1", fontSize: 15 }}>
            {menuItems.map((item, index) => (
              <span key={item} style={{ opacity: index === 0 ? 1 : 0.78, fontWeight: index === 0 ? 600 : 400 }}>
                {item}
              </span>
            ))}
          </nav>

          <button
            style={{
              border: "none",
              borderRadius: 12,
              padding: "10px 22px",
              color: "#001225",
              fontWeight: 700,
              cursor: "pointer",
              background: "linear-gradient(90deg,#22d3ee,#06b6d4)"
            }}
          >
            Sign in
          </button>
        </header>

        <section
          style={{
            padding: "78px 0 70px",
            display: "grid",
            gridTemplateColumns: "1.03fr 1fr",
            gap: 60,
            alignItems: "center"
          }}
        >
          <div>
            <div
              style={{
                width: "fit-content",
                borderRadius: 999,
                border: "1px solid rgba(56, 189, 248, 0.45)",
                color: "#bae6fd",
                background: "rgba(2, 132, 199, 0.14)",
                padding: "8px 16px",
                fontSize: 18,
                marginBottom: 30
              }}
            >
              ✨ New: AI Product Picker 2.0
            </div>

            <h1 style={{ margin: 0, fontSize: 82, lineHeight: 1.02, letterSpacing: "-0.03em", color: "#e2e8f0" }}>
              Start
              <br />
              <span
                style={{
                  background: "linear-gradient(90deg,#22d3ee 0%, #60a5fa 45%, #d946ef 100%)",
                  WebkitBackgroundClip: "text",
                  color: "transparent"
                }}
              >
                dropshipping
              </span>{" "}
              with AI
            </h1>

            <p style={{ marginTop: 30, marginBottom: 0, fontSize: 35, lineHeight: 1.45, color: "rgba(186,230,253,0.86)", maxWidth: 860 }}>
              DropAI finds winning products, builds your store, and launches marketing — all within 24
              hours. Earn your first €1,000 in weeks, not months.
            </p>

            <div style={{ marginTop: 34, display: "flex", gap: 16, alignItems: "center" }}>
              <button
                style={{
                  padding: "16px 34px",
                  borderRadius: 14,
                  border: "none",
                  fontWeight: 700,
                  fontSize: 22,
                  color: "#001225",
                  cursor: "pointer",
                  background: "linear-gradient(90deg,#22d3ee,#06b6d4)"
                }}
              >
                Start free →
              </button>
              <button
                style={{
                  padding: "15px 33px",
                  borderRadius: 14,
                  border: "1px solid rgba(56,189,248,0.55)",
                  background: "rgba(12, 74, 110, 0.24)",
                  color: "#e2e8f0",
                  fontWeight: 700,
                  fontSize: 22,
                  cursor: "pointer"
                }}
              >
                See how it works
              </button>
            </div>

            <div style={{ marginTop: 28, display: "flex", gap: 28, color: "#7dd3fc", fontSize: 19 }}>
              <span>◉ No credit card required</span>
              <span>◉ 7-day free trial</span>
            </div>
          </div>

          <div
            style={{
              borderRadius: 22,
              border: "1px solid rgba(56, 189, 248, 0.35)",
              overflow: "hidden",
              boxShadow: "0 0 48px rgba(59,130,246,0.32), 0 0 120px rgba(168,85,247,0.2)",
              background:
                "radial-gradient(240px 160px at 25% 23%, rgba(56,189,248,0.6), transparent 68%), radial-gradient(200px 130px at 76% 18%, rgba(56,189,248,0.62), transparent 66%), radial-gradient(300px 180px at 55% 88%, rgba(217,70,239,0.44), transparent 72%), linear-gradient(170deg, #040819 0%, #080b34 50%, #0a123d 100%)",
              aspectRatio: "16 / 10",
              minHeight: 420,
              position: "relative"
            }}
          >
            <div style={{ position: "absolute", inset: 0, opacity: 0.22, backgroundImage: "radial-gradient(#7dd3fc 1px, transparent 1px)", backgroundSize: "22px 22px" }} />
          </div>
        </section>
      </div>

    </div>
  );
}

const cardStyle = {
  width: 280,
  padding: 30,
  borderRadius: 20,
  background: "rgba(30,41,59,0.6)",
  backdropFilter: "blur(10px)",
  border: "1px solid rgba(255,255,255,0.05)"
};

const mainBtn = {
  marginTop: 20,
  width: "100%",
  padding: 12,
  borderRadius: 10,
  background: "#22c55e",
  border: "none",
  color: "white"
};

const outlineBtn = {
  marginTop: 20,
  width: "100%",
  padding: 12,
  borderRadius: 10,
  background: "transparent",
  border: "1px solid rgba(255,255,255,0.2)",
  color: "white"
};
