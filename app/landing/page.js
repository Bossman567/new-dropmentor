"use client";

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
