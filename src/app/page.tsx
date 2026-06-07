"use client";

import { useState } from "react";

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
    <main style={{ minHeight: "100vh", backgroundColor: "#0f172a", display: "flex", alignItems: "center", justifyContent: "center", padding: "1rem" }}>
      <div style={{ width: "100%", maxWidth: "28rem", backgroundColor: "#1e293b", borderRadius: "0.75rem", padding: "2rem", boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -2px rgba(0, 0, 0, 0.1)" }}>
        <div style={{ textAlign: "center", marginBottom: "2rem" }}>
          <h1 style={{ fontSize: "1.875rem", fontWeight: "700", color: "white", marginBottom: "0.5rem" }}>Rent Payment Portal</h1>
          <p style={{ color: "#94a3cb", fontSize: "0.875rem" }}>Secure monthly rent payment for your property</p>
        </div>

        <div style={{ marginBottom: "1.5rem" }}>
          <label style={{ color: "#e2e8f0", fontSize: "0.875rem", fontWeight: "500", display: "block", marginBottom: "0.5rem" }}>Payment Amount (USD)</label>
          <div style={{ position: "relative" }}>
            <span style={{ position: "absolute", left: "0.75rem", top: "50%", transform: "translateY(-50%)", fontSize: "1.25rem", color: "#94a3cb" }}>$</span>
            <input
              type="text"
              inputMode="decimal"
              value={amount}
              onChange={handleAmountChange}
              placeholder="0.00"
              style={{ width: "100%", backgroundColor: "#334155", border: "1px solid #475569", borderRadius: "0.5rem", padding: "0.75rem 0.75rem 0.75rem 2rem", fontSize: "1.25rem", fontWeight: "600", color: "white" }}
            />
          </div>
        </div>

        <button
          onClick={handleCheckout}
          disabled={loading || !amount || parseFloat(amount) <= 0}
          style={{ width: "100%", backgroundColor: "#2563eb", color: "white", fontWeight: "600", padding: "0.875rem", borderRadius: "0.5rem", fontSize: "1rem", transition: "background-color 0.2s", cursor: loading || !amount || parseFloat(amount) <= 0 ? "not-allowed" : "pointer", border: "none", opacity: loading || !amount || parseFloat(amount) <= 0 ? 0.5 : 1 }}
        >
          {loading ? "Processing..." : `Pay $${amount || "0.00"}`}
        </button>

        <div style={{ display: "flex", alignItems: "center", justifyContent: "center", marginTop: "1.5rem", color: "#94a3cb", fontSize: "0.75rem", gap: "0.25rem" }}>
          <svg style={{ width: "0.875rem", height: "0.875rem" }} fill="currentColor" viewBox="0 0 24 24">
            <path d="M18 8h-1V6c0-2.76-2.24-5-5-5S7 3.24 7 6v2H6c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V10c0-1.1-.9-2-2-2zm-8 0V6c0-1.66 1.34-3 3-3s3 1.34 3 3v2H10z" />
          </svg>
          Secured by Stripe
        </div>

        <p style={{ textAlign: "center", marginTop: "2rem", color: "#64748b", fontSize: "0.75rem" }}>
          Payments processed securely. Contact your property manager with questions.
        </p>
      </div>
    </main>
  );
}