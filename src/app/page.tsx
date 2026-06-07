"use client";

import { useState } from "react";

const MONEY_ITEMS = [
  { emoji: "💵", left: "8%", size: 24, duration: 6, delay: 0 },
  { emoji: "💵", left: "22%", size: 20, duration: 7, delay: 0.3 },
  { emoji: "🪙", left: "35%", size: 22, duration: 5.5, delay: 0.6 },
  { emoji: "💸", left: "48%", size: 26, duration: 6.5, delay: 0.9 },
  { emoji: "💵", left: "62%", size: 28, duration: 7, delay: 1.2 },
  { emoji: "🪙", left: "75%", size: 22, duration: 5.8, delay: 1.5 },
  { emoji: "💸", left: "88%", size: 24, duration: 6.2, delay: 1.8 },
];

export default function Home() {
  const [amount, setAmount] = useState("1500.00");
  const [loading, setLoading] = useState(false);

  const handleCheckout = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ amount: parseFloat(amount) }),
      });
      const data = await res.json();
      if (data.url) {
        window.location.href = data.url;
      }
    } catch (error) {
      console.error("Checkout error:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (/^\d*\.?\d*$/.test(value) || value === "") {
      setAmount(value);
    }
  };

  return (
    <main style={{ minHeight: "100vh", backgroundColor: "#0f172a", display: "flex", alignItems: "center", justifyContent: "center", padding: "1rem", position: "relative" }}>
      <div style={{ position: "absolute", inset: 0, opacity: 0.2, zIndex: 0, display: "none" }} className="sm:block">
        {MONEY_ITEMS.map((item, i) => (
          <div
            key={i}
            style={{
              position: "fixed",
              top: "-10%",
              left: item.left,
              fontSize: item.size,
              animation: `fall ${item.duration}s linear infinite`,
              animationDelay: `${item.delay}s`,
              pointerEvents: "none",
              userSelect: "none",
            }}
          >
            {item.emoji}
          </div>
        ))}
      </div>

      <div style={{ width: "100%", maxWidth: "24rem", backgroundColor: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: "1.5rem", padding: "1.5rem", backdropFilter: "blur(20px)" }}>
        <div style={{ textAlign: "center", marginBottom: "1.5rem" }}>
          <h1 style={{ fontSize: "1.75rem", fontWeight: "900", color: "white", marginBottom: "0.5rem" }}>Rent Payments</h1>
          <p style={{ color: "#fbbf24", fontSize: "0.875rem" }}>Secure monthly payment portal</p>
        </div>

        <div style={{ marginBottom: "1.5rem" }}>
          <label style={{ color: "#94a3cb", fontSize: "0.75rem", fontWeight: "500", display: "block", marginBottom: "0.5rem" }}>Payment Amount (USD)</label>
          <div style={{ position: "relative" }}>
            <span style={{ position: "absolute", left: "0.75rem", top: "50%", transform: "translateY(-50%)", fontSize: "1.25rem", color: "#94a3cb" }}>$</span>
            <input
              type="text"
              inputMode="decimal"
              value={amount}
              onChange={handleAmountChange}
              placeholder="1500.00"
              style={{ width: "100%", backgroundColor: "rgba(255,255,255,0.1)", border: "1px solid rgba(255,255,255,0.2)", borderRadius: "0.75rem", padding: "0.75rem 0.75rem 0.75rem 2rem", fontSize: "1.5rem", fontWeight: "700", color: "white" }}
            />
          </div>
        </div>

        <button
          onClick={handleCheckout}
          disabled={loading || !amount || parseFloat(amount) <= 0}
          style={{ width: "100%", background: "linear-gradient(90deg, #d97706, #ea580c)", color: "white", fontWeight: "700", padding: "1rem", borderRadius: "0.75rem", fontSize: "1.125rem", textTransform: "uppercase", cursor: loading || !amount || parseFloat(amount) <= 0 ? "not-allowed" : "pointer", border: "none" }}
        >
          {loading ? "Processing..." : `Pay $${amount || "0.00"}`}
        </button>

        <div style={{ display: "flex", alignItems: "center", justifyContent: "center", marginTop: "1.5rem", color: "#94a3cb", fontSize: "0.75rem" }}>
          🔒 Secured by Stripe
        </div>
      </div>
    </main>
  );
}